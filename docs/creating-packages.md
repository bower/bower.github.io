---
title: Creating Packages
layout: docs
permalink: /docs/creating-packages/
---

## Deprecated

As Bower is deprecated, registering new Bower packages is not supported anymore. Neverthless you can install any GitHub repository as Bower package by putting full name in `bower.json`:

```
{
  "dependencies": {
    "angular-cli": "angular/angular-cli#^9.1.3"
  }
}
```

You can install any dependency from github with CLI as well:

```
bower install angular/angular-cli --save
```
