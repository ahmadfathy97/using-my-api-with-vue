<template>
  <div class="Loading w-100 d-flex align-items-center justify-content-center" >
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.Loading{
  min-height: 20vh;
  .circle{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid transparent;
      border-right-color: #0080ff;
      animation: loading .2s linear infinite;
  }
}
@keyframes loading{
  100%{
    transform: rotate(360deg);
  }
}
</style>
