import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  // Display the list of decks
  async index({ view }: HttpContext) {
    // Retrieve the list of decks
    const decks = await Deck.query()

    return view.render('pages/home', { decks })
  }

  async store({ request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { title, description } = await request.validateUsing(deckValidator)
    // Création de la nouvelle section
    const deck = await Deck.create({
      title, description,
    })
    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le nouveau deck ${deck.title} a été ajouté avec succès !`
    )
    // Rediriger sur la section.view
    return response.redirect().toRoute('home')
  }

  async create({ view }: HttpContext) {

    const deck = await Deck.query().orderBy('title', 'asc')
    // Appel de la vue
    return view.render('pages/deck/create', { title: "Ajout d'un deck", deck})
  }
}
