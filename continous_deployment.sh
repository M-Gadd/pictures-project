#! /bin/bash
set -ev


heroku container:push --app=my-app-v4 web
heroku container:release --app=my-app-v4 web
heroku open --app=my-app-v4
heroku logs --tail --app=my-app-v4

