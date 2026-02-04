import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      { id: 1, title: "Test", description: "This is a test"}
    ])
  }
}