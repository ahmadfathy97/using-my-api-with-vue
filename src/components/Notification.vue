<template>
  <div style="width: 100% !important" class="m-1 bg-warning shadow p-1 noti" :class="{'bg-light': noti.readed}">
    <router-link :to="types[type] + noti.item_id" class="text-primary d-flex align-items-center justify-content-between">
      <span class=""> {{noti.user_id.username}} {{noti.noti_text}}</span>
      <span class=""> {{noti.noti_time}} </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props:["type", "noti"],
  data(){
    return{
      types: {
        comment: '/posts/',
        like: '/posts/',
        follow: '/user/'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.noti{
  border-radius: 15px;
}
.readed{
  background: #e9e9e9 !important
}
</style>
