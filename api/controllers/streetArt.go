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

	// To update the user picture on streetArt card
	// to the current profile picture
	finalStreetArts := models.StreetArts{}
	for i := range streetArts {
		user := models.User{}
		if err := db.C("user").FindId(streetArts[i].AuthorID).One(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Error Get User",
			})
			return
		}
		streetArts[i].UserPhoto = user.PictureURL
		finalStreetArts = append(finalStreetArts, streetArts[i])
	}

	c.JSON(http.StatusOK, gin.H{
		"streetArts": &finalStreetArts,
	})
}

// GetAllStreetArt Endpoint
func GetOneUserStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("user")
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

	body, err := c.GetRawData()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get Body",
		})
		return
	}

	location := string(body)

	streetArts := models.StreetArts{}
	err = db.C(StreetArtCollection).Find(bson.M{"location": location}).All(&streetArts)

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
