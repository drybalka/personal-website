---
title: Back-of-the-envlope interview questions
date: 2022-01-30
---

During my physicist career I was always fascinated by the so-called back-of-the-envelope calculations, which require one to estimate some problem in a few lines of calculations, while using very rough simplifying assumptions.
This approach tests the problem-solving ability while also staying somewhat in the realm of reality.
I came up with a few example problems that can provide an easy win and boost confidence for a candidate, while also giving an insight into their thinking process.
Note, that none of the problems below contain any numbers and thus require some creative ball-park-estimations, while the solutions consist of only one line.

### Antivirus

**Problem**: A client came up with an idea for an antivirus.
It works by periodically scanning the memory (RAM) of a computer and searching for a specific string, say "virus".
Can you roughly estimate how often this antivirus can run this operation on a typical laptop? A million times per second, once per second, once a day?

**Solution**: Roughly assuming processor can scan one bit of memory in one tact for a typical laptop this gives 8GB/2.5 GHz ~ a few seconds per scan.

**Follow-up questions**: Does this time depend on the length of the string? Can one utilize more processor cores?

### Global authenticator

**Problem**: A client wants to build an authenticator app.
Just to be on the safe side they want their database to be able to hold the credentials of every person on the planet.
What kind of infrastructure do they need to store this information? Can it be stored using a flash card or do you need a room-sized hard-drive?

**Solution**: In typical case the credentials comprise of a few dozen characters, with one byte per character and 8 billion people this gives roughly 10^11 bytes ~ 100 GB

**Follow-up questions**: Does encryption influence this estimation? What kind of broadband speed do they need for the server under reasonable assumptions?

### Satellite

**Problem**: A client wants to send a meteorological satellite into space, which will make pictures of the surface and send them back to Earth.
Making reasonable assumptions about the picture quality and the broadband speed with current technology, how often can it send a new picture?

**Solution**: Considering Starlink satellites provide around 100 Mb/s internet connection and assuming we need a 100 Mpx photo of the surface with 1 byte per pixel, we get around 10 seconds per photo.

**Follow-up questions**: What if black-and-white image is sufficient? Do we need to send the whole image each time? Assuming the surface does not change much in 10 seconds we can reuse the previous photo and send only the diff.
