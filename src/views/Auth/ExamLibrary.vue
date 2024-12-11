<template>
  <div class="exam-list-page">
    <h1>试卷列表</h1>
    <div v-for="exam in exams" :key="exam.examPaper.id" class="exam-item">
      <p>
        <strong>{{ exam.examPaper.name }}</strong> - 已完成:
        {{ exam.finishNum }} 人
      </p>
      <button @click="viewExam(exam.examPaper.id)">查看试卷</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "/src/axios.js";

const exams = ref([]); // 保存试卷数据
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get("/exam"); // 替换为实际 API 地址
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取试卷列表失败");
    }
    exams.value = response.data.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    alert("无法加载试卷列表，请稍后重试。");
  }
});

function viewExam(id) {
  router.push(`/teacher/ExamLibraryDetail/exam/${id}`); // 跳转到试卷详情页面
}
</script>

<style scoped>
.exam-list-page {
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff, #f1f1f1);
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.exam-item {
  display: flex;
  justify-content: space-between;
  margin-left: 160px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
  width: 70%;
}

.exam-item:hover {
  background-color: #f9f9f9;
}

p {
  margin: 0;
  font-size: 1rem;
  color: #555;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

button:active {
  background-color: #004080;
}
</style>
