#! /bin/bash
set -ev

export HEROKU_API_KEY=$HEROKU_AUTH

echo $HEROKU_AUTH | docker login --username=_ --password-stdin registry.heroku.com




if [ "${TRAVIS_BRANCH}" = "staging" ]; then

  heroku container:push --app=my-app-v4 web 
  heroku container:release --app=my-app-v4 web

fi

if [ "${TRAVIS_BRANCH}" = "master" ]; then

  heroku container:push --app=e-streetart web 
  heroku container:release --app=e-streetart web

fi

# for onen container push
# heroku container:login
# heroku container:push --app=my-app-v4 web 
# heroku container:release --app=my-app-v4 web
# heroku open --app=my-app-v4
# heroku logs --tail --app=my-app-v4


# for multi container push
# heroku plugins:install @heroku-cli/plugin-container-registry
# Dockerfile.client Dockerfile.server Dockerfile.nginx
# heroku container:login
# heroku container:push --recursive
# heroku container:release client api nginx
# heroku ps:scale client=1 api=1 nginx=1


# Then to build production images run:
# ```bash
# $ docker build ./api --build-arg app_env=production
# $ docker build ./frontend --build-arg app_env=production
# $ docker build ./db
# ```