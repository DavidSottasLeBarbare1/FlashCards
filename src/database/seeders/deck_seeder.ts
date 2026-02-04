import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      { id: 1, title: "Capitales", description: "Les capitales de tous les pays du monde"},
      { id: 2, title: "Tableau périodique", description: "Le tableau périodique de Mendeleïev"},
      { id: 3, title: "Worstchatz 12", description: "Die ferien"}
    ])
  }
}