<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form enctype="multipart/form-data" class="" @submit="addCategory($event)">
          <div class="form-group">
            <div class="alert alert-danger" v-if="error" role="alert">{{this.error}}</div>
          </div>
          <div class="form-group">
            <label>name</label>
            <input class="form-control" required name="category_name" v-model="data.category_name" />
          </div>
          <div class="form-group">
            <label>info</label>
            <input class="form-control" required name="category_info" v-model="data.category_info" />
          </div>
          <div class="form-group">
            <label>image</label>
            <input class="form-control" type="file" ref="category_pic" accept="image/*" required name="category_pic" @change="handleUploadFile()"  />
          </div>
          <div class="form-group">
            <input class="form-control btn btn-primary" type="submit" value="Create" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return {
      logedIn: false,
      data:{
        category_name: '',
        category_info: '',
        category_pic: ''
      },
      error: ''
    }
  },
  methods:{
    handleUploadFile(){
      this.data.category_pic = this.$refs.category_pic.files[0];
      console.log(this.data.category_pic);
    },
    addCategory(e){
      e.preventDefault();
      let formData = new FormData();
      formData.append('category_pic', this.data.category_pic);
      formData.append('category_name', this.data.category_name);
      formData.append('category_info', this.data.category_info);
      for (var value of formData.values()) {
         console.log(value);
      }
      console.log(this.data, formData);
      if(window.localStorage.getItem('authToken')){
        fetch('http://127.0.0.1:3000/api/categories',{
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/josn',
            'auth_token': window.localStorage.getItem('authToken') || null
          },
          mimeType: 'multipart/form-data',
          body: formData
        })
        .then(res=> res.json())
        .then((data)=>{
          console.log(data);
        })
        .catch(err => console.log(err));
      } else {
        this.logedIn = false;
        window.location.href = 'http://127.0.0.1:8080/login'
      }
     }
  }
}
</script>
<style>

</style>
