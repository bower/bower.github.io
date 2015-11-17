---
title: Bower
layout: default
is_home: true
---

<p class="lead">Web sites are made of lots of things &mdash; frameworks, libraries, assets, utilities, and rainbows. Bower manages all these things for you.</p>

Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you're looking for. Bower keeps track of these packages in a manifest file, [`bower.json`](/docs/creating-packages/#bowerjson). How you use packages is up to you. Bower provides hooks to facilitate using packages in your [tools and workflows](/docs/tools).

Bower is optimized for the front-end. Bower uses a flat dependency tree, requiring only one version for each package, reducing page load to a minimum.

## Install Bower

Bower is a command line utility. Install it with npm.

Bower requires [node, npm](http://nodejs.org/) and [git](http://git-scm.org).

For troubleshooting installation on different platforms, read the [troubleshooting](https://github.com/bower/bower/wiki/Troubleshooting) wiki page.

## Getting started

### Install packages

Install packages with [`bower install`](/docs/api#install). Bower installs packages to `bower_components/`.

{% highlight bash %}
$ bower install <package>
{% endhighlight %}

A package can be a GitHub shorthand, a Git endpoint, a URL, and more. Read more about [`bower install`](/docs/api/#install).

{% highlight bash %}
# registered package
$ bower install jquery
# GitHub shorthand
$ bower install desandro/masonry
# Git endpoint
$ bower install git://github.com/user/package.git
# URL
$ bower install http://example.com/script.js
{% endhighlight %}

### Search packages

[Search Bower packages](http://bower.io/search) and find the registered package names for your favorite projects.

### Save packages

Save your packages to [`bower.json` with `bower init`](/docs/creating-packages/#bowerjson).

### Use packages

How you use packages is up to you. We recommend you use Bower together with [Grunt, RequireJS, Yeoman, and lots of other tools](/docs/tools/) or build your own workflow with [the API](/docs/api/). You can also use the installed packages directly, like this, in the case of `jquery`:

{% highlight html %}
<script src="bower_components/jquery/dist/jquery.min.js"></script>
{% endhighlight %}

## Twitter updates from [@bower](https://twitter.com/bower)

<a class="twitter-timeline" href="https://twitter.com/bower" data-widget-id="480377291369754625">Tweets by @bower</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
