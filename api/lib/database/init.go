package database

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/mgo.v2"
)

// MONGODB_URI=mongodb://localhost/testing-go-mongo-heroku

func Init() (*mgo.Database, error) {
	err := godotenv.Load()
	if err != nil {
		// log.Fatal("Error loading .env file")
		fmt.Println("Error loading .env file")
	}

	var uri string
	var dbName string

	key, bool := os.LookupEnv("MONGODB_URI")

	if bool {
		uri = key
		fmt.Println("I AM KEY:", uri)
		// dbName = "heroku_sst7nf0v"
		fmt.Println("I AM dName:", dbName)

	} else {
		// uri = "mongodb://host.docker.internal:27017/family-photos"
		// uri = "mongodb://MGad:54321@mongodb:27017/family-photos"
		uri = "MGad:54321@mongodb/family-photos"
		// dbName = "family-photos"
	}

	if uri == "" {
		fmt.Println("no connection string provided")
		os.Exit(1)
	}
	// session, err := mgo.Dial("mongodb://localhost/family-photos")
	session, err := mgo.Dial(uri)
	// session, err := mgo.Dial("apiuser:1234@mongodb/apiData")
	if err != nil {
		panic(err)
	}
	// defer session.Close()

	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)

	db := session.DB("family-photos")
	// db := session.DB("heroku_2w1jt19x")

	// c := session.DB("apiData").C("people")

	// err = db.C("people").Insert(&Person{"Ale", "+55 53 8116 9639"},
	// 	&Person{"Cla", "+55 53 8402 8510"})
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// result := Person{}
	// err = c.Find(bson.M{"name": "Ale"}).One(&result)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	fmt.Println("I AM DB:", db)

	return db, nil
}
