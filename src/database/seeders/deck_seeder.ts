import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import Flashcard from '#models/flashcard'

export default class extends BaseSeeder {
  public async run() {

    const deck = await Deck.create(
      { title: 'Capitales du monde', description: 'Capitales du monde'}
    )

    await Flashcard.createMany([
      { deckId: deck.id, question: 'Quelle est la capitale de la France ?', answer: 'Paris' },
      { deckId: deck.id, question: 'Quelle est la capitale du Japon ?', answer: 'Tokyo' },
      { deckId: deck.id, question: 'Quelle est la capitale du Brésil ?', answer: 'Brasília' },
      {
        deckId: deck.id,
        question: 'Quelle est la capitale des États-Unis ?',
        answer: 'Washington D.C.',
      },
      { deckId: deck.id, question: 'Quelle est la capitale de l’Inde ?', answer: 'New Delhi' },
      { deckId: deck.id, question: 'Quelle est la capitale du Canada ?', answer: 'Ottawa' },
      { deckId: deck.id, question: 'Quelle est la capitale de l’Australie ?', answer: 'Canberra' },
      { deckId: deck.id, question: 'Quelle est la capitale de l’Allemagne ?', answer: 'Berlin' },
      {
        deckId: deck.id,
        question: 'Quelle est la capitale de l’Afrique du Sud ?',
        answer: 'Pretoria',
      },
      { deckId: deck.id, question: 'Quelle est la capitale de la Chine ?', answer: 'Pékin' },
    ])
  }
}
