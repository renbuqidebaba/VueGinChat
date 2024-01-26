<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
    
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
 
<script>
import { ref } from 'vue';
import axios from 'axios';

    export default {
        data() {
            var checkUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    username: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    username: [
                        { validator: checkUser, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm() {
                if (this.ruleForm.username !== '' && this.ruleForm.pass !== '' && this.ruleForm.checkPass !== '') {
                        axios.get('http://localhost:8081/api/login',{
                            params: {
                                username: this.ruleForm.username,
                                pass: this.ruleForm.pass,
                                checkPass: this.ruleForm.checkPass,
                            }
                        
                        }).then(response => {
                                if (response.data.state == "right"){
                                   alert("登录成功");
                                   this.$router.push({
                                        path: '/RealHome',
                                        query: {
                                        username: this.ruleForm.username
                                    }
                                });
                                } else if(response.data.state == "wrong"){
                                    alert("用户名或者密码错误");
                                } else{
                                    alert("查无此人");
                                }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
 
<style scoped>
</style>