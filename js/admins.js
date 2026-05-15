let btnaddadmin = document.getElementById('btnaddadmin')

btnaddadmin.addEventListener('click', () =>{
 let txtadminfname = document.getElementById("txtadminfname").value
 let txtadminlname = document.getElementById("txtadminlname").value
 let txtadminemail = document.getElementById("txtadminemail").value


  if(txtadminfname == "" || txtadminemail == ""){
  	alert("Name and email be filled")
  }else{
  	
  		let emailid = txtadminemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
  		let status = document.querySelector("select").value;
  		let timenow = Date.now(); 
  		let role = "admin"
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
  			alert("New admin added password is 12345678 and username is email ")
  		})
  		.catch((error) => {
  			console.log(error)
  			alert(error.message)
  		})
  	
  }

}) 


function loaddata(){
    let tablebody = document.getElementById('tablebody')

    firebase.database().ref("userDetails").on("value",(snapshot) =>{
        tablebody.innerHTML = "" 

        snapshot.forEach((childSnapshot) =>{
            let data = childSnapshot.val()
            let key = childSnapshot.key

            if(data.status == "active" && data.role == "admin"){
                tablebody.innerHTML += `
                    <tr>
                     <td>${data.Email}</td>
                     <td>${data.FirstName}</td>
                     <td>${data.LastName}</td>
                     <td>
                      <button class="btn btnred" onclick="suspendadmin('${key}')" > Suspend</button>
                      </td>
                    </tr>
                `
            }
        })

    })
}

loaddata();


function suspendadmin(adminid){
    let confirmSuspend = confirm("Are you sure you want to suspend this admin ?")
    if(!confirmSuspend) return;
    firebase.database().ref("userDetails/" + adminid).update({
        status:"inactive"
    })
    .then(() =>{
        alert("Admin suspended")
    })
    .then((error) =>{
        alert("Error while suspending")
    })

}




// activation  254740409701


function loaddatainactive(){
    let tablebody = document.getElementById('tablebodyinactive')

    firebase.database().ref("userDetails").on("value",(snapshot) =>{
        tablebody.innerHTML = "" 

        snapshot.forEach((childSnapshot) =>{
            let data = childSnapshot.val()
            let key = childSnapshot.key

            if(data.status == "inactive" && data.role == "admin"){
                tablebody.innerHTML += `
                    <tr>
                     <td>${data.Email}</td>
                     <td>${data.FirstName}</td>
                     <td>${data.LastName}</td>
                     <td>
                      <button class="btn btngreen" onclick="activateadmin('${key}')" > Activate</button>
                      </td>
                    </tr>
                `
            }
        })

    })
}

loaddatainactive();


function activateadmin(adminid){
    let confirmSuspend = confirm("Are you sure you want to activate this admin ?")
    if(!confirmSuspend) return;
    firebase.database().ref("userDetails/" + adminid).update({
        status:"active"
    })
    .then(() =>{
        alert("Admin activated")
    })
    .then((error) =>{
        alert("Error while activating")
    })

}


// count admin


let lblTotalAdmins = document.getElementById('lblTotalAdmins')
firebase.database().ref("userDetails").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.role == "admin" ){
      total++
    }

  })
  lblTotalAdmins.innerHTML = total
})

// active admin 
let lbTotalActiveAdmins = document.getElementById('lbTotalActiveAdmins')
firebase.database().ref("userDetails").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.status == "active" && data.role == "admin"){
      total++
    }
    })
  lblTotalActiveAdmins.innerHTML = total
})

// inactive 
let lbTotalInactiveAdmins = document.getElementById('lbTotalInactiveAdmins')
firebase.database().ref("userDetails").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.status == "inactive" && data.role == "admin"){
      total++
    }
    })
  lblTotalInactiveAdmins.innerHTML = total
})