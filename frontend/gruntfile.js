module.exports = function(grunt) {
	// Project configuration.
	var globalConfig = {
		componentRoot:require('./package.json').config.projectPath,
		resourcesRoot:require('./package.json').config.resourcePath
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config:globalConfig,
		//this will install any 3rd party libs installed by bower into the clientlibs libs/bowerlibs directory
		//NOT USED RIGHT NOW -- don't think it's neccessary
		bower: {
		  install: {
		    options: {
		    targetDir: '<%= config.resourcesRoot %><%= pkg.name %>/libs',
		    layout: 'byComponent',
		    install: true,
		    verbose: true,
		    cleanTargetDir: true,
		    cleanBowerDir: false
		    }
		  }
		},
		//this will convert any sass files (including components) into css and put the css in the clientlibs css folder
		sass: {
			options: {
		    	outputStyle: 'compressed',
		    	sourceMap: true,
		    	includePaths:['<%= config.componentRoot %><%= pkg.name %>/components/']
		    },
		  	sitesass: {
				files: [{
				    src: '<%= config.resourcesRoot %><%= pkg.name %>/src/sass/main.scss',
				    dest: '<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/css/main.css'
				}]
			}
		},
		//this will combine and minify any 3rd party scripts and put them in the clientlibs libs/bowerlibs directory
		//just need to specify jquery to load first because a lot of other 3rd party scripts depend on it
		uglify: {
			options: {
  		  		mangle: false,
  		  		sourceMap: true
  		  	},
			compresslibs:{
	  		    files: {
	  		      '<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/js/libs.min.js': [
	  		      '<%= config.resourcesRoot %><%= pkg.name %>/src/libs/jquery.js',
	  		      '<%= config.resourcesRoot %><%= pkg.name %>/src/libs/**/*.js'
	  		      ]
	  		    }
		  	},
		  	compresscomponents:{
	  		    files: {
	  		      '<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/js/components.min.js': [
	  		      '<%= config.componentRoot %><%= pkg.name %>/components/**/*.js'
	  		      ]
	  		    }
		  	},
		  	compressbundle:{
	  		    files: {
	  		      '<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/js/site.min.js': [
	  		      '<%= config.resourcesRoot %><%= pkg.name %>/src/js/**/*.js'
	  		      ]
	  		    }
		  	}
		},
		express:{
	        options: {
	            script: 'server.js',
	            port: 3000
	        },
	        dev: {
	            options: {
	                debug: true
	            }
	        }
		},
		copy: {
		  es6components: {
		    files: [{
		      	expand: true, 
		      	flatten: true, 
		      	src: ['<%= config.componentRoot %><%= pkg.name %>/components/content/**/*.js'], 
		      	dest: '<%= config.resourcesRoot %><%= pkg.name %>/js/components/', 
		      	filter: 'isFile'
		      }]
		  },
		  html5shiv: {
		    src: '<%= config.resourcesRoot %><%= pkg.name %>/src/libs/html5shiv.min.js', 
		    dest: '<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/js/html5shiv.min.js'
		  },
		  images: {
		    files: [{
		    	expand: true,
			    cwd: '<%= config.resourcesRoot %><%= pkg.name %>/src/img/',
			    src: '**',
			    dest: '<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/img/'
		      }]
		  }
		},
		clean: {
			options: {
		      force: true
		    },	
		  	folder: ['<%= config.resourcesRoot %><%= pkg.name %>/js/components/']
		},
		"file-creator": {
			clientlibs: {
		        files: [
		        {
		            file: '<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/css.txt',
		            method: function(fs, fd, done) {
		              fs.writeSync(fd, 'css/main.css');
		              done();
		            }
		        },{
		          	file:'<%= config.resourcesRoot %><%= pkg.name %>/clientlibs/js.txt',
		          	method:function(fs, fd, done) {
			            var curProjName = require('./package.json').name;
			            var resourcePath = require('./package.json').config.resourcePath;

			          	var glob = grunt.file.glob;
			          	var _ = grunt.util._;
						glob(resourcePath + curProjName+'/clientlibs/js/*.js', function (err, files) {
							var widgets = [];
							_.each(files, function(file) {
								widgets.push(file);
							});
							_.each(widgets, function(file, i) {
								fs.writeSync(fd, 'js'+file.slice(file.lastIndexOf('/')) + '\n');
							});
							done();
						});
			        }
		        }]
		    }
		},
		watch: {
		    options: {
	            livereload: true,
	            spawn: false
	        },
	        express: {
	            files: ['server.js'],
	            tasks: ['express:dev']
	        },
	        grunt: {
	            files: ['gruntfile.js'],
	            tasks: ['express:dev']
	        },
	        js: {
	            files: ['<%= config.resourcesRoot %><%= pkg.name %>/src/js/**/*.js', '<%= config.componentRoot %><%= pkg.name %>/components/**/*.js'],
	            tasks: ['uglify:compresscomponents', 'uglify:compressbundle', 'file-creator','express:dev']
	        },
	        sass: {
	            files: ['<%= config.resourcesRoot %><%= pkg.name %>/src/sass/**/*.scss', '<%= config.componentRoot %><%= pkg.name %>/components/**/*.scss'],
	            tasks: ['sass:sitesass','express:dev']
	        },
	        img:{
	        	files:['<%= config.resourcesRoot %><%= pkg.name %>/src/img/**/*.png',
	        	'<%= config.resourcesRoot %><%= pkg.name %>/src/img/**/*.jpg',
	        	'<%= config.resourcesRoot %><%= pkg.name %>/src/img/**/*.gif',
	        	'<%= config.resourcesRoot %><%= pkg.name %>/src/img/**/*.ico'],
	        	tasks:['express:dev']
	        },
	        views: {
	            files: ['<%= config.componentRoot %><%= pkg.name %>/components/**/*.hbs'],
	            tasks:['express:dev']
	        }
		}
	});
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-file-creator');

	//Tasks for local development
	grunt.registerTask('serve', [ 'express:dev', 'watch' ])
	grunt.registerTask('localdev', ['sass', 'uglify:compresslibs', 'uglify:compresscomponents', 'uglify:compressbundle','file-creator','copy:html5shiv','copy:images', 'serve']);

	//default task used for AEM build - includes pulling down any necessary bower resources -- removed for now -->'bower', 
	grunt.registerTask('default', ['sass', 'uglify']);
};