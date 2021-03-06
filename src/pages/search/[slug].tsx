import { GetServerSideProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import React from 'react';
import { Box, Text, Wrap, WrapItem, Image, Flex } from '@chakra-ui/react';
import { predicate } from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';
import { utf8Decode } from '../../services/decoderUTF8';
import { Post } from '../../@types/prismic';

interface SearchProps {
  posts: Post[];
}

const Search = ({ posts }: SearchProps): JSX.Element => {
  if (!posts.length)
    return (
      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
      >
        Nada encontrado em sua cidade
        <Link href="/">
          <a>
            <Text fontWeight="bold">Voltar para Home</Text>
          </a>
        </Link>
      </Flex>
    );

  return (
    <Wrap spacing="15px" p="3" justify="center">
      {posts.map(post => (
        <WrapItem
          key={post.uid}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
        >
          <Link href={`/post/${post.uid}`}>
            <a>
              <Box>
                <Image
                  src={post.data.image.url}
                  alt={post.data.title}
                  w={[130, 250, 300]}
                />
                <Text as="h3" my="2" textAlign="center">
                  {post.data.title}
                </Text>
              </Box>
            </a>
          </Link>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export const getStaticPath: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const allPosts = await prismic.getAllByType('post', {
    predicates: [],
  });

  const postsFiltered = allPosts.reduce((acc, item) => {
    acc.push(item.uid);
    return acc;
  }, []);

  return {
    paths: postsFiltered,
    fallback: true,
  };
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { address: addressText } = ctx.req.cookies;
  const { slug } = ctx.params;

  if (addressText) {
    const { city } = JSON.parse(addressText);
    const cityUTF8 = utf8Decode(city);

    if (slug === 'all') {
      const prismic = getPrismicClient();

      const posts = await prismic.getAllByType('post', {
        predicates: [predicate.at('my.post.city', cityUTF8)],
      });

      return { props: { posts } };
    }
    return { props: {} };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};

export default Search;
