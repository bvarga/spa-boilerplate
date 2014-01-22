Single Page App boilerplate

This package shows how to build a single page app with [Nodejs](http://nodejs.org), 
and optimize it with [Requirejs](http://requirejs.org). Well it's not a single
page app, it has two pages, a login page, and a home page.

- Install

  clone the repository
    
    git clone https://github.com/bvarga/spa-boilerplate.git
    
  install node modules
  
    npm install
    
  install busta globally
  
    npm install busta -g
    
- Use

  run build 
  
    build.cmd
    
  start the node server. You have two options, run in `development`, or in 
  `release` mode.
  
  to start in development mode:
  
    node server.js
    
  to start in release mode:
  
    release.cmd
    
- Explanation

  so what's happening here. If you start the server in development mode, and 
  navigate to `127.0.0.1:3000`, you can see, that the browser downloads lot's
  of files, the require.js script, the config require.js script, the views, 
  models, templates, etc... In a real world situation it's not a good idea,
  because it means lot's of roundtrips.
  
  while calling build.cmd we make one javascript file, and one css file, and 
  we put there everything, and we load it asynchronously, so there will be no
  blocking scripts in our html page.
  
  We inline css, and javascript, and the body part, the critical parts, so the
  user will see something in our page. Customize the `stylus/logininline.styl`,
  `stylus/homeinline.styl`, `views/loginbody.jade`, `views/homebody.jade` files
  to have something meaningful in your page. don't forget to run **compile.cmd**
  after modification, and restart the node server (or use nodemon).
  
  In server.js under `app.get( '*'...` there's `inlinebodyparams` a hash where
  you can put parameters to your inline body template, and `bootstraps` hash,
  which will became a `bs` global variable in your browser.
  
- License
  
  MIT
  
