<script setup>
import { defineProps, defineEmits } from "vue";
let props = defineProps({
  id: Number,
  name: String,
  isFinish: Number,
  score: Number,
});
const emit = defineEmits();
console.log(props);
</script>
<template>
  <div class="exam-item">
    <div class="exam-info">
      <h3 class="exam-name">{{ name }}</h3>
      <p class="exam-status">状态：{{ isFinish ? "已完成" : "未完成" }}</p>
      <p class="exam-score">得分：{{ score }}</p>
    </div>
    <button
      class="start-exam-button"
      :disabled="isFinish"
      @click="emit('startExam', id)"
    >
      {{ isFinish ? "已完成" : "进入考试" }}
    </button>
  </div>
</template>

<style scope>
.exam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  width: 1200px; /* 占据一整行 */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-left: 300px;
}

.exam-info {
  display: flex;
  gap: 100px; /* 每个信息之间的间距 */
  align-items: center; /* 垂直居中 */
  flex: 1; /* 拉伸填充左侧空间 */
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

.start-exam-button {
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
</style>
