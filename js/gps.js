let btnAdd = document.getElementById("btnaddcourse");

  // event
  btnAdd.addEventListener("click", () => {

    // inputs
    let venueName = document.getElementById("txtvenuename").value.trim();
    let venueCode = document.getElementById("txtvenuecode").value.trim();
    let longitude = document.getElementById("txtlongitude").value.trim();
    let latitude = document.getElementById("txtlatitude").value.trim();
     let status = document.querySelector("select").value;
     let user = firebase.auth().currentUser;
      let createdby = user.email;
      let timenow = Date.now(); 

   
    if (venueName == "") {
      alert("Enter venue name");
      return;
    }
    
    if (venueCode == "") {
      alert("Enter venue code");
      return;
    }
   
    if (longitude == "") {
      alert("Enter longitude");
      return;
    }
    
    if (latitude == "") {
      alert("Enter latitude");
      return;
    }

   
    firebase.database().ref("GpsVenus/" + venueCode).set({
      VenueName: venueName,
      VenueCode: venueCode,
      Status: status,
      Longitude: longitude,
      Latitude: latitude,
      CreatedAt: timenow,
      CreatedBy: createdby
    })

    .then(() => {
      alert("GPS added successfully");

      
      document.getElementById("txtvenuename").value = "";
      document.getElementById("txtvenuecode").value = "";
      document.getElementById("txtlongitude").value = "";
      document.getElementById("txtlatitude").value = "";
      loaddata();
      document.getElementById("txtvenuecode").disabled = false;
      document.getElementById("btnaddcourse").innerText = "Add new GPS";
    })

    .catch((error) => {
      alert(error.message);
    });
  });

function loaddata(){
  
  let  activetable= document.getElementById("activetable");
  
                                                                                                              
  firebase.database().ref("GpsVenus").on("value", (snapshot) => {
   
    activetable.innerHTML = "";                                                                              inactivetable
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; 
      console.log(data.Status)
     
      if(data.Status == "active"){
        activetable.innerHTML += `
          <tr>
            <td>${data.VenueCode}</td>
            <td>${data.VenueName}</td>
            <td>${data.Latitude}</td>
            <td>${data.Longitude}</td>

            <td>
              <button class="btn btnred" onclick="closeVenue('${key}')">
                Close GPS Venue
              </button>

              <button class="btn btnblue" onclick="editVenue('${key}')">
                Edit GPS
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loaddata();


function loadInactiveData(){
  
  let inactivetable = document.getElementById("inactivetable");
 
  firebase.database().ref("GpsVenus").on("value", (snapshot) => {
   
    inactivetable.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; 
     
      if(data.Status == "inactive"){
        inactivetable.innerHTML += `
          <tr>
            <td>${data.VenueCode}</td>
            <td>${data.VenueName}</td>
            <td>${data.Latitude}</td>
            <td>${data.Longitude}</td>

            <td>
              <button class="btn btnred" onclick="closeVenue('${key}')">
                Close GPS Venue
              </button>

              <button class="btn btnblue" onclick="editVenue('${key}')">
                Edit GPS
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loadInactiveData();



  function closeVenue(venueCode) {

    let confirmClose = confirm("Are you sure you want to close this GPS venue?");

    if (!confirmClose) return;

    firebase.database().ref("GpsVenus/" + venueCode).update({
      Status: "inactive"
    })
    .then(() => {
      alert("GPS Venue closed successfully");
    })
    .catch((error) => {
      alert(error.message);
    });

  }


  


function editVenue(venueCode){
  firebase.database().ref("GpsVenus/" + venueCode).once("value")
    .then((snapshot) => {

      let data = snapshot.val();

    
      document.getElementById("txtvenuename").value = data.VenueName;
      document.getElementById("txtvenuecode").value = data.VenueCode;
      document.getElementById("txtlongitude").value = data.Longitude;
      document.getElementById("txtlatitude").value = data.Latitude;

      document.querySelector("select").value = data.Status;

     
      document.getElementById("txtvenuecode").disabled = true;

     
      editMode = true;
      editKey = venueCode;

      
      document.getElementById("btnaddcourse").innerText = "Update GPS";

    });

}



let lblTotalActive = document.getElementById("lblTotalActive")

firebase.database().ref("GpsVenus").once("value", function(snapshot) {
    let total=0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
        if (data.Status == "active"){
            total++
        }
    })

    lblTotalActive.innerHTML = total
})

let lblTotalInactive = document.getElementById("lblTotalInactive")

firebase.database().ref("GpsVenus").once("value", function(snapshot) {
    let total=0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
        if (data.Status == "inactive"){
            total++
        }
    })

    lblTotalInactive.innerHTML = total
})