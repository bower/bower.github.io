---
title: Creating packages
layout: default
---

## bower.json

Packages are defined by a manifest file `bower.json`. This is similar to Node's `package.json` or Ruby's `Gemfile`.

Interactively create a `bower.json` with [`bower init`](api#init)

{% highlight bash %}
$ bower init
{% endhighlight %}

The [`bower.json` spec](https://github.com/bower/bower.json-spec) defines several options, including:

* `name` (required): The name of your package.
* `version`: A semantic version number (see [semver](http://semver.org/)).
* `main` _string_ or _array_: The primary endpoints of your package.
* `ignore` _array_: An array of paths not needed in production that you want
  Bower to ignore when installing your package.
* `dependencies` _hash_: Packages your package depends upon in production.
  Note that you can specify [ranges](https://github.com/isaacs/node-semver#ranges)
  of versions for your dependencies.
* `devDependencies` _hash_: Development dependencies.
* `private` _boolean_: Set to true if you want to keep the package private and
  do not want to register the package in future.

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


## Register

Registering your package allows others to install it with a short name, like `bower install <my-package-name>`.

    

To register a new package:

* There **must** be a valid manifest JSON in the current working directory.
* Your package should use [semver](http://semver.org/) Git tags.
* Your package **must** be available at a Git endpoint (e.g., GitHub); remember to push your Git tags!

Then use the [register command](api#register):

{% highlight bash %}
$ bower register <my-package-name> <git-endpoint>
# for example
$ bower register example git://github.com/user/example.git
{% endhighlight %}

Now anyone can run `bower install <my-package-name>`, and get your library installed. The Bower registry does not have authentication or user management at this point in time. It's on a first come, first served basis.

### Unregister

Package unregistering will be available via `bower unregister <package>` soon, but for now, you can unregister packages yourself using curl, if the package is hosted on GitHub and you're an owner or collaborator.

{% highlight sh %}
curl -X DELETE "https://bower.herokuapp.com/packages/<package>?access_token=<token>"
{% endhighlight %}

* Where `<package>` is the package name you want to delete and `<token>` is GitHub's Personal Access Token that you can fetch from  [GitHub settings for ](https://github.com/settings/applications)
* A default GitHub Personal Access Token will work -- no permissions necessary
* You need to be an owner or collaborator of the repo and URL needs to be OK.


You'll likely want to [`bower cache clean`](api#cache-clean) after your change. Please remember it is generally considered bad behavior to remove versions of a library that others are depending on. Think twice :) If the above doesn't work for you, you can you can [request a package be unregistered manually](https://github.com/bower/bower/issues/120).
