<script setup>
import { ref, onMounted } from "vue";
import axios from "/src/axios.js";
// 响应式填空题数组
const fillInTheBlanks = ref([]);
async function fetchFillInTheBlanks() {
  try {
    const response = await axios.get("/applied");
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取应用题失败");
    }
    fillInTheBlanks.value = response.data.data; // 保存应用题数据
  } catch (error) {
    console.error("Error fetching fillInTheBlanks:", error);
    alert("无法加载应用题，请稍后重试。");
  }
}

// 在组件挂载时请求数据
onMounted(() => {
  fetchFillInTheBlanks();
});
</script>

<template>
  <div>
    <!-- 页面标题 -->
    <h2>填空题题库</h2>

    <!-- 渲染填空题 -->
    <div id="fill-in-the-blanks-container">
      <div
        v-for="(question, index) in fillInTheBlanks"
        :key="question.id"
        class="applied"
      >
        <!-- 问题文本 -->
        <h3 class="question-text">{{ index + 1 }}. {{ question.question }}</h3>

        <!-- 正确答案 -->
        <p class="answer-text">
          正确答案: <strong>{{ question.answer }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 样式定义 */
#fill-in-the-blanks-container {
  margin-top: 20px;
}
h2 {
  text-align: center;
}

.applied {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-left: 120px;
  width: 80vw;
}

.question-text {
  font-size: 20px;
  margin-bottom: 10px;
}

.answer-text {
  margin-top: 10px;
  font-size: 16px;
  color: #27ae60;
}
</style>
