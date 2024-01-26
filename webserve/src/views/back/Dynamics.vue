<template>
    <div class="container">
      <div>因为服务器算力较差，所以这个模块对于图片加载可能会很慢，即使我用了更加强大的技术，还是会有点慢</div>
      <div>所以请耐心等待，如果图片加载不出来，可以刷新一下页面</div>
      <div>用户：{{username }}</div>
      <div class="input-area">
        <textarea v-model="inputText" placeholder="输入文字"></textarea>
        <input type="file" @change="selectImage" accept="image/*" />
        <el-button type="primary" @click="sendMessage('ruleForm')">发送</el-button>
      </div>
      <div class="display-area">
        <el-row>
      <el-col v-for="(message, index) in messages" :key="index" class="message">
        <el-card :body-style="{ padding: '0px' }">
          <img v-if="message.image" :src="message.image" alt="发送的图片" style="max-width: 100%; height: auto;"/>
          <div style="padding: 14px"><p>{{ message.text }}</p></div>
        </el-card> 
      </el-col>
    </el-row>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default { 
    name: 'DynamicPage',
    data() {
      return {
        inputText: '',
        selectedImage: null,
        messages: [],// 存储聊天消息
        username: '',
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
      this.loadHistoryDyn(); // 在组件加载时调用加载历史消息的方法
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
      //加载历史的动态消息
      loadHistoryDyn() {
            axios.get('http://localhost:8081/api/history-dynamics') // 发送GET请求获取历史消息数据
            .then(response => {
            var msgs = response.data.msg; // 将返回的历史消息数据存储到messages数组中
            var user = response.data.user;
            var img = response.data.dyn;
            //msgs是一个json数组，对他进行遍历
            for (var i = 0; i < msgs.length; i++) {
                var mess = {
                  text: user[i] + ":" + msgs[i],
                  image: "data:image/jpeg;base64," + img[i],
                };
                this.messages.push(mess);
            }
            
        })
          .catch(error => {
          console.error('Failed to load history messages:', error);
        });
        },

      selectImage(event) {
        this.selectedImage = event.target.files[0];
      },

      //获取图片和文字，并且向后端发送动态。
      sendMessage() {
        const message = {
          text: this.username + ":"+ this.year+"年"+ this.month+"月"+this.day+"日"+this.hour+"时"+this.minute+"分"+this.second+"秒 写到：" + this.inputText,
          image: null,
        };
  
        if (this.selectedImage) {
          const reader = new FileReader();
          reader.onload = () => {
            message.image = reader.result;
            console.log(reader.result);
            const imageBase64 = reader.result.split(',')[1];
            axios.get('http://localhost:8081/api/send-dynamics', {
            //必须要指定params参数，否则后端无法获取到该参数
              params: {
                msg : this.year+"年"+ this.month+"月"+this.day+"日"+this.hour+"时"+this.minute+"分"+this.second+"秒 写到：" +this.inputText,
                img : imageBase64,
                user : this.username,
              }
            }).then(response => {
                if (response.data.state == "right"){
                  alert("发送成功");
                  this.messages.push(message);
                  this.clearInput();
                } else{
                  alert("发送失败");
              }
            }).catch(error => {
                console.error('Failed to send message:', error);
            });
          };
          reader.readAsDataURL(this.selectedImage);
        } else {
          this.messages.push(message);
          this.clearInput();
        }
      },

      //对于之前的资源进行清理
      clearInput() {
        this.inputText = '';
        this.selectedImage = null;
      }
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .input-area {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  textarea {
    width: 300px;
    height: 45px;
    resize: vertical;
    margin-right: 10px;
  }
  
  .display-area {
    /* max-height: 400px;
    overflow-y: scroll; */
    background-image: url('../../assets/ChatBackgroud.png'); /* 设置背景图片路径 */
    flex-grow: 1;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    width: 1000px;
    height: 600px;
  }
  
  .message {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>