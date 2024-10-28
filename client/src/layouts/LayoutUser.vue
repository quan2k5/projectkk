<script setup>
import headerUser from './headerUser.vue';
import footerUser from './footerUser.vue';
import { useStore } from 'vuex';
import { getAllUsers } from '@/api/User';
import { computed, onBeforeMount, reactive } from 'vue';
const store=useStore();
onBeforeMount(async()=>{
    const users=await getAllUsers();  
    let findUsers=users.find((user)=>user.status==true);
    store.commit('setCurrentUser',findUsers);
})
</script>
<template>
    <div>
        <headerUser></headerUser>
        <router-view></router-view>
        <footerUser></footerUser>
    </div>
</template>
<style scoped>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
} 
</style>