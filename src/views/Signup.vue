<template>
  <div class="signup">
    <div v-if="!logedIn" class="container">
      <div class="col-md-12">
        <h1>Sign Up</h1>
      </div>
      <div class="col-md-12">
        <form class="" @submit.prevent="signup()">
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
            <input class="form-control" type="file" accept="image/*" ref="pic" required name="pic" @change="handleUploadFile()" />
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
      logedIn: false
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if(window.localStorage.getItem('authToken')){
      this.logedIn = true;
      window.location.href = 'http://' + window.location.host
    }
  },

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
