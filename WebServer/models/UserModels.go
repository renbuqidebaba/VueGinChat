package models

import (
	"WebServer/utils"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName string `gorm:"column:username"`
	PassWord string
}

func (User) TableName() string {
	return "user" // 指定表名为 "chat_table"
}

func GetPwd(username string) User {
	var user User
	utils.DB.Where("username = ?", username).First(&user)
	return user
}
