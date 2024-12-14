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
    const response = await axios.get("/choice");
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取选择题失败");
    }
    choiceQuestions.value = response.data.data;
  } catch (error) {
    console.error("Error fetching choiceQuestions:", error);
    alert("无法加载选择题，请稍后重试。");
  }
  try {
    const response = await axios.get("/applied");
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取应用题失败");
    }
    fillQuestions.value = response.data.data;
  } catch (error) {
    console.error("Error fetching fillQuestions:", error);
    alert("无法加载应用题，请稍后重试。");
  }
});

// 提交表单
async function handleSubmit() {
  if (!examName.value.trim()) {
    alert("考试名字不能为空！");
    return;
  }

  if (selectedChoiceQuestions.value.length !== maxSelection) {
    alert(`请选择 ${maxSelection} 个选择题`);
    return;
  }

  if (selectedFillQuestions.value.length !== maxSelection) {
    alert(`请选择 ${maxSelection} 个填空题`);
    return;
  }

  const payload = {
    examPaper: { name: examName.value },
    choQues: selectedChoiceQuestions.value,
    appQues: selectedFillQuestions.value,
  };

  try {
    const response = await axios.post("/exam", payload);
    if (response.data.code === 200) {
      alert("创建成功！");
      router.push("/teacher");
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
    <h2>创建试卷</h2>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="examName">考试名称:</label>
        <input
          id="examName"
          type="text"
          v-model="examName"
          placeholder="请输入考试名称"
        />
      </div>

      <!-- 选择题下拉复选框 -->
      <div class="form-group">
        <label
          >选择题（最多选择 {{ maxSelection }} 个，剩余可选数量：{{
            remainingChoiceCount
          }}）：</label
        >
        <div class="dropdown">
          <div class="dropdown-content">
            <div
              v-for="question in choiceQuestions"
              :key="question.id"
              class="dropdown-item"
            >
              <input
                type="checkbox"
                :id="`choice-${question.id}`"
                :value="question.id"
                v-model="selectedChoiceQuestions"
                :disabled="
                  !selectedChoiceQuestions.includes(question.id) &&
                  selectedChoiceQuestions.length >= maxSelection
                "
              />
              <label :for="`choice-${question.id}`">
                {{ question.id }}. {{ question.question }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 应用题下拉复选框 -->
      <div class="form-group">
        <label
          >应用题（最多选择 {{ maxSelection }} 个，剩余可选数量：{{
            remainingFillCount
          }}）：</label
        >
        <div class="dropdown">
          <div class="dropdown-content">
            <div
              v-for="question in fillQuestions"
              :key="question.id"
              class="dropdown-item"
            >
              <input
                type="checkbox"
                :id="`fill-${question.id}`"
                :value="question.id"
                v-model="selectedFillQuestions"
                :disabled="
                  !selectedFillQuestions.includes(question.id) &&
                  selectedFillQuestions.length >= maxSelection
                "
              />
              <label :for="`fill-${question.id}`">
                {{ question.id }}. {{ question.question }}
              </label>
            </div>
          </div>
        </div>
      </div>

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
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input#examName {
  height: 36px; /* 增大高度 */
  font-size: 18px; /* 增大字体大小 */
  padding: 10px; /* 增大内边距，增强视觉舒适感 */
  border-radius: 5px;
}
.dropdown {
  position: relative;
}

.dropdown-content {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  padding: 10px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
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
