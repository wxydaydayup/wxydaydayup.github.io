var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "G:\Typroa\Typora\Typora.exe" ' + data.path);
});