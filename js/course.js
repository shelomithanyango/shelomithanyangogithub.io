let lecturerselect = document.getElementById('lecturerselect')
firebase.database().ref("userDetails").once("value",function(snapshot) {
    lecturerselect.innerHTML = "<option>Select Lecturer </option >"
    snapshot.forEach(function(childSnapshot){   
        let data = childSnapshot.val()
        if(data.role == "admin" && data.status == "active"){
    let option=document.createElement("option")
    option.value=data.Email
    option.textContent=data.FirstName 
    lecturerselect.appendChild(option)
        }
})
})


let venueselect = document.getElementById('venueselect');
firebase.database().ref("GpsVenus").once("value",function(snapshot) {
    venueselect.innerHTML = "<option value=''>select venue</option>";
    snapshot.forEach(function(childSnapshot) {
        let data = childSnapshot.val()
        if(data.Status == "active"){
            let option = document.createElement("option")
            option.value = data.VenueCode
            option.textContent = data.VenueName
            venueselect.appendChild(option)
        }

    })
})

//ADD NEW COURSE
let btnaddcourse = document.getElementById("btnaddcourse");
btnaddcourse.addEventListener("click", function() {

    // inputs
    let txtcoursename = document.getElementById("txtcoursename").value.trim();
    let txtcoursecode = document.getElementById("txtcoursecode").value.trim();
    let lecturerselect = document.getElementById("lecturerselect").value;
    let venueselect = document.getElementById("venueselect").value;
    let statusselect = document.getElementById("statusselect").value.trim();
    // select status for html dropdown 
    let status = document.querySelector("select").value;
    // get create by 
      let user = firebase.auth().currentUser;
      let createdby = user.email;
      let timenow = Date.now(); 

    // validation
    if (txtcoursename == "") {
      alert("Enter course name");
      return;
    }
    // check if course code is empty the return code stops here
    if (txtcoursecode == "") {
      alert("Enter course code");
      return;
    }
    // check if lecturer is empty the return code stops here
    if (lecturerselect == "") {
      alert("Select lecturer");
      return;
    }
    // check if venue is empty the return code stops here
    if (venueselect == "") {
      alert("Select venue");
      return;
    }

    // firebase insert
    firebase.database().ref("courses/" + txtcoursecode).set({
      CourseName: txtcoursename,
      CourseCode: txtcoursecode,
      Status: status,
      Lecturer: lecturerselect,
      Venue: venueselect,
      CreatedAt: timenow,
      CreatedBy: createdby
    })

    .then(() => {
      alert("Course added successfully");

      // clear inputs
     
     
      document.getElementById("txtcoursecode").disabled = false;
      document.getElementById("btnaddcourse").innerText = "Add new Course";
    })

    .catch((error) => {
      alert(error.message);
    });
  });


let lblTotalActiveCourses = document.getElementById("lblTotalActiveCourses")
firebase.database().ref("courses").once("value", function(snapshot) {
    let total=0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
        if (data.Status == "active"){
            total++
        }
    })

    lblTotalActiveCourses.innerHTML = total
})

let lblTotalInactiveCourses = document.getElementById("lblTotalInactiveCourses")
firebase.database().ref("courses").once("value", function(snapshot) {
    let total=0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
        if (data.Status == "inactive"){
            total++
        }
    })

    lblTotalInactiveCourses.innerHTML = total
})


function loaddata(){
  // Load venue to the table
   // table body
  let tableBody = document.getElementById("tablebody");
  // load data
  firebase.database().ref("courses").on("value", (snapshot) => {
    // clear table first
    tableBody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; // venueCode key help in modification
      // only active venues
      if(data.Status == "active"){
        tableBody.innerHTML += `
          <tr>
            <td>${data.CourseCode}</td>
            <td>${data.CourseName}</td>
            <td>${data.Lecturername}</td>
            <td>${data.Venue}</td>

            <td>
              <button class="btn btnred" onclick="suspendcourse('${key}')">
                Suspend course
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loaddata();


 function loaddatainactive(){
  // Load venue to the table
   // table body
  let tableBody = document.getElementById("tablebodyinactive");
  // load data
  firebase.database().ref("courses").on("value", (snapshot) => {
    // clear table first
    tableBody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; // venueCode key help in modification
      // only active venues
      if(data.Status == "inactive"){
        tableBody.innerHTML += `
          <tr>
            <td>${data.CourseCode}</td>
            <td>${data.CourseName}</td>
            <td>${data.Lecturername}</td>
            <td>${data.Venue}</td>

            <td>
              <button class="btn btngreen" onclick="activatecourse('${key}')">
                Activate course
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loaddatainactive()