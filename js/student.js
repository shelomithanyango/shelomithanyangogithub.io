let btnaddstudent = document.getElementById('btnaddstudent')

btnaddstudent.addEventListener('click', () =>{
 let txtfname = document.getElementById("txtfname").value
 let txtlname = document.getElementById("txtlname").value
 let txtemail = document.getElementById("txtemail").value

  if(txtfname == "" || txtemail == "" ){
  	alert("Name and email be filled")
  }else{
  	
  		let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
  		let status = document.querySelector("select").value;
  		let timenow = Date.now(); 
  		let role = "student"
        let autopassword = "12345678"
        let user = firebase.auth().currentUser;
        let createdby = user.email

  		firebase.auth().createUserWithEmailAndPassword(txtemail,autopassword)
  		.then((userCredential) =>{
  			firebase.database().ref('userDetails/' + emailid).set({
  				FirstName:txtfname,
  				LastName:txtlname,
  				Email: txtemail,
  				Status: status,
  				CreatedBy: createdby,
  				Role: role,
  				CreatedOn: timenow
  			})
  			alert("New Student added password is 12345678 and username is email ")
  		})
  		.catch((error) => {
  			console.log(error)
  			alert(error.message)
  		})
    }
  

})

function loaddata(){
  // Load venue to the table
   // table body
  let tablebody = document.getElementById("tablebody");
  // load data
  firebase.database().ref("userDetails").on("value", (snapshot) => {
    // clear table first
    tablebody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val()
      let key = childSnapshot.key // venueCode key help in modification                                    
      // only active venues
      if(data.status == "active" && data.role == "student"){
        tablebody.innerHTML += `
         <tr>
            <td>${data.Email}</td>
            <td>${data.FirstName}</td>
            <td>${data.LastName}</td>
            
           <td><button class="btn btnred" onclick="suspendStudent('${key}')">Suspend</button></td>  
          </tr>

        `;
      }

    });

  });
}

loaddata();
function suspendStudent(studentid){
    let confirmSuspend= confirm("Are you sure you want to suspend this student?")
    if(!confirmSuspend) return;
    firebase.database().ref("userDetails/" + studentid).update({
        status: "inactive"
    })
    .then(() => {
        alert("Student suspended successfully.")
    })
   .then((error) => {
        alert("Error suspending student. Please try again.")
    })

}

function loaddatainactive(){
    let tablebody = document.getElementById('tablebodyinactive')

    firebase.database().ref("userDetails").on("value",(snapshot) =>{
        tablebody.innerHTML = "" 

        snapshot.forEach((childSnapshot) =>{
            let data = childSnapshot.val()
            let key = childSnapshot.key

            if(data.status == "inactive" && data.role == "student"){
                tablebody.innerHTML += `
                    <tr>
                     <td>${data.Email}</td>
                     <td>${data.FirstName}</td>
                     <td>${data.LastName}</td>
                     <td>
                      <button class="btn btngreen" onclick="activatestudent('${key}')" > Activate</button>
                      </td>
                    </tr>
                `
            }
        })

    })
}

loaddatainactive();


function activatestudent(studentid){
    let confirmSuspend = confirm("Are you sure you want to activate this student ?")
    if(!confirmSuspend) return;
    firebase.database().ref("userDetails/" + studentid).update({
        status:"active"
    })
    .then(() =>{
        alert("Student activated")
    })
    
}