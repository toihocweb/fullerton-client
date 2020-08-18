# build environment
FROM node:12.2.0-alpine as build
WORKDIR /fullerapp

RUN npm install react-scripts@3.0.1 -g --silent
ENV PATH /fullerapp/node_modules/.bin:$PATH
COPY package.json /fullerapp/package.json
RUN npm install --silent
COPY . /fullerapp
RUN npm cache clean --force
RUN export NODE_OPTIONS=--max_old_space_size=4096
RUN GENERATE_SOURCEMAP=false npm run build --nomaps
# nginx
FROM nginx:1.16.0-alpine
COPY --from=build /fullerapp/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
