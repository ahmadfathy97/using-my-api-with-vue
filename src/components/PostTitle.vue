<template>
  <div class="d-flex align-items-center justify-content-between post-title-container bg-light shadow  p-2 my-3" >
    <router-link :to="'/posts/'+post._id">
      <h3>{{post.title}}</h3>
    </router-link>
    <span>{{post.created_at}}</span>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style>
  .post-title-container{
    border-radius: 18px;
  }
</style>
