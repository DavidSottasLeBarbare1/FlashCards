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

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      //Make sure that each question is unique in its deck
      table.unique(['question', 'deck_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}