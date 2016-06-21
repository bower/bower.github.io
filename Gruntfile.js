var request = require('request');

module.exports = function( grunt ) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    concat: {
      css: {
        src: [
          'node_modules/normalize.css/normalize.css',
          'css/plottable.css',
          'css/base.css',
          'css/masthead.css',
          'css/modules.css',
          'css/blog-post.css',
          'css/medias.css'
        ],
        dest: 'dist/index.css'
      },
      js: {
        src: [
          'node_modules/d3/d3.js',
          'node_modules/whatwg-fetch/fetch.js',
          'node_modules/mustache/mustache.js',
          'node_modules/lodash/lodash.js',
          'node_modules/mark.js/dist/mark.js',
          'js/plottable.js',
          'js/index.js'
        ],
        dest: 'dist/index.js'
      }
    }
  });

  grunt.registerTask( 'default', [
    'concat'
  ]);

};
