FROM node:18.12.0
WORKDIR /app
COPY . .
RUN mkdir -p src/log
RUN npm install
RUN npm install pm2@latest -g
#RUN pm2 start src/index.js
EXPOSE 3000
CMD ["pm2-runtime","/app/src/index.js"]

