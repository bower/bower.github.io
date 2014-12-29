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
    cssmin: {
      target: {
        files: {
          'css/styles.min.css': ['css/styles.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask( 'default', [
    'concat',
    'cssmin'
  ]);

};
