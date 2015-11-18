---
title: Bower
layout: docs
is_home: true
permalink: /docs/pluggable-resolvers/
---

# Pluggable Resolvers

> This feature has been introduced in Bower 1.5
>
> Please make sure your Bower version is correct (`bower --version`)

Pluggable Resolvers allow you to use resolvers created by 3rd party JavaScript developers (including overriding default resolvers used by Bower). To give a few ideas, it means anyone is able to write resolver for the following scenarios:

* Handling [Mercurial](https://mercurial.selenic.com/) or [Bazaar](http://bazaar.canonical.com/en/) repositories
* Speeding up checkouts of services like [GitLab](https://about.gitlab.com/) or [Bitbucket](https://bitbucket.org/)
* Allowing to use packages from [npm](https://www.npmjs.com/) or [component.io](https://github.com/component/component.github.io)
* Proxying downloads through 3rd party service like [Artifactory](http://www.jfrog.com/artifactory/)
* Implementing custom private registry (hosted on GitHub?)
* Adding authentication support for private [GitHub Enterprise](https://enterprise.github.com/) instances

## Using

A Pluggable Resolver is just an npm package that you install as `devDependency` in the `package.json` of your repository, or install globally with `npm install -g`.

Then, you need to declare what Pluggable Resolvers your project uses. There are two ways to specify a Pluggable Resolver in your project

* Add entries to the `resolvers` section of [.bowerrc](/docs/config). To give an example:

    {% highlight json %}
    {
      "resolvers": [
        "bitbucket-resolver",
        "github-enterprise-resolver"
      ]
    }
    {% endhighlight %}

* pass the pluggable resolver via CLI in the form of

   * `bower install --config.resolvers="My-resolver1"`  
   * `bower install --config.resolvers="/Users/anypath/pkg"`  
   * `bower install --config.resolvers="/Users/path-without-comma/pkg,other-resolver-pkg-in-require-range"`  

Bower tries to use resolvers in the order specified. If no custom resolver matches the source being processed, Bower fallbacks to default resolvers (git, github, filesystem, svn, registry).

You can find the list of available Bower resolvers on [npm website](https://www.npmjs.com/search?q=bower-resolver).

## Creating

As mentioned, custom resolvers are just [npm](https://www.npmjs.com/) packages with a specific API described below.

The `package.json` should not list `bower` as a `dependency` or `peerDependency` (both have undesired behavior in npm 2.x, and we don't want you to use bower internals). Instead, you can check for proper environment in resolver's factory by reading provided `bower.version` parameter and use any other packages on npm (like [request](https://www.npmjs.com/package/request)).

Packages should list `bower-resolver` as one of the `keywords` in `package.json`. Resolvers should also follow [semver](http://semver.org/) specification.

Here is how an example `package.json` of a custom resolver can look like:

{% highlight json %}
{
  "name": "custom-bower-resolver",
  "version": "1.0.0",
  "keywords": ["bower-resolver"],
  "main": "index.js",
  "dependencies": {
    "request": "^2.61.0"
  }
}
{% endhighlight %}

The `index.js` should export factory for resolver, as follows:

{% highlight javascript %}
var tmp = require('tmp');

/**
 * Factory function for resolver
 * It is called only one time by Bower, to instantiate resolver.
 * You can instantiate here any caches or create helper functions.
 */
module.exports = function resolver (bower) {

  // Resolver factory returns an instance of resolver
  return {

    // Match method tells whether resolver supports given source
    // It can return either boolean or promise of boolean
    match: function (source) {
      return source.indexOf('svn://') === 0
    },

    // Optional:
    // Can resolve or normalize sources, like:
    // "jquery" => "git://github.com/jquery/jquery.git"
    locate: function (source) {
      return source;
    },

    // Optional:
    // Allows to list available versions of given source.
    // Bower chooses matching release and passes it to "fetch"
    releases: function (source) {
      return [
        { target: 'v1.0.0', version: '1.0.0' },
        { target: 'v1.0.1', version: '1.0.1' }
      ]
    },

    // It downloads package and extracts it to temporary directory
    // You can use npm's "tmp" package to tmp directories
    // See the "Resolver API" section for details on this method
    fetch: function (endpoint, cached) {
      // If cached version of package exists, re-use it
      if (cached && cached.version) {
        return;
      }

      var tempDir = tmp.dirSync();

      // ... download package to tempDir

      return {
        tempPath: tempDir.name,
        removeIgnores: true
      }
    }
  }
}
{% endhighlight %}

## Resolver API

### resolver(bower: object): object

*Parameters:*

  * `bower: object`:
    * `version: string` - Bower's version that instantiates resolver. You can validate it.
    * `config: object` - Bower's [config](/docs/config/). You can ask authors to put extra configuration in it.
    * `logger: object` - Bower's [logger](https://github.com/bower/logger). Use it to output important warnings / information.

*Returns* an instance of resolver implementing methods:

  * `match(source: string): boolean`
  * `locate(source: string): string`
  * `releases(source: string): array`
  * `fetch(endpoint: object, cached: object): object`

Detailed API for these methods is described below:

### match(source: string): boolean

Tells Bower whether to use or not use this resolver for some source.

*Parameters:*

  * `source: string` - source from bower.json, like `git://github.com/jquery/jquery.git`

*Returns* a boolean that tells whether resolver can handle given source (either by locating them with `locate` method, or fetching it with `fetch` + optional `releases` method).

Method can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result. It's useful e.g. for filesystem checks.

### locate(source: string): string

Allows to implement simplified registry.

*Parameters:*

  * `source: string` - source from bower.json, like `jquery/jquery`

*Returns:* a resolved source string, like `"git://github.com/jquery/jquery.git"`

Method can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result. It's useful e.g. for remote registry calls.

### releases(source: string): array

*Returns:* available releases for given source (like list of available tags on GitHub)

Bower selects one matching `version` from the result and passes matching `target` field to `fetch` method.

Bower executes `releases` method only if user provides a range like `*` (the default) or `^1.2.3`. If user provides non-semver target, like `master`, bower skips directly to the `fetch` method of custom resolver.

If package doesn't have any versions and you want to support default `*` range, you can return something like `[{ version: '0.0.0', target: 'master' }]`. Be sure to skip caching for such targets in the `fetch` method.

*Parameters:*

  * `source: string` - source from bower.json, like `git://github.com/jquery/jquery.git`

*Returns:* an array of releases:

  * `target: string` - unique target id for release (usually tag name)
  * `version string` - semantic version for the target above

Method can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result.

### fetch(endpoint: object, cached: object): object

Downloads given endpoint and returns path to temporary directory.

*Parameters:*

  * `endpoint: object` - endpoint for the resource to download
    * `name: string` - name of resource (like `jquery`)
    * `source: string` - where to download resource from (like `git://github.com/jquery/jquery.git`)
    * `target: string` - the version or release of resource to download (like `v1.0.0`)

  * `cached: object` - contains information about cached resource
    * `endpoint: object` - endpoint of cached resource (the same format as above)
    * `release: string` - release of cached resource
    * `releases: array` - the result of `releases` method
    * `version: string` - present cached resource has been resolved as version (like `1.0.0`)
    * `resolution: string` - the "resolution" returned from previous fetch call for same resource

*Returns:*

  * `tempPath: string` - path to teporary directory with downloaded resource
  * `removeIgnores: boolean` - tells whether bower should remove files ignores in bower.json.
  * `resolution: object` - extra object that is saved in `.bower.json` and passed in `cached` field to the next `fetch` call. It can be used e.g. to download resources conditionally, for example by storing e-tag or last-modified time.

Method can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result.

**If method returns `undefined`, then Bower re-uses cached package.**
