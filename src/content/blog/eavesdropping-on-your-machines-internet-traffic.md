---
title: Eavesdropping on your machine’s internet traffic
date: 2023-09-30
---

Recently I had to migrate some integration tests to the [MockServer](https://mock-server.com/).
In short, this is a service that mocks conversations with external services by returning prerecorded responses to expected requests.
This way, by redirecting your tests to use the mockserver instead of the external services, one can make the tests less coupled and flaky at the expense of having to maintain them manually.
The migration is more or less straightforward, as long as you actually have the conversations recorded.
However, actually recording them turned out to be a bit trickier than I thought.

### The proxy environment variable approach

The common way of intercepting internet traffic is routing it through a locally running [mitmproxy](https://mitmproxy.org/) (or one of the alternatives), which then records the conversation.
In fact, it can also censor and modify the traffic however you want (as I mentioned in my [earlier blog post](/blog/control-http-traffic-using-mitmproxy)), it is scary how powerful Man-In-The-Middle attacks can be.
The only problem is to actually route the traffic through the proxy.
Usually this is done by setting the `$http_proxy` (et al.) environment variable to `localhost:8080`, where 8080 is the port on which mitmproxy is running.
This is enough for `curl`, for example, but there is unfortunately no guarantee that all other http-clients must actually respect this variable, especially the ones used in legacy artifacts written in outdated programming languages.
In my case, somewhere in the middle of the code after some debugging I found the following beauty and I could do nothing about it:

```php
return (new Client())->get($url);
```

### Transparent proxy approach

Luckily, there exists another way of intercepting internet traffic that requires no client configuration - transparent proxy, which listens to packets on the network layer.
Why is this better?
Because now we can use the routing capabilities built in into Linux kernel and no packet can escape them.
The most common tools working by this principle are Wireshark, tcpdump, and Squid, which are used for caching or troubleshooting networking issues.
Unfortunately, none of them can easily decrypt and assemble https messages, which is why I decided to stick with mitmproxy.

The mitmproxy configuration in transparent mode is sufficiently well described in the [documentation](https://docs.mitmproxy.org/stable/howto/transparent/):

1. Create a technical system user called `mitmproxyuser` that will be used to run mitmproxy.
   We need this because the traffic leaving mitmproxy needs to be later excluded from the rerouting, so that it actually reaches the internet and is not fed back into an infinite cycle.
   If needed, copy the existing mitmproxy configuration and certificates (usually located at `~/.mitmproxy`) to the new user (or install them anew), so that mitmproxy can read encrypted https traffic.

2. Switch to the new user and start mitmproxy:

   ```bash
   mitmproxy --mode transparent --set block_global=false
   ```

3. And now the most interesting part, reroute all packets originating from your machine to the mitmproxy:
   ```bash
   sudo iptables -t nat -A OUTPUT -p tcp -m owner ! --uid-owner mitmproxyuser --dport 1:65535 -j REDIRECT --to-port 8080
   sudo ip6tables -t nat -A OUTPUT -p tcp -m owner ! --uid-owner mitmproxyuser --dport 1:65535 -j REDIRECT --to-port 8080
   ```

The `iptables`/`ip6tables` is the cli utility for configuring Linux kernel firewall for IPv4/IPv6 respectively, which supports traffic filtering, forwarding, routing, etc.
It consists of several tables and rule chains which decide the fate of each packet.
With this command we add a new redirection rule to one of the chains.
Let us take a closer look at this command:

- The arguments `-t nat -A OUTPUT` specify which table and rule chain to use
- `-m owner ! --uid-owner mitmproxyuser` means that this rule applies only to packets originating from users not called "mitmproxyuser", so that we avoid infinite redirection loops
- `--dport 1:65535` means that this rule applies to packets destined for any port
- Finally, `-j REDIRECT --to-port 8080` specifies the action performed on the packets, i.e., they should be redirected to `localhost:8080`, where the mitmproxy instance was started in the previous step

It is important that this instance was started under the correct user.
If everything was set up correctly now you should be able to see all your traffic in the mitmproxy.
You can try it out by running an integration test, firing a curl request, or simply using a browser.
When you are done or run into issues the following command clears all iptable rules (even the ones you may have configured before, but nat table is usually empty anyway):

```bash
sudo iptables -t nat -F && sudo ip6tables -t nat -F
```

### Transparent proxying with an upstream proxy

In my case this was not the end of the story, though, as the network is split into an internal one containing internal services and external one, which provides access to the outer internet.
Funnily enough, the internal services are also accessible through the outer proxy.
Unfortunately, mitmproxy in the transparent mode does not play well with upstream proxy.
[According to the maintainer](https://github.com/mitmproxy/mitmproxy/issues/2813) this is to keep the source code simpler and the proposed solution is to use another tool called `proxychains` that will chain the upstream proxy after the mitmproxy.
This turned out quite easy to setup and worked well for external resources, but led to another quite subtle problem for internal routes.
The internal services in the network resolve to different IPs for my machine and the corporate proxy machine.

Unfortunately, mitmproxy [does not support remote DNS resolution](https://github.com/mitmproxy/mitmproxy/issues/6137) and therefore the requests to the internal resources were addressed to the wrong IPs (when routed through the outer proxy) and could not reach their destinations.
In the end, I decided against chaining proxies altogether, as the integration tests seemed to perform calls only to the internal services and therefore did not require outer proxy at all.

In conclusion, I was surprised how much investigation and networking knowledge was required for such seemingly ordinary request as eavesdropping on your program's internet traffic.
