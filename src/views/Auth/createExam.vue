<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "/src/axios.js";

// 表单数据
const examName = ref("");
const selectedChoiceQuestions = ref([]); // 存储用户选择的选择题ID
const selectedFillQuestions = ref([]); // 存储用户选择的填空题ID

// 下拉框选项数据
const choiceQuestions = ref([]); // 存储获取的选择题选项
const fillQuestions = ref([]); // 存储获取的填空题选项

// 最大选择题和填空题的选择限制
const maxSelection = 5;

// 计算剩余可选数量
const remainingChoiceCount = computed(
  () => maxSelection - selectedChoiceQuestions.value.length
);
const remainingFillCount = computed(
  () => maxSelection - selectedFillQuestions.value.length
);

// 路由实例
const router = useRouter();

// 获取题库数据
onMounted(async () => {
  try {
    const response = await axios.get("/choice"); // 替换为实际的 API 地址
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取选择题失败");
    }
    choiceQuestions.value = response.data.data; // 保存选择题数据
  } catch (error) {
    console.error("Error fetching choiceQuestions:", error);
    alert("无法加载选择题，请稍后重试。");
  }
  try {
    const response = await axios.get("/applied");
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取应用题失败");
    }
    fillQuestions.value = response.data.data; // 保存应用题数据
  } catch (error) {
    console.error("Error fetching fillQuestions:", error);
    alert("无法加载应用题，请稍后重试。");
  }
});

// 提交表单
async function handleSubmit() {
  // 检查考试名字是否为空
  if (!examName.value.trim()) {
    alert("考试名字不能为空！");
    return;
  }

  // 检查选择题和填空题的选中数量是否满足要求
  if (selectedChoiceQuestions.value.length !== maxSelection) {
    alert(`请选择 ${maxSelection} 个选择题`);
    return;
  }

  if (selectedFillQuestions.value.length !== maxSelection) {
    alert(`请选择 ${maxSelection} 个填空题`);
    return;
  }

  // 构建请求数据
  const payload = {
    examPaper: { name: examName.value },
    choQues: selectedChoiceQuestions.value,
    appQues: selectedFillQuestions.value,
  };

  /*   // 发送请求到后端
  fetch("/exam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        alert("试卷创建成功！");
        router.push("/teacher"); // 跳转回教师页面
      } else {
        alert(`创建失败: ${data.msg}`);
      }
    })
    .catch(() => alert("服务器出错，请稍后重试")); */
  try {
    // 调用后端接口
    const response = await axios.post("/exam", payload);

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
  <div class="create-exam-page">
    <!-- 页面标题 -->
    <h2>创建试卷</h2>

    <!-- 表单 -->
    <form class="form" @submit.prevent="handleSubmit">
      <!-- 考试名字输入框 -->
      <div class="form-group">
        <label for="examName">考试名称:</label>
        <input
          id="examName"
          type="text"
          v-model="examName"
          placeholder="请输入考试名称"
        />
      </div>

      <!-- 选择题列表 -->
      <div class="form-group">
        <label for="choiceQuestions"
          >选择题（最多选择 {{ maxSelection }} 个，剩余可选数量：{{
            remainingChoiceCount
          }}）:</label
        >
        <select id="choiceQuestions" multiple v-model="selectedChoiceQuestions">
          <option
            v-for="question in choiceQuestions"
            :key="question.id"
            :value="question.id"
          >
            {{ question.id }}. {{ question.question }}
          </option>
        </select>
      </div>

      <!-- 填空题列表 -->
      <div class="form-group">
        <label for="fillQuestions"
          >填空题（最多选择 {{ maxSelection }} 个，剩余可选数量：{{
            remainingFillCount
          }}）:</label
        >
        <select id="fillQuestions" multiple v-model="selectedFillQuestions">
          <option
            v-for="question in fillQuestions"
            :key="question.id"
            :value="question.id"
          >
            {{ question.id }}. {{ question.question }}
          </option>
        </select>
      </div>

      <!-- 提交按钮 -->
      <button type="submit" class="submit-button">创建试卷</button>
    </form>
  </div>
</template>

<style scoped>
.create-exam-page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
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
}

label {
  font-size: 16px;
  font-weight: bold;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

select {
  height: 150px;
  width: 100%;
}

.submit-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #2980b9;
}
</style>
