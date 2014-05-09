---

title: Bower
layout: default

---

Bower is a package manager for the web. Web sites are made of lots of things: frameworks, libraries, assets, utlities, and rainbows. Bower manages all this stuff for you.

## Installing Bower

Bower depends on [Node](http://nodejs.org/) and [npm](http://npmjs.org/). Install it globally with npm:

    npm install -g bower

Also make sure that [git](http://git-scm.org) is installed as some bower packages require it to be fetched and installed.

## Installing packages and dependencies

### Installing a package

    bower install <package>
    # for example
    bower install normalize.css

Where `<package>` can be any one of the following:

* A name that maps to a package [registered](#) with Bower, e.g, `jquery`.
* A public remote Git endpoint, e.g., `git://github.com/someone/some-package.git`.
* A private Git repository, e.g., `https://github.com/someone/some-package.git`. If the protocol is https, a prompt will ask for the credentials. ssh can also be used, e.g., `git@github.com:someone/some-package.git` and can authenticate with the user's ssh public/private keys.
* A local endpoint, i.e., a folder that's a Git repository.
* A public remote Subversion endpoint, e.g., `svn+http://package.googlecode.com/svn/`.
* A private Subversion repository, e.g., `svn+ssh://package.googlecode.com/svn/` or `svn+https://package.googlecode.com/svn/`.
* A local endpoint, i.e., a folder that's an Subversion repository, e.g., `svn+file:///path/to/svn/`.
* A shorthand endpoint, e.g., `someone/some-package` (defaults to GitHub).
* A URL to a file, including `zip` and `tar` files. Its contents will be extracted.

### Installing a specific version of a package

    bower install <package>#<version>
    # for example
    bower install normalize.css#3.0

Some packages have versions available. Specify a
[semver](http://semver.org/) compatible version to fetch a specific release, and lock the
package to that version. You can also specify a [range](https://github.com/isaacs/node-semver#ranges) of versions.

If you are using a package that is a git endpoint, you may use any tag, commit SHA,
or branch name as a version. For example: `<package>#<sha>`. Using branches is not
recommended because the HEAD does not reference a fixed commit SHA.

If you are using a package that is a subversion endpoint, you may use any tag, revision number,
or branch name as a version. For example: `<package>#<revision>`.

All package contents are installed in the `bower_components` directory by default.
You should **never** directly modify the contents of this directory.

Using `bower list` will show all the packages that are installed locally.

**N.B.** If you aren't authoring a package that is intended to be consumed by
others (e.g., you're building a web app), you should always [check installed
packages into source control](http://addyosmani.com/blog/checking-in-front-end-dependencies/).
