// includes
const { insertCollaboration, loginCollaboration, commonFetchCollaboration, demoCounter, userVerify, resendVerify } = require("./queryList")
const authUserController = require("./authUserController")
const multer = require("multer")
const upload=multer({storage: multer.memoryStorage()})

// format
const keys = {
    firstName: "First Name",
    lastName: "Last Name",
    brandName: "Brand Name",
    email: "Email",
    password: "Password",
    bio: "Bio",
    stories: "Stories/Angles",
    link: "Link",
    fileImage:  "Display Image",
    demoGraphics: "Demographics",
    ageGroup: "Age-Group",
    country: "Country",
    additionalInformation: "Additional Information",
    previousEndorsements: "Previous Endorsements",
    references: "References",
    isVerified: "isVerified"
}



// paths

const PATHS = {
    insert: "/createCollaboration",
    login: "/loginCollaboration",
    account: "/accountCollaboration",
    commonFetch:  "/displayCollaboration",
    demoCounter: "/checkProgress",
    setVerify: "/verifyUser/:token",
    resendVerify: "/verifyUserAgain",
    paymentRoute: "/orochiProduction"
}






// exports
module.exports = (app) => {

    // sub-controllers
    authUserController(app, PATHS)

    app.post(PATHS.insert,(req, res)=>{
        insertCollaboration(req,res,keys)
    })

    app.post(PATHS.login, (req,res)=>{
        loginCollaboration(req,res,keys)
    })

    app.get(PATHS.commonFetch, (req,res)=>{
        commonFetchCollaboration(req,res,keys)
    })

    app.post(PATHS.demoCounter, (req,res)=>{
        demoCounter(req,res,keys)
    })

    app.get(PATHS.setVerify, (req, res) =>  {
        userVerify(req,res)
    })

    app.post(PATHS.resendVerify, (req,res) => {
        resendVerify(req,res,keys)
    })

    

}