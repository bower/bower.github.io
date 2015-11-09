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
* `bower_storage__cache` is evaluated as `storage.cache`

Example of valid enviroment variables with Array convention:

* `export bower_registry__search="[[http://localhost:8080(,)http://bower.herokuapp.com]]"; bower install`


## .bowerrc specification

Detailed description of available configuration variables can be found in [bower/spec](https://github.com/bower/spec/blob/master/config.md) repository.
