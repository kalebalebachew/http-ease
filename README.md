# http-ease 
###  this is a basic(dummy) javacsript http library.  
### It supports basic HTTP methods and provides a way to interact with APIs and servers

## Features
- Supports basic HTTP methods - GET, POST, PUT, PATCH, and DELETE
- Works in both Node.js and browser environments
- Handles both JSON and plain text responses
- Allows custom headers to be set for requests
## Installation
```cli
npm install http-ease
```
## Usage
### Here’s how you can use http-ease in your project

```javascript 
import HttpEase from 'http-ease'
const ease = new HttpEase()
```

``` javascript 
ease.get("https://jsonplaceholder.typicode.com/posts")

```



