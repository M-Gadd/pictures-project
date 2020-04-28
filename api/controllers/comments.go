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
const CommentsCollection = "Comments"

// GetAllStreetArt Endpoint
// func GetAllVisits(c *gin.Context) {
// 	db := *DataBaseInit()
// 	fmt.Println("MONGO RUNNING: ", db)

// 	visits := model_visit.Visits{}
// 	err := db.C(CommentsCollection).Find(bson.M{}).All(&visits)

// 	if err != nil {
// 		c.JSON(200, gin.H{
// 			"message": "Error Get All StreetArts",
// 		})
// 		return
// 	}

// 	c.JSON(200, gin.H{
// 		"visits": &visits,
// 	})
// }

func GetAllCommentsForOneStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("postId")

	streetArtID := bson.ObjectIdHex(id)

	comments := models.Comments{}
	err := db.C(CommentsCollection).Find(bson.M{"_streetArt": streetArtID}).All(&comments)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All Comments",
		})
		return
	}

	for i := len(comments)/2 - 1; i >= 0; i-- {
		opp := len(comments) - 1 - i
		comments[i], comments[opp] = comments[opp], comments[i]
	}

	c.JSON(http.StatusOK, gin.H{
		"comments": &comments,
	})
}

func CreateComment(c *gin.Context) {

	errList := map[string]string{}

	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	comment := models.Comment{}
	err := c.Bind(&comment)
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

	user := models.User{}
	err = db.C("user").FindId(uid).One(&user)
	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Find User",
		})
		return
	}

	comment.ID = bson.NewObjectId()
	comment.AuthorID = uid
	comment.Author = user
	comment.CreatedAt = time.Now()
	comment.UpdatedAt = time.Now()

	err = db.C(CommentsCollection).Insert(comment)

	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Insert Comment",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Insert comment",
		"comment": &comment,
	})
}

func DeleteComment(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	errList := map[string]string{}

	id := c.Param("id") // Get Param

	commentID := bson.ObjectIdHex(id)

	comment := models.Comment{}
	// err := db.C(UserCollection).Find(bson.M{"id": &idParse}).One(&user)
	err := db.C(CommentsCollection).FindId(commentID).One(&comment)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get User",
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

	if comment.AuthorID == uid {
		err := db.C(CommentsCollection).RemoveId(commentID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Error Delete comment",
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succes Delete comment",
	})
}
