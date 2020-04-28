package uploadFile

import (
	"bytes"
	"fmt"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
)

//AddFilesToS3 (s *session.Session, fileDir string) error {
func AddFilesToS3(s *session.Session, file *multipart.FileHeader, folder string) (string, error) {
	// errList := map[string]string{}

	f, err := file.Open()
	if err != nil {
		// return
		log.Fatal(err)
	}
	defer f.Close()

	size := file.Size

	fmt.Println("the size: ", size)

	if size > int64(5120000) {
		log.Fatal("Sorry, Please upload an Image of 500KB or less")

		return " ", err

	}

	tempFileName := folder + "/" + bson.NewObjectId().Hex() + filepath.Ext(file.Filename)
	// tempFileName := "pictures/" + bson.NewObjectId().Hex()

	fmt.Println("tempFileName: ", tempFileName)

	S3Bucket := os.Getenv("AWS_S3_BUCKET")

	// fileInfo, _ := file.Stat()
	// var size int64 = fileInfo.Size()
	buffer := make([]byte, size)
	f.Read(buffer)

	_, err = s3.New(s).PutObject(&s3.PutObjectInput{
		// Bucket:               aws.String(S3_BUCKET),
		Bucket:               aws.String(S3Bucket),
		Key:                  aws.String(tempFileName),
		ACL:                  aws.String("public-read"),
		Body:                 bytes.NewReader(buffer),
		ContentLength:        aws.Int64(size),
		ContentType:          aws.String(http.DetectContentType(buffer)),
		ContentDisposition:   aws.String("attachment"),
		ServerSideEncryption: aws.String("AES256"),
	})
	return tempFileName, err

}

// UploadDocument ...
func UploadDocument(c *gin.Context, folder string) string {
	// var Buf bytes.Buffer
	file, _ := c.FormFile("file")
	fmt.Println("file::::: ", file.Filename)

	awsID := os.Getenv("AWS_Access_Key_ID")
	awsSecretKey := os.Getenv("AWS_Secret_Access_Key")
	S3Region := os.Getenv("AWS_S3_REGION")
	S3Bucket := os.Getenv("AWS_S3_BUCKET")

	creds := credentials.NewStaticCredentials(awsID, awsSecretKey, "")

	s, err := session.NewSession(&aws.Config{
		// Region:      aws.String(S3_REGION),
		Region:      aws.String(S3Region),
		Credentials: creds,
	})
	if err != nil {
		log.Fatal(err)
	}

	// defer s.Session.Close()

	// f, err := file.Open()
	// check err

	fileName, err := AddFilesToS3(s, file, folder)
	if err != nil {
		log.Fatal(err)
	}

	picturePath := "https://" + S3Bucket + ".s3." + S3Region + ".amazonaws.com/" + fileName

	fmt.Println("PICTURE PATH : ", picturePath)
	fmt.Println("FINALLY: ", fileName)
	fmt.Println("Image uploaded successfully...")

	return picturePath
}
