// helper fields




const TOKENS = {
	teacherLogin: "com.rmp.services.management.teacher.id",
	studentLogin: "com.rmp.services.management.student.id"
}


const PATHS = {
    getTeacher: "http://localhost:3000/getTeacher",
    addStudent: "http://localhost:3000/addresult"
}


let isLoggedTeacher = false
let teacher = null



















// helper

const startUIteacher = () => {
	document.getElementById("teacherlogin").click()



	if(document.getElementById("logoutuser")){
		document.getElementById("logoutuser").addEventListener('click', ()=>{
			localStorage.removeItem(TOKENS.studentLogin)
			localStorage.removeItem(TOKENS.teacherLogin)
			isLoggedTeacher = false
            window.location.href = './index.html'
		})
	}


    if(document.getElementsByClassName("myback")){
        let obj = document.getElementsByClassName("myback")
        

        Object.keys(obj).forEach(key => {
            obj[key].addEventListener('click',()=>{
                window.location.href = './index.html'
            })
        });
        
    }



    if(document.getElementsByClassName("mysubmitresult")){
        let obj = document.getElementsByClassName("mysubmitresult")
        

        Object.keys(obj).forEach(key => {
            obj[key].addEventListener('click',()=>{
                
                let input = {
                    rollno: document.getElementsByClassName("myroll")[1].value,
                    name: document.getElementsByClassName("myname")[1].value,
                    dob: document.getElementsByClassName("mydob")[1].value,
                    score: document.getElementsByClassName("myscore")[1].value,
                    teacherID: teacher.email 
                }
                
                axios.post(PATHS.addStudent,input)
                .then((res)=>{
                    alert("Marks uploaded")
                    window.location.href = './index.html'
                })
                .catch((err)=>{
                    console.log(err)
                })
                
            })
        });
        
    }









}











const startup = () =>  {

	let token = localStorage.getItem(TOKENS.teacherLogin)
	if(token){

        axios.post(PATHS.getTeacher,{token: token})
        .then((res)=>{
            let isExpired = res.data.isExpired

            if(isExpired){
                localStorage.removeItem(TOKENS.studentLogin)
                localStorage.removeItem(TOKENS.teacherLogin)
                window.location.href = './index.html'
            }else{
                teacher = res.data.collab
                isLoggedTeacher = true
		        startUIteacher()
            }

        })
        .catch((err)=>{
            console.log(err)
        })

		
		return
	}else{
		localStorage.removeItem(TOKENS.teacherLogin)
        window.location.href = './index.html'
	}



}
startup()











document.getElementById("teacherlogin").addEventListener('click', ()=> {
	
	if(!isLoggedTeacher){
		window.location.href = './teacherlogin.html'
	}



})
