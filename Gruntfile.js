module.exports = function( grunt ) {

  grunt.initConfig({
    cssmin: {
      options: {
        sourceMap: true
      },
      files: {
        src: [
          'bower_components/normalize.css/normalize.css',
          'css/base.css',
          'css/masthead.css',
          'css/modules.css'
        ],
        dest: 'css/styles.min.css'
      }
    },
    uglify: {
      target: {
        files: {
          'js/scripts.min.js': ['js/scripts.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'default', [
    'cssmin',
    'uglify'
  ]);

};
