module.exports = function(grunt) {

  //Variables que representan aspectos de la estructura de la aplicación
  var WIREDEP_TEST_DEST    = 'karma.conf.js',

      JAVASCRIPT_ARRAY_SRC = ['src/**/*.js'],

      COVERAGE_URL = 'http://localhost:9001',
      COVERAGE_BASE = './test/coverage/report-html',

      FILES_FOR_WATCH = {
                          'JS'    : [ 'src/**/*.js','test/**/*.js'],
                          'GRUNT' : [ 'gruntfile.js' ]
                        },

      TASKS_WHEN_FILES_CHANGE = {
                                  'JS'    : [ 'shell:test' ],
                                  'GRUNT' : [ 'shell:test' ],
                                },
     
      // Tasks
      DEFAULT_TASKS        = [ 'wiredep',
                               'shell:test',
                               'watch'],

      COVERAGE_TASKS = [  'wiredep',
                          'shell:test',
                          'open:coverage',
                          'connect:coverage',
                          'watch'];

  //Cargar paquetes de grunt
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  //Tareas de grunt
  grunt.registerTask('default', DEFAULT_TASKS);
  grunt.registerTask('coverage', COVERAGE_TASKS);


  //Configuracion de tareas
  grunt.initConfig({
    wiredep: {

      test: {
        devDependencies: true,
        src: WIREDEP_TEST_DEST,
        ignorePath:  /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },
    shell: {
      test: {
        command: 'karma start --single-run'
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: '.',
          open: false
        }
      },
      coverage: {
        options: {
          keepalive: true,
          port: 9001,
          base: COVERAGE_BASE ,
          open: false
        }
      }
    },
    watch: {

      js: {
        files: FILES_FOR_WATCH.JS,
        options: {livereload:true},
        tasks: TASKS_WHEN_FILES_CHANGE.JS
      },
      grunt: {
        files: FILES_FOR_WATCH.GRUNT,
        options: {livereload:true},
        tasks: TASKS_WHEN_FILES_CHANGE.GRUNT
      }
    },
    open: {
      coverage: {
        options: {delay: 1000},
        url: COVERAGE_URL,
        app: function() {
          return process.platform === "linux"? 'Chromium' : 'Google Chrome';
        }
      }
    },
  });
};