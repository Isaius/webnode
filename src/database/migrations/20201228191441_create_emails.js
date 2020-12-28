
exports.up = function(knex) {
  return knex.schema.createTable('emails', table => {
    table.increments('id').primary();
    table.string('from').notNullable();
    table.string('to').notNullable();
    table.string('subject').notNullable();
    table.text('body').notNullable();
    table.string('uuid').notNullable();
    table.text('replies').notNullable();
})
};

exports.down = function(knex) {
  return knex.schema.dropTable('emails');
};
