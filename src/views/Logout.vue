<template>

</template>
<script>
  export default{
    mounted(){
      if(window.localStorage && window.localStorage.getItem('authToken')){
        window.localStorage.removeItem('authToken')
      }
      this.$router.history.push('/login');
    }
  }
</script>
