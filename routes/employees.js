var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Employees() {
  return knex('employees');
}

router.get('/', function(req, res, next) {
      var line1 = "SELECT employees.name , teams.team_name FROM employees ";
      var line2 = "join assignments on employees.id = assignments.employee_id ";
      var line3 = "join teams on teams.id = assignments.team_id " ;
      var line4 = line1+line2+line3;

      var people = [];

      knex.raw(line4)
      .then(function (employees) {
      console.log(employees);
      employees = employees.rows;

      employees.forEach(function(employee){
        var in_array = people.filter(function(thing){
            return thing.name === employee.name;
        });

        if (in_array.length === 0){
           var team_array = [];
           team_array.push(employee.team_name);
           people.push({name: employee.name, teams: team_array})
        } else {
          people.forEach(function (person){
            if (person.name === employee.name){
              person.teams.push(employee.team_name);
            }
          });
        }


      });

      console.log("my people are ", people);
      res.render('employees/index', {employees: employees, people: people});
    });
});

router.post('/', function(req, res, next) {
  Employees().insert(req.body).then(function (employees) {
    res.redirect('employees/');
  });
});

router.post('/:id', function(req, res, next) {
  Employees().where({id: req.params.id}).update(req.body).then(function(employees) {
    res.redirect('/');
  })
});

router.get('/new', function(req, res, next) {
  res.render('employees/new',{button_text: "Create employees"});
});

router.get('/:id', function(req, res, next) {
  res.render('employees/show', {employee: employee});
});

router.get('/:id/edit', function(req, res, next) {
  Employees().where({id: req.params.id}).then(function (employee) {
    res.render('employees/edit', {employee: employee[0], button_text: "Update employee"});
  })
});

router.get('/:id/delete', function(req, res, next) {
  Employees().where({id: req.params.id}).delete().then(function () {
    res.redirect('/employees');
  })
});

module.exports = router;
