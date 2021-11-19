const TOKENS = {
	teacherLogin: "com.rmp.services.management.teacher.id",
	studentLogin: "com.rmp.services.management.student.id"
}

const PATHS = {
    loginTeacher: "http://localhost:3000/teacherlogin"
}





const init = () => {

    let token = localStorage.getItem(TOKENS.teacherLogin)
    if(token){

        // verify
         //re
        window.location.href = './index.html'



    }else{
        localStorage.removeItem(TOKENS.teacherLogin)
        
    }


}
init()








document.getElementById("tsign").addEventListener('click', ()=>{

    let isInput = true

    let signinFormjson = {
        email: document.getElementById("temail").value,
        password: document.getElementById("tpassword").value,
    }



    let authToken = null
    let authVerification = false
    let authErr = null

    
    if (isInput){
        axios.post(PATHS.loginTeacher,signinFormjson)
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
                localStorage.setItem(TOKENS.teacherLogin,authToken)
                window.location.href = './index.html'
            }else{
                authErr = res.data.authErr
                if(authErr === "Email"){
                    document.getElementById("temail").placeholder = "Couldn't find Email"
                    document.getElementById("temail").value  = ""
                }

                if(authErr === "unverified"){
                }

                if(authErr === "Password"){
                    document.getElementById("tpassword").placeholder = "Incorrect Password"
                    document.getElementById("tpassword").value  = ""
                    
                }
            }
            
            
        })
        .catch((error) => {
            console.error(error)
        })
        
    }


})