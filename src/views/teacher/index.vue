<script setup>
const logout = () => {
  localStorage.removeItem("jwt"); // 清除登录状态
  window.location.href = "/";
};
const toExamLibrary = () => {
  window.location.href = "/teacher/examLibrary";
};
const toChoicebrary = () => {
  window.location.href = "/teacher/choiceLibrary";
};
const toAppliedLibrary = () => {
  window.location.href = "/teacher/appliedLibrary";
};
const toCreateExam = () => {
  window.location.href = "/teacher/createExam";
};
const toCreateChoice = () => {
  window.location.href = "/teacher/createChoice";
};
const toCreateApplied = () => {
  window.location.href = "/teacher/createApplied";
};
</script>
<template>
  <div class="teacher-home">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <h1 class="system-name">在线考试系统</h1>
      <div class="user-info">
        <span class="teacher-name">老师</span>
        <button @click="logout" class="logout-button">退出登录</button>
      </div>
    </header>

    <!-- 网格布局的内容区域 -->
    <div class="content">
      <!-- 3个上排模块 -->
      <div class="module exam-library" @click="toExamLibrary">试卷库</div>
      <div class="module choice-question-library" @click="toChoicebrary">
        选择题题库
      </div>
      <div class="module fill-in-question-library" @click="toAppliedLibrary">
        应用题题库
      </div>

      <!-- 3个下排模块 -->
      <div class="module create-exam" @click="toCreateExam">创建试卷</div>
      <div class="module create-choice-question" @click="toCreateChoice">
        创建选择题
      </div>
      <div class="module create-fill-in-question" @click="toCreateApplied">
        创建应用题
      </div>
    </div>
  </div>
</template>

<style scoped>
.teacher-home {
  font-family: Arial, sans-serif;
  background: #f4f6f9;
  margin-left: -10px;
  margin-top: -10px;
  width: 97vw;
  height: 100vh;
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
  width: 100%;
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

.teacher-name {
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

.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 创建3列 */
  grid-gap: 20px; /* 设置模块之间的间距 */
  padding: 20px;
  height: calc(100vh - 100px); /* 高度占满屏幕，减去navbar的高度 */
}

.module {
  background-color: #3498db;
  color: white;
  height: 250px; /* 模块的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.module:hover {
  transform: scale(1.05);
}

.exam-library {
  background-color: #3498db;
}

.choice-question-library {
  background-color: #2ecc71;
}

.fill-in-question-library {
  background-color: #f39c12;
}

.create-exam {
  background-color: #9b59b6;
}

.create-choice-question {
  background-color: #e74c3c;
}

.create-fill-in-question {
  background-color: #1abc9c;
}
</style>
