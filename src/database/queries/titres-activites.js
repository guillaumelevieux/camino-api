import titreActivites from '../models/titres-activites'
import options from './_options'

const titreActiviteGet = async id =>
  titreActivites
    .query()
    .eager(options.titresActivites.eager)
    .findById(id)
    .first()

const titresActivitesGet = async () =>
  titreActivites
    .query()
    .eager(options.titresActivites.eager)
    .skipUndefined()

const titreActiviteUpdate = async titreActivite => {
  console.log(titreActivite)
  return titreActivites
    .query()
    .eager(options.titresActivites.eager)
    .patchAndFetchById(titreActivite.id, titreActivite)
}

const titreActiviteInsert = async titreActivite =>
  titreActivites
    .query()
    .eager(options.titresActivites.eager)
    .update(titreActivite)

export {
  titreActiviteGet,
  titreActiviteInsert,
  titresActivitesGet,
  titreActiviteUpdate
}
