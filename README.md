# [Udemy Node Course](https://www.udemy.com/learn-nodejs-by-building-10-projects/#/)

## NodeBlog
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