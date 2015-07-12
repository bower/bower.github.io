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

### bower.json example

<pre><code>{
  <a href="#name"><span class="nt">"name"</span>: "blue-leaf"</a>,
  <a href="#version"><span class="nt">"version"</span>: "1.2.3"</a>,
  <a href="#description"><span class="nt">"description"</span>: "Physics-like animations for pretty particles"</a>,
  <a href="#main"><span class="nt">"main"</span>: [
    "js/motion.js",
    "sass/motion.scss"
  ]</a>,
  <a href="#dependencies"><span class="nt">"dependencies"</span>: {
    "get-size": "~1.2.2",
    "eventEmitter": "~4.2.11"
  }</a>,
  <a href="#devdependencies"><span class="nt">"devDependencies"</span>: {
    "qunit": "~1.16.0"
  }</a>,
  <a href="#moduletype"><span class="nt">"moduleType"</span>: [
    "amd",
    "globals",
    "node"
  ]</a>,
  <a href="#keywords"><span class="nt">"keywords"</span>: [
    "motion",
    "physics",
    "particles"
  ]</a>,
  <a href="#authors"><span class="nt">"authors"</span>: [
    "Betty Beta <bbeta@example.com>"
  ]</a>,
  <a href="#license"><span class="nt">"license"</span>: "MIT",</a>
  <a href="#ignore"><span class="nt">"ignore"</span>: [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ]</a>
}</code></pre>


## bower.json specification

### name

`String`

**Required**

The name of the package as stored in the registry.

* Must be unique.
* Should be slug style for simplicity, consistency and compatibility. Example: `unicorn-cake`
* Lowercase, a-z, can contain digits, 0-9, can contain dash or dot but not start/end with them.
* Consecutive dashes or dots not allowed.
* 50 characters or less.

### version

`String`

**Ignored by Bower as git tags are used instead.**

*Intended to be used in the future when Bower gets a real registry where you can publish actual packages, but for now just leave it out.*

The package's semantic version number.

* Must be a [semantic version](http://semver.org) parseable by [node-semver](https://github.com/isaacs/node-semver).
* If publishing a folder, the version must be higher than the version stored in the registry, when republishing.
* Version should only be required if you are not using git tags.

### description

`String`

*Recommended*

Help users identify and search for your package with a brief description. Describe what your package does, rather than what it's made of. Will be displayed in search/lookup results on the CLI and the website that can be used to search for packages. Max 140 characters.

### main

`String` or `Array` of `String`s

*Recommended*

The entry-point files necessary to use your package. Only one file per filetype.

Entry-point files have module exports and may use module imports. While Bower does not directly use `main` files, they are listed with the commands `bower list --json` and `bower list --paths`, so they can be used by build tools.

Let's say your package looks like this:

    package
      js/
        motion.js
        run.js
        walk.js
      sass/
        motion.scss
        run.scss
        walk.scss
      img/
        motion.png
        walk.png
        run.png
      fonts/
        icons.woff2
        icons.woff
      dist/
        movement.js
        movement.min.js
        movement.css
        movement.min.css

`motion.js` has module imports for `run.js` and `walk.js`. `motion.scss` has module imports for `run.scss` and `walk.scss`. `main` would be

{% highlight json %}
"main": [
  "js/motion.js",
  "sass/motion.scss",
]
{% endhighlight %}

Image and font files may be used or referenced within the JS or Sass files, but are not `main` files as they are not entry-points.

* Use source files with module exports and imports over pre-built distribution files.
* Do not include minified files.
* Do not include assets files like images, fonts, audio, or video.
* Filenames should not be versioned (Bad: `package.1.1.0.js`; Good: `package.js`).
* Globs like `js/*.js` are not allowed.

### dependencies

`Object`

Dependencies are specified with a simple hash of package name to a semver compatible identifier or URL.

* Key must be a valid [name](#name).
* Value must be a valid [version](#version), a Git URL, or a URL (inc. tarball and zipball).
* Git URLs can be restricted to a reference (revision SHA, branch, or tag) by appending it after a hash, e.g. `https://github.com/owner/package.git#branch`.
* Value can be an owner/package shorthand, i.e. owner/package. By default, the shorthand resolves to GitHub -> git://github.com/{{owner}}/{{package}}.git. This may be changed in `.bowerrc` [shorthand_resolver](http://bower.io/docs/config/#shorthand-resolver).
* Local paths may be used as values for local development, but they will be disallowed when registering.

### devDependencies

`Object`

Same rules as `dependencies`.

Dependencies that are only needed for development of the package, e.g., test framework or building documentation.

### moduleType

`String` or `Array` of `String`s

The type of module defined in the `main` JavaScript file. Can be one or an array of the following strings:

+ `globals`: JavaScript module that adds to global namespace, using `window.namespace` or `this.namespace` syntax
+ `amd`: JavaScript module compatible with AMD, like [RequireJS](http://requirejs.org/), using `define()` syntax
+ `node`: JavaScript module compatible with [node](https://nodejs.org/) and [CommonJS](https://nodejs.org/docs/latest/api/modules.html) using `module.exports` syntax
+ `es6`: JavaScript module compatible with [ECMAScript 6 modules](http://www.2ality.com/2014/09/es6-modules-final.html), using `export` and `import` syntax
+ `yui`: JavaScript module compatible with [YUI Modules](http://yuilibrary.com/yui/docs/yui/create.html), using `YUI.add()` syntax

### keywords

`Array` of `String`s

*Recommended*

Same format requirements as [name](#name).

Used for search by keyword. Helps make your package easier to discover without people needing to know its name.

### authors

`Array` of (`String` or `Object`)

A list of people that authored the contents of the package.

Using `String`s:

{% highlight json %}
"authors": [
  "Betty Beta",
  "Betty Beta <bbeta@example.com>",
  "Betty Beta <bbeta@example.com> (http://example.com)"
]
{% endhighlight %}

or using `Object`s:

{% highlight json %}
"authors": [
  { "name": "Betty Beta" },
  { "name": "Betty Beta", "email": "bbeta@example.com" },
  { "name": "Betty Beta", "email": "bbeta@example.com", "homepage": "http://example.com" }
]
{% endhighlight %}

### homepage

`String`

URL to learn more about the package. Falls back to GitHub project if not specified and it’s a GitHub endpoint.

### repository

`Object`

The repository in which the source code can be found.

{% highlight json %}
"repository": {
  "type": "git",
  "url": "git://github.com/username/project.git"
}
{% endhighlight %}

### license

`String` or `Array` of `String`s

*Recommended* 

[SPDX license identifier](https://spdx.org/licenses/) or path/url to a license.

### ignore

`Array` of `String`s

*Recommended*  

A list of files for Bower to ignore when installing your package.

Note: symbolic links will always be ignored. However `bower.json` will never be ignored.

The ignore rules follow the same rules specified in the [gitignore pattern spec](http://git-scm.com/docs/gitignore).

### resolutions

`Object`

Dependency versions to automatically resolve with if conflicts occur between packages.

Example:

{% highlight json %}
"resolutions": {
  "angular": "1.3.0-beta.16"
}
{% endhighlight %}


### private

`Boolean`

If you set it to `true` it will refuse to publish it. This is a way to prevent accidental publication of private repositories.

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
