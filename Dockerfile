# Build the Go API
FROM golang:latest AS builder
ADD . /app
WORKDIR /app/api
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main
# Build the React application
FROM node:alpine AS node_builder
COPY --from=builder /app/frontend ./
RUN rm -rf package-lock.json yarn.lock
# RUN npm install -g node-sass@4.14.0 --unsafe-perm=true --allow-root
RUN npm install -g http-server
RUN npm install
RUN npm run build
# Final stage build, this will be the container
# that we will deploy to production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /main ./
COPY --from=node_builder /build ./web
RUN chmod +x ./main
EXPOSE 8080
CMD ./main


# FROM golang:latest AS builder

# ADD . /app

# WORKDIR /app/backend

# # RUN go get github.com/gin-gonic/gin
# # RUN go get github.com/gin-gonic/contrib/static
# # RUN go get
# # RUN go build

# RUN go mod download

# # # CMD ["node", "src/index.js"]
# # CMD go run main.go
# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .



# FROM node:alpine AS node_builder

# COPY --from=builder /app/frontend ./
# # COPY /frontend /app/frontend 
# # WORKDIR /app/frontend 
# RUN npm install
# RUN npm run build



# FROM alpine:latest
# RUN apk --no-cache add ca-certificates
# COPY --from=builder /main ./
# COPY --from=node_builder /build ./web
# RUN chmod +x ./main
# EXPOSE 8080
# CMD ./main


# ////////////////////////////////////
# # Build the Go API
# FROM golang:latest AS builder
# ADD . /app
# WORKDIR /app/backend
# RUN go mod download
# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .
# # Build the React application
# FROM node:alpine AS node_builder
# COPY --from=builder /app/frontend ./
# RUN npm install
# RUN npm run build
# # Final stage build, this will be the container
# # that we will deploy to production
# FROM alpine:latest
# RUN apk --no-cache add ca-certificates
# COPY --from=builder /main ./
# COPY --from=node_builder /build ./web
# RUN chmod +x ./main
# EXPOSE 8080
# CMD ./main