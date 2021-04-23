import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        delta: undefined,
        contents: '',
        title:'',
        author:'',
        tag : '',
        previouspage:'',
        blogs: [
            {
                ID : 1,
                Title : 'The 60 Most Recommended Medium Stories of All Time',
                Author : 'Dave Schools',
                Content : '<div data-v-a46f1c52="" id="blogcontent" class="content"><p>This morning I wondered if one of&nbsp;<a href="https://medium.com/@DaveSchools" target="_blank" style="color: inherit;">my stories</a>&nbsp;was in the top Medium stories of all time. Nope. But I did find it fascinating to see the most recommended stories of all time ranked from top to bottom. Putting this list of stories together was like going through a childhood photobook and reliving the fond memories. Medium has taught me so much.</p><p><br></p><p><strong>Methodology</strong></p><p><br></p><p>I went to <span style="background-color : yellow;user-select:none;" id="highlightedtext" class="newClass">Medium</span>&nbsp;<a href="https://medium.com/top-stories" target="_blank" style="color: inherit;">Top Stories</a>&nbsp;and went back to the earliest month —&nbsp;<a href="https://medium.com/top-100/may-2013" target="_blank" style="color: inherit;">May 2013</a>. Then,&nbsp;I scrolled down each month’s Top 100 and manually recorded any story with over 3,000 recommends. For last month (September 2015), I clicked through each day’s Top Stories because the Top 100 has not yet been compiled.</p></div>'
               
            },
            {
                ID : 2,
                Title : 'Best Practices for Writing On Medium',
                Author : 'Siobhan Connor',
                Content : '<div data-v-a46f1c52="" id="blogcontent" class="content"><p>Medium is an open platform and a publisher. Anyone can write a piece on Medium and, as long as it’s not in violation of our rules, have the potential to find an audience. We celebrate diverse voices and believe that good stories can come from anywhere.</p><p><br></p><p>We also care about quality. We want you to put your best work on Medium, and we regularly feature stories we think are great. To help you understand what we mean when we say “quality,” we’ve written up these guidelines. They are based on what we know works best for readers — which means they should work well for you, too.</p><p><br></p><p>Write a clear headline. Readers have a split second to decide if they want to read your piece. Put a good, descriptive title and <span style="background-color : yellow;display:inline;user-select:none;" id="highlightedtext" class="newClass">subtitle</span> on your story. (Standard “headline” styling is title case for the headline and sentence case for the subtitle. This isn’t mandatory, but it’s ideal.)</p><p><br></p><p>Your story should contain original insight, ideas or perspectives. Don’t just aggregate the work of others, and don’t plagiarize.</p><p><br></p><p>Clean it up. We all make mistakes, but do look out for typos and janky formatting. Put care into your work.</p></div>'
            },
            {
                ID : 3,
                Title : 'Vue.js important concepts that you should know',
                Author : 'Ashot Hovhannisyan',
                Content : '<div data-v-a46f1c52="" id="blogcontent" class="content"><p><strong>1. Computed vs methods</strong></p><p>Computed properties actually work like getters, they are usually using to compose new data from existing properties and they dont accept arguments. Computed properties know if the values used in the function changed so they don’t need to run every time to check</p><p><br></p><p><strong>Methods</strong> are static functions and they are useful for DOM event handling, logic parts. And you can pass arguments to methods. Methods don’t know if the values used in the function changed so they need to run every time to check.</p><p><br></p><p><strong>2. Lifecycle hooks (how do they work?)</strong></p><p>Specify your properties in the created hook it’s very important because the template hasnt mounted yet so you can prepare your data to use it in the template. (for example, make API requests).</p><p>The mounted hook calls after the <span style="background-color : yellow;user-select:none;" id="highlightedtext" class="newClass">template</span> have created and inserted in the DOM, and now you have access to the vm.$el property. But also you should remember that mounted does not guarantee that all child components have also been mounted. if you want to wait until the entire view has been rendered, you can use vm.$nextTick inside of mounted.</p></div>'
            },
            {
                ID : 4,
                Title : 'How to Start Writing on Medium: A Tutorial',
                Author : 'Shaunta Grimes',
                Content : '<div data-v-a46f1c52="" id="blogcontent" class="content"><p>As a platform it’s easy to use — clean and simple. You just type your post, click publish, and voila! You’re published. Stay tuned in the next few days for more on exactly how to do those things (because of course everything is easier said than done.)</p><p>It’s similar to any blogging platform like Wordpress or Squarespace. Or Blogspot. Is Blogspot still a thing? You don’t own the domain here. So instead of www.yourname.com, your blogging at&nbsp;<a href="http://www.medium.com/yourname." target="_blank" style="color: inherit;">www.medium.com/yourname.</a></p><p>Every post you write is made available to your followers.</p><p>As a publisher, <span style="background-color : yellow;display:inline;user-select:none;" id="highlightedtext" class="newClass">Medium</span> has a team of people whose job is to read most of the posts that are published every day and choose those that are high quality, meet their criteria, and fit their aesthetic to&nbsp;<em>curate</em>.</p><p><br></p><p>Curation means that Medium is publishing your post in a way that makes it visible to not only your followers, but to Medium readers who aren’t following you (yet!), but are interested in the topic you’ve written about.</p><p>Being curated is important. You’ll need to master the curation learning curve if you want to earn more than pennies here.</p><p><br></p><h2>What should I write?</h2><p><br></p><p>One of the great things about Medium is that you can write about anything. Anything. And you don’t have to niche so far down that you never write outside your pet topic.</p><p><br></p><p>If I was writing only on my own website, which is about writing, it would be really weird if I sometimes stuck in essays about my ...'
            }
        ],
        tags:{"Medium" : [1,4], "subtitle" : [2], "template" : [3]}
    },
    mutations: {
        setDelta (state, payload) {
            state.delta = payload
        },
        setTag (state, payload) {
            state.tag = payload
        },
        setPreviousPage (state, payload) {
            state.previouspage = payload
        },
        setContent (state, payload) {
            state.contents = payload
        },
        setTitle (state, payload) {       
            state.title= payload;        
        },
        setAuthor (state, payload) {
            state.author=payload;
        },
        NEW_BLOG(state, blog) {
            state.blogs.push({
                ID:   state.blogs[state.blogs.length-1].ID+1,
              Title : blog.Title,
              Author: blog.Author,
              Content: blog.Content
            });

        },
        UPDATE_BLOG(state,blog){
           
            let index = state.blogs.findIndex(blog1 => blog1.ID == blog.ID);
          
            if(index > -1)
            state.blogs[index] = blog
        },
        DELETE_BLOG(state, blog) {
            let index = state.blogs.indexOf(blog);
            state.blogs.splice(index, 1);

            for (let [key, value] of Object.entries(state.tags)){
                if((blog.ID in value) || (blog.ID == value))
                {
                    let tagindex = state.tags[key].indexOf(blog.ID);

                    state.tags[key].splice(tagindex,1);

                    if(state.tags[key].length == 0){
                        delete state.tags[key];
                    }
                }
            }
            
          }
    },
    getters: {
        delta: ({delta}) => delta,
        contents: ({contents}) => contents,
        title: ({title}) => title,
        author: ({author}) => author,
        getBlogById: (state) => (id) => {
            
            return state.blogs.find(blog => blog.ID === id)
          },

    },
    actions: {
        addNewBlog({ commit}, blog) {
            commit('NEW_BLOG', blog);
        },

        deleteBlog({commit}, blog) {
            commit('DELETE_BLOG',blog);
        },
        updateBlog({commit}, blog) {
            commit('UPDATE_BLOG',blog);
        }
    }
})

export default store