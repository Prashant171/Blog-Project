<template>
    <div @mouseup=divmouseUp()>
       
        <div class="blog-post">
            
            <div class="buttons">
                <b-Button class="button"> <router-link v-bind:to = "'/create_post/'+ id" > Edit Post </router-link></b-Button>
            </div>
            <div v-if="title!=''">
                <div class="blog-title">
                  {{title}}
                </div>
            </div>
            
            <div v-if="author!=''">
                <div class="author">
                 <b> By {{author}}</b>
                </div>
            </div>
           

            <div ref="target" class="content" id="blogcontent" v-html="contents" @mouseup=mouseUp()>
              
            </div>
          
        </div>
       
        <div
            v-show="this.popup"
            class="tools"
            :style="{
                left: `${this.x}px`,
                top: `${this.y}px`
            }"
            @mousedown.prevent=""
        >
            <span
                class="item"
                @mousedown.prevent="highlightText()"
            >
                <svg style="width:21px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16" />
                </svg>
            </span>
        </div>


    </div>

</template>

<script>
import { mapState } from 'vuex'


export default {
   data(){
	return{
        id : this.$route.params.id,
        popup : false,
        tags:{},
        x: 0,
        y: 0
    }
   },
   created(){
		this.title = this.$store.state.title
		this.author = this.$store.state.author
        this.contents = this.$store.state.contents
        this.tags = this.$store.state.tags
    },
  methods:{
        divmouseUp(){
                const selection = window.getSelection()
                const { width } = selection.getRangeAt(0).getBoundingClientRect()
                if (!width) {
                    this.popup = false
                }
        },
        mouseUp() {
            window.console.log(window.getSelection().toString());  
            
            var userSelection = window.getSelection().getRangeAt(0);

            if(this.alphanumreric(userSelection)){
                this.popup = true;  
  
                const selection = window.getSelection()
                const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect()
                
                this.x = x + (width / 2)
                this.y = y + window.scrollY - 10
                this.showTools = true
       
            }
            
        },
            
        highlightText(){

            var userSelection = window.getSelection().getRangeAt(0);

            if(window.getSelection().toString()){
                
                var newNode = document.createElement("span");
                newNode.setAttribute(
                    "style",
                    "background-color : yellow;display:inline;user-select:none;"
                );

                newNode.setAttribute("id","highlightedtext");
                newNode.className = "newClass";
                userSelection.surroundContents(newNode);

                var x=document.getElementById("blogcontent");
                //alert(x.outerHTML);
                this.$store.state.contents = x.outerHTML;

                if(this.id!=0)
                {
                    if (userSelection in this.tags){

                        if(!(parseInt(this.id) in this.tags[userSelection] || (this.id)==this.tags[userSelection]))  
                        {
                            this.tags[userSelection].push(this.id);
                            //"New tag is created in this blog"
                        }           
                    }
                    else{
                        this.tags[userSelection] = new Array(this.id);
                        //"New tag is created");   
                    }

                    var updatedblog = {
                    ID : this.id,
                    Title : this.title,
                    Author : this.author,
                    Content : x.outerHTML
                    }
                    this.$store.dispatch("updateBlog",updatedblog);
                    alert('Selected text is succesfully highlighted');
                }
            }
            
            this.popup = false;
            this.showTools = false
        },

        alphanumreric(inputtxt)
        {
            var letterNumber = /^[0-9a-zA-Z]+$/;

            if(letterNumber.test(inputtxt)){  
                return true;
            }
            else{
                this.popup=false;
                window.console.log('not alphanumeric');
                return false;
            }

            
        }
  },
    computed: {
        ...mapState(['title', 'author','contents','tags']),

    }
}
</script>

<style scoped>


.blog-title{
    
    font-family: fell, Georgia, Cambria, "Times New Roman", Times, serif;  margin-top : 20px;
    margin-bottom :20px;
    font-size:48px;
    width:100%;
    max-width:800px;
    color: rgba(41, 41, 41, 1);
    font-weight:400;
    line-height:60px;
    letter-spacing:.4px;
    background-color: #f8f8f8;
    padding-top : 50px;
    padding-bottom : 50px;
    padding-left : 20px;
    padding-right : 20px;
   
}

.blog-post{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding:10px;
  width:800px;
  margin:auto;
 
}


.author{
  box-shadow: 4px 4px 4px 0 rgba(255, 0, 0, 0.2);
  background-color: #f8f8f8;
  
  font-size:13px;
  font-weight:500;
  color: rgba(41, 41, 41, 1);
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding:10px;
  padding-left: 20px;
  margin:auto;
  margin-top:10px;
  margin-bottom:10px;
  height: 40px;

}

.content{
  margin:auto;
  position: relative;
  margin:auto;
  
  font-size : 20px;
  line-height: 32px;
  font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;  color: rgba(41, 41, 41, 1);
}

.buttons{
    margin : 10px;
}

.button{
    margin : 10px;
    background-color: rgb(253, 212, 136);

}


.tools{
  height: 30px;
  padding: 5px 5px;
  background-color:#333;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
}
  

.tools:after
{
    
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333
}
 

.item{
  color: #FFF;
  cursor: pointer
}
  

.item path{fill: #FFF;}

.item:hover path{fill: #1199ff;}

.item:hover{color: #1199ff}

.item + .item{margin-left: 10px}

</style>

