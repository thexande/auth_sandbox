
exports.up = function(knex, Promise) {
  return knex.schema.table('employees', function (t) {
         t.integer('team_id');
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('employees', function (t) {
         t.dropColumn('team_id');
   });
};
