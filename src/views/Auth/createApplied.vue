<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "/src/axios.js"; // 引入自定义 axios 实例

// 表单数据
const question = ref("");
const answer = ref("");

// 路由实例
const router = useRouter();

// 提交表单
async function handleSubmit() {
  // 校验输入是否为空
  if (!question.value.trim() || !answer.value.trim()) {
    alert("请填写所有字段！");
    return;
  }

  // 构建填空题数据
  const newQuestion = {
    question: question.value.trim(),
    answer: answer.value.trim(),
  };

  try {
    // 调用后端接口
    const response = await axios.post("/applied", newQuestion);

    if (response.data.code === 200) {
      alert("创建成功！");
      router.push("/teacher"); // 返回到 /teacher 页面
    } else {
      throw new Error(response.data.msg || "未知错误");
    }
  } catch (error) {
    console.error("Error creating question:", error);
    alert("创建失败，请稍后重试！");
  }
}
</script>

<template>
  <div class="create-question-page">
    <!-- 页面标题 -->
    <h2>创建填空题</h2>

    <!-- 表单 -->
    <form class="form" @submit.prevent="handleSubmit">
      <!-- 输入问题 -->
      <div class="form-group">
        <label for="question">题目：</label>
        <textarea
          id="question"
          v-model="question"
          placeholder="请输入题目"
        ></textarea>
      </div>

      <!-- 输入答案 -->
      <div class="form-group">
        <label for="answer">正确答案：</label>
        <input
          id="answer"
          type="text"
          v-model="answer"
          placeholder="请输入正确答案"
        />
      </div>

      <!-- 提交按钮 -->
      <button type="submit" class="submit-button">提交</button>
    </form>
  </div>
</template>

<style scoped>
/* 页面样式 */
.create-question-page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100vw;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 16px;
  font-weight: bold;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 80%;
}

textarea {
  resize: none;
  height: 80px;
}

.submit-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
}

.submit-button:hover {
  background-color: #2980b9;
}
</style>
