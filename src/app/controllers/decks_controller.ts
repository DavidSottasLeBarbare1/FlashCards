import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'
import Card from '#models/flashcard'
import db from '@adonisjs/lucid/services/db'
export default class DecksController {
  // Display the list of decks
  async index({ view }: HttpContext) {
    // Retrieve the list of decks and the amount of card in each one
    const decks = await Deck.query().select('*').select(db.from('flashcards').whereRaw('flashcards.deck_id = decks.id').count('*').as('nbrOfCards'))

    //Counts the number of cards inside the deck
    return view.render('pages/home', { decks })
  }

  async store({ request, session, response }: HttpContext) {
    // Validate user entered data
    const { title, description } = await request.validateUsing(deckValidator)

    // New deck creation
    const deck = await Deck.create({
      title,
      description,
    })

    // Flashing message
    session.flash('success', `Le nouveau deck ${deck.title} a été ajouté avec succès !`)

    // Redirecting to home
    return response.redirect().toRoute('home')
  }

  async create({ view }: HttpContext) {
    //Finds the deck to create
    const deck = await Deck.query().orderBy('title', 'asc')

    // View calling
    return view.render('pages/deck/create', { title: "Ajout d'un deck", deck })
  }

  async show({ params, view }: HttpContext) {
    //Findes the deck to show
    const deck = await Deck.query().where('id', params.id).firstOrFail()

    const cards = await Card.query().where('deckId', params.id).orderBy('created_at', 'asc')

    // View calling
    return view.render('pages/deck/show', { title: "Detail d'un deck", deck, cards })
  }

  async destroy({ params, session, response }: HttpContext) {
    // Finds the deck to delete
    const deck = await Deck.findOrFail(params.id)

    // Deletes the deck
    await deck.delete()

    // Flashing message
    session.flash('success', `Le deck ${deck.title} a été supprimé avec succès !`)
    // Redirecting back to home
    return response.redirect().toRoute('home')
  }

  async edit({ params, view }: HttpContext) {
    // Finds the deck to update
    const deck = await Deck.findOrFail(params.id)

    // View calling
    return view.render('pages/deck/edit.edge', {
      title: 'Modifier un deck',
      deck,
    })
  }

  async update({ params, request, session, response }: HttpContext) {
    // Validate user entered data
    const { title, description } = await request.validateUsing(deckValidator)
    // Finds the deck to update
    const deck = await Deck.findOrFail(params.id)

    // Updates the deck
    deck.merge({
      title,
      description,
    })

    const deckUpdated = await deck.save()
    // Flashing message
    session.flash(
      'success',
      `Le deck ${deckUpdated.title} a été
mis à jour avec succès !`
    )
    // Redirecting to deck.show
    return response.redirect().toRoute('deck.show', { id: deck.id })
  }
}
