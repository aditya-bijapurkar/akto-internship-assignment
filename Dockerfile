FROM node:hydrogen-slim
WORKDIR /app
COPY . /app

RUN npm install
RUN go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest

ENV INTERACTSH=interactsh-client
ENV PORT=8000

EXPOSE 8000
CMD ["node", "app.js"]