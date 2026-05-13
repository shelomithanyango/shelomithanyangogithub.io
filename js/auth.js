let btnlogin = document.getElementById('btnlogin');
btnlogin.addEventListener('click', () => {
    let txtUsername = document.getElementById('txtUsername').value;
    let txtPass = document.getElementById('txtPass').value;
    btnlogin.innerHTML='Please wait..';
    if (txtUsername == "" || txtPass == ""){
        alert('Please fill all details ');
    }else{
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(txtUsername, txtPass);
            
        })
        .then((userCredential) => {
            let emailid = txtUsername.replace(/\./g,'_dot_').replace(/@/g,'_at_');
            return firebase.database().ref('userDetails/' + emailid).once('value');

        })
        .then ((snapshot) => {
            const userDetails = snapshot.val();
            const role = userDetails.role;
            const status = userDetails.status;
            if (status == 'active') {
                if (role == 'admin') { 
                    //admin
                 window.location.href = 'dashboard.html';   
                }else if (role == 'student') {
                    //student
                    alert('Student login successful');
                }else{
                    //active users with no roles
                    alert('No role added connect with admin.');
                }   


            }else{
               // Inactive Account
                alert('Account blocked connect with admin.');
            }
        })
        .catch((error) => {
            alert('Wrong credentials');
            btnlogin.innerHTML='Log in';
        }); 


    }
})





