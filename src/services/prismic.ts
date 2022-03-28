import * as Prismic from '@prismicio/client'
import fetch from 'node-fetch'

const routes = [
  {
    type: 'post',
    path: '/:uid',
  },
]

const endpoint = Prismic.getEndpoint('pet4me')

export function getPrismicClient() {
  const prismic = Prismic.createClient(endpoint, { routes, fetch })

  return prismic
}
