require(['backbone','HomeRouter'], function(Backbone, Router){
  app.router = new Router();
  Backbone.history.start({pushState: true});
});