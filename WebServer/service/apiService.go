package service

import (
	"WebServer/models"
	"encoding/base64"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"time"
)

func Login(c *gin.Context) {
	username := c.Query("username")
	password := c.Query("pass")
	repsw := c.Query("checkPass")
	if password != repsw {
		return
	}
	fmt.Println(username, password)
	user := models.GetPwd(username)
	if user.ID != 0 {
		if user.PassWord == password {
			c.JSON(200, gin.H{
				"state": "right",
			})
		} else {
			c.JSON(200, gin.H{
				"state": "wrong",
			})
		}
	} else {
		c.JSON(200, gin.H{
			"state": "error",
		})
	}
}

func GetHistoryMsg(c *gin.Context) {
	msg, user := models.FindHistoryMsg()
	c.JSON(200, gin.H{
		"msg":  msg,
		"user": user,
	})
}

func SaveMsg(c *gin.Context) {
	msg := c.Query("message")
	user := c.Query("username")
	fmt.Println(user)
	fmt.Println(msg)
	ok := models.SaveChatMsg(user, msg)
	if ok {
		c.JSON(200, gin.H{
			"state": "right",
		})
	} else {
		c.JSON(200, gin.H{
			"state": "wrong",
		})
	}
}

func SaveDyn(c *gin.Context) {
	msg := c.Query("msg")
	imageData := c.Query("img")
	//fmt.Println(imageData)
	//对前端传入的base64进行解码,并且转存到assets文件夹下
	imageBytes, err := base64.StdEncoding.DecodeString(imageData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"state": "invalid image data"})
		return
	}
	fileName := fmt.Sprintf("%d.png", time.Now().UnixNano())
	err = ioutil.WriteFile("./assets/Dynamics/"+fileName, imageBytes, 0644)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"state": "failed to save image"})
		return
	}
	//写入后端进行存储
	user := c.Query("user")
	url := "./assets/Dynamics/" + fileName
	ok := models.SaveDyn(user, url, msg)
	if ok {
		c.JSON(200, gin.H{
			"state": "right",
		})
	} else {
		c.JSON(200, gin.H{
			"state": "写入数据库失败",
		})
	}
}

func GetHistoryDyn(c *gin.Context) {
	user, dyn, msg := models.FindHistoryDyn()
	fmt.Println(user)
	fmt.Println(dyn)
	var urltodyn []string
	for i := 0; i < len(dyn); i++ {
		imageData, _ := ioutil.ReadFile(dyn[i])
		base64Str := base64.StdEncoding.EncodeToString(imageData)
		urltodyn = append(urltodyn, base64Str)
	}
	c.JSON(200, gin.H{
		"msg":  msg,
		"dyn":  urltodyn,
		"user": user,
	})
}
