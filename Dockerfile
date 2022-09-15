FROM node:lts as build

ARG REACT_APP_FAIROSHOST
ENV REACT_APP_FAIROSHOST=$REACT_APP_FAIROSHOST
ARG REACT_APP_FAIRDRIVEHOST
ENV REACT_APP_FAIRDRIVEHOST=$REACT_APP_FAIRDRIVEHOST
ARG DNS_ADDRESS
ENV DNS_ADDRESS=$DNS_ADDRESS

WORKDIR /base
COPY *.json ./

RUN npm install

COPY . .
SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN if [ ! -z "$DNS_ADDRESS" ]; then find * -type f -exec  sed -i 's:app.fairdrive.fairdatasociety.org:'"$DNS_ADDRESS"':g' {} +; fi
RUN env |grep REACT > .env

RUN npm run build

#webserver
FROM nginx:stable-alpine
COPY --from=build /base/build /usr/share/nginx/html
RUN echo "real_ip_header X-Forwarded-For;" \
    "real_ip_recursive on;" \
    "set_real_ip_from 0.0.0.0/0;" > /etc/nginx/conf.d/ip.conf
RUN sed -i '/index  index.html index.htm/c\        try_files $uri /index.html;' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

