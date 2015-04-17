---
title: Configuration
layout: default
---

<p class="lead">Bower can be configured using JSON in a .bowerrc file. For example:</p>

{% highlight json %}
{
  "directory": "app/components/",
  "analytics": false,
  "timeout": 120000,
  "registry": {
    "search": [
      "http://localhost:8000",
      "https://bower.herokuapp.com"
    ]
  }
}
{% endhighlight %}

## Placement & Order

The config is obtained by merging multiple configurations by this order of
importance:

* CLI arguments via `--config`
* Environment variables
* Local `.bowerrc `located in the current working directory
* All `.bowerrc `files upwards the directory tree
* `.bowerrc` file located in user's home folder (`~`)
* `.bowerrc` file located in the global folder (`/`)

Example of CLI arguments:

* `--config.endpoint-parser=<parser>`
* `--config.storage.cache=<cache>`

Example of valid environment variables:

* `bower_endpoint_parser` is evaluated as `endpoint-parser`
* `bower_storage_cache` is evaluated as `storage.cache`

## .bowerrc specification

* [analytics](#analytics)
* [cwd](#cwd)
* [directory](#directory)
* [registry](#registry)
* [shorthand-resolver](#shorthand-resolver)
* [proxy](#proxy)
* [https-proxy](#https-proxy)
* [user-agent](#user-agent)
* [timeout](#timeout)
* [strict-ssl](#strict-ssl)
* [ca](#ca)
* [color](#color)
* [storage](#storage)
* [tmp](#tmp)
* [interactive](#interactive)

### analytics

_Boolean_

Bower can collect anonymous usage statistics. This allows the community to improve Bower and publicly display insights into CLI usage and packages at [bower.io/stats](http://bower.io/stats).

Data is tracked using Google Analytics and instrumented via [Insight](https://github.com/yeoman/insight). It is made available to all Bower team members. Tracking is opt-in upon initial usage. If you'd prefer to disable analytics altogether, set `"analytics": false` in your `.bowerrc` file. Details on exactly what's tracked is available [here](https://github.com/yeoman/insight#collected-data).

{% highlight json %}
"analytics": true
{% endhighlight %}

### cwd

_String_

Current working directory - the directory from which bower should run. All relative paths will be calculated
according to this setting.

{% highlight json %}
"cwd": "~/my-project"
{% endhighlight %}

### directory

_String_

The path in which installed components should be saved. If not specified this
defaults to `bower_components`.

{% highlight json %}
"directory": "~/my-project/vendor"
{% endhighlight %}

### registry

_Object_ or _String_

The registry config. Can be an object or a string. If a string is used, all the
property values below will have its value. Defaults to the bower registry URL.

If your organization wishes to maintain a private registry, you may change the
values below.

{% highlight json %}
"registry": "http://localhost:8000"
{% endhighlight %}

#### registry.search

_Array_ or _String_

An array of URLs pointing to read-only Bower registries. A string means only
one. When looking into the registry for an endpoint, Bower will query these
registries by the specified order.

{% highlight json %}
"registry": {
  "search": [
    "http://localhost:8000",
    "https://bower.herokuapp.com"
  ]
}
{% endhighlight %}

#### registry.register

_String_

The URL to use when registering packages.

{% highlight json %}
"registry": {
  "register": "http://localhost:8000"
}
{% endhighlight %}


#### registry.publish

_String_

The URL to use when publishing packages.

{% highlight json %}
"registry": {
  "publish": "http://localhost:8000"
}
{% endhighlight %}

### shorthand-resolver

_String_

Define a custom template for shorthand package names.
Defaults to {% raw %}`git://github.com/{{owner}}/{{package}}.git`{% endraw %}

The `shorthand-resolver` key provides support for defining a custom template
which Bower uses when constructing a URL for a given shorthand. For example, if
a shorthand of `twitter/flight` or `twitter/flight#v1.0.0` is specified in the
package's manifest dependencies, the following data can be referenced from
within the `shorthand-resolver` template:

    owner: "twitter"
    package: "flight"
    shorthand: "twitter/flight"

{% highlight json %}
{% raw %}
"shorthand-resolver": "git://example.com/{{owner}}/components/{{package}}.git"
{% endraw %}
{% endhighlight %}

{% highlight json %}
{% raw %}
"shorthand-resolver": "git://example.com/{{shorthand}}.git"
{% endraw %}
{% endhighlight %}

### proxy

_String_

The proxy to use for http requests.

{% highlight json %}
"proxy":"http://<host>:<port>"
{% endhighlight %}


### https-proxy

_String_

The proxy to use for https requests.

{% highlight json %}
"https-proxy":"http://<host>:<port>"
{% endhighlight %}

### user-agent

_String_

Sets the User-Agent for each request made.
Defaults to: `node/<process.version> <process.platform> <process.arch>`

{% highlight json %}
"user-agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
{% endhighlight %}

### timeout

_Number_

The timeout to be used when making requests in milliseconds, defaults to
`60000` ms.

{% highlight json %}
"timeout": 40000
{% endhighlight %}

### strict-ssl

_Boolean_

Whether or not to do SSL key validation when making requests via https.

{% highlight json %}
"strict-ssl": false
{% endhighlight %}

### ca

_Object_ or _String_

The CA certificates to be used, defaults to null. This is similar to the
registry key, specifying each CA to use for each registry endpoint.

The Certificate Authority signing certificate that is trusted for SSL
connections to the registry.
Set to null to only allow "known" registrars, or to a specific CA cert to trust
only that specific signing authority.

{% highlight json %}
"ca": "/etc/ssl/cert.pem"
{% endhighlight %}

### color

_Boolean_

Enable or disable use of colors in the CLI output. Defaults to true.

{% highlight json %}
"color": true
{% endhighlight %}

### storage

_Object_

Where to store persistent data, such as cache, needed by bower. Defaults to
paths that suit the OS/platform. Valid keys are `packages`, `registry`, `links`,
`completion`.

{% highlight json %}
"storage": {
  "packages" : "~/.bower/packages",
  "registry" : "~/.bower/registry"
}
{% endhighlight %}

### tmp

_String_

Where to store temporary files and folders. Defaults to the system temporary
directory suffixed with /bower.

{% highlight json %}
"tmp": "~/.bower/tmp"
{% endhighlight %}

### interactive

_Boolean_

Makes bower interactive, prompting whenever necessary. Defaults to `null` which
means `auto`.

{% highlight json %}
"interactive": true
{% endhighlight %}
