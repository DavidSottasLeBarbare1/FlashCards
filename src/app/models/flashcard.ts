import { DateTime } from 'luxon'
import Deck from '#models/deck'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Flashcard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare question: String

  @column()
  declare answer: String

  @column()
  declare sectionId: number

  @belongsTo(() => Deck)
  declare section: BelongsTo<typeof Deck>
}