const TOKENS = {
	teacherLogin: "com.rmp.services.management.teacher.id",
	studentLogin: "com.rmp.services.management.student.id"
}

const PATHS = {
    loginTeacher: "http://localhost:3000/teacherlogin",
    loginStudent: "http://localhost:3000/studentlogin"
}





const init = () => {

    let token = localStorage.getItem(TOKENS.studentLogin)
    if(token){

        window.location.href = './index.html'

    }else{
        localStorage.removeItem(TOKENS.studentLogin)
        
    }


}
init()








document.getElementById("ssign").addEventListener('click', ()=>{

    let isInput = true

    let signinFormjson = {
        email: document.getElementById("semail").value,
        password: document.getElementById("spassword").value,
    }



    let authToken = null
    let authVerification = false
    let authErr = null

    
    if (isInput){
        console.log("sahflshli")
        axios.post(PATHS.loginStudent,signinFormjson)
        .then((res) => {
            authVerification = res.data.authVerification

            // authVerification 
            // 1 - okay
            // else 
            // check for problem message
            // autherr == email account not found
            // autherr == password password not found

            if(authVerification){
                authToken = res.data.authToken
                localStorage.setItem(TOKENS.studentLogin,authToken)
                window.location.href = './index.html'
            }else{
                authErr = res.data.authErr
                if(authErr === "Email"){
                    document.getElementById("semail").placeholder = "Couldn't find Email"
                    document.getElementById("semail").value  = ""
                }

                if(authErr === "unverified"){
                }

                if(authErr === "Password"){
                    document.getElementById("spassword").placeholder = "Incorrect Password"
                    document.getElementById("spassword").value  = ""
                    
                }
            }
            
            
        })
        .catch((error) => {
            console.error(error)
        })
        
    }


})