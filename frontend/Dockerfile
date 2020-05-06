# FROM node as builder
FROM node

# if left blank app will run with dev settings
# to build production image run:
# $ docker build ./frontend --build-args app_env=production
ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV NODE_ENV $app_env

RUN mkdir -p /frontend
WORKDIR /frontend

COPY package*.json yarn.lock ./

RUN yarn install

COPY ./ ./

# RUN yarn build

# if dev settings will use create-react start script for hot code relaoding via docker-compose shared volume
# if production setting will build optimized static files and serve using http-server
CMD if [ ${NODE_ENV} = production ]; \
	then \
	# npm install -g http-server && \
	yarn global add http-server && \
	yarn build && \
	cd build && \
	hs -p 3000; \
	else \
	yarn start; \
	fi

EXPOSE 3000
#####################################################################
# FROM nginx
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /frontend/build /usr/share/nginx/html
#####################################################################


# FROM nginx
# COPY --from=builder /frontend/build /usr/share/nginx/html

# production environment
# FROM nginx:stable-alpine
# COPY --from=builder /frontend/build /usr/share/nginx/html
# # new
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
