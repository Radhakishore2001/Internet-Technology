// helper fields





const TOKENS = {
	teacherLogin: "com.rmp.services.management.teacher.id",
	studentLogin: "com.rmp.services.management.student.id",
	editListItem : "com.rmp.services.management.teacher.report.list.student.id",
	showResultItem : "com.rmp.services.management.teacher.report.student.show.id",
    
}

const PATHS = {
    getlistCards: "http://localhost:3000/getListStudent",
    getTeacher: "http://localhost:3000/getTeacher",
    getStudent: "http://localhost:3000/getStudent",
    updateEdit: "http://localhost:3000/updatelistitem",
    updateDelete: "http://localhost:3000/deletelistitem",
    verifyResult: "http://localhost:3000/verifyresult",
    showResult: "http://localhost:3000/showresult",
    
}



let isLoggedStudent = false
let answer = null


















// helper


const setDefaultUIorder = () => {
    
    document.getElementsByClassName("mysroll")[1].innerHTML = answer.rollno
    document.getElementsByClassName("mysname")[1].innerHTML = answer.name
    document.getElementsByClassName("mysdob")[1].innerHTML = answer.dob
    document.getElementsByClassName("mysscore")[1].innerHTML = answer.score
                
}

const startUIresult = () => {
	document.getElementById("studentlogin").click()
    setDefaultUIorder()


    if(document.getElementById("logoutuser")){
		document.getElementById("logoutuser").addEventListener('click', ()=>{
			localStorage.removeItem(TOKENS.studentLogin)
			localStorage.removeItem(TOKENS.teacherLogin)
            localStorage.removeItem(TOKENS.showResultItem)
			isLoggedTeacher = false
			isLoggedStudent = false
            window.location.href = './index.html'
		})
	}
}











const startup = () =>  {

	let token = localStorage.getItem(TOKENS.showResultItem)
	if(token){

        axios.post(PATHS.showResult,{id: token})
        .then((res)=>{
            
            answer = res.data.result
            isLoggedStudent = true
            startUIresult()

        })
        .catch((err)=>{
            console.log(err)

            // localStorage.removeItem(TOKENS.showResultItem)
            // window.location.href = './index.html'
        })

		
		return
	}else{
		localStorage.removeItem(TOKENS.showResultItem)
        window.location.href = './index.html'
	}



}
startup()











document.getElementById("studentlogin").addEventListener('click', ()=> {
	
	if(!isLoggedStudent){
		window.location.href = './studentlogin.html'
	}



})
