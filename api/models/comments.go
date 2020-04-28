package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

//StreetArt struct
type Comment struct {
	ID        bson.ObjectId `json:"id" bson:"_id"`
	AuthorID  bson.ObjectId `json:"authorId" bson:"_authorId"`
	StreetArt bson.ObjectId `json:"streetArtId" bson:"_streetArt"`
	Body      string        `bson:"body"`
	Author    User          `json:"author"`
	CreatedAt time.Time     `bson:"created_at"`
	UpdatedAt time.Time     `bson:"updated_at"`
}

//StreetArts type
type Comments []Comment
