import type { HttpContext } from '@adonisjs/core/http'
import Card from '#models/flashcard'
import Deck from '#models/deck'
import { cardValidator } from '#validators/card'
export default class CardsController {
  async create({ view, params }: HttpContext) {
    
    //Finds the card to create
    const card = await Card.query().orderBy('question', 'asc')

    const deckId = params.deckId

    //Fetching the deck
    const deck = await Deck.findOrFail(deckId)

    
    // View calling
    return view.render('pages/card/create', { deckId, deck })
  }

  async store({ request, response, session, params }: HttpContext) {

    // Validate user entered data
    const { question, answer } = await request.validateUsing(cardValidator)

    // New card creation
    await Card.create({
      question,
      answer,
      deckId: params.deckId,
    })

    // Flashing message
    session.flash('success', `La nouveau carte a été ajouté avec succès !`)

    // Redirecting to deck.show
    return response.redirect().toRoute('deck.show', { id: params.deckId })
  }

  async destroy({ params, session, response }: HttpContext) {

    // Finds the deck to delete
    const card = await Card.findOrFail(params.id)

    // Deletes the deck
    await card.delete()

    // Flashing message
    session.flash('success', `La carte a été supprimé avec succès !`)

    // Redirecting back to home
    return response.redirect().toRoute('deck.show', { id: params.deckId })
  }

  async edit({ params, view }: HttpContext) {
    // Finds the card to update
    const card = await Card.findOrFail(params.id)

    //Fetching the deck
    const deck = await Deck.findOrFail(params.deckId)
    
    // View calling
    return view.render('pages/card/edit.edge', {
      title: 'Modifier une carte',
      card,
      deck,
    })
  }

  async update({ params, request, session, response }: HttpContext) {

    // Validate user entered data
    const { question, answer } = await request.validateUsing(cardValidator)

    // Finds the card to update
    const card = await Card.findOrFail(params.id)

    // Updates the card
    card.merge({
      question,
      answer,
    })

    const cardUpdated = await card.save()

    // Flashing message
    session.flash(
      'success',
      `La carte a été
mis à jour avec succès !`
    )
    // Redirecting to deck.show
    return response.redirect().toRoute('deck.show', { id: params.deckId })
  }
}
