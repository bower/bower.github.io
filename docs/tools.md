---
title: Tools
layout: docs
permalink: /docs/tools/
---

<p class="lead">Bower is used together with other tools to integrate with all sorts of setups and workflows.</p>

## Grunt

[**grunt-bower-concat**](https://github.com/sapegin/grunt-bower-concat) <br>
Grunt task for automatically concat all installed Bower components.

[**grunt-wiredep**](https://github.com/stephenplusplus/grunt-wiredep) <br>
Inject your Bower components right into your HTML using Grunt.

[**grunt-bower-requirejs**](https://github.com/yeoman/grunt-bower-requirejs) <br>
Automagically wire-up installed Bower components into your RequireJS config. Also available as a [standalone CLI tool](https://github.com/yeoman/bower-requirejs).

[**grunt-bower-task**](https://github.com/yatskevich/grunt-bower-task) <br>
Grunt plugin to automate Bower commands; allow the configuration of the files needed allowing to filter out the minimal in the project.

[**grunt-preen**](https://github.com/BradDenver/grunt-preen) <br>
A Grunt plugin to preen unwanted files and folders from packages installed via Bower.

## Gulp

[**gulp-google-cdn**](https://github.com/sindresorhus/gulp-google-cdn) <br>
Replaces script references with Google CDN ones, based on bower.json

[**main-bower-files**](https://github.com/ck86/main-bower-files) <br>
Iterates through dependencies and returns an array of files defined in the main property of the packages `bower.json`.

[**preen**](https://github.com/braddenver/preen) <br>
A Node.js module to preen unwanted files and folders from packages installed via Bower. Preen can also be used via the CLI.

[**gulp-bower-normalize**](https://github.com/cthrax/gulp-bower-normalize) <br>
A gulp plugin to copy files into a normalized file structure, arranged by package name and asset type.

## Rails & Ruby

[**bower-rails**](https://github.com/rharriso/bower-rails/) <br>
rake tasks for Bower on Rails.

[**d-i/half-pipe**](https://github.com/d-i/half-pipe) <br>
Gem to replace the Rails asset pipeline with a Grunt-based workflow, providing dependencies via Bower.

[**Rails Assets**](https://rails-assets.org/) <br>
Rails Assets is the frictionless proxy between Bundler and Bower.

[**ruby-bower**](https://github.com/kaeff/ruby-bower) <br>
Ruby binding for Bower commands (Uses node/execjs instead of shelling out)

[**spagalloco/bower**](https://github.com/spagalloco/bower) <br>
Bower integration for your Ruby apps (sprockets).

## Java

[**Dandelion**](http://dandelion.github.io/) <br>
Dandelion provides an integration with Bower. All Bower components are scanned and automatically converted into vendor bundles. [See blog post](http://dandelion.github.io/blog/2015/07/26/dandelion-core-1.1.0-releases).

## Apps & IDEs

[**CodeKit**](https://incident57.com/codekit/) <br>
CodeKit is a Mac app that helps you build websites faster and better.

[**Telerik AppBuilder**](http://www.telerik.com/appbuilder) <br>
Build iOS, Android and Windows Phone 8 hybrid apps using a single pure HTML5, CSS and JavaScript codebase. [See blog post](http://blogs.telerik.com/appbuilder/posts/14-07-31/telerik-appbuilder-7-31-14-release-native-emulator-support-bower-package-manager-and-new-project-templates).

[**Webstorm**](https://www.jetbrains.com/webstorm) <br>
With integrated Bower package manager, you’ll be able to search for, install and manage client-side libraries and frameworks for your project with ease, right in the IDE.

[**NetBeans**](https://netbeans.org/) <br>
Netbeans can resolve Bower dependencies for you from within the IDE. [See blog post](https://blogs.oracle.com/geertjan/entry/bower_and_node_js_in)

[**Visual Studio 2015**](https://visualstudio.com/free) <br>
Visual Studio has built-in support for searching, installation and managing of Bower packages. This includes rich auto-completion in `bower.json` to Bower specific commands and UI elements in Solution Explorer.

[**Package Intellisense**](https://visualstudiogallery.msdn.microsoft.com/65748cdb-4087-497e-a394-2e3449c8e61e) for Visual Studio 2013 <br>
NPM and Bower package Intellisense directly in the Visual Studio JSON editor. [See blog post](http://www.hanselman.com/blog/IntroducingGulpGruntBowerAndNpmSupportForVisualStudio.aspx).

## Everything Else

[**alfred-workflows**](https://github.com/willfarrell/alfred-workflows) <br>
A collection of Alfred workflows that includes Bower integration.

[**bowcat**](https://www.npmjs.org/package/bowcat) <br>
npm package. Quickly concatenate your project's bower dependencies. Like grunt-bower-concat but without the weight and complexity of grunt.

[**BowerStatic**](http://bowerstatic.readthedocs.org/) <br>
Serve Bower-managed static resources using Python WSGI

[**Pyramid_BowerStatic**](https://github.com/mrijken/pyramid_bowerstatic) <br>
Use Bower via BowerStatic with the Pyramid framework

[**cakephp-bower**](https://github.com/fahad19/cakephp-bower) <br>
CakePHP Plugin for Bower.

[**kooshy-fe**](https://github.com/aroemen/kooshy-fe) <br>
Integrates a web-based interface for Bower.

[**paulmillr/read-components**](https://github.com/paulmillr/read-components) <br>
reads root bower.json, opens bower.json of all packages and their dependencies and auto-calculates concatenation order.

[**SpBowerBundle**](https://github.com/Spea/SpBowerBundle) <br>
Bower integration with symfony2.

[**stefanbuck/github-linker**](https://github.com/stefanbuck/github-linker) <br>
Google Chrome Extension which links dependencies listed bower.json on GitHub to their project's pages.

[**sublime-bower**](https://github.com/benschwarz/sublime-bower) <br>
A Sublime text-editor plugin for Bower.

[**atom-bower-install**](https://github.com/gdi2290/atom-bower-install) <br>
Automatically install and save any missing bower components being used in the current bower.json file.

[**broccoli-bower**](https://github.com/joliss/broccoli-bower) <br>
Load Bower packages into Broccoli.

[**less-plugin-bower-resolve**](https://github.com/Mercateo/less-plugin-bower-resolve) <br>
Import Less files from Bower packages.

[**requirejs-plugin-bower**](https://github.com/RodneyEbanks/requirejs-plugin-bower) <br>
Requirejs plugin for creating & loading Path/Shim configurations automatically from bower.json dependencies (InBrowser & InBuild)

[**flask-bower**](https://pypi.python.org/pypi/Flask-Bower/) <br>
Flask-Bower is a flask extension to serve bower installed packages - also on [Github](https://github.com/lobeck/flask-bower)

[**brackets-bower**](https://github.com/albertinad/brackets-bower) <br>
Bower extension for Brackets. It lets you manage your application's dependencies: search, install, update, remove and more. Support for bower.json and .bowerrc files.

[**Django-bower**](https://github.com/nvbn/django-bower) <br>
Easy way to use bower with your [Django](https://www.djangoproject.com/) project
