# Getting Started with Backend Web APIs Assessment

## Section I'm proud of
> signup and signin
>like and unlike
>follow and unfollow

## For project on github
https://www.github.com/Owolabi-Oluwatosin/Pokemon


## To run this server:

First install all node-modules using "npm install or yarn install"

NOTE: npm is use to install all depedencies in this project


## To run the server 

In your terminal type this command "nodemon server"



### `For all the endpoint

## routes/user.js
PUT:localhost:5000/api/follow
PUT:localhost:5000/api/unfollow
POST:localhost:5000/api/search
PUT:localhost:5000/api/updateuser

## routes/post.js
POST:localhost:5000/api/createPost
GET:localhost:5000/api/allpost
PUT:localhost:5000/api/comment
PUT:localhost:5000/api/like
PUT:localhost:5000/api/unlike
DELETE:localhost:5000/api/deletepost/:postId

## routes/user.auth.js
POST:localhost:5000/api/user/signin
POST:localhost:5000/api/user/signup
POST:localhost:5000/api/user/signout

## routes/admin.auth.js
POST:localhost:5000/api/admin/signin
POST:localhost:5000/api/admin/signup
POST:localhost:5000/api/admin/signout
