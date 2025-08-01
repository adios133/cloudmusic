<script setup lang="ts">
import { logIn } from "@/api/login";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import useStore from "@/store";
defineOptions({
  name: "Login"
});
const route = useRoute();
const router = useRouter();
const store = useStore();
const fromPath = <string>route.meta.__fromPath__;
const phone = ref("");
const password = ref("");
const goLogin = async () => {
  // 前端验证
  const phoneReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  const passwordReg = /^[a-zA-Z]\w{5,17}$/;
  if (!phoneReg.test(phone.value)) {
    Toast.fail({
      message: "手机号格式不正确",
      duration: 1500
    });
    return;
  }
  if (!passwordReg.test(password.value)) {
    Toast.fail({
      message: "密码格式不正确",
      duration: 1500
    });
    return;
  }
  const res = await logIn(phone.value, password.value);
  if (res.code === 200) {
    store.setUid(res.profile.userId);
    Toast.success({
      message: "登陆成功",
      duration: 1200,
      onClose: () => {
        router.push(fromPath);
        location.reload();
      }
    });
  }
  if (res.code === 502) {
    Toast.fail({
      message: res.message,
      duration: 1500
    });
  }
  if (res.code === 400) {
    Toast.fail({
      message: "手机号错误",
      duration: 1500
    });
  }
};
</script>

<template>
  <div id="login">
    <h3 class="welcome">欢迎回来</h3>
    <form class="login-form">
      <div class="account">
        <div class="name">手机账号：</div>
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="phone"
          focus="true"
        />
      </div>
      <div class="password">
        <div class="name">密码：</div>
        <input
          type="password"
          placeholder="请输入密码"
          v-model="password"
          autocomplete="false"
        />
      </div>
      <div class="loginBtn" @click="goLogin">登录</div>
      <div class="reset-pwd">
        忘记密码?<span class="iconfont icon-more"></span>
      </div>
    </form>
    <div class="create-account">
      <span>还没有账号？</span>
      <span>立即创建</span>
      <span class="iconfont icon-more"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
#login {
  .welcome {
    margin: 70px 30px;
    font-size: 40px;
    color: #555;
  }
  .login-form {
    width: 80%;
    margin: 0 auto;
    color: #333;
    font-size: 16px;
    .name {
      margin: 10px 3px;
      font-size: 18px;
    }
    input {
      width: 100%;
      height: 40px;
      text-indent: 20px;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
    .loginBtn {
      width: 100%;
      height: 45px;
      line-height: 45px;
      margin: 30px 0;
      color: #fff;
      text-align: center;
      background-color: #ec4141;
      border-radius: 25px;
    }
    .reset-pwd {
      color: #5870da;
      text-align: center;
      font-size: 14px;
      span {
        color: #555;
      }
    }
  }
  .create-account {
    position: relative;
    top: 100px;
    left: 50%;
    width: 80%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 13px;
    span:nth-child(2) {
      color: #5870da;
    }
  }
}
</style>
