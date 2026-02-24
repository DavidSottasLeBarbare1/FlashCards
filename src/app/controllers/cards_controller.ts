import type { HttpContext } from '@adonisjs/core/http'
import Card from '#models/flashcard'
import { cardValidator } from '#validators/card'
export default class CardsController {
  async create({ view, params }: HttpContext) {
    //Finds the card to create
    const card = await Card.query().orderBy('question', 'asc')

    const deckId = params.deckId
    // View calling
    return view.render('pages/card/create', { deckId })
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
}
