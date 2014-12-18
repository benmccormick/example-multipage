var rjs = require('requirejs');
var _ = require('lodash');
var del = require('del');
var chokidar = require('chokidar');

var rjs_config =
{
    appDir: 'www',
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    },
    dir: 'www-built',
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: '../common',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: ['jquery',
                      'app/lib',
                      'app/controller/Base',
                      'app/model/Base'
            ]
        },

        //Now set up a build layer for each page, but exclude
        //the common one. "exclude" will exclude
        //the nested, built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //"include" the appropriate "app/main*" module since by default
        //it will not get added to the build since it is loaded by a nested
        //require in the page*.js files.
        {
            //module names are relative to baseUrl/paths config
            name: '../page1',
            include: ['app/main1'],
            exclude: ['../common']
        },

        {
            //module names are relative to baseUrl
            name: '../page2',
            include: ['app/main2'],
            exclude: ['../common']
        }

    ]
};




function optimize() {
    var cb = function() {};
    del(['www-built'],function(){
        var start = Date.now();
        rjs.optimize(_.extend({},rjs_config), function(buildResponse){
            var end = Date.now();
            var time = start-end;
            console.log('optimized in ' + time + ' ms.');
        }, function(e){
            console.log(e);
        });
    });
}



var watcher = chokidar.watch('www/js', {persistent:true});
watcher.on('ready', function() {
    console.info('Initial scan complete. Ready for changes.');
}) .on('change', function(path){
    console.log(path + ' has been changed');
    optimize();
});
