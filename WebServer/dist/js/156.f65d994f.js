"use strict";(self["webpackChunkwebserve"]=self["webpackChunkwebserve"]||[]).push([[156],{8156:function(e,t,s){s.r(t),s.d(t,{default:function(){return w}});var i=s(3396),a=s(7139),n=s(9242);const o={class:"chat-container"},l={class:"chat-messages",ref:"chatContainer"},u={class:"input-container"},d={class:"userid"},h=(0,i._)("div",null," ここにメッセージを入力し、送信ボタンをクリックするとメッセージが送信されます。 ",-1);function r(e,t,s,r,m,c){const g=(0,i.up)("el-menu-item"),p=(0,i.up)("router-link"),w=(0,i.up)("el-sub-menu"),f=(0,i.up)("el-menu"),_=(0,i.up)("el-button");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(f,{"default-active":e.activeIndex,class:"el-menu-demo",mode:"horizontal",onSelect:e.handleSelect},{default:(0,i.w5)((()=>[(0,i.Wm)(g,{index:"1"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(m.username),1)])),_:1}),(0,i.Wm)(w,{index:"2"},{title:(0,i.w5)((()=>[(0,i.Uk)("工具")])),default:(0,i.w5)((()=>[(0,i.Wm)(g,{index:"2-1"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{to:"https://blog.csdn.net/m0_64091529?type=blog"},{default:(0,i.w5)((()=>[(0,i.Uk)("CSDN")])),_:1})])),_:1}),(0,i.Wm)(g,{index:"2-2"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{to:"https://chat.tomyres.com/#/pages/web/index"},{default:(0,i.w5)((()=>[(0,i.Uk)("ChatGPT")])),_:1})])),_:1}),(0,i.Wm)(g,{index:"2-3"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{to:"https://www.bilibili.com/"},{default:(0,i.w5)((()=>[(0,i.Uk)("bilibili")])),_:1})])),_:1}),(0,i.Wm)(w,{index:"2-4"},{title:(0,i.w5)((()=>[(0,i.Uk)("其他")])),default:(0,i.w5)((()=>[(0,i.Wm)(g,{index:"2-4-1"},{default:(0,i.w5)((()=>[(0,i.Uk)("love")])),_:1}),(0,i.Wm)(g,{index:"2-4-2"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{to:"https://survivesjtu.gitbook.io/survivesjtumanual/li-zhi-pian/ben-ke-si-nian-yao-zuo-shen-me"},{default:(0,i.w5)((()=>[(0,i.Uk)("你想要做什么")])),_:1})])),_:1}),(0,i.Wm)(g,{index:"2-4-3"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{to:"https://www.4kvm.net/"},{default:(0,i.w5)((()=>[(0,i.Uk)("免费高清视频")])),_:1})])),_:1})])),_:1})])),_:1}),(0,i.Wm)(g,{index:"3"},{default:(0,i.w5)((()=>[(0,i.Uk)("动态")])),_:1}),(0,i.Wm)(g,{index:"4",disabled:""},{default:(0,i.w5)((()=>[(0,i.Uk)("聊天")])),_:1})])),_:1},8,["default-active","onSelect"]),(0,i._)("div",o,[(0,i._)("div",l,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(m.messages,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{key:t,class:"message"},(0,a.zw)(e),1)))),128))],512),(0,i._)("div",u,[(0,i._)("div",d,"用户："+(0,a.zw)(m.username),1),(0,i.wy)((0,i._)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>m.inputMessage=e),type:"text",placeholder:"输入消息"},null,512),[[n.nr,m.inputMessage]]),(0,i.Wm)(_,{type:"primary",onClick:t[1]||(t[1]=e=>c.sendMessage("ruleForm"))},{default:(0,i.w5)((()=>[(0,i.Uk)("提交")])),_:1})]),h])],64)}s(560);var m=s(1076),c={data(){return{username:"",messages:[],inputMessage:"",year:"",month:"",day:"",hour:"",minute:"",second:""}},mounted(){this.loadHistoryMessages(),this.username=this.$route.query.username;const e=new Date,t={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,timeZone:"Asia/Shanghai"},s=e.toLocaleString("en-US",t).split(", ")[0],i=e.toLocaleString("en-US",t).split(", ")[1];[this.month,this.day,this.year]=s.split("/"),[this.hour,this.minute,this.second]=i.split(":")},methods:{loadHistoryMessages(){m.Z.get("http://localhost:8081/api/history-messages").then((e=>{for(var t=e.data.msg,s=e.data.user,i=0;i<t.length;i++)this.messages.push(s[i]+":"+t[i]);this.scrollToBottom()})).catch((e=>{console.error("Failed to load history messages:",e)}))},sendMessage(){this.inputMessage&&m.Z.get("http://localhost:8081/api/send-message",{params:{username:this.username,message:this.year+"年"+this.month+"月"+this.day+"日"+this.hour+"时"+this.minute+"分"+this.second+"秒 写到："+this.inputMessage}}).then((e=>{"right"==e.data.state?(this.messages.push(this.username+":"+this.year+"年"+this.month+"月"+this.day+"日"+this.hour+"时"+this.minute+"分"+this.second+"秒 写到： "+this.inputMessage),this.inputMessage="",this.scrollToBottom()):alert("发送失败")})).catch((e=>{console.error("Failed to send message:",e)}))},scrollToBottom(){this.$refs.chatContainer.scrollTop=this.$refs.chatContainer.scrollHeight}}},g=s(89);const p=(0,g.Z)(c,[["render",r]]);var w=p}}]);
//# sourceMappingURL=156.f65d994f.js.map