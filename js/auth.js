let btnlogin = document.getElementById('btnlogin')
btnlogin.addEventListener("click", () =>{
	let txtUsername = document.getElementById('txtUsername').value.trim()
	let txtPass = document.getElementById('txtPass').value.trim()
	btnlogin.innerHTML = "Please wait ..."
	if (txtUsername == "" || txtPass == ""){
		alert("Please fill all details.")
	}else{
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.then(() =>{
			return firebase.auth().signInWithEmailAndPassword(txtUsername,txtPass)
		})
		.then((userCredential) => {
			let emailid = txtUsername.replace(/\./g, "_dot_").replace(/@/g, "_at_")
			return firebase.database().ref("userDetails/" + emailid).once("value")
		})
		.then((snapshot) =>{
			const userDetails = snapshot.val()
			const role = userDetails.role
			const status = userDetails.status
			if (status == "active"){
				if(role == "admin"){
					// admin
				window.location.href = "dashboard.html"
				}else if(role == "Student"){
					// studnet
				alert("Student logged in ")
				}else{
					// active users with no roles
				alert("No role added connnect with admin")
				}

			}else{
				// inactive account
				alert("account bloked connnect with admin")
			}
		})
		.catch((error) =>{
			alert(error.message)
			console.log(error)
			btnlogin.innerHTML = "Log in"
		})
	}
})