import vine from '@vinejs/vine'

const deckValidator = vine.compile(
 vine.object({
   description: vine.string().trim().minLength(10),
    title: vine.string().minLength(2).trim(),
    
 })
)
export { deckValidator }