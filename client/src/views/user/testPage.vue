<script setup>
import axios from 'axios';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute,onBeforeRouteLeave,useRouter } from 'vue-router';
import Question from '../../components/question.vue';
import Total from '../../components/total.vue';
import queryString from 'query-string';
import { useStore } from 'vuex';
const store=useStore();
const route = useRoute();
const backendQuestions = computed(()=>store.state.questions.questions);
const totalQuestions = computed(()=>store.state.questions.allQuestions)
const yourAnswerList = reactive([]);
const totalPage = ref(0);
const params = ref({ _page: 1, _limit: 10, idTest: route.params.id });
const remainingTime = ref(0);
let interval=ref(0);
const router=useRouter();
onMounted(async() => {
    store.dispatch('getAllQuestions',`idTest=${route.params.id}`);
    store.dispatch('getFilterQuestions',queryString.stringify(params.value));
    
});
const handleNextPage = () => {
  params.value._page += 1;
  store.dispatch('getAllQuestions',`idTest=${route.params.id}`);
};
const handlePrevPage = () => {
  params.value._page -= 1;
  store.dispatch('getAllQuestions',`idTest=${route.params.id}`);
};
const formatTime = (ms) => {
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
const startTimer = (duration) => {
  remainingTime.value = duration;
  interval.value = setInterval(() => {
    if (remainingTime.value <= 0) {
      clearInterval(interval);
      router.push('/');
      return;
    }
    remainingTime.value -= 1000;
  }, 1000); 
};
const handleSubmit=()=>{
  router.push('/');
}
onBeforeRouteLeave((to,from,next)=>{
  if(remainingTime.value<=0){
    next();
    return;
  }
  if(confirm('Bạn có muốn thoát khỏi trang ko')){
    next();
  }
  next(false);
})
onUnmounted(()=>{
  clearInterval(interval.value);
})
const handleSetPosition = async (id, index) => {
  const element = document.getElementById(`question${id}`);
  if (element) {
    const rect = element.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.pageYOffset - 50,
      behavior: 'smooth',
    });
  } else {
    if (params.value._page <= totalPage.value) {
      params.value._page = Math.floor(index / params.value._limit) + 1;
      await fetchData();
      await handleSetPosition(id, index);
    }
  }
};
const handleAnswer = (answer) => {
  const index = yourAnswerList.findIndex(item => item.id === answer.id);
  if (index === -1) {
    yourAnswerList.push({ ...answer }); 
  } else {
    if (answer.answer !== "") {
      yourAnswerList.splice(index, 1, { ...answer }); 
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="main-content">
      <h2>Part 5</h2>
      <div v-for="(question, index) in backendQuestions" :key="question.id" :id="`question${question.id}`" class="question">
        <Question 
          @handleAnswer="handleAnswer" 
          :question="question" 
          :index="(params._page - 1) * params._limit + index" 
          :yourAnswerList="yourAnswerList"
        />
      </div>
      <div>
        <button v-if="params._page !== 1" @click="handlePrevPage()">PREV</button>
        <button v-if="params._page < totalPage" @click="handleNextPage()">NEXT</button>
      </div>
    </div>
    <Total 
      :totalQuestions="totalQuestions" 
      :handleSetPosition="handleSetPosition" 
      :yourAnswerList="yourAnswerList"
      :time="formatTime(remainingTime)"
      :handleSubmit="handleSubmit"
    >
    </Total>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  font-family: 'Arial', sans-serif;
}
.main-content {
  width: 1050px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
}
h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.question {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fafafa;
  border-left: 5px solid #007bff; 
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.question p {
  margin-bottom: 15px;
  font-size: 18px;
  color: #555; 
}
</style>
