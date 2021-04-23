<template>
	<div class="blog-post-creator rteditor">
		<b-form  v-on:submit="save()">

	
		<div class="post-inputs">
			<div class="title-input">
				
				<b-form-input v-model="title" placeholder="Enter a post title" required/>
				
			</div>	

			<div class="author-input">
			
				<b-form-input v-model="author" placeholder="Enter the author name" required/>
			</div>	

		</div>

		<quill-editor
			v-model="content"
			ref="myQuillEditor"
			:options="editorOption"
		/>
		<div class="post-actions-row">
			<b-Button @click="$router.replace('/')">Cancel</b-Button>
			<b-Button class="button"> <router-link v-bind:to = "'/preview/'+ id" > Preview </router-link></b-Button>

			<b-Button v-if="(this.id==0)" type="submit" class="savebtn">Save</b-Button>
			<b-Button v-if="(this.id!=0)" type="submit" class="savebtn">Update</b-Button>	
			
		</div>
		</b-form>

		<b-modal ref="my-modal" hide-footer  title="Success">
			<div class="d-block text-center">
			<h4> {{this.usermessage}} </h4>
			</div> 

			<b-button class="mt-3" variant="outline-success" block @click="hideModal">Ok</b-button>
		</b-modal>

	</div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import { mapGetters } from 'vuex'

export default {
	name: 'HelloWorld',
	props : ["requestFrom"],
	components: {
		quillEditor
	},
	data(){
	return{
		title: '',
		author:'',
		content: '',
        editorOption: {
            debug: 'info',
            placeholder: 'Type your post...',
            readOnly: true,
            theme: 'snow'
		},
		showImageModal: false,
		formEntered: false,
		mounting: false,
		id : this.$route.params.id,
		blog:  '',
		usermessage:''
		
	}
	},
	beforeDestroy(){
		this.$store.commit('setTitle', this.title);
		this.$store.commit('setAuthor', this.author);
		this.$store.commit('setContent', this.content);
		this.$store.commit('setPreviousPage', "preview");
	},
	watch: {
		content (val) {
			if (!this.mounting) {
				this.$store.commit('setDelta', this.$refs.myQuillEditor.quill.getContents())
			}
			this.$store.commit('setContent', val)
			this.mounting = false
		
			this.blog.Content = this.content
		},
	},
	methods: {
		showPreview () {
			this.$router.replace('/preview')
		},
		hideModal() {	
			this.$refs['my-modal'].hide();
			this.$router.replace('/')
        },
		save () {
					
			this.formEntered = true

			if(this.title !='' && this.author !='' && this.content != '' && this.content != undefined)
			{		

				var blog = {
					ID : this.id,
					Title : this.title,
					Author : this.author,
					Content : this.content
				}

				if(this.id==0)
				{
					this.$store.dispatch("addNewBlog",blog);
					this.usermessage = 'New Blog is succesfully created';
				}else
				{
					this.$store.dispatch("updateBlog",blog);
					this.usermessage = 'Blog is succesfully Updated';
				}
				
				this.$refs['my-modal'].show();

			}else{
				alert("Blog Content cannot be empty")
			}

		}
	},
	computed: {
		...mapGetters(['delta', 'contents','title','author']),

	},
	created(){
		
		if(this.$store.state.previouspage == "originalBlog")
		{
			this.blog = this.$store.getters.getBlogById(parseInt(this.$route.params.id))  
			this.title = this.blog.Title
			this.author = this.blog.Author
			this.content = this.blog.Content
			
		}
		else
		{
			this.title = this.$store.state.title
			this.author = this.$store.state.author
			this.content = this.$store.state.contents
		}

		
	},
	mounted () {
		this.mounting = true
		if (!this.content && this.contents) {
			this.title = this.$store.state.title
			this.author = this.$store.state.author
			this.content = this.$store.state.contents
		}
	}
}
</script>
<style>

.rteditor {
  margin-left: 20px;
  margin-right: 20px;
}

.cat-input, .title-input {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.post-inputs {
	display: grid;
	width: 90%;
	grid-gap: 20px;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	padding-bottom: 15px;
	padding-top: 15px;
	/* padding: 20px; */
}

.ql-editor {
	height: 72vh;
}

.inner-image-input {
	display: flex;
	align-items: center;
}

.flex-center {
	display: flex;
	align-items: center;
	justify-content: center;
}

.post-actions-row {
	display: flex;
	justify-content: space-between;
	padding: 10px;
}

.ivu-icon-ios-camera-outline {
	font-size: 16px;
}

.button{
	background-color:#d6ecf7;
	color : white;
}

.savebtn {
	background-color:#1fa687;
}
</style>
