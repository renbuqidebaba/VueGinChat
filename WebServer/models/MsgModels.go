package models

import (
	"WebServer/utils"
	"fmt"
	"gorm.io/gorm"
)

type ChatTable struct {
	gorm.Model
	Username string
	Message  string
}

func (ChatTable) TableName() string {
	return "chat_table" // 指定表名为 "chat_table"
}

func FindHistoryMsg() ([]string, []string) {
	var results []ChatTable
	var msgs []string
	var user []string
	utils.DB.Find(&results)
	for _, msg := range results {
		//fmt.Println("massage:", msg.Username, msg.Message)
		msgs = append(msgs, msg.Message)
		user = append(user, msg.Username)
	}
	return msgs, user
}

func SaveChatMsg(username, message string) bool {
	msg := ChatTable{Username: username, Message: message}
	result := utils.DB.Create(&msg)
	if result.Error != nil {
		fmt.Println("消息写入数据库失败")
		return false
	}
	return true
}
