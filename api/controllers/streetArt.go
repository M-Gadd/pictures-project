package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/M-Gadd/family-photos/api/models"
	"github.com/M-Gadd/family-photos/api/uploadFile"

	"gopkg.in/mgo.v2/bson"
)

// StreetArtCollection Static Collection
const StreetArtCollection = "StreetArt"

// // Get DB from Mongo Config
// func DataBaseInit() *mgo.Database {
// 	db, err := database.Init()
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	return db
// }

// GetAllStreetArt Endpoint
func GetAllStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	streetArts := models.StreetArts{}
	err := db.C(StreetArtCollection).Find(bson.M{}).All(&streetArts)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All StreetArts",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"streetArts": &streetArts,
	})
}

// GetAllStreetArt Endpoint
func GetOneUserStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("user") // Get Param
	userID := bson.ObjectIdHex(id)

	streetArts := models.StreetArts{}
	err := db.C(StreetArtCollection).Find(bson.M{"_authorId": userID}).All(&streetArts)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All StreetArts",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"streetArts": &streetArts,
	})
}
func GetSearchStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	// var location string
	// err := c.Bind(&location)
	body, _ := c.GetRawData()
	fmt.Println("Location: ", string(body))
	location := string(body)
	// if err != nil {
	// 	c.JSON(200, gin.H{
	// 		"message": "Error Get Body",
	// 	})
	// 	return
	// }

	streetArts := models.StreetArts{}
	err := db.C(StreetArtCollection).Find(bson.M{"location": location}).All(&streetArts)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All StreetArts",
		})
		return
	}

	fmt.Println("streetArts: ", streetArts)

	c.JSON(http.StatusOK, gin.H{
		"streetArts": &streetArts,
	})
}

// GetStreetArt Endpoint
func GetStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	streetArtID := bson.ObjectIdHex(id)

	streetArt := models.StreetArt{}
	err := db.C(StreetArtCollection).FindId(streetArtID).One(&streetArt)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get Street Art",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"streetArt": &streetArt,
	})
}

func UploadStreetArtImage(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	streetArtID := bson.ObjectIdHex(id)

	streetArt := models.StreetArt{}

	err := db.C(StreetArtCollection).FindId(streetArtID).One(&streetArt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get User",
		})
		return
	}

	uploadedFile := uploadFile.UploadDocument(c, "StreetArt")

	streetArt.PictureURL = uploadedFile

	fmt.Println("file from newwww: ", uploadedFile)

	err = db.C(StreetArtCollection).UpdateId(streetArtID, streetArt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Update User",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Update User",
		"user":    &streetArt,
	})

}

// CreateStreetArt Endpoint
func CreateStreetArt(c *gin.Context) {

	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	streetArt := models.StreetArt{}

	err := c.Bind(&streetArt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get Body",
		})
		return
	}

	// fmt.Println("----***--------->", streetArt)
	user := models.User{}

	error := db.C("user").FindId(streetArt.AuthorID).One(&user)
	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get Body",
		})
		return
	}

	streetArt.ID = bson.NewObjectId()
	streetArt.CreatedAt = time.Now()
	streetArt.UpdatedAt = time.Now()
	streetArt.Author = user

	// fmt.Println("----***--------->", streetArt)

	err = db.C(StreetArtCollection).Insert(streetArt)

	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Insert Street Art",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Succes Insert streetArt",
		"StreetArt": &streetArt,
	})
}

// UpdateStreetArt Endpoint

// DeleteStreetArt Endpoint
func DeleteStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	streetArtID := bson.ObjectIdHex(id)

	err := db.C(StreetArtCollection).RemoveId(streetArtID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Delete streetArt",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Delete streetArt",
	})
}
