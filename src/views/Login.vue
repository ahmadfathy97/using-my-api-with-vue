<template>
  <div class="login">
    <div v-if="!logedIn" class="container d-flex p-3 align-items-center justify-content-center flex-column">
      <div class="col-md-12 m-3">
        <h1 class="page-title">Login</h1>
      </div>
      <div class="col-md-12">
        <form class="shadow p-3 bg-light" @submit="login($event)">
          <div class="form-group">
            <div class="alert alert-danger" v-if="error" role="alert">{{this.error}}</div>
          </div>
          <div class="form-group">
            <div class="alert alert-success text-center" v-if="query" role="alert">
              Your email is verified, You can login now
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input class="form-control" required type="email" name="email" v-model="data.email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input class="form-control" required type="password" name="password" v-model="data.password" />
          </div>
          <div class="form-group">
            <label><router-link to="/forget-password">forget your password ?</router-link></label>
          </div>
          <div class="form-group">
            <input class="form-control btn btn-primary" type="submit" value="Login" />
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
          email: this.$route.query.email || '',
          password: ''
        },
        error: '',
        logedIn: false,
        query: this.$route.query.email
      }
    },
    computed: mapGetters(["api"]),
    methods:{
      login(e){
        e.preventDefault();
        fetch(`${this.api}/auth/login`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data)
        })
        .then(res => res.json())
        .then((data)=>{
          if(data && data.success){
            if(window.localStorage && data.auth_token){
              window.localStorage.setItem('authToken', data.auth_token);
              window.localStorage.setItem('user_id', data.id);
              this.$router.history.push('/');
            }
          } else if( data && !data.success && data.notVerified){
            this.$router.history.push(`/verify?email=${this.data.email}`);
          } else if(data){
            this.error = data.msg
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
