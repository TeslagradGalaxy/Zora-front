<script setup>
import { ref, onMounted } from "vue";
import axios from "/src/axios.js";

// 响应式填空题数组
const fillInTheBlanks = ref([]);

// 获取应用题列表
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

// 删除特定的应用题
async function deleteQuestion(id) {
  const confirmation = confirm("确定要删除这道题吗？");
  if (!confirmation) return;

  try {
    const response = await axios.delete(`/applied/${id}`);
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "删除失败");
    }
    // 从列表中移除删除的题目
    fillInTheBlanks.value = fillInTheBlanks.value.filter(
      (question) => question.id !== id
    );
    alert("删除成功！");
  } catch (error) {
    console.error("Error deleting question:", error);
    alert("删除失败，请稍后重试。");
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
    <h2>应用题题库</h2>

    <!-- 渲染应用题 -->
    <div id="fill-in-the-blanks-container">
      <div
        v-for="(question, index) in fillInTheBlanks"
        :key="question.id"
        class="applied"
      >
        <!-- 包裹内容和按钮的容器 -->
        <div class="question-content">
          <!-- 问题文本 -->
          <h3 class="question-text">
            {{ index + 1 }}. {{ question.question }}
          </h3>

          <!-- 删除按钮 -->
          <button @click="deleteQuestion(question.id)">删除此题</button>
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

/* 新增的 flex 布局容器样式 */
.question-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.question-text {
  font-size: 20px;
}

/* 正确答案样式 */
.answer-text {
  margin-top: 10px;
  font-size: 16px;
  color: #27ae60;
}

/* 删除按钮样式 */
button {
  padding: 8px 16px;
  background-color: rgb(237, 38, 38);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}
</style>
