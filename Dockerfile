
# 选择更小体积的基础镜像
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY ./server.js /app/server.js
COPY /dist /build

RUN ls /build