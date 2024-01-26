<template>
  <div class="home" >
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1"><router-link to="/Login">登录</router-link></el-menu-item>
    <el-sub-menu index="2" disabled>
      <template #title>工具</template>
      <el-menu-item index="2-1" disabled><router-link to="https://blog.csdn.net/m0_64091529?type=blog">CSDN</router-link></el-menu-item>
      <el-menu-item index="2-2" disabled><router-link to="https://chat.tomyres.com/#/pages/web/index">ChatGPT</router-link></el-menu-item>
      <el-menu-item index="2-3" disabled><router-link to="/Chating">聊天</router-link></el-menu-item>
      <el-sub-menu index="2-4" disabled>
        <template #title>其他</template>
        <el-menu-item index="2-4-1"><router-link to="/Dynamics">动态</router-link></el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4" disabled>交流</el-menu-item>
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