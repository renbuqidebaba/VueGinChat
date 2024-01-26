package models

import (
	"WebServer/utils"
	"fmt"
	"gorm.io/gorm"
)

type DynMsg struct {
	gorm.Model
	UserName string
	UrlPath  string
	Message  string
}

func FindHistoryDyn() ([]string, []string, []string) {
	var results []DynMsg
	var dyns []string
	var msg []string
	var user []string
	utils.DB.Find(&results)
	for _, dyn := range results {
		user = append(user, dyn.UserName)
		dyns = append(dyns, dyn.UrlPath)
		msg = append(msg, dyn.Message)
	}
	return user, dyns, msg
}

func SaveDyn(username, url, msg string) bool {
	dyn := DynMsg{UserName: username, UrlPath: url, Message: msg}
	result := utils.DB.Create(&dyn)
	if result.Error != nil {
		fmt.Println("动态写入数据库失败")
		return false
	}
	return true
}
