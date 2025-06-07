---
title: My beef with Hibernate
date: 2025-05-23
---

I've been working with JPA/Hibernate recently and came up with a great idea for a new Java http client.
Its main feature -- the response you get is not simply a parsed HTTP response with headers and body, but instead an object representing the website/resource as a whole, with all links resolved to similar website-like objects.
This way you'll be able to traverse the whole website/resource directly from Java code!

### The Hibernate way

Of course, the users will have to duplicate the website structure as java entity-classes and keep them in sync, but who doesn't like sprinkling magical meta-coding annotations, especially in a Spring artifact.
And even better, this website-like object will at the same time be an internet connection, with its own lifecycle that we will hide from users to make them extra-careful with their code.
This will allow to make the object not only mutable, but also introduce side-effects to getters and setters, so that modifying a field may send another request to the server without our users even needing to make a call explicitly.
And to keep things lightning-fast we will employ lazy loading, even though Java has no native support for lazy values, so this will have to be done with magic, sometimes breaking the debugger and messing up built-in java functions.

We will also have multi-level caching, so that we can brag about it in the docs.
Speaking of which, our http client won't even need any documentation, because everyone already knows how JPA/Hibernate work! We can safely point our users either to [Jakarta](https://jakarta.ee/learn/docs/jakartaee-tutorial/current/persist/persistence-intro/persistence-intro.html)/[Java](https://docs.oracle.com/javaee/7/tutorial/persistence-intro.htm) persistence docs, which proudly start with _"We are working on a fresh, updated Jakarta EE Tutorial. This section hasn't yet been updated"_ and end with _"Copyright © 2014"_, or to [A **Short**(!) Guide to Hibernate 7](https://docs.jboss.org/hibernate/orm/7.0/introduction/html_single/Hibernate_Introduction.html) which counts 48 thousands words -- slightly more than "The Great Gatsby" by F. Scott Fitzgerald but with entertaining diagrams!

### The better way

On the other hand, if for some strange reason you dislike magic and uncertainty and prefer using comprehensible well-documented actively-supported tools, that are not forged in the fires of Mount Doom and not developed by Java/Oracle Enterprise in the worst sense of this word, then I suggest looking into [jOOQ](https://www.jooq.org/) library for your ORM needs.
The main features are:

- typesafe assembly of SQL statements using ordinary java functions/expressions respecting your schema
- explicit control over SQL execution, no lifecycles, no magic
- automatic code generation of DTOs and other POJOs from your database/liquibase/flyway schema
- standardisation over various SQL dialects and support of many database providers
- integration with Spring

For example, the following code from the jOOQ landing page creates an SQL query:

```java
var query =
    select(AUTHOR.FIRST_NAME, AUTHOR.LAST_NAME, count())
      .from(AUTHOR)
      .join(BOOK).on(AUTHOR.ID.equal(BOOK.AUTHOR_ID))
      .where(BOOK.LANGUAGE.eq("DE"))
      .and(BOOK.PUBLISHED.gt(date("2008-01-01")))
      .groupBy(AUTHOR.FIRST_NAME, AUTHOR.LAST_NAME)
      .having(count().gt(5))
      .orderBy(AUTHOR.LAST_NAME.asc().nullsFirst())
      .limit(2)
      .offset(1);
```

Anyone familiar with SQL will immediately understand what it will do when executed. All constants in this code are automatically generated from the schema and will not compile if the schema changes. This query may be exported as a pure SQL string for testing/debugging. Finally, it can also be executed using plain JDBC or with jOOQ own runner by calling `query.fetch()`, at which point it will return an immutable result which you may safely use afterwards.
For a more complete example containing both data save and search using jOOQ see my [example repo](https://github.com/drybalka/jooq-example).
