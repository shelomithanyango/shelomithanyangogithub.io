let totalAdmins = 0
let totalStudents = 0

firebase.database().ref('userDetails').once("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
        if(data.role == "admin "){
            totalAdmins++
            
        }
        else {
            totalStudents++
        }
    });
    drawbargraph()
})



function drawbargraph(){
    const canvasforbargraph = document.getElementById('mybargraph')
    new Chart(canvasforbargraph,{
        type: 'bar',
        data: {
            labels: ['Admins', 'Students'],
            datasets : [{
                label: 'System Users',
                data: [totalAdmins, totalStudents],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            scales : {
                y:{
                    beginZero: true
            }   }
        }
   })
}

let lblTotalActiveCourses = 0
let lblTotalInactiveCourses = 0
firebase.database().ref('courses').once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
        if(data.Status == "active"){
            lblTotalActiveCourses++
        }
        else{
           lblTotalInactiveCourses++ 
        }

    });
    //show data
    mypiecourses()
})

function mypiecourses(){

    const canvasforcourses = document.getElementById('mypiecourses')

    new Chart(canvasforcourses, { 

        type: 'pie',
        data: {
            labels: ['Active Courses', 'Inactive Courses'],
            datasets: [{
                data: [lblTotalActiveCourses, lblTotalInactiveCourses]
            }]
        }

    })

}




let lblTotalActiveAdmins = 0
let lblTotalInactiveAdmins = 0
firebase.database().ref('userDetails').once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
        if(data.Status == "active"){
            lblTotalActiveAdmins++
        }
        else{
           lblTotalInactiveAdmins++ 
        }

    });
    //show data
    mylineadmins()
})

function mylineadmins(){

    const canvasforcourses = document.getElementById('mylineadmins')

    new Chart(canvasforcourses, { 

        type: 'line',
        data: {
            labels: ['Active Lecturers', 'Inactive Lecturers'],
            datasets: [{
                data: [lblTotalActiveCourses, lblTotalInactiveCourses]
            }]
        }

    })

}



let lblTotalActiveStudents = 0
let lblTotalInactiveStudents = 0
firebase.database().ref('userDetails').once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
        if(data.Status == "active"){
            lblTotalActiveStudents++
        }
        else{
           lblTotalInactiveStudents++ 
        }

    });
    //show data
    myradaradmins()
})

function myradaradmins(){

    const canvasforcourses = document.getElementById('myradaradmins')

    new Chart(canvasforcourses, { 

        type: 'radar',
        data: {
            labels: ['Active Students', 'Inactive Students'],
            datasets: [{
                data: [lblTotalActiveStudents, lblTotalInactiveStudents]
            }]
        }

    })

}
