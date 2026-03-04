import vine from '@vinejs/vine'

const cardValidator = vine.compile(
 vine.object({
    question: vine.string().trim().minLength(10).unique({ table: 'flashcards', column: 'question' }),
    answer: vine.string().trim().minLength(1),
 })
)
export { cardValidator }