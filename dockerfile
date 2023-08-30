FROM node:current-alpine

LABEL image.title="ig-material-mgmt-service" \
      image.description="An node js applciation to manage mateirals"

RUN mkdir -p /usr/src/service

COPY . /usr/src/service

WORKDIR /usr/src/service

RUN npm i

ENTRYPOINT ["npm","run","serve:staging"]