<template>
    <div class="home" >
      <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
    <el-menu-item index="1">{{ username }}</el-menu-item>
      <el-sub-menu index="2">
        <template #title>工具</template>
        <el-menu-item index="2-1"><router-link to="https://blog.csdn.net/m0_64091529?type=blog">CSDN</router-link></el-menu-item>
        <el-menu-item index="2-2"><router-link to="https://chat.tomyres.com/#/pages/web/index">ChatGPT</router-link></el-menu-item>
        <el-menu-item index="2-3"><router-link to="https://www.bilibili.com/">bilibili</router-link></el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>其他</template>
          <el-menu-item index="2-4-1">love</el-menu-item>
          <el-menu-item index="2-4-2"><router-link to="https://survivesjtu.gitbook.io/survivesjtumanual/li-zhi-pian/ben-ke-si-nian-yao-zuo-shen-me">你想要做什么</router-link></el-menu-item>
          <el-menu-item index="2-4-3"><router-link to="https://www.4kvm.net/">免费高清视频</router-link></el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3">动态</el-menu-item>
      <el-menu-item index="4">聊天</el-menu-item>
    </el-menu>
    
    <!-- 主页面的内容 -->
    <el-row>
      <el-col
        v-for="(o, index) in 2"
        :key="o"
        :span="8"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="../assets/index.jpg"
            class="image"
          />
          <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <el-button text class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col
        v-for="(o, index) in 2"
        :key="o"
        :span="8"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="../assets/index1.jpg"
            class="image"
          />
          <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <el-button text class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  
    </div>
  </template>
  
  
  <script>
  import { ref } from 'vue';


  export default {
    data() {
      return {
        username: '',
      };
    },
    mounted() {
      this.username = this.$route.query.username; // 从路由中获取用户名
    },
    methods: {
      handleSelect(index) {
      if (index === '4') {
        this.$router.push({ path: '/Chating', query: { username: this.username } });
      }
      if (index === '3') {
        this.$router.push({ path: '/Dynamics', query: { username: this.username } });
      }
      if (index === '2-4-1') {
        this.$router.push({ path: '/Star' });
      }
    },
    }
  }
  </script>


  
  <style>
  .time {
    font-size: 12px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .button {
    padding: 0;
    min-height: auto;
  }
  
  .image {
    width: 100%;
    display: block;
  }
  </style>