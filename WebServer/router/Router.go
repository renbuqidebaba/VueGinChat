package router

import (
	"WebServer/docs"
	"WebServer/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Router() *gin.Engine {
	r := gin.Default()

	//跨域请求
	r.Use(cors.Default())
	//swagger的项目
	docs.SwaggerInfo.BasePath = ""
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	//消息模块
	r.GET("/api/history-messages", service.GetHistoryMsg)
	r.GET("/api/send-message", service.SaveMsg)

	//动态模块
	r.GET("/api/send-dynamics", service.SaveDyn)
	r.GET("/api/history-dynamics", service.GetHistoryDyn)

	//登录模块
	r.GET("/api/login", service.Login)
	return r
}
