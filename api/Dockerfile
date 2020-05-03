FROM golang

# if left blank app will run with dev settings
# to build production image run:
# $ docker build ./api --build-args app_env=production
ARG app_env
ENV APP_ENV $app_env

ENV GO111MODULE=on \
	CGO_ENABLED=0 \
	GOOS=linux \
	GOARCH=amd64

# it is okay to leave user/gomore as long as you do not want to share code with other libraries
COPY . /github.com/M-Gadd/family-photos/api
WORKDIR /github.com/M-Gadd/family-photos/api

# added vendor services will need to be included here
RUN go get ./lib/database

RUN go get ./
RUN	go get gopkg.in/mgo.v2/bson
RUN go build

EXPOSE 5000
# if dev setting will use pilu/fresh for code reloading via docker-compose volume sharing with local machine
# if production setting will build binary
CMD if [ ${APP_ENV} = production ]; \
	then \
	api; \
	else \
	go get github.com/pilu/fresh && \
	fresh; \
	fi

# EXPOSE 8080



# FROM golang:alpine

# # Set necessary environmet variables needed for our image
# ENV GO111MODULE=on \
# 	CGO_ENABLED=0 \
# 	GOOS=linux \
# 	GOARCH=amd64

# # Move to working directory /build
# WORKDIR /build

# # Copy and download dependency using go mod
# COPY go.mod .
# COPY go.sum .
# RUN go mod download

# # Copy the code into the container
# COPY . .

# # Build the application
# RUN go build -o main .

# # Move to /dist directory as the place for resulting binary folder
# WORKDIR /dist

# # Copy binary from build to main folder
# RUN cp /build/main .

# # Export necessary port
# EXPOSE 5000

# # Command to run when starting the container
# CMD ["/dist/main"]

