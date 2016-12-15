/*
 * simple-prompt.js: Simple example of using prompt.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */

var curProjName = require('./package.json').name;

var prompt = require('./node_modules/prompt');
var sys = require('util')
var exec = require('child_process').exec;
var replace = require("replace");

// function puts(error, stdout, stderr) { 
// 	console.log(stdout) 
// }
 

var properties = {
  properties: {
    name: {
      description: 'Enter a name for your new project',
      default: 'newproj'
    }
  }
}

//
// Start the prompt
//
prompt.start();

prompt.get(properties, function (err, result) {
	//i know this is callback pyramid but good enough for what i need it for.
  exec("mv ../aem/apps/"+curProjName+" ../aem/apps/"+result.name, function(error, stdout, stderr){
  	exec("mv ../aem/etc/designs/"+curProjName+" ../aem/etc/designs/"+result.name, function(error, stdout, stderr){
	  	replace({
		  regex: curProjName,
		  replacement: result.name,
		  paths: ['./package.json'],
		  recursive: false,
		  silent: true,
		});
		console.log('Project created!');
	  });
  });
});

