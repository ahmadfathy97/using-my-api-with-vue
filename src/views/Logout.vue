<template>

</template>
<script>
  export default{
    mounted(){
      if(window.localStorage && window.localStorage.getItem('authToken')){
        window.localStorage.removeItem('authToken')
      }
      window.location.href = 'http://' + window.location.host + '/login'
    }
  }
</script>
