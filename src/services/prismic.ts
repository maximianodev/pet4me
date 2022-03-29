import * as Prismic from '@prismicio/client';

const routes = [
  {
    type: 'post',
    path: '/:uid',
  },
];

const endpoint = Prismic.getEndpoint('pet4me');

export function getPrismicClient(): Prismic.Client {
  const prismic = Prismic.createClient(endpoint, { routes });

  return prismic;
}
