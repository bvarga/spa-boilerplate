var config = require('./config')
  , express = require('express')
  , app = express()
  , http = require('http')
  , assets = require('./lib/assets')(config.release)
  ;

console.log('assets', assets);
app.configure(function(){
  app.set('port', config.port);
  app.use(express.static(config.staticPath));
});

app.get( '*',  function( req, res, next ){
  // params for the inlined body template
  var inlinebodyparams = {
    caption: 'hey'
  };
  var bootstraps = { 
    user: req.user ? req.user.toJSON() : null,
    license: true 
  };
  res.end(assets.template({
    requirejs: assets.requirejs,
    requirejsconfig: assets.requirejsconfig,
    assetjs: req.user ? assets.homejs : assets.loginjs,
    assetcss: req.user ? assets.homecss : assets.logincss,
    inlinestyle: req.user ? assets.homeinlinestyle : assets.logininlinestyle,
    body: req.user ? assets.homebody(inlinebodyparams) : assets.loginbody(inlinebodyparams),
    bs: JSON.stringify(bootstraps) 
  }));
});

server = http.createServer(app).listen(config.port);
console.log( 'Server is listening on port', config.port );