---
title: Control http traffic in your application development using mitmproxy
date: 2023-03-19
---

In this blogpost I want to promote an awesome tool that may be a valuable addition to your IT arsenal - [mitmproxy](https://mitmproxy.org/).
It is a set of tools that provide an interactive, SSL/TLS-capable intercepting proxy for HTTP and WebSockets.
As the name suggests it works as an isolation layer between a program and internet and allows monitoring of all outgoing and incoming http traffic.
It is similar to Wireshark and Fiddler (if you've ever heard of them), but I found it easier to understand and use.

### How is it useful?

mitmproxy can monitor, intercept, modify, redirect, and do pretty much anything with http traffic going to and from your application.
This allows you to effectively mock the external (internet) services and isolate the code you work with much in the same way as mock classes allow you to isolate functionality in the unit tests.

Here are a few usecases to illustrate how mitmproxy could be useful in your development work:

- Imagine you are searching for a nasty bug in a big-ball-of-mud-like program.
  You may be able to poke it from one end and observe the result on the other, but what happens in between?
  Does it communicate with other services and if yes, maybe the bug is in the miscommunication?
  In order to find out simply isolate it with mitmproxy and analyze (or even modify) the conversation.
- Imagine you are developing a client while the backend is not yet fully operational.
  Of course you can release a local version of the backend returning a mocked response and reroute your client to use this local backend.
  Alternatively, you can wrap your client with mitmproxy and simply intercept/modify/mock only the necessary requests and responses while letting all the others pass to the real backend unmodified.
  When the backend is ready simply remove mitmproxy and the client should work without any code modifications necessary.
- Imagine you are developing a script that needs to access a slow internet resource (either because of the response time or the download size).
  In order to avoid the annoying waiting time you may either modify your code to somehow read the response from a local file, or leave the code untouched and simply cache and replay the response using mitmproxy.

### Functionality

In short mitmproxy provides the following features:

- Work with http, https, WebSocket
- Intercept http requests and responses and modify them on the fly
- Save complete http conversations both server- and client-side for reply and analysis
- Make scripted changes to the traffic using Python
- Operate as a regular proxy, reverse proxy, upstream proxy (a proxy behind another proxy), or transparent proxy (wireshark-like mode listening to all the traffic on the network layer, when all other fails)

mitmproxy comes with 3 interfaces:

- **mitmproxy** - interactive (curses) console tool, which I advise to use as a default
- **mitmweb** - web-based interface for mitmproxy, works from browser and looks nicer, but has a more limited functionality
- **mitmdump** - the cli version of mitmproxy, non-interactive, probably most useful for long running scripted jobs

### Man-in-the-Middle attack

mitmproxy takes its name from the so-called man-in-the-middle attack, where the attacker secretly relays and possibly alters the communications between two parties who believe that they are directly communicating with each other, as the attacker has inserted themselves between the two parties.
All the possibilities mentioned above, that make mitmproxy so powerful, are a dangerous weapon in the hands of a malicious party.
The most common defense against MitM attacks is the use of mutually trusted Certificate Authorities (CA) that authenticate one or both parties and whose root certificates are usually included in all popular OS and browsers.

For this reason mitmproxy generates a new (private to your machine, so that its security is not violated) SSL certificate, which then needs to be explicitly trusted by the program behind mitmproxy.

This can be done either system-wide (for programs that respect it, for example, `curl`) by adding the generated public certificate to the right system folder (`/etc/ssl/certs` on Linux), or individually using respective certificate truststores (for java or browsers).
