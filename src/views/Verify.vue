<template>
  <div class="verify">
    <div v-if="!logedIn" class="container d-flex p-3 align-items-center justify-content-center flex-column">
      <div class="col-md-12 m-3">
        <h1>verify your account</h1>
      </div>
      <div class="col-md-12">
        <form class="shadow p-3 bg-light" @submit="verify($event)">
          <div class="form-group">
            <div class="alert alert-danger" v-if="error" role="alert">{{this.error}}</div>
          </div>
          <h3>check you email and enter the code</h3>
          <div class="form-group">
            <input class="form-control" required name="verificationNum" v-model="data.verificationNum" />
          </div>
          <div class="form-group">
            <input class="form-control btn btn-primary" type="submit" value="Verify" />
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
          verificationNum: ''
        },
        error: '',
        logedIn: false,
        query: this.$route.query.email
      }
    },
    computed: mapGetters(["api"]),
    methods:{
      verify(e){
        e.preventDefault();
        fetch(`${this.api}/users/verify/?email=${this.query}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data)
        })
        .then(res => res.json())
        .then((data)=>{
          if(data && data.success){
            this.$router.history.push(`/login?email=${this.query}`);
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

<style scoped>
.container{
  min-height: 80vh !important
}
</style>
