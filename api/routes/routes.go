package routes

import (
	"github.com/M-Gadd/family-photos/api/middleware"

	"github.com/M-Gadd/family-photos/api/controllers"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Routes struct
type Routes struct {
}

// StartGin to start routes
func (c Routes) StartServer() {

	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	r.Use(static.Serve("/", static.LocalFile("./web", true)))

	// database.Init()

	store := sessions.NewCookieStore([]byte("sessionSuperSecret"))
	r.Use(sessions.Sessions("sessionName", store))

	auth := r.Group("/api")
	{
		auth.POST("/signup", controllers.CreateUser)
		auth.POST("/login", controllers.LoginUser)
		auth.POST("/users/image/:id", controllers.UploadUserImage)
	}

	api := r.Group("/api")
	// api.Use(middleware.TokenAuthMiddleware())
	{
		// api.GET("/logout", handle_user.LogoutUser)
		api.GET("/users", controllers.GetAllUser)
		api.GET("/users/:id", controllers.GetUser)
		// api.PUT("/users/:id", handle_user.UpdateUser)
		api.DELETE("/users/:id", controllers.DeleteUser)
	}

	streetArt := r.Group("/api")
	// streetArt.Use(handle_auth.AuthenticationRequired())
	{
		streetArt.GET("/streetart", controllers.GetAllStreetArt)
		streetArt.GET("/streetart/user/:user", middleware.TokenAuthMiddleware(), controllers.GetOneUserStreetArt)
		streetArt.POST("/streetart/search", controllers.GetSearchStreetArt)
		// streetArt.GET("/streetart/visit/:art", controllers.GetOneUserStreetArt)
		streetArt.POST("/streetart", controllers.CreateStreetArt)
		streetArt.POST("/streetart/image/:id", controllers.UploadStreetArtImage)
		// streetArt.GET("/streetart/:id", controllers.GetStreetArt)

		// api.PUT("/users/:id", handle_user.UpdateUser)
		streetArt.DELETE("/streetart/:id", controllers.DeleteStreetArt)
	}

	visit := r.Group("/api")
	// streetArt.Use(handle_auth.AuthenticationRequired())
	{
		visit.GET("/visits", controllers.GetAllVisits)
		visit.GET("/visit/:postId", controllers.GetAllVisitsForOneStreetArt)
		// visit.GET("/visit/user/:user", controllers.GetOneUservisit)
		// visit.GET("/visit/visit/:art", controllers.GetOneUservisit)
		visit.POST("/visit", middleware.TokenAuthMiddleware(), controllers.CreateVisit)
		// visit.POST("/visit/image/:id", controllers.UploadvisitImage)
		// visit.GET("/visit/:id", controllers.Getvisit)

		// api.PUT("/users/:id", handle_user.UpdateUser)
		visit.DELETE("/visit/:id", controllers.DeleteVisit)
	}

	like := r.Group("/api")
	// streetArt.Use(handle_auth.AuthenticationRequired())
	{
		like.GET("/likes", controllers.GetAllLikes)
		like.GET("/like/:postId", controllers.GetAllLikesForOneStreetArt)
		// visit.GET("/visit/user/:user", controllers.GetOneUservisit)
		// visit.GET("/visit/visit/:art", controllers.GetOneUservisit)
		like.POST("/like", middleware.TokenAuthMiddleware(), controllers.CreateLike)
		// visit.POST("/visit/image/:id", controllers.UploadvisitImage)
		// visit.GET("/visit/:id", controllers.Getvisit)

		// api.PUT("/users/:id", handle_user.UpdateUser)
		like.DELETE("/like/:id", controllers.DeleteLike)
	}

	comment := r.Group("/api")
	// streetArt.Use(handle_auth.AuthenticationRequired())
	{
		// comment.GET("/comments", controllers.GetAllLikes)
		comment.GET("/comment/:postId", controllers.GetAllCommentsForOneStreetArt)
		// visit.GET("/visit/user/:user", controllers.GetOneUservisit)
		// visit.GET("/visit/visit/:art", controllers.GetOneUservisit)
		comment.POST("/comment", middleware.TokenAuthMiddleware(), controllers.CreateComment)
		// visit.POST("/visit/image/:id", controllers.UploadvisitImage)
		// visit.GET("/visit/:id", controllers.Getvisit)

		// api.PUT("/users/:id", handle_user.UpdateUser)
		comment.DELETE("/comment/:id", controllers.DeleteComment)
	}

	r.Run(":5000")
}
