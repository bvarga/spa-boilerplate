var config = require('./config')
  , express = require('express')
  , doT = require('dot')
  , app = express()
  , http = require('http')
  , fs = require('fs')
  , assets = {}
  ;

// read the template file
fs.readFile('./views/main.dot', { encoding: 'utf8' }, function(err,data){
  assets.template = doT.template(data);
});



if (config.release) {
  fs.readdir('./release/js', function(err,files){
    if (err)
      return console.error('error reading assets', err);
    for(var i = 0; i < files.length; i++){
      if ( files[i].match(/^login-/))
        assets.loginjs = '/js/' + files[i]
      else if ( files[i].match(/^home-/))
        assets.homejs = '/js/' + files[i];
    }
  });
  
  fs.readdir('./release/css', function(err,files){
    if (err)
      return console.error('error reading assets', err);
    for(var i = 0; i < files.length; i++){
      if ( files[i].match(/^login-/))
        assets.logincss = '/css/' + files[i]
      else if ( files[i].match(/^home-/))
        assets.homecss = '/css/' + files[i]
      else if ( files[i] == 'logininline.css' )
        assets.logininlinestyle = fs.readFileSync( './release/css/' + files[i], { encoding: 'utf8'})
      else if ( files[i] == 'homeinline.css' )
        assets.homeinlinestyle = fs.readFileSync( './release/css/' + files[i], { encoding: 'utf8'});
    }
  });
  

} else {
  assets.requirejs = '/js/lib/require.js';
  assets.requirejsconfig = '/js/config.js';
  assets.loginjs = '/js/login.js';
  assets.homejs = '/js/home.js';
  assets.logincss = '/css/login.css';
  assets.homecss = '/css/home.css';
  assets.logininlinestyle = '/css/logininline.css';
  assets.homeinlinestyle = '/css/homeinline.css';
}

app.configure(function(){
  app.set('port', config.port);
  app.use(express.static(config.staticPath));
});

app.get( '*',  function( req, res, next ){
  console.log('get', assets);
  res.end(assets.template({
    release: config.release,
    requirejs: !config.release ? assets.requirejs : null,
    requirejsconfig: !config.release ? assets.requirejsconfig : null,
    assetjs: req.user ? assets.homejs : assets.loginjs,
    assetcss: req.user ? assets.homecss : assets.logincss,
    inlinestyle: req.user ? assets.homeinlinestyle : assets.logininlinestyle,
    
    user: req.user ? req.user.toJSON() : null,
    caption: 'hey',
    bs: JSON.stringify({ user: 'bob', license: true }) 
  }));
});


server = http.createServer(app).listen(config.port);
console.log( 'Server is listening on port', config.port );