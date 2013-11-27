/*
 * ecommon less css grunt脚本
 *
 * 命令行:
 * grunt (默认动作,编译less到css)
 *
 * grunt less (编译less到css)
 *
 * grunt watch (监视模式,文件改变自动编译less到css)
 */
var path = require('path');
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        less: {
            default: {
               files: {'1.less': '2.css'}
            }
        },
        watch: {
            files: ['src/*/*.less'],
            tasks: 'less',
            options : {spawn: false }
        }
    });
    var changedFiles = Object.create(null);
    var onChange = grunt.util._.debounce(function() {
        grunt.config('less.default.files', changedFiles);
        changedFiles = Object.create(null);
    }, 200);
    grunt.event.on('watch', function(action, filepath, target) {
       var output = path.join(path.dirname(filepath), path.basename(filepath, path.extname(filepath)) + '.css');
        // filepath = filepath.replace(/\\/g, "\\\\");
        changedFiles[output] = filepath;
        onChange();
    });
    grunt.registerTask('default', 'less');

   };
