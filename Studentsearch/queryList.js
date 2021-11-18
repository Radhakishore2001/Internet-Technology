// includes
const db = require("../repository/db")
const jwt = require("jsonwebtoken")


// fields
const COLLECTION = "blogPosts"




// helpers

const insertBlogPost = (req,res,keys) => {
    const data = req.body
    

    db.db.collection(COLLECTION).doc().set(data).then(()=>{
        
        res.sendStatus(200)

    }).catch((err)=>{
        console.log("Error 409:")
        console.log(err)
        res.sendStatus(409)
    })
}



const getallPost = (req,res,keys) => {

    let coll = []

    db.db.collection(COLLECTION)
            .get()
            .then((querySnapshot) => {
                
                querySnapshot.forEach((doc)=>{
                    let tempDoc = doc.data()
                    tempDoc['id'] = doc.id
                    coll.push(tempDoc)
                })

                res.json({
                    result: coll
                })
            })
            .catch((err)=>{
                console.log("Error 409:")
                console.log(err)
                res.sendStatus(409)
            })
}





const getPost = (req,res,keys) => {

    let coll = null

    db.db.collection(COLLECTION).doc(req.headers.posttoken)
            .get()
            .then((snapshot) => {
                
                coll = snapshot.data()

                res.json({
                    result: coll
                })
            })
            .catch((err)=>{
                console.log("Error 409:")
                console.log(err)
                res.sendStatus(409)
            })
}



module.exports = {
    insertBlogPost: insertBlogPost,
    getallPost: getallPost,
    getPost: getPost
}