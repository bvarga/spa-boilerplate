define(['backbone'], function(Backbone){
  return Backbone.Router.extend({
    initialize: function() {
      console.log('initialize login router');
    },
    
    routes: {
      "": "showRoot",
      "*other": "showDefault"
    },
    
    showRoot: function() {
      console.log('show root');
    },
    
    showDefault: function() {
      console.log('Invalid route');
    }
  });
});