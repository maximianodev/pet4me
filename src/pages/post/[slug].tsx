import { Flex, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticPaths } from 'next';
import React from 'react';
import { getPrismicClient } from '../../services/prismic';
import { Post } from '../../@types/prismic';

interface PostProps {
  post: Post;
}

const Post = ({ post }: PostProps): JSX.Element => {
  const characteristics = {
    type: '',
    gender: '',
    age: '',
  };

  return (
    <Flex>
      <Image
        src={post.data.image.url}
        alt={post.data.title}
        title={post.data.title}
      />

      <Flex direction="column">
        <Text as="h1">{post.data.title}</Text>
      </Flex>
    </Flex>
  );
};

export const getStaticPath: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.params;

  try {
    const prismic = getPrismicClient();
    const post = await prismic.getByUID('post', String(slug));

    return { props: { post } };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/error',
      },
      props: { err },
    };
  }
};

export default Post;
