module.exports = function( grunt ) {

  grunt.initConfig({
    concat: {
      // build styles.css
      css: {
        src: [
          'bower_components/normalize.css/normalize.css',
          'css/base.css',
          'css/masthead.css',
          'css/modules.css'
        ],
        dest: 'css/styles.css'
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'default', [
    'concat',
    'uglify'
  ]);

};
