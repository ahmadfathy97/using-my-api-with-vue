<template>

</template>
<script>
  export default{
    mounted(){
      if(window.localStorage && window.localStorage.getItem('authToken')){
        window.localStorage.removeItem('authToken')
      }
      window.location.href = 'http://127.0.0.1:8080/login';
    }
  }
</script>
