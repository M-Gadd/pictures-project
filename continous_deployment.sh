#! /bin/bash
set -ev

docker login --username=mgad --password=$(HEROKU_AUTH) registry.heroku.com
heroku container:push --app=my-app-v4 web
heroku container:release --app=my-app-v4 web
heroku open --app=my-app-v4
heroku logs --tail --app=my-app-v4

