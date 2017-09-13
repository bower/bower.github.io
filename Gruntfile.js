const saveLicense = require('uglify-save-license');
module.exports = grunt => {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    cssmin: {
      dist: {
        files: {
          'dist/index2.css': [
            'node_modules/normalize.css/normalize.css',
            'css/plottable.css',
            'css/base.css',
            'css/masthead.css',
            'css/modules.css',
            'css/blog-post.css',
            'css/medias.css'
          ]
        }
      }
    },
    uglify: {
      dist: {
        options: {
          preserveComments: saveLicense,
          screwIE8: true
        },
        files: {
          'dist/index2.js': [
            'node_modules/d3/d3.min.js',
            'node_modules/es6-promise/dist/es6-promise.min.js',
            'node_modules/whatwg-fetch/fetch.js',
            'node_modules/mustache/mustache.min.js',
            'node_modules/mark.js/dist/mark.min.js',
            'node_modules/lodash/lodash.min.js',
            'js/plottable.js',
            'js/index.js'
          ]
        }
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [{
            // it's necessary to remove "use strict"; as d3.js otherwise throws
            // an error. It uses `this.document` and `this` doesn't
            // reference to the global object in strict mode
            match: /"use strict";/g,
            replacement: ''
          }]
        },
        files: [{
          src: ['dist/index2.js'],
          dest: 'dist/index2.js'
        }]
      }
    }
  });

  grunt.registerTask('default', [
    'uglify',
    'cssmin',
    'replace'
  ]);

};
