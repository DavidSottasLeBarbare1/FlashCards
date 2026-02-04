import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'flashcards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      //Question field
      table.string('question').notNullable()

      //Answer field
      table.string('answer').notNullable()

      // deck's foreign key
      table
        .integer('deck_id') // Foreign key
        .unsigned() // Cant be negative
        .references('id') // Reference id
        .inTable('decks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}