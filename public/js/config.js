require({
  baseUrl: "/js",
  paths: {
    // ==================== Libraries ====================
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'babysitter': 'lib/backbone.babysitter',
    'jquery': 'lib/jquery',
    'dot': 'lib/doT',
    'text': 'lib/require/text',
    'bootstrap': 'lib/bootstrap',
    
    // ==================== Models ====================
    'LoginRouter': 'routers/loginRouter',
    'HomeRouter': 'routers/homeRouter',
    
    // ==================== Models ====================
    'UserModel': 'models/UserModel',
    
    // ==================== Collections ====================
    //'TopicCollection': 'collections/TopicCollection',

    // ==================== Views ====================
    'BaseView': 'views/BaseView',

    // ==================== Templates ====================
    // common
    'headerTemplate': '../templates/header.html'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    },
    dot: {
      exports: 'doT'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'Bootstrap'
    }
  },
  
  // for the build
  appDir: "../",
  dir: "../../release",
  modules: [
    {
      name: "login",
      include: ['LoginRouter']
    },
    {
      name: "home",
      include: ['HomeRouter']
    }
  ]
});
var app = app || { ver: 'v0.1' };