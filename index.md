---
title: Bower
layout: default
---

Web sites are made of lots of things -- frameworks, libraries, assets, utlities, and rainbows. Bower manages all these things for you.

## Install Bower

Bower is a command line utility. Install it with npm.

    npm install -g bower

Bower has a couple requirements.

+ [Node and npm](http://nodejs.org/)
+ [Git](http://git-scm.org)

## Install packages

Bower fetches and installs packages from all over, taking care of hunting, finding, downloading, and saving the stuff you're looking for.

    bower install <package>
    # for example
    bower install normalize.css

Where `<package>` can be any one of the following:

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

### Install package versions

Some packages have versions. Specify a version to fetch a specific release and lock the
package to that version.

    bower install <package>#<version>
    # for example
    bower install normalize.css#3.0

A version can be

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
    <td><code>#&lt;revision&gt;</code></td>
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
