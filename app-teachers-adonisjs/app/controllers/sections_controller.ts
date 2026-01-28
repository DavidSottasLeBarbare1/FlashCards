import Section from '#models/section'
import { sectionValidator } from '#validators/section'
import type { HttpContext } from '@adonisjs/core/http'

export default class SectionsController {
      /**
       * Afficher le formulaire pour créer un nouvel enseignant
       */
      async create({ view }: HttpContext) {
        // Récupération des sections triées par le nom
        const sections = await Section.query().orderBy('name', 'asc')
        // Appel de la vue
        return view.render('pages/sections/create', { title: "Ajout d'une section", sections })
      }
      /**
   * Gérer la soumission du formulaire pour la création d'un enseignant
   */
  async store({ request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { name } = await request.validateUsing(sectionValidator)
    // Création de la nouvelle section
    const section = await Section.create({
      name
    })
    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le nouvel section ${section.name} a été ajouté avec succès !`
    )
    // Rediriger vers la homepage
    return response.redirect().toRoute('home')
  }
}