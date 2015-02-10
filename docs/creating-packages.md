---
title: Creating packages
layout: default
---

## bower.json

Packages are defined by a manifest file `bower.json`. This is similar to Node's `package.json` or Ruby's `Gemfile`.

Interactively create a `bower.json` with [`bower init`](/docs/api#init)

{% highlight bash %}
$ bower init
{% endhighlight %}

The [`bower.json` spec](https://github.com/bower/bower.json-spec) defines several options, including:

* `name` (required): The name of your package; please see [Register](/docs/creating-packages/#register) section for how to name your package.
* `version`: A semantic version number (see [semver](http://semver.org/)).
* `main` _string_ or _array_: The primary acting files necessary to use your package.
* `ignore` _array_: An array of paths not needed in production that you want
  Bower to ignore when installing your package.
* `keywords` _array_ of _string_: (recommended) helps make your package easier to discover
* `dependencies` _hash_: Packages your package depends upon in production.
  Note that you can specify [ranges](https://github.com/isaacs/node-semver#ranges)
  of versions for your dependencies.
* `devDependencies` _hash_: Development dependencies.
* `private` _boolean_: Set to true if you want to keep the package private and
  do not want to register the package in the future.

{% highlight json %}
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "path/to/main.css",
  "ignore": [
    ".jshintrc",
    "**/*.txt"
  ],
  "dependencies": {
    "<name>": "<version>",
    "<name>": "<folder>",
    "<name>": "<package>"
  },
  "devDependencies": {
    "<test-framework-name>": "<version>"
  }
}
{% endhighlight %}

## Maintaining dependencies

Using `bower install <package> --save` will add `<package>` to your project's
bower.json `dependencies` array.

{% highlight bash %}
# install package and add it to bower.json dependencies
$ bower install <package> --save
{% endhighlight %}

Similarly, using `bower install <package> --save-dev` will add `<package>` to your
project's bower.json `devDependencies` array.

{% highlight bash %}
# install package and add it to bower.json devDependencies
$ bower install <package> --save-dev
{% endhighlight %}

## Register

Registering your package allows others to install it with a short name, like `bower install <my-package-name>`.

To register a new package:

* The package name **must** adhere to the [bower.json spec](https://github.com/bower/bower.json-spec#name).
* There **must** be a valid manifest JSON in the current working directory.
* Your package should use [semver](http://semver.org/) Git tags.
* Your package **must** be publically available at a Git endpoint (e.g., GitHub). Remember to push your Git tags!
* For private packages (e.g. GitHub Enterprise), please consider running a private [Bower registry](https://github.com/bower/registry).

Then use [`bower register`](/docs/api#register):

{% highlight bash %}
$ bower register <my-package-name> <git-endpoint>
# for example
$ bower register example git://github.com/user/example.git
{% endhighlight %}

Now anyone can run `bower install <my-package-name>`, and get your library installed. The Bower registry does not have authentication or user management at this point in time. It's on a first come, first served basis.

Bower doesn't support GitHub-style namespacing (`org/repo`), however you are encouraged to namespace related packages with `-`, for example, `angular-` and `paper-`.

Please do not squat on package names. Register your package and claim your name after you have a valid public repo with working code.

For package name transfers, intellectual property and other disputes, please try to resolve with the owner first. If no resolution, please submit a ticket in the [Bower Registry repo](https://github.com/bower/registry) and the Bower Core Team will assist.

### Unregister

Package unregistering will be available via `bower unregister <package>` soon, but for now you can [request a package be unregistered manually](https://github.com/bower/bower/issues/120).
