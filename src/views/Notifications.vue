<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="page-title">Notifications</h1>
        </div>
        <div class="col-md-12" v-for="noti in notifications">
          <div v-if="noti.noti_type === 'comment'" style="width: 100% !important" class="m-1 bg-warning" :class="{'bg-light': noti.readed}">
            <router-link :to="'/posts/' + noti.item_id" class="text-primary">
              <span class=""> {{noti.user_id.username}} </span>
              <span class=""> {{noti.noti_text}} </span>
              <span class=""> {{noti.noti_time}} </span>
            </router-link>
          </div>
          <div v-else-if="noti.noti_type === 'follow'" style="width: 100% !important" class="m-1 bg-warning" :class="{'bg-light': noti.readed}">
            <router-link :to="'/user/' + noti.user_id._id" class="text-primary">
              <span class=""> {{noti.user_id.username}} </span>
              <span class=""> {{noti.noti_text}} </span>
              <span class=""> {{noti.noti_time}} </span>
            </router-link>
          </div>
          <div v-else="noti.noti_type === 'like'" style="width: 100% !important" class="m-1 bg-warning" :class="{'bg-light': noti.readed}">
            <router-link :to="'/posts/' + noti.item_id" class="text-primary">
              <span class=""> {{noti.user_id.username}} </span>
              <span class=""> {{noti.noti_text}} </span>
              <span class=""> {{noti.noti_time}} </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default{
  data(){
    return{
      logedIn: true,
      notifications: []
    }
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
.readed{
  background: #e9e9e9 !important
}
</style>
