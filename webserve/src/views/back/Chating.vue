<template>
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
      <el-menu-item index="4" disabled>聊天</el-menu-item>
  </el-menu>
    <div class="chat-container">
      <div class="chat-messages" ref="chatContainer">
        <div v-for="(message, index) in messages" :key="index" class="message">{{ message }}</div>
      </div>
      <div class="input-container">
        <div class="userid">用户：{{username }}</div>
        <input v-model="inputMessage" type="text" placeholder="输入消息">
        <el-button type="primary" @click="sendMessage('ruleForm')">提交</el-button>
      </div>
      <div>
        ここにメッセージを入力し、送信ボタンをクリックするとメッセージが送信されます。
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        messages: [], // 存储聊天消息
        inputMessage: '', // 输入框中的消息
        //获取时间
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
      };
    },
    mounted() {
      this.loadHistoryMessages(); // 在组件加载时调用加载历史消息的方法
      this.username = this.$route.query.username; // 从路由中获取用户名
      const now = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Shanghai',
      };
      const date = now.toLocaleString('en-US', options).split(', ')[0];
      const time = now.toLocaleString('en-US', options).split(', ')[1];
      [this.month, this.day, this.year] = date.split('/');
      [this.hour, this.minute, this.second] = time.split(':');
    },
    methods: {
        loadHistoryMessages() {
            axios.get('http://localhost:8081/api/history-messages') // 发送GET请求获取历史消息数据
            .then(response => {
            var msgs = response.data.msg; // 将返回的历史消息数据存储到messages数组中
            var user = response.data.user;
            //msgs是一个json数组，对他进行遍历
            for (var i = 0; i < msgs.length; i++) {
                this.messages.push(user[i] + ":" +msgs[i]);
            }
            this.scrollToBottom(); // 滚动到底部
        })
          .catch(error => {
          console.error('Failed to load history messages:', error);
        });
        },
      sendMessage() {
        if (this.inputMessage) {
          //实现往后端推送该消息进行存储
          axios.get('http://localhost:8081/api/send-message', {
            //必须要指定params参数，否则后端无法获取到该参数
            params: {
              username: this.username,
              message: this.year+"年"+ this.month+"月"+this.day+"日"+this.hour+"时"+this.minute+"分"+this.second+"秒 写到：" + this.inputMessage
            }
          }).then(response => {
            if (response.data.state == "right"){
              this.messages.push(this.username + ":" + this.year+"年"+ this.month+"月"+this.day+"日"+this.hour+"时"+this.minute+"分"+this.second+"秒 写到： " + this.inputMessage);
              this.inputMessage = ''; // 清空输入框中的消息
              this.scrollToBottom(); // 滚动到底部
            } else{
              alert("发送失败");
            }
          }).catch(error => {
            console.error('Failed to send message:', error);
          });
        }
      },
      scrollToBottom() {
        this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
      }
    }
  }
  </script>
  
  <style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 500px;
  }
  
  .chat-messages {
    background-image: url('../../assets/ChatBackgroud.png'); /* 设置背景图片路径 */
    flex-grow: 1;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  input[type="text"] {
    flex-grow: 1;
    height: 30px;
  }
  
  button {
    padding: 5px 10px;
  }

  .userid {
  border: 1px solid #000;
  padding: 7px;
}
  </style>