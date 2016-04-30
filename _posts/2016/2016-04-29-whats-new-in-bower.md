---
title: "What’s new in bower"
author: dvidsilva
---

The bower team has been working hard, getting new features in the project and closing
bugs for users and developers. As of 2016–04–05, bower is version 1.7.9.

My favorite one is the option to have `—save` enabled with every download, as
described here [1040](https://github.com/bower/bower/issues/1040), usually when 
I’m adding a bower dependency I’d like it to be saved on the bower.json, 
very rarely I would download a package with no project.

Backwards compatibility is important, so by default this is disabled, to enable
it add the options “save” and/or “save-exact” to your .bowerrc configuration file.


{% highlight json %}
{
  "save": true,
  "save-exact": true,
}
{% endhighlight %}

With save-exact, the version will be persisted to your bower.json, like this:

{% highlight json %}
{
  "angular": "^1.5.3",
  "bootstrap": "3.0.0"
}
{% endhighlight %}

All the new features added this month are:

### 1.7.9–2016–04–05

 - Show warnings for invalid bower.json fields
 - Update bower-json
 - Less strict validation on package name (allow spaces, slashes, and “@”)

### 1.7.8–2016–04–04

 - Don’t ask for git credentials in non-interactive session, fixes #956 #1009
 - Prevent swallowing exceptions with programmatic api, fixes #2187
 - Update graceful-fs to 4.x in all dependences, fixes nodejs/node#5213
 - Resolve pluggable resolvers using cwd and fallback to global modules, fixes #1919
 - Upgrade handlebars to 4.0.5, closes #2195
 - Replace all % chatacters in defined scripts, instead of only first one, fixes #2174
 - Update opn package to fix issues with “bower open” command on Windows
 - Update bower-config
 - Do not interpolate environment variables in script hooks, fixes bower/config#47
 - Update bower-json
 - Validate package name more strictly and allow only latin letters, dots, dashes and underscores
 - Add support for “save” and “save-exact” in .bowerrc, #2161

The whole list of changes can be found [here](https://github.com/bower/bower/blob/master/CHANGELOG.md).
