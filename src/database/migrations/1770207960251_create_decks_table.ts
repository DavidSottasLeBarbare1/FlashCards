import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'decks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Title field
      table.string('title').notNullable()
      
      // Description field
      table.string('description')

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
