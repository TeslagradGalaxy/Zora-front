<template>
  <div class="exam-container">
    <!-- 试卷标题和倒计时 -->
    <div class="header">
      <h1>{{ examPaper.name }}</h1>
      <p class="countdown">剩余时间: {{ minutes }}:{{ seconds }}</p>
    </div>

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
import { ref, onMounted, onUnmounted } from "vue";
import axios from "/src/axios.js";
import { useRoute, useRouter } from "vue-router";

// 路由和参数
const route = useRoute();
const router = useRouter();
const examId = route.params.examId;

// 响应式数据
const examPaper = ref({});
const stuChoWithRes = ref([]);
const stuAppWithRes = ref([]);

// 倒计时相关
const minutes = ref(10);
const seconds = ref(0);
let countdownTimer = null;

// 倒计时函数
const startCountdown = () => {
  countdownTimer = setInterval(() => {
    if (seconds.value === 0) {
      if (minutes.value === 0) {
        clearInterval(countdownTimer);
        submitExam(); // 时间结束自动提交
      } else {
        minutes.value--;
        seconds.value = 59;
      }
    } else {
      seconds.value--;
    }
  }, 1000);
};

// 停止倒计时函数
const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
};

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
  stopCountdown(); // 停止倒计时
  try {
    const payload = {
      examPaper: examPaper.value,
      stuChoWithRes: stuChoWithRes.value,
      stuAppWithRes: stuAppWithRes.value,
    };
    const response = await axios.post("/stu/exam", payload);
    if (response.data.code === 200) {
      alert(`考试提交成功，您的得分是 ${response.data.data}`);
      console.log(response.data.data);
      router.push("/stu");
    } else {
      alert("提交失败：" + response.data.msg);
    }
  } catch (error) {
    console.error("提交错误", error);
    alert("提交试卷时出现错误！");
  }
};

// 页面挂载和销毁
onMounted(() => {
  fetchExamData();
  startCountdown(); // 开始倒计时
});

onUnmounted(() => {
  stopCountdown(); // 组件卸载时停止倒计时
});
</script>

<style scoped>
.exam-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.countdown {
  font-size: 18px;
  color: #e74c3c;
  font-weight: bold;
}

.choice-question,
.applied-question {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.choice-question h3,
.applied-question h3 {
  font-size: 18px;
  font-weight: 500;
  color: #444;
  margin-bottom: 10px;
}

.choice-question label,
.applied-question label {
  display: block;
  font-size: 16px;
  color: #555;
  margin: 8px 0;
  padding: 8px 12px;
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  border: transparent;
  transition: background-color 0.3s, border-color 0.3s;
}

.choice-question label:hover,
.applied-question label:hover {
  background-color: #e7f3ff;
  border-color: #007bff;
}

textarea {
  width: 80%;
  height: 80px;
  resize: none;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
