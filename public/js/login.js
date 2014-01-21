require(['backbone','LoginRouter'], function(Backbone, Router){
  app.router = new Router();
  Backbone.history.start({pushState: true});
});