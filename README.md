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
[http://level-supermind-431007708.ap-south-1.elb.amazonaws.com:3500/](http://level-supermind-431007708.ap-south-1.elb.amazonaws.com:3500/)
- Deployed Link : [http://levelsupermind.s3-website.ap-south-1.amazonaws.com/]([http://65.0.106.33:3000/](http://levelsupermind.s3-website.ap-south-1.amazonaws.com/))

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


# Get All posts
GET /blogs

Edit Post
PATCH /blog/:id


Delete post
DELETE /blog/:id


# Comments Route
- Create comment
POST /comment/:userId/:blogId


                  Request:{
                      "comment":"have a momment"
                  }


                  Response: "Comment added"
                          
Get All comments by Post
GET comment/:blogid

