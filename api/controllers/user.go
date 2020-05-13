package controllers

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/M-Gadd/family-photos/api/auth"
	"github.com/M-Gadd/family-photos/api/models"
	"github.com/M-Gadd/family-photos/api/uploadFile"

	"github.com/gin-gonic/gin"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

// UserCollection ...
const UserCollection = "user"

// // Get DB from Mongo Config
// func DataBaseInit() *mgo.Database {
// 	db, err := database.Init()
// 	if err != nil {
// 		fmt.Println(err)
// 	}

// 	return db
// }

// GetAllUser Endpoint
func GetAllUser(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	users := models.Users{}
	err := db.C(UserCollection).Find(bson.M{}).All(&users)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All User",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"users": &users,
	})
}

// GetUser Endpoint
func GetUser(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	userID := bson.ObjectIdHex(id)

	user := models.User{}

	err := db.C(UserCollection).FindId(userID).One(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get User",
		})
		return
	}

	user.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"user": &user,
	})
}

// LoginUser Endpoint
func LoginUser(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	body := models.LoginStruct{}

	if err := c.ShouldBind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if strings.Trim(body.Email, " ") == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email can't be empty"})
	}

	user := models.User{}
	if err := db.C(UserCollection).Find(bson.M{"email": body.Email}).One(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Can't Find user",
		})

		return
	}

	// if !funk.ContainsString(ValidAuthentications, user.AuthType) {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "invalid auth type"})
	// }

	// Comparing the password with the hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Wrong Password",
		})
		return
	}

	token, err := auth.CreateToken(user.ID)
	if err != nil {
		fmt.Println("this is the error creating the token: ", err)
		return
	}

	userData := token

	fmt.Println("TOKEN: ", userData)

	user.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"message": "authentication successful",
		"user":    &user,
		"data":    userData,
	})
}

// CreateUser Endpoint
func CreateUser(c *gin.Context) {

	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	user := models.User{}

	err := c.Bind(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get Body",
		})
		return
	}

	if err := db.C(UserCollection).Find(bson.M{"email": user.Email}).One(&user); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "user already exists",
		})

		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*&user.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	user.ID = bson.NewObjectId()
	user.Password = string(hashedPassword)

	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	// user.AuthType = "user"

	err = db.C(UserCollection).Insert(user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Insert User",
		})
		return
	}

	token, err := auth.CreateToken(user.ID)
	if err != nil {
		fmt.Println("this is the error creating the token: ", err)
		return
	}

	userData := token
	user.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Insert User",
		"user":    &user,
		"data":    userData,
	})
}

// UpdateUser Endpoint
func UpdateUser(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param
	userID := bson.ObjectIdHex(id)

	updatedUser := models.UpdateUser{}

	err := c.Bind(&updatedUser)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get Body",
		})
		return
	}

	fmt.Println(updatedUser)

	user := models.User{}

	err = db.C(UserCollection).FindId(userID).One(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get User",
		})
		return
	}

	user.FirstName = updatedUser.FirstName
	user.LastName = updatedUser.LastName
	user.Email = updatedUser.Email
	user.UpdatedAt = time.Now()

	err = db.C(UserCollection).UpdateId(userID, user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Update User",
		})
		return
	}

	user.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Update User",
		"user":    &user,
	})
}

// DeleteUser Endpoint
func DeleteUser(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	userID := bson.ObjectIdHex(id)

	err := db.C(UserCollection).RemoveId(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Delete User",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Delete User",
	})
}

func UploadUserImage(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	userID := bson.ObjectIdHex(id)

	user := models.User{}

	err := db.C(UserCollection).FindId(userID).One(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get User",
		})
		return
	}

	uploadedFile := uploadFile.UploadDocument(c, "users")
	// 	// uploadedFile, fileErr := fileupload.FileUpload.UploadFile(file)

	user.PictureURL = uploadedFile

	fmt.Println("file from newwww: ", uploadedFile)

	err = db.C(UserCollection).UpdateId(userID, user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Update User",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Update User",
		"user":    &user,
	})

}

// logoutUser Endpoint
// func LogoutUser(c *gin.Context) {
// 	fmt.Println("I am in logout")

// 	session := sessions.Default(c)

// 	fmt.Println("deleting session", session.Get("user"))

// 	// this would only be hit if the user was authenticated
// 	session.Delete("user")
// 	session.Delete("authType")

// 	err := session.Save()
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate session token"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "successfully logged out"})

// }
