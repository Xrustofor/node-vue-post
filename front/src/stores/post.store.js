import { defineStore } from 'pinia';
import { api } from '../boot/axios';


export const postStore = defineStore('counter', {
  state: () => ({
    posts: [],
    errors: null,
    message: null,
  }),
  getters: {
    getPosts: (state) => state.posts,
    getErrors: (state) => state.errors,
    getMessage: (state) => state.message,
  },

  actions: {
    async apiGetPosts(){
      try{
        const posts = await api.get('/');
        this.posts = posts;
      }catch(e) { console.log(e.message) }

    },
    async apiCreatePost(payload){
      this.message = null;
      this.errors = null;
      try{
        const result = await api.post('/post', payload);
        if(result.id){
          this.message = "Пост успішно доданий!"
        }
        return !!result.id
      }catch(e){
        if([400].includes(e.response.status)){
          const { errors } =  e.response.data
          const items = errors.map(err => ({
            field: err.path,
            message: err.msg
          }))
          this.errors = items;
        }
      }

    },
  },
});
