---
title: "How to drop Bower support?"
author: sheerun
---

From time to time I get asked how to drop Bower support as an owner of JavaScript module, as so developers who already use this module (in both applications and other modules) won't get mad at you.

This procedure is as follows:

1. Notify all users of your module who might be affected by this change (see below)
2. Remove all distribution files and `bower.json` from repository
3. Tagging repository with new **major** semver version (e.g from 3.5.6 to 4.0.0)
4. **Not** removing your component from Bower registry (via `bower unregister`)

To understand why these steps are necessary you need to know how Bower resolves components.

### Why step 4?

When Bower sees module name in `dependencies` of `bower.json`, it tries to resolve it to repository URL by consulting the only centralized part of Bower: its registry. The registry is not as advanced as npm's. It's a simple mapping from module name to URL of module's repository. For [jquery](https://registry.bower.io/packages/jquery) it's:

```
{"name":"jquery","url":"https://github.com/jquery/jquery-dist.git"}
```

Bower consults for this information each installation (cached), as it lacks locking known from [Yarn](https://yarnpkg.com) and introduced in [npm](https://docs.npmjs.com/files/package-lock.json). Remove this entry, and modules and apps that depend on yours will fail to install.

### Why step 3?

Because removing support for something is a breaking change. But also because Bower depends solely on git/svn tags for version resolution. If someone reasonably specified `"yourpackage": "^2.3.5"` as a dependency, removing support for Bower in `2.4.0` would break her installation. Tag it `3.0.0`.

### Why step 1?

Removing `bower.json` and distribution files will break all installations that specify in dependcies `"yourpackage": "*"` (more likely) or `"yourpackage": "master"` (less likely). In such case Bower will resolve versions of your package that don't support Bower. Honestly this is a fault of these developers for not properly using semver ranges for dependencies, but be considerate and notify them to update dependencies in their packages few weeks before dropping Bower support.

Thanks to [libraries.io](https://libraries.io) you can fairly easy discover these developers at:

[https://libraries.io/bower/mocha/usage?requirements=%2A](https://libraries.io/bower/mocha/usage?requirements=%2A)

(please replace mocha with your module name)

You can go to these repositories and create issues / PRs that ask to commit (tagged!) patches (ideally for each major version), so they depend on proper semver range of your module.

You can also notify developers on social channels, because libraries.io won't list private apps.
