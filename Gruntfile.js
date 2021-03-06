/*
 * grunt-mutation-testing
 * 
 *
 * Copyright (c) 2014 Marco Stahl
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  var karmaOptions = {
    configFile: 'test/fixtures/karma-mocha/karma.conf.js'
  };

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    mutationTest: {
      flagAllMutations: {
        options: {
          test: function (done) {
            done(true);
          }
        },
        files: {
          'tmp/flag-all-mutations.txt': ['test/fixtures/mocha/script*.js']
        }
      },
      ignore: {
        options: {
          ignore: require('./.mutation-testing-conf.js').ignore,
          test: function (done) {
            done(true);
          }
        },
        files: {
          'tmp/ignore.txt': ['test/fixtures/mocha/script1.js']
        }
      },
      testIsFailingWithoutMutation: {
        options: {
          test: function (done) {
            done(false);
          }
        },
        files: {
          'tmp/test-is-failing-without-mutation.txt': ['test/fixtures/mocha/script*.js']
//          'LOG': ['test/fixtures/mocha/script*.js']
        }
      },
      flagAllMutationsDefault: {
        options: {
        },
        files: {
          'tmp/flag-all-mutations-default.txt': ['test/fixtures/mocha/script*.js']
        }
      },
      grunt: {
        options: {
          ignore: /^log\(/,
          test: 'grunt mochaTest:fixtures'
        },
        files: {
          'tmp/grunt.txt': ['test/fixtures/mocha/script*.js']
        }
      },
      mocha: {
        options: {
          ignore: /^log\(/,
          discardReplacements: [/^console$/],
          mocha: {
            testFiles: ['test/fixtures/mocha/mocha-test*.js']
          }
        },
        files: {
          'tmp/mocha.txt': ['test/fixtures/mocha/script*.js']
//          'LOG': ['test/fixtures/mocha/script*.js']
        }
      },
      karma: {
        options: {
          discardReplacements: ['console'],
          karma: karmaOptions
        },
        files: {
          'tmp/karma.txt': ['test/fixtures/karma-mocha/script*.js']
//          'LOG': ['test/fixtures/karma-mocha/script*.js']
        }
      },
      attributes: {
        options: {
          mocha: {
            testFiles: ['test/fixtures/mocha/attribute-test.js']
          }
        },
        files: {
          'tmp/attributes.txt': ['test/fixtures/mocha/attribute.js']
//          'LOG': ['test/fixtures/mocha/attribute.js']
        }
      },
      args: {
        options: {
          discardReplacements: /^_$/,
          mocha: {
            testFiles: ['test/fixtures/mocha/arguments-test.js']
          }
        },
        files: {
//          'LOG': ['test/fixtures/mocha/arguments.js']
          'tmp/arguments.txt': ['test/fixtures/mocha/arguments.js']
        }
      },
      array: {
        options: {
          mocha: {
            testFiles: ['test/fixtures/mocha/array-test.js']
          }
        },
        files: {
          'tmp/array.txt': ['test/fixtures/mocha/array.js']
        }
      },
      functionCalls: {
        options: {
          mocha: {
            testFiles: ['test/fixtures/mocha/function-calls-test.js']
          }
        },
        files: {
//          'LOG': ['test/fixtures/mocha/function-calls.js']
          'tmp/function-calls.txt': ['test/fixtures/mocha/function-calls.js']
        }
      },
      literals: {
        options: {
          mocha: {
            testFiles: ['test/fixtures/mocha/literals-test.js']
          }
        },
        files: {
          'tmp/literals.txt': ['test/fixtures/mocha/literals.js']
//          'LOG': ['test/fixtures/mocha/literals.js']
        }
      },

      dontTestInsideNotFailingMutations: {
        options: {
          dontTestInsideNotFailingMutations: true,
          mocha: {
            testFiles: ['test/fixtures/mocha/mocha-test*.js']
          }
        },
        files: {
          'tmp/dont-test-inside-not-failing-mutations.txt': ['test/fixtures/mocha/script*.js']
          //'LOG': ['test/fixtures/mocha/script*.js']
        }
      }

    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*-test.js']
      },
      fixtures: {
        options: {
          reporter: 'spec'
        },
        src: ['test/fixtures/mocha/*-test.js']
      },
      mutations: {
        options: {
          reporter: 'spec'
        },
        src: ['test/mutations-test.js']
      },
      iTest: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*-itest.js']
      },
      iTestSlow: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*-itest-slow.js']
      }
    },

    karma: {
      options: karmaOptions,
      fixtures: {
        singleRun: true
      }
    }
  });


  grunt.loadNpmTasks('grunt-mocha-test');

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('test', [
    'clean',
    'mochaTest:fixtures',
    'mochaTest:mutations',
    'karma',
    'mutationTest:flagAllMutations',
    'mutationTest:ignore',
    'mutationTest:flagAllMutationsDefault',
    'mutationTest:testIsFailingWithoutMutation',
    'mutationTest:dontTestInsideNotFailingMutations',
    'mutationTest:mocha',
    'mutationTest:attributes',
    'mutationTest:args',
    'mutationTest:literals',
    'mutationTest:array',
    'mutationTest:functionCalls',
    'mutationTest:karma',
    'mochaTest:iTest'
  ]);

  grunt.registerTask('test:all', [
    'clean',
    'mochaTest:fixtures',
    'mochaTest:mutations',
    'karma',
    'mutationTest:flagAllMutations',
    'mutationTest:ignore',
    'mutationTest:flagAllMutationsDefault',
    'mutationTest:testIsFailingWithoutMutation',
    'mutationTest:mocha',
    'mutationTest:attributes',
    'mutationTest:array',
    'mutationTest:functionCalls',
    'mutationTest:args',
    'mutationTest:literals',
    'mutationTest:dontTestInsideNotFailingMutations',
    'mutationTest:grunt',
    'mutationTest:karma',
    'mochaTest:iTest',
    'mochaTest:iTestSlow'
  ]);

  grunt.registerTask('test:karma', [
    'jshint',
    'mutationTest:karma'
  ]);

  grunt.registerTask('mocha2', [
    'clean',
    'mutationTest:dontTestInsideNotFailingMutations',
    'mutationTest:mocha',
    'mochaTest:iTest'
  ]);



  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
