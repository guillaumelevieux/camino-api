export default `
"Point du périmètre géographique d'un titre (système géodésique WGS 84)"
type Point {
  """
  L'__id__ composée de la concaténation:
  - de l'id de l'étape
  - du groupe (lettre 'g' suivie de 2 chiffres)
  - du contour (lettre 'c' suivie de 2 chiffres)
  - du point (lettre 'p' suivie de 3 chiffres)
  """
  id: ID!

  "Les coordonnées du point dans le système WGS 84"
  coordonnees: Coordonnees

  "Le groupe de contours auquel appartient le point composé d'un nombre entier commençant à 1"
  groupe: Int

  "Le contour auquel appartient le point composé d'un nombre entier commençant à 1. Le premier contour forme le périmètre. Les contours suivant forment des trous dans ce périmètre."
  contour: Int

  "Le numéro du point dans le contour"
  point: Int

  "Le nom du point tel que stipulé dans les documents officiels"
  nom: String

  "La description du point telle que stipulée dans les documents officiels"
  description: String

  "Si le point appartient à un périmètre de sécurité"
  securite: Boolean

  "Liste d'id de référence de points"
  references: [PointReference]
}

"Point du périmètre géographique d'un titre dans un système autre que WGS 84"
type PointReference {
  """
  L'__id__ composée de la concaténation:
  - de l'id du point
  - du système
  """
  id: ID!

  "Le code du système de référence géodésique"
  geoSysteme: GeoSysteme

  "Les coordonnées du point dans le système géodésique"
  coordonnees: Coordonnees
}

input InputPoint {
  id: ID!

  coordonnees: InputCoordonnees

  groupe: Int

  contour: Int

  point: Int

  nom: String

  description: String

  securite: Boolean

  references: [InputPointReference]
}

input InputPointReference {
  id: ID!

  geoSysteme: inputGeoSysteme

  coordonnees: InputCoordonnees
}
`
