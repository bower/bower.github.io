# bower.io

Documentation for [Bower](https://bower.io)

The site is built with [Jekyll](http://jekyllrb.com) 2.x and served with GitHub Pages.

``` bash
# install npm packages
npm install
# run any tasks
grunt
# install jekyll (You may need sudo here)
gem install jekyll
gem install jekyll-paginate
# serve site to view locally
jekyll serve
```

### Docker support

You can build a docker image to serve the site instead of installing Jekyll in
your development environment

``` bash
# build the image
docker build -t bower-io .
# install the npm packages
docker run -t -v $(pwd):/opt/code:rw --rm bower-io npm install
# run any tasks
docker run -t -v $(pwd):/opt/code:rw --rm bower-io grunt
```

You can run the `jekyll server` with the next command:

``` bash
docker run --rm -ti -p 4000:4000 -v $(pwd):/opt/code:rw bower-io jekyll serve --host 0.0.0.0
```

You can access the server via http://127.0.0.1:4000

## Voice

This site has two main audiences:

1. New users who are using Bower for the first time
2. Returning users who are learning more and searching for packages

Focus on clarity and brevity. Be direct. Help users find their solutions fast. Refer to [CONTRIBUTING.md](https://github.com/bower/bower.github.io/blob/master/CONTRIBUTING.md) for more information.
