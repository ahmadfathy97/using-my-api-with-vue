<template>
  <div class="signup">
    <div v-if="!logedIn" class="container">
      <div class="col-md-12">
        <h1>Sign Up</h1>
      </div>
      <div class="col-md-12">
        <form class="" @submit="signup($event)">
          <div class="form-group">
            <label>username</label>
            <input class="form-control" required type="text" name="username" v-model="data.username" />
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
            <label>Info</label>
            <textarea class="form-control" required name="info" v-model="data.info"></textarea>
          </div>
          <div class="form-group">
            <label>Image</label>
            <input class="form-control" type="text" required name="pic" v-model="data.pic" />
          </div>
          <div class="form-group">
            <label>Day Of Birth</label>
            <input class="form-control" type="date" required name="dayOfBirth" v-model="data.dayOfBirth" />
          </div>
          <div class="form-group">
            <input class="form-control btn btn-primary" type="submit" value="Sign up" />
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
        username:'',
        email: '',
        password: '',
        info: '',
        pic: '',
        dayOfBirth: ''
      },
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
    signup(e){
      e.preventDefault();
      fetch('http://127.0.0.1:3000/api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.data)
      })
      .then(res=> res.json())
      .then((data)=>{
        console.log(data);
        window.location.href = 'http://' + window.location.host + '/login'
      })
      .catch(err => console.log(err));
    }
  }
}
</script>

<style>

</style>
