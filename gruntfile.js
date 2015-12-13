/* jshint node:true */

module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);


	/**
	 * Grunt config
	 */
	grunt.initConfig({
		settings: {
			assets: 'src',
			prototype: 'dev'
		},

		/***************************
		 * Connect
		 ***************************/
		connect: {
			options: {
				livereload: 35729
			},
			livereload: {
				options: {
					port: 9000,
					hostname: '*',
					base: '<%= settings.prototype %>'
				}
			}
		},

		/***************************
		 * Watch
		 ***************************/
		watch: {
			options: {
				livereload: '<%= connect.options.livereload %>'
			},
			html: {
				files: ['<%= settings.prototype %>/index.html']
			},
			sass: {
				files: ['<%= settings.assets %>/sass/**/*.scss'],
				tasks: ['sass']
			},
			scripts: {
				files: ['<%= settings.assets %>/js/**/*.js', '<%= settings.assets %>/js/**/*.jsx', '!<%= settings.assets %>/js/bundle.js'],
				// tasks: ['browserify:dev']
			},
			assets: {
				files: ['<%= settings.assets %>/assets/**/*'],
			}
		},


		/***************************
		 * Sass
		 ***************************/
		sass: {
			options: {
				debug: true
			},
			dev: {
				files: [{
					src: ['<%= settings.assets %>/sass/main.scss'],
					dest: '<%= settings.prototype %>/css/main.css'
				}]
			},
			dist: {
				files: [{
					src: ['<%= settings.assets %>/sass/main.scss'],
					dest: '<%= settings.assets %>/css/main.css'
				}]
			}
		},


		/***************************
		 * Browserify
		 ***************************/
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				plugin: [
				],
				transform: [
					['babelify', {
						presets: ['react', 'es2015']
					}]
				]
			},
			dev: {
				options: {
					watch: true
				},
				files: [{
					src: ['<%= settings.assets %>/js/main.js'],
					dest: '<%= settings.prototype %>/js/bundle.js'
				}]
			},
			dist: {
				options: {
					/*alias: {
						'Api': '<%= settings.assets %>/js/api/Api.js'
					}*/
				},
				files: [{
					src: ['<%= settings.assets %>/js/main.js'],
					dest: '<%= settings.assets %>/js/bundle.js'
				}]
			}
		}
	});


	//
	// Compile dev
	//
	grunt.registerTask('dev', [
		'sass:dev',
		'browserify:dev'
	]);

	// 
	// Compile dist
	// VS and Azure
	// 
	grunt.registerTask('dist', [
		'sass:dist',
		'browserify:dist'
	]);

	//
	// Server
	//
	grunt.registerTask('server', [
		'connect',
		'dev',
		'watch'
	]);

	//
	// Default
	//
	grunt.registerTask('default', 'server');
};