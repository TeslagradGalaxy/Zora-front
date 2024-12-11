<script setup>
import { ref, onMounted } from "vue";
import axios from "/src/axios.js";

// 响应式选择题数组
const questions = ref([]);

// 获取选择题的函数
async function fetchQuestions() {
  try {
    const response = await axios.get("/choice"); // 替换为实际的 API 地址
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取选择题失败");
    }
    questions.value = response.data.data; // 保存选择题数据
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("无法加载选择题，请稍后重试。");
  }
}

// 在组件挂载时请求数据
onMounted(() => {
  fetchQuestions();
});
</script>

<template>
  <div>
    <!-- 页面标题 -->
    <h2>选择题题库</h2>

    <!-- 渲染选择题 -->
    <div id="questions-container">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="test"
      >
        <!-- 问题文本 -->
        <h3 class="question-text">{{ index + 1 }}. {{ question.question }}</h3>

        <!-- 选项 -->
        <div class="options">
          <div
            class="option"
            v-for="optionKey in ['A', 'B', 'C', 'D']"
            :key="optionKey"
          >
            <input
              type="radio"
              :name="`question-${question.id}`"
              :id="`option-${optionKey}-${question.id}`"
            />
            <label :for="`option-${optionKey}-${question.id}`">
              {{ optionKey }}. {{ question[`option${optionKey}`] }}
            </label>
          </div>
        </div>

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
#questions-container {
  margin-top: 20px;
}
h2 {
  text-align: center;
}

.test {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-left: 50px;
  width: 90vw;
}

.question-text {
  font-size: 20px;
  margin-bottom: 10px;
}

.options {
  display: flex;
  gap: 15px;
}

.option {
  display: flex;
  align-items: center;
}

.option input {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.option label {
  font-size: 16px;
  color: #333;
}

.answer-text {
  margin-top: 10px;
  font-size: 16px;
  color: #27ae60;
}
</style>
