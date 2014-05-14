---
title: API
layout: default
---

## Commands

{% highlight sh %}

{% endhighlight %}


### cache

{% highlight sh %}
bower cache <command> [<args>] [<options>]
{% endhighlight %}


Manage bower cache

#### cache clean

{% highlight sh %}
bower cache clean [<options>]
bower cache clean <name> [<name> ...] [<options>]
bower cache clean <name>#<version> [<name>#<version> ..] [<options>]
{% endhighlight %}

Cleans cached packages

#### cache list

{% highlight sh %}
bower cache list [<options>]
bower cache list <name> [<name> ...] [<options>]
{% endhighlight %}

Lists cached packages

### help

{% highlight sh %}
bower help <command>
{% endhighlight %}

Display help information about Bower

### home

{% highlight sh %}
bower home [<options>]
bower home <package> [<options>]
bower home <package>#<version> [<options>]
{% endhighlight %}

Opens a package homepage into your favorite browser.

If no `<package>` is passed, opens the homepage of the local package.

### info

{% highlight sh %}
bower info <package> [<options>]
bower info <package> [<property>] [<options>]
bower info <package>#<version> [<property>] [<options>]
{% endhighlight %}

Displays overall information of a package or of a particular version.

### init

{% highlight sh %}
bower init [<options>]
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

Symlink a package folder

### list

List local packages

### lookup

Look up a package URL by name

### prune

Removes local extraneous packages

### register

Register a package

### search

Search for a package by name

### update

Update a local package

### uninstall

Remove a local package

### version

Bump a package version
