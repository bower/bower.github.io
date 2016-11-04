---
title: "Using Bower with Yarn"
author: benmann
---

UPDATE: Yarn decided to drop Bower support for now. We recommend to try it anyway as an alternative to npm!

Yesterday's official release of [Yarn](https://yarnpkg.com/)  adds an interesting new tool to the world of package managers, bridging the gap between Bower and npm, and adding the most requested features to both.

Yarn looks like a great improvement compared to the current Bower client in a number of ways we'll describe. It could help you to transition to npm if that is something you've been looking for recently.

As Yarn already supports multiple package formats and ecosystems, we secretly hope it will empower JavaScript developers to further develop the ES6 modules ecosystem, as compared to CommonJS used by the npm community, and AMD/globals used by Bower's community. Browsers and [node](https://github.com/bmeck/UnambiguousJavaScriptGrammar/blob/master/README.md) agree.

Yarn advertises itself as a drop-in replacement for both npm and Bower. This means you will be able to continue using your existing `bower.json` just like before. Yarn installs bower components to `bower_components`, npm components to `node_modules`, and supports dependency flattening!

**Important note**: As it stands right now there still seem to be [some issues](https://github.com/yarnpkg/yarn/pull/896) regarding Bower support. We are however confident that with the help of the community, these issues will be solved quickly as Yarn steps towards 1.0 in upcoming months.

It is important to keep in mind that just like npm, Bower consists of more than just the CLI component and switching between the npm and Bower ecosystem can still be improved in a number of ways.

Take a quick look at some more goodies that Yarn has to offer:

### Lockfile

Faithful users of Bower will be very pleased to see that Yarn adds the long awaited Lockfile feature with even stricter reproducability across devices and systems than npm offers at the moment.

### Security

Checking each package against checksum before they are installed guarantees a certain degree of integrity, and gives the developer more confidence from a security standpoint.

### Speed and offline

Yarn's cache is a pretty elaborate improvement over what Bower had to offer so far, reducing (cold) install times by a great deal and even more so in a cached scenario. At the same time it allows complete installs even without an internet connection!

### Licenses

The ability to list a dependencies' license type is often required in enterprise environments.
Yarn offers an easy way to list the license type for a given dependency.

## Welcome!

You can read more about Yarn in [Facebook's post](https://code.facebook.com/posts/1840075619545360). Together with [npm](http://blog.npmjs.org/post/151660845210/hello-yarn), we thank the Yarn team for developing it (especially [Sebastian](https://www.npmjs.com/~sebmck)). We look for fruitful cooperation.

