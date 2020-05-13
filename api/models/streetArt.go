package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

//StreetArt struct
type StreetArt struct {
	ID         bson.ObjectId `json:"id" bson:"_id"`
	PictureURL string        `bson:"pictureURL"`
	Location   string        `bson:"location"`
	UserPhoto  string        `bson:"userPhoto"`
	AuthorID   bson.ObjectId `json:"authorId" bson:"_authorId"`
	Author     User          `json:"author"`
	CreatedAt  time.Time     `bson:"created_at"`
	UpdatedAt  time.Time     `bson:"updated_at"`
}

//StreetArts type
type StreetArts []StreetArt
