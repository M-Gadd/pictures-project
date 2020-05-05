#! /bin/bash
set -ev
export HEROKU_API_KEY=$HEROKU_AUTH

echo $HEROKU_API_KEY
# echo $HEROKU_AUTH | docker login --username=gad.mostafa@gmail.com --password-stdin registry.heroku.com
# docker login --username=mgad --password=$HEROKU_AUTH registry.heroku.com
# heroku container:login
heroku container:push --app=my-app-v4 web
heroku container:release --app=my-app-v4 web
heroku open --app=my-app-v4
heroku logs --tail --app=my-app-v4

