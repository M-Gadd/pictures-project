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
const VisitsCollection = "Visits"

// GetAllStreetArt Endpoint
func GetAllVisits(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	visits := models.Visits{}
	err := db.C(VisitsCollection).Find(bson.M{}).All(&visits)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Get All StreetArts",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"visits": &visits,
	})
}
func GetAllVisitsForOneStreetArt(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("postId")

	streetArtID := bson.ObjectIdHex(id)

	visits := models.Visits{}
	err := db.C(VisitsCollection).Find(bson.M{"_streetArt": streetArtID}).All(&visits)
	// fmt.Printf("%+v\n", visits)

	users := models.Users{}

	for i := range visits {

		user := models.User{}
		err := db.C("user").FindId(visits[i].User).One(&user)
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
		"visits": &visits,
		"users":  &users,
	})
}

func CreateVisit(c *gin.Context) {

	errList := map[string]string{}

	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	visit := models.Visit{}
	err := c.Bind(&visit)
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
	visit.ID = bson.NewObjectId()
	visit.User = uid
	visit.CreatedAt = time.Now()
	visit.UpdatedAt = time.Now()

	err = db.C(VisitsCollection).Insert(visit)

	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error Insert Street Art",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Succes Insert streetArt",
		"StreetArt": &visit,
	})
}

func DeleteVisit(c *gin.Context) {
	db := *DataBaseInit()
	fmt.Println("MONGO RUNNING: ", db)
	defer db.Session.Close()

	id := c.Param("id") // Get Param

	visitID := bson.ObjectIdHex(id)

	err := db.C(VisitsCollection).RemoveId(visitID)
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
