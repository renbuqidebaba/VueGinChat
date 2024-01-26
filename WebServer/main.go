package main

import (
	"WebServer/router"
	"WebServer/utils"
)

func main() {
	utils.InitConfig()
	utils.InitMySQL()
	//路由
	r := router.Router()
	r.Run(":8081")
}
