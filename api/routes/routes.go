package routes

import (
	"os"

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
	r.NoRoute(func(c *gin.Context) {
		c.File("./web/index.html")
	})

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
		api.PUT("/users/:id", controllers.UpdateUser)
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

		streetArt.DELETE("/streetart/:id", controllers.DeleteStreetArt)
	}

	visit := r.Group("/api")
	// streetArt.Use(handle_auth.AuthenticationRequired())
	{
		visit.GET("/visits", controllers.GetAllVisits)
		visit.GET("/visit/:postId", controllers.GetAllVisitsForOneStreetArt)
		visit.POST("/visit", middleware.TokenAuthMiddleware(), controllers.CreateVisit)
		visit.DELETE("/visit/:id", controllers.DeleteVisit)
	}

	like := r.Group("/api")
	// like.Use(handle_auth.AuthenticationRequired())
	{
		like.GET("/likes", controllers.GetAllLikes)
		like.GET("/like/:postId", controllers.GetAllLikesForOneStreetArt)
		like.POST("/like", middleware.TokenAuthMiddleware(), controllers.CreateLike)
		like.DELETE("/like/:id", controllers.DeleteLike)
	}

	comment := r.Group("/api")
	// comment.Use(handle_auth.AuthenticationRequired())
	{

		comment.GET("/comment/:postId", controllers.GetAllCommentsForOneStreetArt)
		comment.POST("/comment", middleware.TokenAuthMiddleware(), controllers.CreateComment)
		comment.DELETE("/comment/:id", controllers.DeleteComment)
	}

	var port string
	if key, bool := os.LookupEnv("PORT"); bool {
		port = ":" + key
	} else {
		port = ":5000"
	}

	r.Run(port)
}
