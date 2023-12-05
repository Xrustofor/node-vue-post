import { defineStore } from 'pinia';
import { api } from '../boot/axios';


export const postStore = defineStore('counter', {
  state: () => ({
    posts: [],
    meta: null,
    post: null,
    errors: null,
    message: null,
    loading: false,
  }),
  getters: {
    getPosts: state => state.posts,
    getMeta: state => state.meta,
    getPost: state => state.post,
    getErrors: state => state.errors,
    getMessage: state => state.message,
    getLoading: state => state.loading,
  },

  actions: {
    async apiGetPosts(page){
      this.meta = null;
      try{
        const posts = await api.get('/', {params: {page: page || 1}});
        this.posts = posts.items;
        this.meta = posts.meta;
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
        console.log(e);
      }
    },

    async apiUpdateByPost(data, id){
      try{
        const result = await api.put(`/post/${id}`, data);
        if(result.id){
          this.message = "Пост успішно оновлено!"
        }
        return !!result.id
      }catch(e){
        console.log(e);
      }
    },

    async apiGetByPost(id){
      try{
        this.post = await api.get(`/post/${id}`);
        return this.post;
      }catch(e){
        console.log(e);
      }
    },
    async apiDeleteByPost(id){
      this.message = null;
      try{
        const result = await api.delete(`/post/${id}`);
        if(result.id){
          this.message = "Пост успішно Видаленний!"
        }
        return !!result.id
      }catch(e){
        console.log(e);
      }
    },

    setLoading(payload){
      this.loading = payload;
    },
    setErrors(errors){
      this.errors = errors
    }
  },
});
