---
title: API
layout: docs
permalink: /docs/api/
---


## Commands

Command line reference

* [cache](#cache)
* [help](#help)
* [home](#home)
* [info](#info)
* [init](#init)
* [install](#install)
* [link](#link)
* [list](#list)
* [login](#login)
* [lookup](#lookup)
* [prune](#prune)
* [register](#register)
* [search](#search)
* [update](#update)
* [uninstall](#uninstall)
* [unregister](#unregister)
* [version](#version)

### cache

{% highlight sh %}
$ bower cache <command> [<args>]
{% endhighlight %}


Manage bower cache

#### cache clean

{% highlight sh %}
$ bower cache clean
$ bower cache clean <name> [<name> ...]
$ bower cache clean <name>#<version> [<name>#<version> ..]
{% endhighlight %}

Cleans cached packages

#### cache list

{% highlight sh %}
$ bower cache list
$ bower cache list <name> [<name> ...]
{% endhighlight %}

Lists cached packages

### help

{% highlight sh %}
$ bower help <command>
{% endhighlight %}

Display help information about Bower

### home

{% highlight sh %}
$ bower home
$ bower home <package>
$ bower home <package>#<version>
{% endhighlight %}

Opens a package homepage into your favorite browser.

If no `<package>` is passed, opens the homepage of the local package.

### info

{% highlight sh %}
$ bower info <package>
$ bower info <package> [<property>]
$ bower info <package>#<version> [<property>]
{% endhighlight %}

Displays overall information of a package or of a particular version.

### init

{% highlight sh %}
$ bower init
{% endhighlight %}

Interactively create a bower.json file

### install

{% highlight sh %}
$ bower install [<options>]
$ bower install <endpoint> [<endpoint> ..] [<options>]
{% endhighlight %}

Installs the project dependencies or a specific set of endpoints.

Endpoints can have multiple forms:

* `<package>`
* `<package>#<version>`
* `<name>=<package>#<version>`

Where:

* `<package>` is a package URL, physical location or registry name
* `<version>` is a valid range, commit, branch, etc.
* `<name>` is the name it should have locally.

`<package>` can be any one of the following:

<table>
  <tr>
    <td>Registered package name</td>
    <td>
      <code>jquery</code><br>
      <code>normalize.css</code>
    </td>
  </tr>
  <tr>
    <td>Git endpoint</td>
    <td>
      <code>https://github.com/user/package.git</code><br>
      <code>git@github.com:user/package.git</code>
    </td>
  </tr>
  <tr>
    <td>Git endpoint without .git</td>
    <td>
      <code>git+https://github.com/user/package</code><br>
      <code>git+ssh://git@github.com/user/package</code>
    </td>
  </tr>
  <tr>
    <td>Local folder</td>
    <td><code>my/local/folder/</code></td>
  </tr>
  <tr>
    <td>Public Subversion endpoint</td>
    <td><code>svn+http://package.googlecode.com/svn/</code></td>
  </tr>
  <tr>
    <td>Private Subversion endpoint</td>
    <td>
      <code>svn+ssh://package.googlecode.com/svn/</code><br>
      <code>svn+https://package.googlecode.com/svn/</code>
    </td>
  </tr>
  <tr>
    <td>Shorthand (defaults to GitHub)</td>
    <td><code>user/package</code></td>
  </tr>
  <tr>
    <td>URL</td>
    <td>
      <code>http://example.com/script.js</code><br>
      <code>http://example.com/style.css</code><br>
      <code>http://example.com/package.zip</code> (contents will be extracted)<br>
      <code>http://example.com/package.tar</code> (contents will be extracted)
    </td>
  </tr>
</table>


A version can be:

<table>
  <tr>
    <td>semver version</td>
    <td>
      <code>#1.2.3</code>
    </td>
  </tr>
  <tr>
    <td>version range</td>
    <td>
      <code>#1.2</code><br>
      <code>#~1.2.3</code><br>
      <code>#^1.2.3</code><br>
      <code>#>=1.2.3 &lt;2.0</code><br>
    </td>
  </tr>
  <tr>
    <td>Git tag</td>
    <td><code>#&lt;tag&gt;</code></td>
  </tr>
  <tr>
    <td>Git commit SHA</td>
    <td><code>#&lt;sha&gt;</code></td>
  </tr>
  <tr>
    <td>Git branch</td>
    <td><code>#&lt;branch&gt;</code></td>
  </tr>
  <tr>
    <td>Subversion revision</td>
    <td><code>#&lt;revision&gt;</code></td>
  </tr>
</table>


#### install options

* `-F`, `--force-latest`: Force latest version on conflict
* `-p`, `--production`: Do not install project devDependencies
* `-S`, `--save`: Save installed packages into the project's bower.json dependencies
* `-D`, `--save-dev`: Save installed packages into the project's bower.json devDependencies
* `-E`,` --save-exact`: Configure installed packages with an exact version rather than semver

### link

{% highlight sh %}
$ bower link
$ bower link <name> [<local name>]
{% endhighlight %}

The link functionality allows developers to easily test their packages. Linking is a two-step process.

Using 'bower link' in a project folder will create a global link. Then, in some other package, `bower link <name>` will create a link in the components folder pointing to the previously created link.

This allows you to easily test a package because changes will be reflected immediately. When the link is no longer necessary, simply remove it with `bower uninstall <name>`.

### list

{% highlight sh %}
$ bower list [<options>]
{% endhighlight %}

List local packages and possible updates.

#### list options

* `-p`, `--paths`: Generates a simple JSON source mapping
* `-r`, `--relative`: Make paths relative to the directory config property, which defaults to bower_components

### lookup

{% highlight sh %}
$ bower lookup <name>
{% endhighlight %}

Look up a package URL by name

### login

{% highlight sh %}
$ bower login
{% endhighlight %}

Authenticate with GitHub and store credentials. Required to unregister packages.

#### login options

* `-t`, `--token`: Pass an existing GitHub auth token rather than prompting for username and password

### prune

{% highlight sh %}
$ bower prune
{% endhighlight %}

Uninstalls local extraneous packages

### register

{% highlight sh %}
$ bower register <name> <url>
{% endhighlight %}

Register a package

### search

{% highlight sh %}
$ bower search
$ bower search <name>
{% endhighlight %}

Finds all packages or a specific package.

### update

{% highlight sh %}
$ bower update <name> [<name> ..] [<options>]
{% endhighlight %}

Updates installed packages to their newest version according to bower.json.

#### update options

* `-F`, `--force-latest`: Force latest version on conflict
* `-p`, `--production`: Do not install project devDependencies

### uninstall

{% highlight sh %}
$ bower uninstall <name> [<name> ..] [<options>]
{% endhighlight %}

Uninstalls a package locally from your bower_components directory

#### uninstall options

* `-S`, `--save`: Remove uninstalled packages from the project's bower.json dependencies
* `-D`, `--save-dev`: Remove uninstalled packages from the project's bower.json devDependencies

### unregister

{% highlight sh %}
$ bower unregister <package>
{% endhighlight %}

Unregisters a package.

### version

{% highlight sh %}
$ bower version [<newversion> | major | minor | patch]
{% endhighlight %}

Run this in a package directory to bump the version and write the new data back to the bower.json file.

The newversion argument should be a valid semver string, or a valid second argument to semver.inc (one of "build", "patch", "minor", or "major"). In the second case, the existing version will be incremented by 1 in the specified field.

If run in a git repo, it will also create a version commit and tag, and fail if the repo is not clean.

#### version options

* `-m`, `--message`: Custom git commit and tag message

If supplied with `--message` (shorthand: `-m`) config option, bower will use it as a commit message when creating a version commit. If the message config contains %s then that will be replaced with the resulting version number. For example:

{% highlight sh %}
$ bower version patch -m "Upgrade to %s for reasons"
{% endhighlight %}

## Options

* [force](#force)
* [json](#json)
* [log-level](#log-level)
* [offline](#offline)
* [quiet](#quiet)
* [silent](#silent)
* [verbose](#verbose)
* [allow-root](#allow-root)

### force

{% highlight sh %}
-f, --force
{% endhighlight %}

Makes various commands more forceful

### json

{% highlight sh %}
-j, --json
{% endhighlight %}

Output consumable JSON

### log-level

{% highlight sh %}
-l, --log-level
{% endhighlight %}

What level of logs to report

### offline

{% highlight sh %}
-o, --offline
{% endhighlight %}

Do not use network connection

### quiet

{% highlight sh %}
-q, --quiet
{% endhighlight %}

Only output important information

### silent

{% highlight sh %}
-s, --silent
{% endhighlight %}

Do not output anything, besides errors

### verbose

{% highlight sh %}
-V, --verbose
{% endhighlight %}

Makes output more verbose

### allow-root

{% highlight sh %}
--allow-root
{% endhighlight %}

Allows running commands as root. Bower is a user command, there is no need to execute it with superuser permissions. However, if you still want to run commands with sudo, use `--allow-root` option.

## Consuming a package

You can use [build tools](/docs/tools) to
easily consume Bower packages.

If you use [`bower list --paths`](#list) or `bower list --paths --json`, you will get a simple name-to-path mapping:

{% highlight sh %}
$ bower list --paths
# or
$ bower list --paths --json
{% endhighlight %}

{% highlight json %}
{
  "backbone": "bower_components/backbone/backbone.js",
  "jquery": "bower_components/jquery/dist/jquery.js",
  "underscore": "bower_components/underscore/underscore.js"
}
{% endhighlight %}

Every command supports the [`--json` option](#json) that makes Bower output JSON. Command result is outputted to `stdout` and error/logs to `stderr`.

## Programmatic API

Bower provides a powerful, programmatic API. All commands can be accessed
through the `bower.commands` object.

{% highlight js %}
var bower = require('bower');

bower.commands
.install(['jquery'], { save: true }, { /* custom config */ })
.on('end', function (installed) {
    console.log(installed);
});

bower.commands
.search('jquery', {})
.on('end', function (results) {
    console.log(results);
});
{% endhighlight %}

Commands emit four types of events: `log`, `prompt`, `end`, `error`.

* `log` is emitted to report the state/progress of the command.
* `prompt` is emitted whenever the user needs to be prompted.
* `error` will only be emitted if something goes wrong.
* `end` is emitted when the command successfully ends.

For a better idea of how this works, you may want to check out [our bin
file](https://github.com/bower/bower/blob/master/bin/bower).

When using Bower programmatically, prompting is disabled by default. You can enable it when calling commands with `interactive: true` in the config.
This requires you to listen for the `prompt` event and handle the prompting yourself. The easiest way is to use the [inquirer](https://npmjs.org/package/inquirer) npm module like so:

{% highlight js %}
var inquirer =  require('inquirer');

bower.commands
.install(['jquery'], { save: true }, { interactive: true })
// ..
.on('prompt', function (prompts, callback) {
    inquirer.prompt(prompts, callback);
});
{% endhighlight %}

## Running on a continuous integration server

Bower will skip some interactive and analytics operations if it finds a `CI` environmental variable set to `true`. You will find that the `CI` variable is already set for you on many continuous integration servers, e.g., [CircleCI](https://circleci.com/docs/environment-variables#basics) and [Travis-CI](http://docs.travis-ci.com/user/ci-environment/#Environment-variables).

You may try to set the `CI` variable manually before running your Bower commands. On Mac or Linux, `export CI=true` and on Windows `set CI=true`

If for some reason you are unable to set the `CI` environment variable, you can alternately use the `--config.interactive=false` flag.

{% highlight sh %}
$ bower install --config.interactive=false
{% endhighlight %}

## Non-interactive mode

Bower works by default in interactive mode. There are few ways of disabling it:

- passing `CI=true` in environment
- passing `--config.interactive=false` to Bower command
- attaching a pipe to Bower (e.g. `bower install | cat`)
- redirecting output to file (e.g. `bower install > logs.txt`)
- running Bower through its [Programmatic API](#programmatic-api)

When interactive mode is disabled:

- `bower init` does not work
- `bower register` and `bower unregister` bypass confirmation
- `bower login` fails unless `--token` parameter is provided
- `bower install` fails on resolution conflicts, instead of asking for choice
- `bower uninstall` doesn't ask for confirmation if dependency is to be removed
- Analytics is disabled by default (equivalent to passing `--config.analytics=false`)

## Using local cache

Bower supports installing packages from its local cache -- without an internet connection -- if the packages were installed before.

{% highlight sh %}
$ bower install <package> --offline
{% endhighlight %}

The content of the cache can be listed with [`bower cache list`](#cache-list):

{% highlight sh %}
$ bower cache list
{% endhighlight %}

The cache can be cleaned with [`bower cache clean`](#cache-clean):

{% highlight sh %}
$ bower cache clean
{% endhighlight %}
