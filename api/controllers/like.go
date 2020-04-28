package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/M-Gadd/family-photos/api/auth"

	"github.com/M-Gadd/family-photos/api/models"

	"gopkg.in/mgo.v2/bson"
)

// StreetArtCollection Static Collection
const LikesCollection = "Likes"

// GetAllStreetArt Endpoint
func GetAllLikes(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	likes := models.Likes{}
	err := db.C(LikesCollection).Find(bson.M{}).All(&likes)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All StreetArts",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"likes": &likes,
	})
}
func GetAllLikesForOneStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("postId")

	streetArtID := bson.ObjectIdHex(id)

	likes := models.Likes{}
	err := db.C(LikesCollection).Find(bson.M{"_streetArt": streetArtID}).All(&likes)

	users := models.Users{}

	for i := range likes {

		user := models.User{}
		err := db.C("user").FindId(likes[i].User).One(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Error Get User",
			})
			return
		}

		users = append(users, user)

	}

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All StreetArts",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"likes": &likes,
		"users": &users,
	})
}

func CreateLike(c *gin.Context) {

	errList := map[string]string{}

	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	like := models.Like{}
	err := c.Bind(&like)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get Body",
		})
		return
	}

	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}
	like.ID = bson.NewObjectId()
	like.User = uid
	like.CreatedAt = time.Now()
	like.UpdatedAt = time.Now()

	err = db.C(LikesCollection).Insert(like)

	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Insert Street Art",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Insert streetArt",
		"like":    &like,
	})
}

func DeleteLike(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	likeID := bson.ObjectIdHex(id)

	err := db.C(LikesCollection).RemoveId(likeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Delete visit",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Delete visit",
	})
}
