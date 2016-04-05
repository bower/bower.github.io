---
title: Pluggable Resolvers
layout: docs
permalink: /docs/pluggable-resolvers/
---

<p class="lead">Pluggable resolvers allow you to use resolvers created by 3rd party JavaScript developers — including overriding default resolvers used by Bower.</p>

For example, resolvers can be used for:

* Handling [Mercurial](https://mercurial.selenic.com/) or [Bazaar](http://bazaar.canonical.com/en/) repositories
* Speeding up checkouts of services like [GitLab](https://about.gitlab.com/) or [Bitbucket](https://bitbucket.org/)
* Allowing to use packages from [npm](https://www.npmjs.com/) or [component.io](https://github.com/component/component.github.io)
* Proxying downloads through 3rd party service like [Artifactory](http://www.jfrog.com/artifactory/) or [Nexus Repository](http://www.sonatype.com/nexus-repository-oss)
* Implementing custom private registry (hosted on GitHub?)
* Adding authentication support for private [GitHub Enterprise](https://enterprise.github.com/) instances

Pluggable resolvers were introduced in Bower 1.5. Please make sure your Bower version is correct (`bower --version`).

## Using


A Pluggable Resolver is just an npm package that you install as `devDependency` in the `package.json` of your repository, or install globally with `npm install -g`.

Declare what Pluggable resolvers your project uses by adding entries to the `resolvers` section of [.bowerrc](/docs/config).

{% highlight json %}
{
  "resolvers": [
    "bitbucket-resolver",
    "github-enterprise-resolver"
  ]
}
{% endhighlight %}

Bower tries to use resolvers in the order specified. If no custom resolver matches the source being processed, Bower fallbacks to default resolvers (git, github, filesystem, svn, registry).

You can find the list of available Bower resolvers on [npm website](https://www.npmjs.com/search?q=bower-resolver).

## Creating

As mentioned, custom resolvers are [npm](https://www.npmjs.com/) packages with specific a API described below.

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

If you need something more solid, see this real world example: [Mercurial Resolver](https://github.com/phenomnomnominal/mercurial-bower-resolver){:target="_blank"}.

## Resolver API

### Resolver package

{% highlight javascript %}
var plugResolver = require('pluggable-resolver')

var resolver = plugResolver({
  version: '1.5.0',
  config: {...},
  logger: logger
})
{% endhighlight %}

  * `resolver`: `Resolver` - instance of the resolver.
  * `version`: `String` - Bower's version that instantiates resolver. You can validate it.
  * `config`: `Object` - Bower's [config](/docs/config/). You can ask authors to put extra configuration in it.
  * `logger`: `Object` - Bower's [logger](https://github.com/bower/logger). Use it to output important warnings / information.

`plugResolver()` returns an instance of the resolver with the API described below.

{% highlight javascript %}
resolver.match()
resolver.locate()
resolver.sources()
resolver.fetch()
{% endhighlight %}

### resolver.match()

Tells Bower whether to use or not use this resolver for some source.

{% highlight javascript %}
var isMatched = resolver.match( source )
{% endhighlight %}

  * `source`: `String` - source from bower.json, like `git://github.com/jquery/jquery.git`
  * `isMatched`: `Boolean` - *Returns* a boolean that tells whether resolver can handle given source (either by locating them with `locate` method, or fetching it with `fetch` + optional `releases` method).

`.match()` can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result. It's useful e.g. for filesystem checks.

### resolver.locate()

Allows to implement simplified registry.

{% highlight javascript %}
var locatedSource = resolver.locate( source )
{% endhighlight %}

  * `source`: `String` - source from bower.json, like `jquery/jquery`
  * `locatedSource`: `String` - *Returns* a resolved source string, like `"git://github.com/jquery/jquery.git"`

`.locate()` can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result. It's useful e.g. for remote registry calls.

### resolver.releases()

Bower selects one matching `version` from the result and passes matching `target` field to `fetch` method.

{% highlight javascript %}
var resolvedReleases = resolver.releases( source )
{% endhighlight %}

  * `source`: `String` - source from bower.json, like `git://github.com/jquery/jquery.git`
  * `resolvedReleases`: `Array` - *Returns* available releases for given source (like list of available tags on GitHub)
    * `target`: `String` - unique target id for release (usually tag name)
    * `version`: `String` - semantic version for the target above

`.releases()` can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result.

### resolver.fetch()

Downloads given endpoint and returns path to temporary directory.

{% highlight javascript %}
var fetched = resolver.fetch( endPoint, cached )
{% endhighlight %}

  * `endpoint`: `Object` - endpoint for the resource to download
    * `name`: `String` - name of resource (like `jquery`)
    * `source`: `String` - where to download resource from (like `git://github.com/jquery/jquery.git`)
    * `target`: `String` - the version or release of resource to download (like `v1.0.0`)

  * `cached`: `Object` - contains information about cached resource
    * `endpoint`: `Object` - endpoint of cached resource (the same format as above)
    * `release`: `String` - release of cached resource
    * `releases`: `Array` - the result of `releases` method
    * `version`: `String` - present cached resource has been resolved as version (like `1.0.0`)
    * `resolution`: `String` - the "resolution" returned from previous fetch call for same resource

  * `fetched`: `Object` - *Returned*
    * `tempPath`: `String` - path to teporary directory with downloaded resource
    * `removeIgnores`: `Boolean` - tells whether bower should remove files ignores in bower.json.
    * `resolution`: `Object` - extra object that is saved in `.bower.json` and passed in `cached` field to the next `fetch` call. It can be used e.g. to download resources conditionally, for example by storing e-tag or last-modified time.

`.fetch()` can also return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of the result.

**If `.fetch()` returns `undefined`, then Bower re-uses cached package.**
