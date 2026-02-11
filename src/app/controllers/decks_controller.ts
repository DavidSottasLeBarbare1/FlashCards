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
    // Validate user entered data
    const { title, description } = await request.validateUsing(deckValidator)

    // New deck creation
    const deck = await Deck.create({
      title, description,
    })

    // Flashing message
    session.flash(
      'success',
      `Le nouveau deck ${deck.title} a été ajouté avec succès !`
    )

    // Redirecting to home
    return response.redirect().toRoute('home')
  }

  async create({ view }: HttpContext) {

    const deck = await Deck.query().orderBy('title', 'asc')
    
    // View calling
    return view.render('pages/deck/create', { title: "Ajout d'un deck", deck})
  }

  async show({ params, view }: HttpContext) {

    const deck = await Deck.query().where('id', params.id).firstOrFail()
    
    // View calling
    return view.render('pages/deck/show', { title: "Detail d'un deck", deck})
  }
}
