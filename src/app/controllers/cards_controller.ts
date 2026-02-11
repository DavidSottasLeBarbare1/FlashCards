import type { HttpContext } from '@adonisjs/core/http'
import Card from '#models/flashcard'
export default class CardsController {
    async create({ view, params }: HttpContext) {
    
        //Finds the deck to create
        const card = await Card.query().orderBy('question', 'asc')

        
        const deckId = params.deckId
        // View calling
        return view.render('pages/card/create', { deckId })
      }
}