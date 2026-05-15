let lblTotalStudents = document.getElementById("lblTotalStudents")

firebase.database().ref("userDetails").once("value", function(snapshot) { 
    let total = 0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
   total ++
   })
    lblTotalStudents.innerHTML = total
})


let lblTotalCourses = document.getElementById("lblTotalCourses")
firebase.database().ref("courses").once("value", function(snapshot) {
    let total=0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
        total++
    })
    lblTotalCourses.innerHTML = total
})
 

let lblTotalLecturers = document.getElementById("lblTotalLecturers")
firebase.database().ref("userDetails").once("value", function(snapshot) {
    let total=0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
        if (data.role == "admin"){
            total++
        }
    })

    lblTotalLecturers.innerHTML = total
})

let lblTotalApprovals = document.getElementById("lblTotalApprovals")
firebase.database().ref("userDetails").once("value", function(snapshot) {
    let total=0
    snapshot.forEach(function(childSnapshot) {
        let data=childSnapshot.val()
        if (data.status == "inactive"){
            total++
        }
    })

    lblTotalApprovals.innerHTML = total
})
 