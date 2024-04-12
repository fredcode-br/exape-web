FROM node:20.11.0
WORKDIR /web
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
