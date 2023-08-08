# Blogify
- Bogify is blogging app which help people to post their blogs online and other people can read those blogs and can comment on these blogs.

# Tech-Stacks:
- Node.js
- Express.js
- MySQL
- React.js
- GitHub
- Postman
- AWS EC2 Instance link
[http://65.0.106.33:3500/](http://65.0.106.33:3500/)

# blogifybackend repo link
[https://github.com/AakashGaurab/level-supermind](https://github.com/AakashGaurab/level-supermind)

#Entities
User
- userId(Primary key)
- name
- email(unique)
- password(hashed)

# Post
- id(primary key)
- userId(foreign key)
- title
- content

# Comments
- id(primary key)
- userid(foreign key)
- blogid(foreign key)
- comment


# Routes
User Routes
Registration
POST /user/signup
```
{
"name":"Aakash",
"email":"aakash@gmail.com",
"password":"1234"
}
```
 Response: User Created
                  
Login
POST /user/login
```
              Request:{
                  "email":example@gmail.com,
                  "password":"example123"
              }
```
  Response:{
  {msg:"Login Succesfull",id:results[0].id}


Posts Routes
# Create a post
POST /blogs/:userId


Get All posts
GET /post/api/posts

               

Edit Post
PATCH /post/api/post/:id

Protected route

                  Request:{
                      // data we need to update
                      }

                  Response:{
                       "message": "Post updated successfully",
                  "post": {
                      "id": 1,
                      "title": "Updated post title",
                      "content": "The spring bloom is a strong increase in phytoplankton abundance (i.e. stock) that typically occurs in the early spring and lasts until late spring or early summer. This seasonal event is characteristic of temperate North Atlantic, sub-polar, and coastal waters.",
                      "createdAt": "2023-08-04T16:06:49.000Z",
                      "userId": 11,
                      "updatedAt": "2023-08-05T05:10:52.000Z"
                  }
                  }
Delete post
DELETE /post/api/post/:id

Protected route

                  Response:{
                      "message": "Post deleted successfully"
                  }
Comments Route
Create comment
POST /comment/api/comments

Protected route

                  Request:{
                      "postId":4,
                      "comment":"have a momment"
                  }


                  Response:{
                          "message": "Comment created successfully",
                          "comment": {
                              "createdAt": "2023-08-05T07:51:07.411Z",
                              "id": 1,
                              "comment": "have a momment",
                              "postId": 4,
                              "userId": 12,
                              "updatedAt": "2023-08-05T07:51:07.412Z"
                              }
                          }
Get All comments by Post
GET comment//api/commentsonpost/:postId

                   Response:{
                          "message": "All comments for the post",
                          "comments": [
                              {
                                  "id": 1,
                                  "comment": "have a momment",
                                  "createdAt": "2023-08-05T07:51:07.000Z",
                                  "userId": 12,
                                  "postId": 4,
                                  "updatedAt": "2023-08-05T07:51:07.000Z"
                              }
                          ]
                      }
Get comment by id
GET comment/api/comments/:commentId

                      Response:{
                          
                          "message": "Comment found",
                          "comment": {
                              "id": 1,
                              "comment": "have a momment",
                              "createdAt": "2023-08-05T07:51:07.000Z",
                              "userId": 12,
                              "postId": 4,
                              "updatedAt": "2023-08-05T07:51:07.000Z"
                          }
                      }
Update the comment
PUT comment/api/comments/:commentId

                          Response:{
                                  "message": "Comment updated successfully",
                                  "UpdatedCommetn": {
                                      "id": 1,
                                      "comment": "updated comment",
                                      "createdAt": "2023-08-05T07:51:07.000Z",
                                      "userId": 12,
                                      "postId": 4,
                                      "updatedAt": "2023-08-05T08:09:03.000Z"
                                  }
                          }
Delete the comment
DELETE comment/api/comments/:commentId

                          Response:{
                              "message": "Comment deleted successfully"
                          }
