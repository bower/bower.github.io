---
title: "How to migrate away from Bower?"
author: sheerun
---

As you might have noticed, we started recommending [Yarn](https://yarnpkg.com) as an alternative to Bower for **new** front-end projects. Main reasons are straightforward and written on its home page:

1. Yarn uses checksums to verify the integrity of every installed package (like npm@5)
2. Yarn uses lockfile to exactly reproduce installed packages each time (like npm@5)
3. Yarn supports most features npm supports, and is able to force flattening of dependencies

So far it just wasn't obious how one could use Yarn for **legacy** Bower projects. Indeed, until recently Yarn neither could install Bower packages (i.e. GitHub repositories without `package.json`) nor resolve semver ranges on git tags. I focused on this [for](https://github.com/yarnpkg/yarn/pull/3624) [a](https://github.com/yarnpkg/yarn/pull/3701) [while](https://github.com/yarnpkg/yarn/pull/3855) and the result is pleasing: **Yarn 1.x is able to install most of Bower packages**. But there's a catch: it cannot resolve Bower dependencies.

This is probably for the best as a) Yarn is meant as npm's replacement, b) one must admit npm's CommonJS module ecosystem that is [better integrated](https://medium.com/@trek/last-week-i-had-a-small-meltdown-on-twitter-about-npms-future-plans-around-front-end-packaging-b424dd8d367a) than Bower's globals/AMD one c) Module authors currently suffer from supporting two module ecosystems.

But admitting this doesn't change the fact that it's hard to migrate a project that uses globals/AMD components to CommonJS all at once. Ideally I'd be able to install such project with Yarn as-is, and only then gradually replace AMD modules with CommonJS equivalents. That's why I've created [**bower-away**](https://github.com/sheerun/bower-away).

### How it works?

As mentioned, both Yarn and npm is unable to resolve dependencies of Bower components (i.e. dependencies defined in `bower.json`, it looks just for ones in `package.json`). It also isn't able to translate names of Bower components to URLs of repositories as I [described in previous blogpost](https://bower.io/blog/2017/how-to-drop-bower-support/#why-step-4). `bower-away` gets away with this by asking to resolve all dependencies with Bower, and adding all of them **flattened** to `package.json`. The result is something as follows:

```json
{
  "dependencies": {
    "@bower_components/almond" : "jrburke/almond#~0.2.9",
    "@bower_components/angular" : "angular/bower-angular#^1.0.8",
    "@bower_components/d3" : "mbostock-bower/d3-bower#~3.3.10"
  }
}
```

Now, if you install this `package.json` with Yarn, `node_modules/@bower_components` will contain all components in exactly the same way they would be installed by Bower (sans generated `.bower.json`).

The only change required in code is to change any reference to `bower_components` with `node_modules/@bower_components` (though you can link it anywhere in postinstall script).

---

If you have any questions or find any issues with this script, please post issue at [bower-away](https://github.com/sheerun/bower-away) repository.
