# Pull base image.
FROM node:18-alpine

WORKDIR /app

# copy app files
COPY package.json package.json
COPY index.ts index.ts
COPY types.ts types.ts
COPY tsconfig.json tsconfig.json
COPY lib lib

# copy web-app files
COPY web-app web-app

# install deps
RUN npm install

#build web ui and move
RUN cd web-app; npm run build; mv build /app/build

# Expose ports
expose 25
expose 8080

CMD [ "npm", "start" ]
