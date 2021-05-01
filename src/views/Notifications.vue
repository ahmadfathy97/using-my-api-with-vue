<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="page-title">Notifications</h1>
        </div>
        <div class="col-md-12" v-for="noti in notifications">
          <Notification :type="noti.noti_type" :noti="noti" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Notification from '../components/Notification.vue';
export default{
  data(){
    return{
      logedIn: true,
      notifications: []
    }
  },
  components:{
    Notification
  },
  computed: mapGetters(["api"]),
  mounted(){
    fetch(`${this.api}/users/notifications`,{
      headers: {
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken') || null
      }
    })
    .then(res=> res.json())
    .then((data)=>{
      this.notifications = data.notis
      console.log(data.notis);
      fetch(`${this.api}/users/notifications`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        }
      })
    })
    .catch(err => console.log(err));
  }
}
</script>
<style >
body{
  background: #f6f6f6;
  padding: 10px;
  min-height: 100vh;
}
</style>
