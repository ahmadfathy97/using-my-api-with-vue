<template>
  <div class="search-dialogue fixed-top w-100 d-flex align-items-center justify-content-center flex-column">
    <input v-model="name" class="searchBox d-block rounded p-2 text-center" @keyup.enter="search" />
    <div class="my-3">
      <button class="btn btn-secondary m-1" @click="$emit('closeDialogue')">cancel</button>
      <button class="btn btn-primary m-1" @click="search">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: ''
    }
  },
  methods:{
    search(){
      if(this.name.trim().length){
        this.$router.history.push('/search-result/' + this.name.trim());
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-dialogue{
  height: 100%;
  background: rgba(0,0,0,.95);
  input{
    max-width: 90%;
    width: 600px;
  }
}
</style>
