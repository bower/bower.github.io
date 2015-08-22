---
title: Bower
layout: default
is_home: true
---

# Pluggable Resolvers

> This feature has been introduced in Bower 1.5, please make sure your Bower version is correct (`bower --version`)

Custom Resolvers feature allows you to use resolvers created by 3rd party JavaScript developers (including overriding default resolvers used by Bower). To give few ides, it means anyone is able to write resolver:

* Handling [Mercurial](https://mercurial.selenic.com/) or [Bazaar](http://bazaar.canonical.com/en/) repositories
* Speeding up checkouts of services like [GitLab](https://about.gitlab.com/) or [Bitbucket](https://bitbucket.org/)
* Allowing to use packages from [npm](https://www.npmjs.com/) or [component.io](https://github.com/component/component.github.io)
* Proxying downloads through 3rd party service like [Artifactory](http://www.jfrog.com/open-source/#os-arti)
* Implement custom private registry (hosted on GitHub?)
* Add authentication support for private [GitHub Enterprise](https://enterprise.github.com/) instances
* Postprocessing downloaded packages in some way (building them)
* Overriding entries in `bower.json` or validating checksums

## Usage

Custom Resolver is just an npm package that you install as `devDependency` in package.json of your repository, or install globally with `npm install -g`.

Them, you need to declare what custom resolver your project uses, by adding entries to `resolvers` section of [.bowerrc](/docs/config). For example:

{% highlight json %}
{
  "resolvers": [
    "bitbucket-resolver",
    "github-enterprise-resolver"
  ]
}
{% endhighlight %}

Bower tries to use resolver in order specified. If no custom resolver matches processed source, we fallback to default resolvers.

You can find list of available Bower resolvers on [npm website](https://www.npmjs.com/search?q=bower-resolver).

## Creating custom resolvers

As mentioned, custom resolvers are just [npm](https://www.npmjs.com/) packages with specific API described below.

The `package.json` should not list `bower` as a `dependency` or `peerDependency` (both have undesired behavior in npm 2.x, and we don't wan't you to use bower internals). Instead, you can check for proper environment in resolver's factory by reading provided `options.version` parameter and use any other packages on npm (like [request](https://www.npmjs.com/package/request)).

Packages should list `bower-resolver` as one of the `keywords` in `package.json`. Resolvers should also follow [semver](http://semver.org/) specification.

Here is how example `package.json` of custom resolver can look like:

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

The `index.js` should exportk factory for resolver and few other functions, as follows:

{% highlight javascript %}
var tmp = require('tmp');

/**
 * Factory function for resolver
 * It is called only one time by Bower, to instantiate resolver.
 * You can instantiate here any caches or create helper functions.
 */
module.exports = function Resolver(options) {

  // Resolver factory returns an instance of resolver with specific API
  return {

    // Match method tells whether resolver supports given source
    // It can return either boolean or promise of boolean
    match: function (source) {
      return source.indexOf('svn://') === 0
    },

    // Optional:
    // Given source like "jquery" can transfer it to new source like
    // "git://github.com/jquery/jquery.git"
    // You can implement custom registry this way
    // It can return either string or promise of string
    locate: function (source) {
      return source;
    },

    // Optional
    // If resolver supports versioning, it should implement this function
    // It returns all releases of a package, so Bower can choose matching one
    releases: function (source) {
      return [
        { target: 'v1.0.0', version: '1.0.0' },
        { target: 'v1.0.1', version: '1.0.1' }
      ]
    },

    // Fetch method should download package and extract it to temporary directory
    // You can use npm's tmp package to create temporary directories
    //
    // The parameters of this function and return object are described below.
    fetch: function (endpoint, cached) {
      var tempDir = tmp.dirSync();

      // if cached version of package exists, re-use it
      if (cached) {
        return;
      }

      // ... download package to tempDir

      return {
        tempPath: tempDir.name,
        removeIgnores: true
      }
    }
  }
}
{% endhighlight %}

## Custom Resolver API

### Factory

Parameters:

  * `options`: Object
    * `config`: Object - bower's [config](/docs/config/) object
    * `logger`: Logger - bower's [logger](https://github.com/bower/logger)

Returns: Instance of resolver with following methods:

  * `match` - required
  * `locate` - optional
  * `releases` - optional
  * `fetch` - required if `locate` method is not implemented

API for these methods is described in detail below.

### Match

Parameters:

  * `source` - source from bower.json, like `git://github.com/jquery/jquery.git`

Returns:

  * Boolean - tells whether resolver supports given source

If this method returns truthy value, bower tries to call `locate`, `fetch` or `releases` method of this object. Method can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result object.

### Locate

Allows to implement simplified registry.

Parameters:

  * `source` - source from bower.json, like `jquery/jquery`

Returns:

  * String - resolved source, like `git://github.com/jquery/jquery.git`

Method can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result object.

### Releases

Returns available releases for given source (like list of jQuery verisons)

Parameters:

  * `source`: String - source from bower.json, like `git://github.com/jquery/jquery.git`

Returns:

  * Array of releases (objects):
    * `target`: String - unique target id for release (usually tag name)
    * `version`: String - semantic version for the target above

Method can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result object.

Bower selects one matching release from the array returned and passes its `target` to fetch method via `endpoint.target` field.

### Fetch

Downloads given endpoint and returns path to temporary directory.

Parameters:

  * `endpoint`: Object - endpoint for the resource to download
    * `name`: String - name of resource (like `jquery`)
    * `source`: String - where to download resource from (like `git://github.com/jquery/jquery.git`)
    * `target`: String - the version or release of resource to download (like `1.0.0`)

  * `cached`: Object - contains information about cached resource
    * `endpoint`: Object - endpoint of cached resource (the same format as above)
    * `release`: String - release of cached resource
    * `releases`: Array of Object - result of `releases` method
    * `version`: String - present cached resource has been resolved as version (like `1.0.0`)

Returns:

  * `tempPath`: String - path to teporary directory with downloaded resource
  * `removeIgnores`: Boolean - tells whether bower should remove files ignores in bower.json. Defaults to true
