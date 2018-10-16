/**
 * Camino API, le cadastre minier numérique ouvert
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

require('dotenv').config()
require('./postgres')
const chalk = require('chalk')
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const graphqlHTTP = require('express-graphql')
const expressJwt = require('express-jwt')
const { env, port, url, jwtSecret } = require('./config')
const schema = require('./graphql/schemas')
const rootValue = require('./graphql/resolvers')

const app = express()

app.use(cors({ credentials: true }))

app.use(compression())

app.use(
  expressJwt({
    credentialsRequired: false,
    secret: jwtSecret || 'jwtSecret should be declared in .env'
  })
  // (err, req, res, next) => {
  //   if (err.code === 'invalid_token') return next()
  //   return next()
  // }
)

app.use(
  '/',
  graphqlHTTP((req, res, graphQLParams) => ({
    schema,
    rootValue,
    graphiql: true,
    pretty: true,
    formatError: err => ({
      message: err.message,
      locations: err.locations,
      stack: err.stack ? err.stack.split('\n') : [],
      path: err.path
    }),
    context: {
      user: req.user
    }
  }))
)

app.listen(port, () => {
  console.log(' ')
  console.log(chalk.bgWhiteBright.black.bold('> Url: ' + url + ' '))
  console.log(chalk.bgWhiteBright.black.bold('> Env: ' + env + ' '))
  console.log(' ')
})
