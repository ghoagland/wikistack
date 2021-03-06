'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
var Sequelize = require("sequelize")
var db = new Sequelize('postgres://localhost:5432/wikistack' ,{
  logging: false
});

router.get("/", function(req, res){
  res.redirect("/");
});


router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });
  page.save()
  .then(function(){
  	 res.json(page);
  })
  .catch(function(err){
  	console.log(err);
  })
})



router.get("/add", function(req, res){
  res.render('addpage')
});

router.get('/:urlName', function(req, res, next){
  Page.findOne({where: {urlTitle: req.params.urlName}})
  .then(function(page){
    res.render("wikipage", {page : page});
  })
  .catch(next)
})



module.exports = router;
