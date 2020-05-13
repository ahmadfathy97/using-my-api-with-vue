<template>
  <div class="forget-password">
    <div v-if="!logedIn" class="container d-flex p-3 align-items-center justify-content-center flex-column">
      <div class="col-md-12 m-3">
        <h1>Reset your password</h1>
      </div>
      <div class="col-md-12">
        <form class="shadow p-3 bg-light" @submit="sendCode($event)">
          <div class="form-group">
            <div class="alert alert-danger" v-if="error" role="alert">{{this.error}}</div>
            <div class="alert alert-success" v-if="msg" role="alert">{{this.msg}}</div>
          </div>
          <h3 v-if="!msg" >enter your email</h3>
          <div v-if="!msg" class="form-group">
            <input class="form-control" required name="email" v-model="data.email" />
          </div>
          <div v-if="!msg" class="form-group">
            <input class="form-control btn btn-primary" type="submit" value="send" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

  export default{
    data(){
      return{
        data:{
          email: ''
        },
        error: '',
        msg:'',
        logedIn: false
      }
    },
    computed: mapGetters(["api"]),
    mounted(){
      if(window.localStorage.getItem('authToken')){
        this.logedIn = true;
        this.$router.history.push('/');
      }
    },
    methods:{
      sendCode(e){
        e.preventDefault();
        fetch(`${this.api}/auth/forget-password/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data)
        })
        .then(res => res.json())
        .then((data)=>{
          if(data && data.success){
            this.error = '';
            this.msg = data.msg;
          } else{
            this.msg = '';
            this.error = data.msg;
          }
        })
        .catch((err)=>{
          console.log(err);
        });
      }
    }

  }
</script>

<style scoped>
.container{
  min-height: 80vh !important
}
</style>
