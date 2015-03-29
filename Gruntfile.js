module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            all: {
                files: ['style/scss/*.scss', 'style/scss/**/*.scss', 'html/theme.html', 'script/*.js'],
                tasks: ['clean', 'sass', 'cssmin', 'concat', 'uglify', 'htmlbuild'],
                options: {
                    spawn: false
                }
            }
        },

        clean: {
            mincss: [
                'style/css/screen.min.css',
                'style/css/screen.css'
            ]
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'style/css/master.css': 'style/scss/master.scss'
                }
            }
        },

        cssmin: {
            minify: {
              expand: true,
              cwd: 'style/css',
              src: ['*.css', '!*.min.css'],
              dest: 'style/css',
              ext: '.min.css'
            }
        },

        concat: {
            app: {
                src: [
                    'script/master.js'
                ],
                dest: 'script/master.min.js'
            }
        },

        uglify: {
            app: {
                files: {
                    'script/master.min.js': ['script/master.min.js']
                }
            }
        },

        // Builds CSS right into HTML for easy copy/paste testing.
        // Don't use the exported file for production!!
        htmlbuild: {
            dist: {
                src: 'html/theme.html',
                dest: 'html/theme-export.html',
                options: {
                    beautify: false,
                    relative: true,
                    styles: {
                        inline: 'style/css/master.min.css'
                    },
                    scripts: {
                        main: 'script/master.js'
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('default', ['clean', 'sass', 'cssmin', 'concat', 'uglify', 'htmlbuild']);
};
