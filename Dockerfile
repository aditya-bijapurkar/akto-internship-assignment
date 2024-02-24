FROM golang:1.22.0-bullseye as stage1

WORKDIR /app

RUN mkdir -p /bin

RUN mkdir -p /pkg

RUN GOPATH=/app go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest

FROM node:20.8.0

WORKDIR /app

COPY --from=stage1 /app/bin/interactsh-client /app/bin/interactsh-client

COPY . .

RUN npm install

ENV INTERACTSH=/app/bin/interactsh-client
ENV PORT=8000

EXPOSE 8000

CMD ["node", "app.js"]
