import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogPostCreator from './components/BlogPostCreator'
import BlogPostView from './components/BlogPostView'
import Blogs from './components/Blogs'
import Tag from './components/Tag'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', component: Blogs },
        { path: '/create_post/:id', component: BlogPostCreator },
        { path: '/preview/:id', component: BlogPostView },
        { path: '/tags', component: Tag }
    ]
})

export default router