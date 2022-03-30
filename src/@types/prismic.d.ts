export interface PostContent {
  heading: string;
  body: {
    text: string;
  }[];
}

export interface Post {
  first_publication_date: string | null;
  uid: string;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: PostContent[];
    image: {
      url: string;
    };
  };
}
