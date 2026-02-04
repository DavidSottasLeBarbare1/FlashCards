import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  // Display the list of decks
  async index({ view }: HttpContext) {
    // Retrieve the list of decks
    const decks = await Deck.query()

    return view.render('pages/home', { decks })
  }
}
