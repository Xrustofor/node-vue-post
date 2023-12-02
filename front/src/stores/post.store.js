import { defineStore } from 'pinia';
import { api } from '../boot/axios';

export const postStore = defineStore('counter', {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPosts: (state) => state.posts,
  },

  actions: {
    async apiGetPosts(){
      try{
        const posts = await api.get('/');
        this.posts = posts;
      }catch(e) { console.log(e.message) }

    }
  },
});
