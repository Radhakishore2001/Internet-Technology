const PATHS =  {
	signupTeacher: "http://localhost:3000/teachersignup",
	signupStudent: "http://localhost:3000/studentsignup",

}



const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});






document.getElementById("tsubmit").addEventListener('click', ()=>{

	let input = {
		name: document.getElementById("tname").value,
		email: document.getElementById("temail").value,
		password: document.getElementById("tpassword").value
	}


	axios.post(PATHS.signupTeacher,input)
	.then((res)=>{
		alert("Your teacher account is created")
		window.location.reload()
	})
	.catch((err)=>{
		console.log(err)
	})

})










document.getElementById("ssubmit").addEventListener('click', ()=>{

	let input = {
		name: document.getElementById("sname").value,
		email: document.getElementById("semail").value,
		password: document.getElementById("spassword").value
	}


	axios.post(PATHS.signupStudent,input)
	.then((res)=>{
		alert("Your student account is created")
		window.location.reload()
	})
	.catch((err)=>{
		console.log(err)
	})

})