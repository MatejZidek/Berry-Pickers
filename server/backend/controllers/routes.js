const jwt = require('jsonwebtoken')
const routesRouter = require('express').Router()
const Route = require('../models/route')
// const User = require('../models/user')
// const { userExtractor } = require('../utils/middleware')

routesRouter.get('/', async (request, response) => {
  const routes = await Route
    .find({})
    // .populate('user', { username: 1, name: 1 })
  response.json(routes)
})

routesRouter.get('/:id', async (request, response) => {
  const route = await Route
    .findById(request.params.id)
  response.json(route)
})

routesRouter.post('/', async (request, response) => {
  // const user = request.user
  const route = new Route({
    ...request.body,
    // user: user._id,
  })
  const savedRoute = await route.save()
  // user.routes = user.routes.concat(savedRoute._id)
  // await user.save()
  response.json(savedRoute)
})

routesRouter.delete('/:id', async (request, response) => {
  // const user = request.user
  // const routeToDelete = await Route.findById(request.params.id)
  // if (routeToDelete.user.toString() !== user._id.toString()) {
  //   return response.status(401).json({
  //     error: 'route can only be deleted by the user who added this route'
  //   })
  // }
  await Route.findByIdAndRemove(request.params.id)
  // user.routes = user.routes.filter(route => route.id !== routeToDelete._id)
  // await user.save()

  response.status(204).end()
})

routesRouter.put('/:id', async (request, response) => {
  const currentRoute = Route.findById(request.params.id)
  const newRoute = { currentRoute: currentRoute, ...request.body }
  const options = { new: true, runValidators: true, context: 'query' }
  const updatedRoute = await Route.findByIdAndUpdate(request.params.id, newRoute, options)
  response.json(updatedRoute.toJSON())
})

module.exports = routesRouter