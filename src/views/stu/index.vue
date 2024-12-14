<template>
  <div class="student-home">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <h1 class="system-name">在线考试系统</h1>
      <div class="user-info">
        <span class="student-name">{{ studentName }}</span>
        <button @click="logout" class="logout-button">退出登录</button>
      </div>
    </header>

    <!-- 试卷列表 -->
    <div class="exam-list">
      <div v-for="exam in examList" :key="exam.examPaper.id" class="exam-item">
        <div class="exam-info">
          <h3 class="exam-name">{{ exam.examPaper.name }}</h3>
          <p class="exam-status">
            状态：{{ exam.isFinish ? "已完成" : "未完成" }}
          </p>
          <p class="exam-score">得分：{{ exam.score }}</p>
        </div>
        <!-- 导出试卷按钮 -->
        <button
          v-if="exam.isFinish"
          class="export-exam-button"
          @click="exportExam(exam.examPaper?.id)"
        >
          导出试卷
        </button>
        <!-- 开始考试按钮 -->
        <button
          class="start-exam-button"
          :disabled="exam.isFinish"
          @click="startExam(exam.examPaper?.id)"
        >
          {{ exam.isFinish ? "已完成" : "进入考试" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "/src/axios.js";
const router = useRouter();
const studentName = ref("学生");
const examList = ref([]);

// 页面挂载时获取试卷数据
onMounted(async () => {
  try {
    const response = await axios.get("/stu/exam");
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取试卷列表失败");
    }
    examList.value = response.data.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    alert("无法加载试卷列表，请稍后重试。");
  }
});

// 导出试卷函数
const exportExam = async (examId) => {
  try {
    const response = await axios.post(`/stu/exam/print/${examId}`);
    if (response.data.code === 200) {
      alert("试卷已导出！");
    } else {
      alert("导出失败：" + response.data.msg);
    }
  } catch (error) {
    console.error("导出试卷错误：", error);
    alert("导出试卷时出现错误！");
  }
};

// 退出登录
const logout = () => {
  localStorage.removeItem("jwt");
  window.location.href = "/";
};

// 进入考试
function startExam(examId) {
  router.push(`/exam/${examId}`); // 跳转到试卷详情页面
}
</script>

<style scoped>
.student-home {
  font-family: Arial, sans-serif;
  height: 100vh;
  width: 100vw;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  color: #ecf0f1;
  padding: 10px 20px;
  height: 80px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.system-name {
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}
.student-name {
  font-size: 18px;
}
.logout-button {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.exam-list {
  margin-top: 20px;
  padding: 10px 20px;
}
.exam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  width: 1200px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-left: 300px;
}

.exam-info {
  display: flex;
  gap: 100px;
  align-items: center;
  flex: 1;
}

.exam-name,
.exam-status,
.exam-score {
  font-size: 20px;
  color: #333;
  margin: 0;
}
.exam-name {
  font-weight: bold;
}

.start-exam-button,
.export-exam-button {
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
}

.start-exam-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.export-exam-button {
  margin-right: 10px;
  background: #2ecc71;
}

.export-exam-button:hover {
  background: #27ae60;
}
</style>
