<template>
  <div>
  <b-navbar toggleable="lg" type="dark" class="topheader">
    
    <b-navbar-brand href="/" style="font-size:30px;font-weight:700">
      <span>       
         <img src="https://madewithvuejs.com/mandant/madewithvuejs/images/logo.png" href="/" style="height:50px;width:50px;margin-left:20px;margin-right:20px;" class="d-inline-block" alt="">
      </span> 

      <span style="color:rgba(0, 0, 0, 1);padding-top:4px;">
      BLOGPOSTS
      </span>
     </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
         <b-navbar-nav>
          <b-nav-item to="/">Blog</b-nav-item>
          <b-Button class="button" @click="showEditpost(blog)" > Create Post </b-Button>
          <b-Button @click="$router.replace('/tags')"  class="button" style="background-color:#1fa687">Tags</b-Button>

        </b-navbar-nav>
   </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
</div>
</template>

<script>
export default {
data(){
  return{
    search:'',
    id : 0
  }
},
methods:{
  showEditpost(){
   this.$router.replace('create_post/0');
  this.$store.state.title = ''
  this.$store.state.author = ''
  this.$store.state.contents = ''

  
}
}
}
</script>

<style scoped>

.navbar-dark .navbar-nav .nav-link{
  color: rgba(41, 41, 41, 1);
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding-right: 20px;
}

.nav-background{
  background:#FFC017
}

.topheader{
   background:#FFC017;
   padding-left:50px;
   padding-right:50px;
}

.button{
  margin-right:5px;
  background-color:#1fa687;
  margin-bottom:5px;
}
</style>

