<template>
  <div class="background-container">
    <h1>在线考试系统</h1>
    <div class="login-container">
      <h2>登录</h2>
      <div class="input-group">
        <label for="username">用户Id</label>
        <img src="/src/assets/icons/user.svg" alt="User Icon" />
        <input
          type="text"
          id="id"
          v-model="user.id"
          placeholder="请输入用户Id"
        />
      </div>
      <div class="input-group">
        <label for="password">密码</label>
        <img src="/src/assets/icons/lock.svg" alt="Password Icon" />
        <input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="请输入密码"
        />
      </div>
      <!-- 身份选择器 -->
      <div class="input-group">
        <label for="identity">身份</label>
        <div class="identity-selector">
          <button
            v-for="option in identities"
            :key="option.value"
            :class="[
              'identity-option',
              user.identity === option.value ? 'selected' : '',
            ]"
            @click="selectIdentity(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
      <!--登录按钮  -->
      <button class="login-button" @click="handleLogin">登录</button>
      <!-- 点击按钮触发 login 方法 -->
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>
<script>
import axios from "../axios";
export default {
  data() {
    return {
      user: {
        id: "",
        password: "",
        identity: "",
      },
      identities: [
        { label: "学生", value: "0" },
        { label: "老师", value: "1" },
        { label: "管理员", value: "2" },
      ],
      error: "",
    };
  },
  methods: {
    selectIdentity(value) {
      this.user.identity = value; // 更新用户身份
    },
    async handleLogin() {
      if (this.user.identity === null) {
        alert("请选择身份");
        return;
      }
      const body = JSON.stringify(this.user);
      console.log(body);
      try {
        const response = await axios.post("/login", body);
        console.log(response);
        if (response.data.code === 200) {
          const jwt = response.data.data; // 获取后端返回的 JWT
          localStorage.setItem("jwt", jwt); // 保存 JWT 到浏览器的 Local Storage
          alert("登录成功!");
          switch (this.user.identity) {
            case "0":
              this.$router.push("/stu");
              console.log("进入学生主页");
              break;
            case "1":
              this.$router.push("/teacher");
              console.log("进入教师主页");
              break;
            case "2":
              this.$router.push("/admin");
              console.log("进入管理员主页");
              break;
          }
        } else {
          this.error = "Invalid id or password";
        }
      } catch (error) {
        console.error(error);
        this.error = "An error occurred during login.";
      }
    },
  },
};
</script>

<style scoped>
.background-container {
  height: 100vh; /* 让背景充满视口 */
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/tw.jpg") no-repeat center center fixed;
  background-size: cover;
}
.login-container {
  background-color: #fff;
  padding: 40px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}
.input-group label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}
.input-group {
  position: relative;
  margin-bottom: 20px;
}
.input-group input {
  width: 90%;
  padding: 10px 10px 10px 35px;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.input-group img {
  position: absolute;
  left: 3%;
  top: 68%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
}
.login-button {
  background: linear-gradient(to right, #ff758c, #ff7eb3);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  margin-top: 20px;
  font-size: 15px;
}
.login-button:hover {
  opacity: 0.9;
}
.identity-selector {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.identity-option {
  padding: 10px 15px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}
.identity-option.selected {
  background: linear-gradient(to right, #ff758c, #ff7eb3);
  color: white;
  border: none;
}
h1 {
  position: absolute;
  top: 10%; /* 页面顶部 10% 的位置 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 调整位置，确保居中 */
  font-size: 36px;
  color: #fff;
  z-index: 2; /* 确保标题在登录框上方 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 为文字添加阴影 */
}
</style>
