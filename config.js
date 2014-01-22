var Config = function(){
  var self = this;
  this.release = false;
  this.port = 3000;

  this.staticPath = __dirname + '/' + 'public';
  //process.env.NODE_ENV = 'release';
  switch(process.env.NODE_ENV){
    case 'release':
      this.staticPath = __dirname + '/' + 'release';
      this.release = true;
      break;
  }
};

Config.instance = null;

Config.getInstance = function() {
  if (this.instance === null) 
    this.instance = new Config();
  return this.instance;
}

module.exports = Config.getInstance();
