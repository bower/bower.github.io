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

## Specification

Detailed specification of `bower.json` file can be found in [bower/spec](https://github.com/bower/spec/blob/master/json.md) repository.

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
* There **must** be a valid `bower.json` in the project's root directory.
* Your package should use [semver](http://semver.org/) Git tags. The `v` prefix is allowed.
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

You can unregister packages with [`bower unregister`](/docs/api/#unregister). You first need to authenticate with GitHub with [`bower login`](/docs/api/#login) to confirm you are a contributor to the package repo.

{% highlight bash %}
bower login
# enter username and password
? Username:
? Password:
# unregister packages after successful login
bower unregister <package>
{% endhighlight %}

You'll likely want to [`bower cache clean`](/docs/api#cache-clean) after your change. Please remember it is generally considered bad behavior to remove versions of a library that others are depending on. Think twice :) If the above doesn't work for you, you can [request a package be unregistered manually](https://github.com/bower/bower/issues/120).
