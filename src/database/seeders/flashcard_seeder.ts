import Flashcard from '#models/flashcard'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Flashcard.createMany([])
  }
}
