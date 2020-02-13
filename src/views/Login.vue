<template>
  <div class="signup">
    <div v-if="!logedIn" class="container">
      <div class="col-md-12">
        <h1>Login</h1>
      </div>
      <div class="col-md-12">
        <form class="" @submit="login($event)">
          <div class="form-group">
            <div class="alert alert-danger" v-if="error" role="alert">{{this.error}}</div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input class="form-control" requerd type="email" name="email" v-model="data.email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input class="form-control" requerd type="password" name="password" v-model="data.password" />
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
  export default{
    data(){
      return{
        data:{
          email: '',
          password: ''
        },
        error: '',
        logedIn: false
      }
    },
    mounted(){
      if(window.localStorage.getItem('authToken')){
        this.logedIn = true;
        window.location.href = 'http://' + window.location.host
      }
    },
    methods:{
      login(e){
        e.preventDefault();
        fetch('http://127.0.0.1:3000/api/auth/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data)
        })
        .then(res => res.json())
        .then((data)=>{
          if(window.localStorage && data.auth_token){
            window.localStorage.setItem('authToken', data.auth_token);
            window.localStorage.setItem('user_id', data.id);
            window.location.href = 'http://' + window.location.host
          } else{
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

<style>

</style>
