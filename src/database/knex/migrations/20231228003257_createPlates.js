
exports.up = knex => knex.schema.createTable("plates", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.varchar("image");
    table.varchar("category");
    table.decimal("price");
    
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

  
});

exports.down = knex => knex.schema.dropTable("plates");