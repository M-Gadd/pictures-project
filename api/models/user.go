package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

//User struct
type User struct {
	// ID        int       `bson:"id"`
	ID         bson.ObjectId `json:"id" bson:"_id"`
	Email      string        `bson:"email"`
	Password   string        `bson:"password"`
	FirstName  string        `bson:"firstName"`
	LastName   string        `bson:"lastName"`
	PictureURL string        `bson:"pictureURL"`
	CreatedAt  time.Time     `bson:"created_at"`
	UpdatedAt  time.Time     `bson:"updated_at"`
}

//Users type
type Users []User

// type RegisterStruct struct {
// 	Email    string `bson:"email"`
// 	Password string `bson:"password"`
// 	AuthType string `bson:"authType"`
// 	// Email    string `json:"email" validate:"required,email"`
// 	// Password string `json:"password" validate:"required,min=3"`
// }

type LoginStruct struct {
	Email    string `json:"email" `
	Password string `json:"password" `
	// AuthType string `bson:"authType"`
	// Email    string `json:"email" validate:"required,email"`
	// Password string `json:"password" validate:"required,min=3"`
}

type UpdateUser struct {
	FirstName string `bson:"firstName"`
	LastName  string `bson:"lastName"`
	Email     string `bson:"email"`
}
