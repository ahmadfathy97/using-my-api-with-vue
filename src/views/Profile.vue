<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col">
          <div>
            <h1>{{user.username}}</h1>
            <p>{{user.info}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
export default{
  data(){
    return{
      user: {}
    }
  },
  mounted(){
    let id = this.$route.params.id;
    fetch('http://127.0.0.1:3000/api/users/' + id,{
      headers:{
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken')
      }
    })
    .then(res => res.json())
    .then((data)=>{
      this.user = data
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}
</script>


<style >

</style>
