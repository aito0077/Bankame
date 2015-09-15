/*
 * http://gruntjs.com/
 */

'use strict';
module.exports = function(grunt) {

  grunt.initConfig({

  stylus: {
    compile: {
      options: {
        compress: false,
        paths: ['stylus'],
        urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
        use: [
          require('nib'),
          require('jeet'),
          require('rupture')
        ]
      },
      import: [
        'nib','jeet'
      ],
      files: [ {
        cwd: "./",
        src: "[^_]*.styl",
        dest: "./",
        expand: true,
        ext: ".css"
      } ]
    }
  },

  watch: {
    css: {
      files: ['*.styl', '**/*.styl'],
      tasks: ['stylus'],
      options: {
        debounceDelay: 250
      }
    }
  }

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['stylus']);

};
