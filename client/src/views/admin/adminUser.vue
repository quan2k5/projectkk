<script setup>
import queryString from 'query-string';
import{useStore} from 'vuex';
import{computed, onMounted, reactive, ref,watch} from 'vue';
import Pagination from '../../components/Pagination.vue';
import Limit from '../../components/Limit.vue'
//còn phần sắp xếp
const store=useStore()
const params = ref({ _page:1, _limit: 3,name_like:'',email_like:''});
const backendUser=computed(()=>store.state.users.users);
const allUsers=computed(()=>store.state.users.allUsers);
const inputSearch=ref('');
const selectValue=ref('name');
onMounted(()=>{
    const { _page, _limit, ...restParams } = params.value;
    store.dispatch('getFilterUsers',queryString.stringify(params.value));
    store.dispatch('getAllUsers',queryString.stringify(restParams))
})
watch(inputSearch,async(newValue)=>{
  if(selectValue.value=='name'){
    params.value.email_like='';
    params.value.name_like=newValue;
  }else if(selectValue.value=='email'){
    params.value.name_like='';
    params.value.email_like=newValue;
  }
  const { _page, _limit, ...restParams } = params.value;
  await store.dispatch('getFilterUsers', queryString.stringify(restParams));
  params.value._page=1;
  store.dispatch('getFilterUsers', queryString.stringify(params.value));
  store.dispatch('getAllUsers',queryString.stringify(restParams))
});
const handleBlock=(id,block)=>{
  if(confirm("Bạn có muốn chặn người dùng này không?")){
    store.dispatch('updateUsers',{id:id,block:block});
  }
}
const handlePage=(currentPage)=>{
  params.value._page=currentPage;
  store.dispatch('getFilterUsers', queryString.stringify(params.value));
}
const handleLimit=(limit)=>{
  params.value._page=1;
  params.value._limit=limit;
  store.dispatch('getFilterUsers', queryString.stringify(params.value));
}
</script>
<template>
    <section class="user-table">
      <div class="search_part">
         <input class="input_user" type="text" placeholder="tìm kiếm" v-model="inputSearch">
          <select v-model="selectValue">
            <option value="name">theo tên</option>
            <option value="email">theo email</option>
           </select>
      </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in backendUser" :key="index">
              <td>{{user.id}}</td>
              <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM4DLTHRP6imIyj4WsvM484BWFQIIaETMTXQ&s" > {{user.name}}</td>
              <td>{{ user.email}}</td>
              <td>{{user.block?'Hoạt động':'Ko hoạt động'}}</td>
              <td>
                <button v-if="user.block" class="block user-button" @click="handleBlock(user.id,false)">chặn</button>
                <button v-if="!user.block" class="not_block user-button" @click="handleBlock(user.id,true)">bỏ chặn</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bottom_page">
          <Limit @updateLimit="handleLimit"></Limit>
          <Pagination
              :currentPage="params._page"
              :totalItem="allUsers.length"
              :itemInPage="params._limit"
              @handlePreviousPage="handlePage"
              @handleNextPage="handlePage"
              @handleNumberPage="handlePage"
        />
        </div>
    </section>
</template>
<style scoped>
.user-table {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

table th {
  background-color: rgba(0, 0, 255, 0.616);
  color: white;
  font-weight: bold;
  text-align: left;
  padding: 15px;
  font-size: 16px;
}

table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

table td img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

table tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s;
}

table th,
table td {
  text-align: left;
}

.status {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #e0e0e0;
  color: #333;
}

.status.active {
  background-color: #c8e6c9;
  color: green;
}

table a {
  color: #007bff;
  text-decoration: none;
}

table a:hover {
  text-decoration: underline;
}

.search_part {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  gap: 10px;
}

.search_part input {
  width: 250px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.user-button:active {
  transform: scale(0.95);
}

.block {
  background-color: #ff4d4f;
}

.not_block {
  background-color: cornflowerblue;
}

.bottom_page {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}
</style>