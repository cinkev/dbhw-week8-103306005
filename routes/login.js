var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

//members test
router.get('/members/:memberId', function(req, res) {
  Member.get(req.params.memberId, function(err, member) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(member);
    }
  })

});

router.post('/', function(req, res, next) {

  //首先必須先產生出一個Member的物件在進行save
  var newMember =  Member({
    name : req.body.name,
    account : req.body.account,
    password : req.body.password
  });

  Member.get(req.params.memberId, function(err, member) {
    if(err) {
      console.log('Oops , you have not registered yet!');
      res.redirect('/');
    } else {
      req.session.member = newMember;
      res.redirect('/');
    }
  })

});


router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;