<template>
  <div class="signup">
    <div v-if="!logedIn" class="container d-flex p-3 align-items-center justify-content-center flex-column">
      <div class="col-md-12 m-3">
        <h1 class="page-title">Sign Up</h1>
      </div>
      <div class="col-md-12" >
        <form class="shadow p-3 bg-light" @submit.prevent="signup()">
          <div class="form-group" v-for="err in errors">
            <div class="alert alert-danger">
              {{err.msg}}
            </div>
          </div>
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
            <input class="form-control" required type="file" accept="image/*" ref="pic" name="pic" @change="handleUploadFile()" />
          </div>
          <div class="form-group">
            <label>Day Of Birth</label>
            <input class="form-control" required type="date"  name="dayOfBirth" v-model="data.dayOfBirth" />
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
import { mapGetters } from 'vuex';

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
      logedIn: false,
      errors: []
    }
  },
  computed: mapGetters(["api"]),
  methods:{
    handleUploadFile(){
      this.data.pic = this.$refs.pic.files[0];
    },
    signup(){
      let formData = new FormData();
      formData.append('pic', this.data.pic);
      formData.append('username', this.data.username);
      formData.append('info', this.data.info);
      formData.append('email', this.data.email);
      formData.append('dayOfBirth', this.data.dayOfBirth);
      formData.append('password', this.data.password);
      for (var value of formData.values()) {
         console.log(value);
      }
      fetch(`${this.api}/auth/signup`,{
        method: 'POST',
        headers: {
          'Accept': 'application/josn'
        },
        mimeType: 'multipart/form-data',
        body: formData
      })
      .then(res=> res.json())
      .then((data)=>{
        if(data && data.success){
          console.log(data);
          this.$router.history.push(`/verify?email=${this.data.email}`);
        } else{
          this.errors = data.errors
        }
      })
      .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>
.container{
  min-height: 80vh !important
}
</style>
