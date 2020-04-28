package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

//Visit struct
type Like struct {
	ID        bson.ObjectId `json:"id" bson:"_id"`
	User      bson.ObjectId `json:"userId" bson:"_user"`
	StreetArt bson.ObjectId `json:"streetArtId" bson:"_streetArt"`
	CreatedAt time.Time     `bson:"created_at"`
	UpdatedAt time.Time     `bson:"updated_at"`
}

//Visits type
type Likes []Like
