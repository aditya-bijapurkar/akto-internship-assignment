# Interactsh wrapper service

This application is developed in Node.js which has 2 API endpoints to interact with interactsh-client


## Installation

Before using the service you need to have go and interactsh-client installed

1) install go:  https://go.dev/doc/install

2) install interactsh-client: 
```
go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest
```
3) clone this repo: 
```
git clone https://github.com/aditya-bijapurkar/akto-internship-assignment.git
```
4) open terminal in the project directory and run the following commands:
```
    npm install
    node app.js
```

## Demo

I have used postman to do all the API calling

### 1) api/getUrl
sends the url of the client we are connected to in interact-client

![getUrl](images/get.png)


### 2) api/getInteractions

before sending this API request make some interactions to the interactsh-client in a different terminal

``` 
    ex: ping 'url'
```

sends a list of all interactions made to the specific link

![getInteractions](images/post.png)

optional parameters which defines a range, 
add the start and end timestamp in the body of the POST request

![body](images/body.png)
