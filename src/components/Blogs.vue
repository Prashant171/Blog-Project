<template>
    <div class="blog-list">
       
        <div>
            <div v-for="(blog,index) in blogs" :item="blog" :index="index" :key="blog.ID" >
                <blog :blog="blog"/>
            </div>
        </div>
       
    </div>
</template>

<script>
import blog from "./Blog"

import { mapState } from 'vuex'

export default {

    components : {
        blog
    },

    computed : {
       ...mapState({
           blogs : "blogs"
       })
    }
}
</script>

<style scoped>

.blog-list{
    align-items: center;
}

.blog-body{
    max-width: 680px;
    margin: 0 64px;
    width:100%;
    
}
</style>
