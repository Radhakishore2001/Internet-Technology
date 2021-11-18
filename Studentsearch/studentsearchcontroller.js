// includes

const { insertBlogPost, getallPost, getPost } = require("./queryList")



// fields

const KEYS = {
    blogTitle: "Blog Title",
    subTitle: "Sub Title",
    mainHeading: "Main Heading",
    tags: "Tags",
    description: "Description",
    body: "Body",
    userId: "UserID",
    userName: "UserName",
    date: "date",
    comments: "Comments",

}
const PATHS = {
    addPost: '/addPost',
    getAll: '/getallPost',
    getPost: '/getPost'
}



module.exports = (app) => {


    app.post(PATHS.addPost,(req, res)=>{
        insertBlogPost(req,res,KEYS)
    })


    app.get(PATHS.getAll,(req, res)=>{
        getallPost(req,res,KEYS)
    })
    

    app.post(PATHS.getPost,(req, res)=>{
        getPost(req,res,KEYS)
    })
}