<template>
  <div class="exam-container">
    <h1>{{ examPaper.name }}</h1>
    <form @submit.prevent="submitExam">
      <!-- 循环生成选择题 -->
      <div
        v-for="(question, index) in stuChoWithRes"
        :key="question.choiceQuestion.id"
        class="choice-question"
      >
        <h3>{{ index + 1 }}. {{ question.choiceQuestion.question }}</h3>
        <div>
          <label v-for="option in ['A', 'B', 'C', 'D']" :key="option">
            <input
              type="radio"
              :name="'choice-' + question.choiceQuestion.id"
              :value="option"
              v-model="question.res"
              required
            />
            {{ question.choiceQuestion["option" + option] }}
          </label>
        </div>
      </div>

      <!-- 循环生成填空题 -->
      <div
        v-for="(question, index) in stuAppWithRes"
        :key="question.appliedQuestion.id"
        class="applied-question"
      >
        <h3>
          {{ index + 6 }}.
          {{ question.appliedQuestion.question }}
        </h3>
        <textarea
          v-model="question.res"
          :placeholder="'请输入答案'"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">交卷</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "/src/axios.js";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const examId = route.params.examId;

const examPaper = ref({});
const stuChoWithRes = ref([]);
const stuAppWithRes = ref([]);

// 获取试卷数据
const fetchExamData = async () => {
  try {
    const response = await axios.get(`/stu/exam/id/${examId}`);
    if (response.data.code === 200) {
      const data = response.data.data;
      examPaper.value = data.examPaper;
      stuChoWithRes.value = data.stuChoWithRes;
      stuAppWithRes.value = data.stuAppWithRes;
    } else {
      console.error("获取试卷失败", response.data.msg);
    }
  } catch (error) {
    console.error("请求错误", error);
  }
};

// 提交试卷
const submitExam = async () => {
  try {
    const payload = {
      examPaper: examPaper.value,
      stuChoWithRes: stuChoWithRes.value,
      stuAppWithRes: stuAppWithRes.value,
    };
    const response = await axios.post("/stu/exam", payload);
    if (response.data.code === 200) {
      alert(`考试提交成功，您的得分是 ${response.data.data}`);
      router.push("/stu");
    } else {
      alert("提交失败：" + response.data.msg);
    }
  } catch (error) {
    console.error("提交错误", error);
    alert("提交试卷时出现错误！");
  }
};

// 初次加载时获取试卷
onMounted(() => {
  fetchExamData(examId);
});
</script>

<style scoped>
.exam-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  color: #333;
}
.choice-question,
.applied-question {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
}
textarea {
  width: 100%;
  height: 80px;
  resize: none;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #0056b3;
}
</style>
