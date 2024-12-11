<template>
  <div class="exam-detail-page">
    <h1>{{ examName }}</h1>
    <h2>试卷题目：</h2>
    <ul>
      <li v-for="(question, index) in questions" :key="index">
        <strong>{{ index + 1 }}. {{ question.question }}</strong>
        <p>答案：{{ question.answer }}</p>
      </li>
    </ul>
    <h2>学生完成情况：</h2>
    <ul>
      <li v-for="student in students" :key="student.stuId">
        {{ student.stuName }} - 分数: {{ student.score }} -
        {{ student.isFinish }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "/src/axios.js";

const route = useRoute();
const examId = route.params.id;

const examName = ref("");
const questions = ref([]);
const students = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`/exam/id/${examId}`); // 替换为实际 API 地址
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取试卷详情失败");
    }
    const data = response.data.data;
    examName.value = data.exam.name;
    questions.value = [
      ...data.appQue.slice(0, 10),
      ...data.choQue.slice(0, 10),
    ]; // 取前 10 道题目
    students.value = data.stuScores;
    console.log(data.stuScores);
  } catch (error) {
    console.error("Error fetching exam details:", error);
    alert("无法加载试卷详情，请稍后重试。");
  }
});
</script>

<style scoped>
.exam-detail-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 90vw;
}

h1,
h2 {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
</style>
