---
title: API
layout: default
---

## Commands

### cache

{% highlight sh %}
bower cache <command> [<args>]
{% endhighlight %}


Manage bower cache

#### cache clean

{% highlight sh %}
bower cache clean
bower cache clean <name> [<name> ...]
bower cache clean <name>#<version> [<name>#<version> ..]
{% endhighlight %}

Cleans cached packages

#### cache list

{% highlight sh %}
bower cache list
bower cache list <name> [<name> ...]
{% endhighlight %}

Lists cached packages

### help

{% highlight sh %}
bower help <command>
{% endhighlight %}

Display help information about Bower

### home

{% highlight sh %}
bower home
bower home <package>
bower home <package>#<version>
{% endhighlight %}

Opens a package homepage into your favorite browser.

If no `<package>` is passed, opens the homepage of the local package.

### info

{% highlight sh %}
bower info <package>
bower info <package> [<property>]
bower info <package>#<version> [<property>]
{% endhighlight %}

Displays overall information of a package or of a particular version.

### init

{% highlight sh %}
bower init
{% endhighlight %}

Interactively create a bower.json file

### install

{% highlight sh %}
bower install [<options>]
bower install <endpoint> [<endpoint> ..] [<options>]
{% endhighlight %}

Installs the project dependencies or a specific set of endpoints.

Endpoints can have multiple forms:

* `<source>`
* `<source>#<target>`
* `<name>=<source>#<target>`

Where:

* `<source>` is a package URL, physical location or registry name
* `<target>` is a valid range, commit, branch, etc.
* `<name>` is the name it should have locally.

#### install options

* `-F`, `--force-latest`: Force latest version on conflict
* `-p`, `--production`: Do not install project devDependencies
* `-S`, `--save`: Save installed packages into the project's bower.json dependencies
* `-D`, `--save-dev`: Save installed packages into the project's bower.json devDependencies

### link

{% highlight sh %}
bower link
bower link <name> [<local name>]
{% endhighlight %}

The link functionality allows developers to easily test their packages. Linking is a two-step process.

Using 'bower link' in a project folder will create a global link. Then, in some other package, `bower link <name>` will create a link in the components folder pointing to the previously created link.

This allows to easily test a package because changes will be reflected immediately. When the link is no longer necessary, simply remove it with `bower uninstall <name>`.

### list

{% highlight sh %}
bower list [<options>]
{% endhighlight %}

List local packages and possible updates.

#### list options

* `-p`, `--paths`: Generates a simple JSON source mapping
* `-r`, `--relative`: Make paths relative to the directory config property, which defaults to bower_components

### lookup

{% highlight sh %}
bower lookup <name>
{% endhighlight %}

Look up a package URL by name

### prune

{% highlight sh %}
bower prune
{% endhighlight %}

Uninstalls local extraneous packages

### register

{% highlight sh %}
bower register <name> <url>
{% endhighlight %}

Register a package

### search

{% highlight sh %}
bower search
bower search <name>
{% endhighlight %}

Finds all packages or a specific package.

### update

{% highlight sh %}
bower update <name> [<name> ..] [<options>]
{% endhighlight %}

Updates installed packages to their newest version according to bower.json.

#### update options

* `-F`, `--force-latest`: Force latest version on conflict
* `-p`, `--production`: Do not install project devDependencies

### uninstall

{% highlight sh %}
bower uninstall <name> [<name> ..] [<options>]
{% endhighlight %}

Uninstalls a package locally from your bower_components directory

#### uninstall options

* `-S`, `--save`: Save installed packages into the project's bower.json dependencies
* `-D`, `--save-dev`: Save installed packages into the project's bower.json devDependencies

### version

{% highlight sh %}
bower version [<newversion> | major | minor | patch]
{% endhighlight %}

Run this in a package directory to bump the version and write the new data back to the bower.json file.

The newversion argument should be a valid semver string, or a valid second argument to semver.inc (one of "build", "patch", "minor", or "major"). In the second case, the existing version will be incremented by 1 in the specified field.

If run in a git repo, it will also create a version commit and tag, and fail if the repo is not clean.

#### version options

* `-m`, `--message`: Custom git commit and tag message

If supplied with `--message` (shorthand: `-m`) config option, bower will use it as a commit message when creating a version commit. If the message config contains %s then that will be replaced with the resulting version number. For example:

{% highlight sh %}
bower version patch -m "Upgrade to %s for reasons"
{% endhighlight %}
