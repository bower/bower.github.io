---
title: Bower
layout: default
is_home: true
---

<p class="lead">Web sites are made of lots of things &mdash; frameworks, libraries, assets, utilities, and rainbows. Bower manages all these things for you.</p>

Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you're looking for. Bower keeps track of these packages in a manifest file, [`bower.json`](/docs/creating-packages#bowerjson). How you use packages is up to you. Bower provides hooks to facilitate using packages in your [tools and workflows](/docs/tools).

Bower is optimized for the front-end. Bower uses a flat dependency tree, requiring only one version for each package, reducing page load to a minimum.

## Install Bower

Bower is a command line utility. Install it with npm.

{% highlight bash %}
$ npm install -g bower
{% endhighlight %}

Bower requires [Node and npm](http://nodejs.org/) and [Git](http://git-scm.org).

## Install packages

Bower installs packages to `bower_components/`.

{% highlight bash %}
$ bower install <package>
# for example
$ bower install normalize.css
{% endhighlight %}

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

Read more about [`bower install`](/docs/api#install)
