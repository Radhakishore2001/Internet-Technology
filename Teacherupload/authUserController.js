// includes
const jwt = require("jsonwebtoken")
const db = require("../repository/db")


// PATHS
const COLLECTION = "collabUser"

module.exports = (app,PATHS) => {

    app.post(PATHS.account, (req,res) => {

        let token = req.headers.authtoken
        let isExpired = false

        jwt.verify(req.headers.authtoken, 'secretkey', (err, authData)=>{
            if(err){
                isExpired = true
                res.json({
                    isExpired: isExpired
                })
                
            }else{

                let newCollab = null
                db.db.collection(COLLECTION).doc(authData.datas.id)
                .get()
                .then((doc) => {

                    newCollab = doc.data()

                    res.json({
                        collab: newCollab,
                        isExpired: isExpired
                    })
                })
                .catch((err) =>{
                    res.sendStatus(409)
                })


                
            }
            

        })
    })

}