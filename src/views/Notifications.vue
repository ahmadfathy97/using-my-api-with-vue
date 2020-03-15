<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Notifications</h1>
        </div>
        <div class="col-md-12" v-for="noti in notifications">
          <div v-if="noti.noti_type === 'comment'" style="width: 100% !important" class="btn btn-primary m-1" >
            <a :href="'/posts/' + noti.item_id" class="text-white">
              <span v-if="noti.readed">♠</span>
              <span class=""> {{noti.user_id.username}} </span>
              <span class=""> {{noti.noti_text}} </span>
              <span class=""> {{noti.noti_time}} </span>
            </a>
          </div>
          <div v-else-if="noti.noti_type === 'follow'" style="width: 100% !important" class="btn btn-info m-1">
            <a :href="'/user/' + noti.item_id" class="text-white">
              <span v-if="noti.readed">♠</span>
              <span class=""> {{noti.user_id.username}} </span>
              <span class=""> {{noti.noti_text}} </span>
              <span class=""> {{noti.noti_time}} </span>
            </a>
          </div>
          <div v-else="noti.noti_type === 'like'" style="width: 100% !important" class="btn btn-danger m-1">
            <a :href="'/posts/' + noti.item_id" class="text-white">
              <span v-if="noti.readed">♠</span>
              <span class=""> {{noti.user_id.username}} </span>
              <span class=""> {{noti.noti_text}} </span>
              <span class=""> {{noti.noti_time}} </span>
            </a>
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
      logedIn: false,
      notifications: []
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if( window.localStorage.getItem('authToken')){
      this.logedIn = true;
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
    } else{
      window.location.href = 'http://' + window.location.host + '/login'
    }
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
