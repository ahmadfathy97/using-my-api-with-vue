<template>
  <div class="notfound">
    <link href="https://fonts.googleapis.com/css?family=Caveat+Brush" rel="stylesheet"/>
    <div class="container d-flex align-items-center justify-content-center">
      <div class="body">
        <div class="text">404</div>
        <h2>- Page not found -</h2>
        <p>Sorry but the page you are looking for doesn't exist</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.notfound{
  min-height: calc(100vh + 20px);
  margin-top: -20px;
  background: linear-gradient(45deg, #101520, #7adaff)
}
.container{
  width: 90%;
}
.body .text{
  text-align: center;
  font-size: 30vmin;
  font-weight: 900;
  background: url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/wallpaper-3-1539806807.jpg');
  background-size: cover;
  background-position: center center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(7,27,72, .3);
}
.body h2{
  text-align: center;
  font-size: 15vmin;
  color: #fff;
  font-family: 'Caveat Brush', cursive;
}
.body p{
  font-size: 7vmin;
  color: #fff;
  text-align: center;
  font-family: cursive;
}
</style>
