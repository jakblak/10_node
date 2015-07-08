### [Udemy Node Course](https://www.udemy.com/learn-nodejs-by-building-10-projects/#/)

## NodeBlog
- Monk, Multer, Jade
*FEATURES*
- add posts, image uploads, add categories, comments
- show all posts on front page
- no Schema's
- `styling` for posts, uploads, forms, flash message, logo, nav, ul/a/body
- comments are an *embedded document* within the posts collection
**Packages**
- moment, mulk, multer, expressValidator, flash, mongo
*Global Var's*   (in app.js)
- app.locals.truncateText   =   don't display full text of on front page
- scaffold express + add modules
- in mongo shell  (with mongod running)
use nodeblog
db.createCollection('posts');
db.createCollection('categories');
db.posts.insert({ title: 'Blog post one', category: 'technology', author: 'Brad Traversy', body: 'this is the body', date: ISODate() });
db.posts.find().pretty()
db.categories.insert({title: 'Technology'})
db.categories.insert({title: 'Fashion'})
- download ckeditor.com add to /public
- - adds editor to body of add post


## eLearning System
- Express, Handlebars, Mongoose, Bcrypt, Passport
- Sign up as Student or Instructor, Add classes option
- > mongo shell   > use elearn     -> db.createCollection('users'), students, classes, instructors
- Using [Kickstart](http://www.99lime.com/elements/) on front-end
- copy over css/js and example.html into layout.handlebars
- move *header* into layout.handlebars and call this {{{body}}} 
- move *form* into login.handlebars call {{>login}})
- > mongo shell  db.classes.insert({title:'HTML', description:'my class description', instructor: 'Brad J'}); 
- Create a `class model` in models/class.js  +  `getClasses` function
- edit index.js (router) to GET all the classes    
- edit classes.handlebar to *dynamically* pass in the classes we manually created
- notice the 2nd param is 'limit' passes # of classes to GET
- create new *classes Routes* and add app.use('/classes', classes);

### Part 2        user: jack, 1111
- create global variable *isHome* to only display classes on home page
- class details  =  new `getClassById` function, *'/:id/details*' route, _details.handlebars_ view
- add {{#if user}} in details view to display form if logged in
- new *User* model, user folder in views + signup page & user.js route
- add Student and Instructor models
- in routes/users.js add Passport, reference to Models
- in userSchema add saveStudent, saveInstructor methods  -> `Hash` password, use `Async` parallel 
- - add *post('/signup'... )* route to: get form fields, check if valid, and save user
- db.students.find().pretty()
**Authentication**
- add *router.post('/login')* in users route + passport methods
- implement logout, ensureAuthenticate function, message depending on student/instructor

### Part 3
- new students route, in app.js, /routes folder and students view
- signup for lessons, redirect to My Classes, display classes
- create Instructor route, view, edit model -> edit details view to include {{type}} for dynamic routing
- add GET and POST routes in *instructors.js* to create new lessons

## Bookstore
- Mongoose, Dust, Kraken (MVC on top of Express), Foundation
- eCommerce shop for books + CRUD admin area
- yo kraken        + mongodb, mongoose, connect-flash, express-messages
- > npm start
- new Routes go in /controllers.  Add *books.js* for the 'details' page
- /controllers files automatically sets routing to name of file -- books.js = /books/...
- `details.dust` in public/templates/books for the controller
- added 'books' and 'categories' using mongo shell + 2 books
- *Admin* area located at localhost:8000/manage
- - CRUD for books and categories