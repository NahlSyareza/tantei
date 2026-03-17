FROM node:alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 3002

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build
CMD ["npm", "run", "start"]
