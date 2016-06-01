var request = require('request');

module.exports = function( grunt ) {

  grunt.initConfig({
    concat: {
      // build styles.css
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
        dest: 'css/styles.css'
      },
      js: {
        src: [
          'node_modules/d3/d3.js',
          'node_modules/whatwg-fetch/fetch.js',
          'js/plottable.js',
          'js/scripts.js'
        ],
        dest: 'js/scripts.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'latest-release',
    'updates index.md with latest release from GitHub API',
    function() {
      var done = this.async();
      var url = 'https://api.github.com/repos/bower/bower/releases/latest';
      var options = {
        headers: {
          'User-Agent': 'bower'
        }
      };
      request( url, options, function( error, response, body ) {
        if ( error ) {
          grunt.log.error( 'Request error: ', error );
          done();
          return;
        }
        if ( response.statusCode != 200 ) {
          grunt.log.error( 'Request error', response.statusCode + '.', response.body );
          done();
          return;
        }
        var data = JSON.parse( body );
        var releaseContent = '\nLatest release: [**' + data.tag_name + '**](' +
          data.html_url + ')\n';

        var indexContents = grunt.file.read('index.md');
        indexContents = indexContents.replace( /\nLatest release\:.+\n/i, releaseContent );
        grunt.file.write( 'index.md', indexContents );
        grunt.log.write('Updated latest release to ' + data.tag_name );
        done();
      });
    }
  );

  grunt.registerTask( 'default', [
    'concat',
    'latest-release'
  ]);

};
