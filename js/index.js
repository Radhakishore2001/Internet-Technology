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


let isLoggedTeacher = false
let listcard = null
let teacher = null


let isLoggedStudent = false
let mystudent = null
















// helper

const startUIteacher = () => {
	document.getElementById("teacherlogin").click()



	if(document.getElementById("logoutuser")){
		document.getElementById("logoutuser").addEventListener('click', ()=>{
			localStorage.removeItem(TOKENS.studentLogin)
			localStorage.removeItem(TOKENS.teacherLogin)
			isLoggedTeacher = false
		})
	}

    
    if(document.getElementsByClassName("myaddresult")){
        let obj = document.getElementsByClassName("myaddresult")
        

        Object.keys(obj).forEach(key => {
            obj[key].addEventListener('click',()=>{
                window.location.href = './Teacher upload.html'
            })
        });
        
    }






    // call tableMainntainer
    axios.post(PATHS.getlistCards,{email: teacher.email})
    .then((res)=>{
        listcard = res.data.result
        tableMaintainer()
    })
    .catch((err)=>{
        console.log(err)
    })

}



const onclickEdit = (event) => {
    // console.log(event)
    // console.log(event.target.className)
    localStorage.setItem(TOKENS.editListItem,event.target.className)
    window.location.href = './Teacher edit.html'
}

const onclickDel = (event) => {
    axios.post(PATHS.updateDelete,{id: event.target.className})
    .then((res)=>{
        window.location.reload()
    })
    .catch((err)=>{
        console.log(err)
    })
}

const tableMaintainer = () => {

    listcard.forEach((student,index) => {

        // const nodeTableItem = `
        //                 <tr>
        //                     <td>${student.rollno}</td>
        //                     <td>${student.name}</td>
        //                     <td>${student.dob}</td>
        //                     <td>${student.score}</td>
        //                     <td><button>Edit</button> <button>delete</button></td>
        //                 </tr>    
        // `
        let rollno = document.createTextNode(student.rollno)
        let name = document.createTextNode(student.name)
        let dob = document.createTextNode(student.dob)
        let score = document.createTextNode(student.score)
        let last = `<button class="${student.id}" onclick="onclickEdit(event)" >Edit</button> <button class="${student.id}" onclick="onclickDel(event)" >delete</button>`
        

        if(document.getElementsByClassName("mytable")){
            let obj = document.getElementsByClassName("mytable")

            Object.keys(obj).forEach(key => {
                let currow =  obj[key].insertRow()
                currow.insertCell().appendChild(rollno)
                currow.insertCell().appendChild(name)
                currow.insertCell().appendChild(dob)
                currow.insertCell().appendChild(score)
                currow.insertCell().innerHTML = last
            });

        }

    })
    



}



const startUIstudent = () => {
	document.getElementById("studentlogin").click()



	if(document.getElementById("logoutuser")){
		document.getElementById("logoutuser").addEventListener('click', ()=>{
			localStorage.removeItem(TOKENS.studentLogin)
			localStorage.removeItem(TOKENS.teacherLogin)
			isLoggedTeacher = false
			isLoggedStudent = false
		})
	}



    if(document.getElementsByClassName("ssearch")){
        let obj = document.getElementsByClassName("ssearch")
        

        Object.keys(obj).forEach(key => {
            obj[key].addEventListener('click',()=>{
                
                let inputData = {
                    rollno: document.getElementsByClassName("sroll")[1].value,
                    dob: document.getElementsByClassName("sdob")[1].value
                }

                axios.post(PATHS.verifyResult,inputData)
                .then((res)=>{

                    let notFound = res.data.notfound

                    if(notFound){
                        alert("Not Found")
                        window.location.reload()
                    }else{
                        let id = res.data.result
                        localStorage.setItem(TOKENS.showResultItem,id)
                        window.location.href = './Student Results.html'
                    }

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
            isLoggedTeacher = false
        })
		return
	}else{
		localStorage.removeItem(TOKENS.teacherLogin)
        isLoggedTeacher = false
	}






    let tokens = localStorage.getItem(TOKENS.studentLogin)
	if(tokens){
        axios.post(PATHS.getStudent,{token: tokens})
        .then((res)=>{
            let isExpired = res.data.isExpired

            if(isExpired){
                localStorage.removeItem(TOKENS.studentLogin)
                window.location.href = './index.html'
            }else{
                mystudent = res.data.collab
                // console.log(mystudent)
                isLoggedStudent = true
		        startUIstudent()
            }

        })
        .catch((err)=>{
            console.log(err)
            isLoggedStudent = false
        })
		return
	}else{
		localStorage.removeItem(TOKENS.studentLogin)
        isLoggedStudent = false
	}


}
startup()










document.getElementById("teacherlogin").addEventListener('click', ()=> {
	
	if(!isLoggedTeacher){
		window.location.href = './teacherlogin.html'
	}



})


document.getElementById("studentlogin").addEventListener('click', ()=> {
	
	if(!isLoggedStudent){
		window.location.href = './studentlogin.html'
	}



})