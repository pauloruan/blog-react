import { fetchApi } from './fetchApi';

export const loadPosts = async () => {
  const postsResponse = await fetchApi('/posts');
  const photosResponse = await fetchApi('/photos');
  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  const postsAndPhotos = posts.map((post, index) => {
    return { ...post, cover: photos[index].url };
  });

  return postsAndPhotos;
};
