import Section from '#models/section'
import { sectionValidator } from '#validators/section'
import type { HttpContext } from '@adonisjs/core/http'

export default class SectionsController {
      /**
       * Afficher le formulaire pour créer une nouvelle section
       */
      async create({ view }: HttpContext) {
        const section = await Section.query().orderBy('name', 'asc')
        // Appel de la vue
        return view.render('pages/sections/create', { title: "Ajout d'une section", section })
      }
      /**
   * Gérer la soumission du formulaire pour la création d'une section
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
    // Rediriger sur la section.view
    return response.redirect().toRoute('section.view')
  }
    /**
     * Afficher la liste des sections
     */
    async index({ view }: HttpContext) {
      // Récupérer la liste des sections triés par ordre alphabétique sur le nom
      const sections = await Section.query().orderBy('name', 'asc')
      return view.render('pages/sections/show', { sections })
    }
    async destroy({ params, session, response }: HttpContext) {
        // Sélectionne la section à supprimer
        const section = await Section.findOrFail(params.id)
        // Supprime la section
        await section.delete()
        // Afficher un message à l'utilisateur
        session.flash(
          'success',
          `La section ${section.name} a été supprimé avec succès !`
        )
        // Redirige l'utilisateur sur la section.view
        return response.redirect().toRoute('section.view')
      }
}