import HttpEase from "./http-ease.js";

const ease = new HttpEase(); 

ease.get("https://jsonplaceholder.typicode.com/posts")
    .then(response => console.log(response))
    .catch(error => console.error(error));

export default HttpEase;