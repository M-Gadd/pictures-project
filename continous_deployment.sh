#! /bin/bash
set -ev

export HEROKU_API_KEY=$HEROKU_AUTH

echo $HEROKU_AUTH | docker login --username=gad.mostafa@gmail.com --password-stdin registry.heroku.com
# heroku container:login
# heroku container:push --app=my-app-v4 web 
# heroku container:release --app=my-app-v4 web
# heroku open --app=my-app-v4
# heroku logs --tail --app=my-app-v4

e-streetart

if [ "${TRAVIS_BRANCH}" = "staging" ]; then

  echo "I AM STAGING"
  echo "I AM STAGING"

  heroku container:push --app=my-app-v4 web 
  heroku container:release --app=my-app-v4 web

  # kontena master login --token ${KONTENA_MASTER_TOKEN_STAGING} https://staging-master.bunch.ai/
  # kontena grid use staging
  # kontena stack install kontena.yml || kontena stack upgrade --force phoenix kontena.yml;

fi

if [ "${TRAVIS_BRANCH}" = "master" ]; then

  echo "I AM MASTER"
  heroku container:push --app=e-streetart web 
  heroku container:release --app=e-streetart web

  # kontena master login --token ${KONTENA_MASTER_TOKEN_PRODUCTION} https://master.bunch.ai/
  # kontena grid use production;
  # kontena stack install kontena.yml || kontena stack upgrade --force phoenix kontena.yml;
fi



# heroku plugins:install @heroku-cli/plugin-container-registry
# Dockerfile.client Dockerfile.server Dockerfile.nginx
# heroku container:login
# heroku container:push --recursive
# heroku container:release client api nginx
# heroku ps:scale client=1 api=1 nginx=1