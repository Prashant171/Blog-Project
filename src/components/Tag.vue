<template>
    <div>

        <div class="tag-list">
        
            <div v-for="(val, index) in this.tags" :key=index>
                <!-- Do something... -->
                <b-button @click="setTagBlogs(val,index)" class="tag">{{index}}</b-button>
            </div>

        </div>
    
        <div class="blog-list">
            <div v-for="(blog,index) in filteredblogs"  :item="blog" :index="index" :key="index">
                <blog :blog="blog"/>
                
            </div>
        </div>

        
    </div>
</template>

<script>
import blog from "./Blog"
import { mapState } from 'vuex'

export default {
    data(){
        return{
        allblogs : '',
        tag:[]    
        }
    },
    components : {   
        blog
    },
    methods:{
        setTagBlogs(val, index){
        
        this.tag = val;
         this.$store.commit('setTag', index);
          window.console.log(index)
        }
    },
    computed : {
       ...mapState({
           tags : "tags",
           blogs : "blogs"
       }),
      filteredblogs(){

           var filteredblog = []
            var i;
         
            window.console.log(this.tag)
            for (i = 0;i<this.blogs.length;i++){
                if((this.blogs[i].ID in this.tag) || (this.blogs[i].ID == this.tag) || (this.tag.includes(this.blogs[i].ID)))
                {
                    filteredblog.push(this.blogs[i]);
                }
            } 
           
            return filteredblog
       }
       
    }
}
</script>

<style scoped>

.tag-list{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 20px;
  max-width: 700px;
  margin: auto;
  margin-top :20px;
  display: flex;
}

.tag{ 
    margin:10px;
    background-color:#5e2cd3;
}

.tag:focus {
    background: rgb(238, 54, 22) !important;
  }


.blog-list{
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 20px;
  max-width: 700px;
  margin: auto;
  margin-top :20px;
}

</style>
