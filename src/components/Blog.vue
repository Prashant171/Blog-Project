<template>
<div class="card">
      <div >
         
          <div class="icons">        
            <b-Button class="fa fa-eye"  @click="showBlogpost(blog)" ></b-Button>
            <b-button class="fa fa-edit" @click="showEditpost(blog)"></b-Button>   
            <b-button class="fa fa-trash" @click="deleteBlog(blog)"></b-button>     
          </div>

           <div class="blog-title">
             {{blog.Title}}
          </div>

      </div>
      

      <h5 class="author">Written by : {{blog.Author}}</h5>

      <h2 class="content" v-html="blog.Content"></h2>

      <b-Button @click="showBlogpost(blog)" >Read more <span class="fa fa-arrow-right"></span></b-Button>

  </div>
    


</template>

<script>

export default {
data: function() {
  return { blogcontent: this.blog }
},
props : ["blog"],
mounted (){

      var elems = document.getElementsByClassName("newClass")
      var i,tag=this.$store.state.tag;   

   //   window.console.log(tag)
      for(i=0;i<elems.length;i++)
      {
        var tagname = document.getElementsByClassName("newClass")[i].innerHTML.toString();
         // var tagname = elems[i].innerHTML.toString()
          if(tagname === tag)
          {
            window.console.log(tag)
            elems[i].scrollIntoView({block: "center", inline: "center"});
          }
      }

      this.$store.commit('setTag', '');
 

},
updated(){
      var elems = document.getElementsByClassName("newClass")
      var i,tag=this.$store.state.tag;   

     // window.console.log(tag)
      for(i=0;i<elems.length;i++)
      {
        var tagname = document.getElementsByClassName("newClass")[i].innerHTML.toString();
        //  var tagname = elems[i].innerHTML.toString()
          if(tagname === tag)
          {
            window.console.log(tag)
            elems[i].scrollIntoView({block: "center", inline: "center"});
          }
          
      }

      this.$store.commit('setTag', '');
 
},
methods:{

  showBlogpost(){
    this.$router.replace('/preview/'+this.blog.ID);
    this.$store.state.title = this.blog.Title
    this.$store.state.author = this.blog.Author
    this.$store.state.contents = this.blog.Content

  },
  deleteBlog(blog){

  if(confirm("Do you really want to delete?")){
    this.$store.dispatch("deleteBlog",blog);
  }

  },
  showEditpost(){
    this.$store.commit('setPreviousPage', "originalBlog");
    this.$router.replace('/create_post/'+this.blog.ID);
    
  }
}

}
</script>

<style scoped>

.blog-title{

   -webkit-line-clamp: 2;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  height:auto;
  max-height:90px;
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  margin-top:30px;
  padding-top: 5px;

  
}

.author{
  font-size:15px;
  font-weight:500;
  color: rgba(41, 41, 41, 1);
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding-bottom: 10px;
  margin-top:20px;
}

.content{
  

  position: relative;
  overflow: hidden;
 /* display: -webkit-box; */
  height: 120px;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  padding-top: 5px;
   max-height: 95px;      /* fallback */
 /*  -webkit-line-clamp: 4; /* number of lines to show */
 /*  -webkit-box-orient: vertical;*/
  

}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(236, 243, 245, 0.336);
  padding: 20px;
  max-width: 700px;
  margin: auto;
  margin-top :20px;
  
}

.buttons{
  margin-right:0px;
}

.icons{
    display: flex;
    position: absolute;
    right: 15px;
    top: 5px;
  
}
.btn {
  background-color: rgb(255, 255, 255); /* Blue background */
  border: gray 2px; /* Remove borders */
  color:rgb(252, 144, 2); /* White text */
  padding: 5px 10px; /* Some padding */
  font-size: 20px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: rgb(195, 243, 162);
}
</style>
