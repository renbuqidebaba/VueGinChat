package main

import (
	"WebServer/models"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(mysql.Open("chatroom:root123@tcp(www.lmworz.top)/chatroom?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})
	//上面要是没有后面等号那一串，访问数据库就会出现错误
	if err != nil {
		panic("failed to connect database")
	}

	//迁移 schema
	//db.AutoMigrate(&models.User{})
	var results []models.User
	////var answer []string
	db.Find(&results)
	for _, msg := range results {
		fmt.Println(msg.UserName, msg.PassWord)
	}
	//for _, msg := range results {
	//	fmt.Println("massage:", msg)
	//
	//}
}
