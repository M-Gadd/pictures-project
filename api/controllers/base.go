package controllers

import (
	"fmt"

	"github.com/M-Gadd/family-photos/api/lib/database"
	"gopkg.in/mgo.v2"
)

//DataBaseInit ...
func DataBaseInit() *mgo.Database {
	db, err := database.Init()
	if err != nil {
		fmt.Println(err)
	}

	return db
}
