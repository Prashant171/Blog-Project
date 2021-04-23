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
			<b-Button @click="showPreview"> Preview</b-Button>
			<b-Button type="submit">Save</b-Button>		
		</div>
		</b-form>

		<b-modal ref="my-modal" hide-footer  title="Success">
			<div class="d-block text-center">
			<h4>New Blog is succesfully created</h4>
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
	components: {
		quillEditor
	},
	data: () => ({
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
		
	}),
	beforeDestroy(){
		this.$store.commit('setTitle', this.title);
		this.$store.commit('setAuthor', this.author);
	},
	watch: {
		content (val) {
			if (!this.mounting) {
				this.$store.commit('setDelta', this.$refs.myQuillEditor.quill.getContents())
			}
			this.$store.commit('setContent', val)
			this.mounting = false
		
		},
	},
	methods: {
		showPreview () {
			this.$router.replace('/preview')
		},
		del () {
			// TODO
			this.formEntered = true
		},
		hideModal() {
			
			this.$refs['my-modal'].hide();
			this.$router.replace('/')
        },
		save () {
					
			this.formEntered = true


			if(this.title !='' && this.author !='' && this.content != '')
			{
				this.$refs['my-modal'].show();

				this.$store.dispatch("addNewBlog",
				{
					Title : this.title,
					Author : this.author,
					Content : this.content
				});

				this.title='';
				this.author='';
				this.content='';

			}else{
				alert("Blog Content cannot be empty")
			}

		},
		publish () {
			// TODO
			this.formEntered = true
		}
	},
	computed: {
		...mapGetters(['delta', 'contents','title','author'])

	},
	created(){
		this.title = this.$store.state.title
		this.author = this.$store.state.author
	},
	mounted () {
		this.mounting = true
		if (!this.content && this.contents) {
			this.content = this.contents
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

.btn-delete {
	color: #2d8cf0!important;
	border: 1px solid #2d8cf0!important;
}

.btn-delete:hover {
	color: red!important;
	border: 1px solid red!important;
}
</style>
