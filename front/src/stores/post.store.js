import { defineStore } from 'pinia';
import { api } from '../boot/axios';


export const postStore = defineStore('counter', {
  state: () => ({
    products: [],
    meta: null,
    product: null,
    errors: null,
    message: null,
    loading: false,
    deleteImages: [],
  }),
  getters: {
    getPosts: state => state.products,
    getMeta: state => state.meta,
    getProduct: state => state.product,
    getErrors: state => state.errors,
    getMessage: state => state.message,
    getLoading: state => state.loading,
    getDeleteImages: state => state.deleteImages,
  },

  actions: {
    async apiGetProducts(page){
      this.meta = null;
      try{
        const products = await api.get('/', {params: {page: page || 1}});
        this.products = products.items;
        this.meta = products.meta;
      }catch(e) { console.log(e.message) }

    },

    async apiCreateProduct(payload){
      const {title, description, price, images } = payload;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);

      images.forEach((file) => {
        formData.append("image", file.file, file.name);
      })
      this.message = null;
      this.errors = null;
      try{
        const result = await api.post('/post', formData);
        if(result.success){
          this.message = "Пост успішно доданий!"
        }
        return result
      }catch(e){
        console.log(e);
      }
    },

    async apiUpdateByProduct(payload, id){
      const {title, description, price, images } = payload;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);

      images.forEach((image) => {
        if(Object.keys(image.file).length){
          formData.append("image", image.file, image.filename);
        }
      })

      this.deleteImages.forEach(id => {
        formData.append("remove", id);
      })

      try{
        const result = await api.put(`/post/${id}`, formData);
        if(result.id){
          this.message = "Пост успішно оновлено!"
        }
        return !!result.id
      }catch(e){
        console.log(e);
      }
    },

    async apiGetByProducts(id){
      try{
        this.product = await api.get(`/post/${id}`);
        return this.product;
      }catch(e){
        console.log(e);
      }
    },
    async apiDeleteByProduct(id){
      this.message = null;
      try{
        const result = await api.delete(`/post/${id}`);
        if(result.id){
          this.message = "Пост успішно Видаленний!"
        }
        return result
      }catch(e){
        console.log(e);
      }
    },

    setLoading(payload){
      this.loading = payload;
    },
    setErrors(errors){
      this.errors = errors
    },

    setImageRemove(id){
      if(!this.product) return;
      if(!Array.isArray(this.product.images)) return;
      const candidate = this.product.images.find(item => item.id === id);
      if(!candidate) return;
      this.deleteImages.push(id);
    },
    resetImageRemove(){
      this.deleteImages = [];
    }
  },
});
