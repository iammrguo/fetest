module.exports = function(grunt){
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {
			css: {
				files: [
					'**/*.sass',
					'**/*.scss'
				],
				tasks: ['compass']
			},
			js: {
				files: [
					'js/*.js',
					'Gruntfile.js'
				],
				tasks: ['jshint']
			}
		},
		
		compass: {
			dist: {
				options: {
					sassDir: 'sass',
					cssDir: 'stylesheets',
					outputStyle: 'expanded'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['Gruntfile.js', 'js/*.js']
		}			
	});

	// 加载Grunt插件
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['watch']);
}