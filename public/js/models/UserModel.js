define(['backbone'],function(Backbone){
  return Backbone.Model.extend({
    initialize: function( attrs ) {
      console.log('initialize model');
    }
  });
});