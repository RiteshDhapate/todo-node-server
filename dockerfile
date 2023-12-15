FROM node:latest
COPY . .
RUN npm install
EXPOSE 2000
CMD [ "node","index.js" ]
