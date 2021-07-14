"use strict";


module.exports = function(app){

  //---------------------Page redirections----------------------------------------//

  app.get('/', function(req, res){
    res.render('index', {});
  });

  app.get('/doSearch', function(req, res){
    res.render('templates/search', {});
  });





  //-----------------------Handled by Controllers------------------------------------//
    //app.get('/search',loginCtrl.doLogin);

};
