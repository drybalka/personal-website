---
title: Solving amplify-cli’s saml2aws auth issue
date: 2025-08-06
---

In my project we deploy our app into an AWS account, and we use saml2aws to login into this account using an external identity provider like Azure AD. The usual setup looks like this:

1. `saml2aws login` creates an entry in `~/.aws/credentials` file:
```
[project-saml]
aws_access_key_id = ...
aws_secret_access_key = ...
aws_session_token = ...
...
```
2. These credentials now can be used in the `~/.aws/config` file for your profile:
```
[profile project]
source_profile=project-saml
role_arn=...
region=...
```
Using the project profile now works in aws-cli without a hitch.

However, that not all tools are that smart. When trying to use this profile with [aws-amplify/cli](https://docs.amplify.aws/gen1/react/start/getting-started/installation/) we got an error message saying "aws_access_key is missing" or something of that sort. Only after a few hours of fruitless internet searches and experiments by a pure luck I stumbled upon a solution. Apparently, amplify-cli does not recognize credential entries as valid profiles, as aws-cli does. Therefore, one needs to add a dummy profile of the same name to the config file:
```
[profile project]
source_profile=project-saml
role_arn=...
region=...

[profile project-saml]
region=...
```
With that small change both aws-cli and amplify-cli now work as they should.

