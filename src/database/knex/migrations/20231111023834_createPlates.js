
exports.up = knex => knex.schema.createTable("plates", table => {
    table.increments("id");
    table.text("title");
    table.text("descriptin");
    table.text("plate image");
    table.integer("ingredients_id").references("id").inTable("ingredients");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

  
});

exports.down = knex => knex.schema.dropTable("plates");