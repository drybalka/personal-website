---
title: How to configure multiple git personalities for gpg-agent
date: 2024-01-17
---

In your developer life you may want to have multiple personalities with separate email, GitHub/GitLab/whatever profile, and a set of GPG/SSH keys for each one, for example, an internal TNG personality, different personalities for different clients, etc..
Usually these are managed by creating a workspace folder for each personality, instructing Git to use the appropriate email and GPG key depending on the filepath, and finally adapting the SSH config file to use the correct SSH key depending on the hostname (the detailed instructions are easy to find on the internet).

But, what if you use GnuPG to manage both your GPG and auth keys together and do not have SSH keys readily accessible in your home `.ssh` folder?
In this case you can probably find the appropriate SSH keys in the `.gnupg` folder and try to use them, although you would probably need to mold them into the correct format.
Anyway, this solution sounds highly error-prone and hacky.

But, what if in addition you also use `gpg-agent` instead of `ssh-agent` for caching and serving your SSH keys (as described, for example, [here](https://wiki.archlinux.org/title/GnuPG#SSH_agent))?
After all, what is the point of running 2 key-serving agents when all the keys are already managed by GnuPG?
In this case SSH asks gpg-agent for keys directly and the content of `ssh/config` does not even matter.
So how do you provide the correct SSH key?

Let us take a closer look at how SSH obtains a key in our scenario.
Say you run a `git fetch` command with an upstream server configured for SSH protocol.
First Git asks SSH to fetch the information from the server, then SSH establishes a connection and queries gpg-agent (through its `gpg-agent.ssh` socket set in `$SSH_AUTH_SOCK` environment variable) for SSH keys.
As far as I could find out, in contrast to ssh-agent the gpg-agent does not care for the server hostname and always returns the same list of keys, which SSH then tries out one by one until any one fits.
In theory this works fine if the keys are host-independent, but if you have both private and work accounts on GitHub then there is a conflict as any key can let you in.
In fact, the list of SSH keys gpg-agent will serve is specified explicitly in the `.gnupg/sshcontrol` file.

With that knowledge the only thing we need in order to configure multiple personalities in gpg-agent is to find a way to put the correct key into the `sshcontrol` file before executing SSH.
This can be done in git by setting the `core.sshCommand` config option for each of your profiles to a simple wrapper script that does just that.
The example config for one of the personalities may look something like this:

```ini
# ~/.config/git/config
...
[includeIf "gitdir:~/code/client/"]
path = ./config_client
```

```ini
# ~/.config/git/config_client
[user]
email = client@client.com
signingkey = CLIENT_GPG_KEY
[core]
sshCommand = ~/.config/git/client_ssh_wrapper
```

```bash
# ~/.config/git/client_ssh_wrapper
#!/usr/bin/env bash

if [ -f ~/.gnupg/sshcontrol_general ]; then
echo "ssh connection with non-default profile already ongoing; exiting" >&2
exit 1
fi

mv ~/.gnupg/sshcontrol ~/.gnupg/sshcontrol_general
trap "mv ~/.gnupg/sshcontrol_general ~/.gnupg/sshcontrol" EXIT
echo CLIENT_SSH_KEY > ~/.gnupg/sshcontrol
ssh "$@"
```
