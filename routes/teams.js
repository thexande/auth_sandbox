var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var bookshelf = require('bookshelf')(knex);

var Employees = bookshelf.Model.extend({
  tableName: 'employees',
  employees: function() {
    return this.belongsTo(Teams);
  }
});

var Temes = bookshelf.Model.extend({
  tableName: 'teams',
  employees: function() {
    return this.hasMany(Employees);
  }
});

function Teams() {
  return knex('teams');
}

router.get('/', function(req, res, next) {
  Temes.fetchAll({withRelated: "employees"}).then(function(teams) {
    var teams = teams.toJSON();
    res.render("teams/index", {teams: teams});
    // res.send(teams);
 }).catch(function(err) {
   console.error(err);
 });
});

router.post('/', function(req, res, next) {
  Teams().insert(req.body).then(function (teams) {
    res.redirect('teams/');
  });
});

router.post('/:id', function(req, res, next) {
  Teams().where({id: req.params.id}).update(req.body).then(function(teams) {
    res.redirect('/');
  })
});

router.get('/new', function(req, res, next) {
  res.render('teams/new',{button_text: "Create teams"});
});

router.get('/:id', function(req, res, next) {
  res.render('teams/show', {team: team});
});

router.get('/:id/edit', function(req, res, next) {
  Teams().where({id: req.params.id}).then(function (team) {
    res.render('teams/edit', {team: team[0], button_text: "Update team"});
  })
});

router.get('/:id/delete', function(req, res, next) {
  Teams().where({id: req.params.id}).delete().then(function () {
    res.redirect('/teams');
  })
});

module.exports = router;
