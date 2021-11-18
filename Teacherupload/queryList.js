// includes
const db = require("../repository/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const dotenv = require('dotenv');
dotenv.config();

const razorpay = require("razorpay")

// fields
const COLLECTION = "collabUser"
const storageFile = "gs://test-2ab7e.appspot.com"



const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "aaarav1666@gmail.com",
    pass: process.env.PASSEMAIL,
  },
});






// helpers

const emailFly = async (email, token) =>  {
    const url = `http://localhost:3000/verifyUser/:${token}`

    transporter.sendMail({
            to: email,
            subject: 'Confirm Email',
            html: `Please click this email to confirm your email: <a href="${url}">Click here to verify email</a>`,
    });
}



const emailVerify = (doc,keys) =>  {

    db.db.collection(COLLECTION)
            .where(keys.email , '==', doc[keys.email])
            .get()
            .then((querySnapshot) => {
                let size = querySnapshot.size
                if(size>0 && size <2){
                    querySnapshot.forEach((docs)=>{
                        
                        const data = {
                            id: docs.id,
                            email: doc[keys.email]
                        }

                        let token = jwt.sign({data}, 'emailkey', {expiresIn: '15m'})

                        emailFly(data.email, token)
                    })
                }
            })
            .catch((err)=>{
                console.log("Error 409:")
                console.log(err)
                res.sendStatus(409)
            })

    
}   





const insertCollaboration = (req,res,keys) => {
    let data = req.body
    data[keys.password] = bcrypt.hashSync(data[keys.password],5)
    
    data[keys.demoGraphics] = 0
    data[keys.isVerified] = false

    db.db.collection(COLLECTION).doc().set(data).then((doc)=>{
        // do success manip
        // let token = jwt.sign({data}, 'secretkey', { expiresIn: '24h' });
        emailVerify(data,keys);

        res.sendStatus(200)

    }).catch((err)=>{
        console.log("Error 409:")
        console.log(err)
        res.sendStatus(409)
    })
}













const loginCollaboration = (req, res, keys) => {

    const data = req.body
    // const data = {
    //     'Email': 'user2@gmail.com',
    //     'Password': 'bla'
    // }

    let authVerification = 0
    let authErr = ""
    let authToken = null
    let datas = null

    db.db.collection(COLLECTION)
            .where(keys.email , '==', data.Email)
            .get()
            .then((querySnapshot) => {
                let size = querySnapshot.size
                if(size>0 && size <2){
                    querySnapshot.forEach((doc)=>{
                        let tempDoc = doc.data();
                        tempDoc['id'] = doc.id
                        datas = tempDoc;
                    })

                    const isVerified = datas.isVerified
                    
                    if(!isVerified){
                        authErr = "unverified"
                        authVerification = 0
                        res.json({
                            authVerification: authVerification,
                            authToken: authToken,
                            authErr: authErr
                        })
                        return
                    }

                    const isvalid = bcrypt.compareSync(data.Password,datas[keys.password])
                    datas[keys.password] = null

                    if(isvalid){
                        authVerification = 1;
                        authToken = jwt.sign({datas}, 'secretkey', { expiresIn: '24h' });
                        
                    }else{
                        authErr = "Password"
                    }

                }else{
                    authErr = "Email"
                }


                res.json({
                    authVerification: authVerification,
                    authToken: authToken,
                    authErr: authErr
                })
            })
            .catch((err)=>{
                console.log("Error 409:")
                console.log(err)
                res.sendStatus(409)
            })


}










const commonFetchCollaboration = (req,res,keys) => {


    let coll = []
    let collTransform = []

    db.db.collection(COLLECTION)
            .get()
            .then((querySnapshot) => {
                
                querySnapshot.forEach((doc)=>{
                    let tempDoc = doc.data()
                    tempDoc['id'] = doc.id
                    coll.push(tempDoc)
                })

                

                collTransform = coll.map((doc) => ({
                    id: doc.id,
                    brandName:  doc[keys.brandName],
                    brandBio: doc[keys.bio],
                    brandImage: doc[keys.fileImage],
                    brandLink: doc[keys.link]
                }))

                res.json({
                    result: collTransform
                })
            })
            .catch((err)=>{
                console.log("Error 409:")
                console.log(err)
                res.sendStatus(409)
            })
}








const demoCounter = (req, res, keys) => {
    const data = req.body
    
    db.db.collection(COLLECTION).doc(data.id)
        .get()
        .then((doc)=>{
            let prog = parseInt(doc.data()[keys.demoGraphics],10)

            
            db.db.collection(COLLECTION).doc(data.id)
                .update({
                    Demographics: prog+1
                }).then(()=>{
                    res.sendStatus(200)
                }).catch((err)=>{
                    console.log("Error 409:")
                    console.log(err)
                    res.sendStatus(409)
                })
                
        })
        .catch((err)=>{
            console.log("Error 409:")
            console.log(err)
            res.sendStatus(409)
        })
}












const userVerify = (req, res) => {

    let token = req.params.token
    token = token.replace(':','')

    jwt.verify(token, 'emailkey', (err, authData)=>{
        if(err){
            let isExpired = true

            // const data = jwt.verify(token, 'emailkey', {ignoreExpiration: true})
            // console.log(data)
            // update path
            res.redirect('http://127.0.0.1:5501/collabs/logUser.html')
            
        }else{

            db.db.collection(COLLECTION).doc(authData.data.id)
                .update({
                    isVerified: true
                }).then(()=>{
                    res.redirect('http://127.0.0.1:5501/collabs/logUser.html')
                }).catch((err)=>{
                    console.log("Error 409:")
                    console.log(err)
                    res.sendStatus(409)
                })
            
        }

    })


}




const resendVerify =  (req,res,keys) => {
    const data = req.body
    
    emailVerify(data,keys)

    res.sendStatus(200)
}


module.exports = {
    insertCollaboration: insertCollaboration,
    loginCollaboration: loginCollaboration,
    commonFetchCollaboration: commonFetchCollaboration,
    demoCounter: demoCounter,
    userVerify: userVerify,
    resendVerify: resendVerify
}