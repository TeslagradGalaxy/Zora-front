<script setup>
import { ref, onMounted } from "vue";
import axios from "/src/axios.js";
// 模拟后端数据
const logs = ref([]);

onMounted(async () => {
  // 模拟获取日志数据
  try {
    const response = await axios.get("/log");
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || "获取日志失败");
    }
    logs.value = response.data.data; // 获取日志数据
  } catch (error) {
    console.error("Error fetching logs:", error);
    alert("无法加载日志，请稍后重试。");
  }
});

const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString();
};

const logout = () => {
  localStorage.removeItem("jwt"); // 清除登录状态
  window.location.href = "/";
};
</script>

<template>
  <div class="admin-home">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <h1 class="system-name">在线考试系统</h1>
      <div class="user-info">
        <span class="admin-name">管理员</span>
        <button @click="logout" class="logout-button">退出登录</button>
      </div>
    </header>

    <!-- 网格布局的内容区域 -->
    <div class="content">
      <h2>操作日志</h2>
      <table class="logs-table">
        <thead>
          <tr>
            <th>用户 ID</th>
            <th>用户名</th>
            <th>身份</th>
            <th>操作时间</th>
            <th>类名</th>
            <th>方法名</th>
            <th>参数</th>
            <th>返回值</th>
            <th>耗时 (ms)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in logs" :key="index">
            <td>{{ log.userId }}</td>
            <td>{{ log.userName }}</td>
            <td>{{ log.userIdentity }}</td>
            <td>{{ formatTime(log.operateTime) }}</td>
            <td>{{ log.className }}</td>
            <td>{{ log.methodName }}</td>
            <td>
              <pre class="log-params">{{ log.methodParams }}</pre>
            </td>
            <td>{{ log.returnValue }}</td>
            <td>{{ log.costTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-home {
  font-family: Arial, sans-serif;
  background: #f4f6f9;
  width: 100vw;
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
}

.system-name {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
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
  padding: 20px;
}

.logs-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logs-table th,
.logs-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.logs-table th {
  background: #2c3e50;
  color: white;
}

.logs-table tr:nth-child(even) {
  background: #f4f6f9;
}

.log-params {
  white-space: pre-wrap;
  font-size: 12px;
  max-height: 100px;
  overflow-y: auto;
}
</style>
