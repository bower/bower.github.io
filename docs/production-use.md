---
title: Production use
layout: default
---

## Running on a continuous integration server

Bower will skip some interactive and analytics operations if it finds a `CI` environmental variable set to `true`. You will find that the `CI` variable is already set for you on many continuous integration servers, e.g., [CircleCI](https://circleci.com/docs/environment-variables#basics) and [Travis-CI](http://docs.travis-ci.com/user/ci-environment/#Environment-variables).

You may try to set the `CI` variable manually before running your Bower commands. On Mac or Linux, `export CI=true` and on Windows `set CI=true`

If for some reason you are unable to set the `CI` environment variable, you can alternately use the `--config.interactive=false` flag.

{% highlight sh %}
$ bower install --config.interactive=false
{% endhighlight %}
