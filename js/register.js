let btncreate = document.getElementById('btncreate');

btncreate.addEventListener('click', (e) => {
    //alert(txtfname)
    //alert('Button clicked Ready');
    e.preventDefault();

    let txtfName = document.getElementById('txtfName').value;
    let txtlName = document.getElementById('txtlName').value;
    let txtemail = document.getElementById('txtemail').value;
    let txtpass = document.getElementById('txtpass').value;
    let conpass = document.getElementById('txtconpass').value;

    if(txtfName == "" || txtemail == ""){
        alert('Name and email are required.' );
        return;
    }
    else{
        if(txtpass == "" || conpass == ""){
            alert( 'Password and confirmation are required.');
            return;
        }

        if(txtpass != conpass){
            alert( 'Password does not match.');
            return;
        }

        let emailid = txtemail.replace(/[@.]/g, (match) => match === '@' ? 'at' : 'dot');
        let status = "active";
        let timenow = new Date().toLocaleString();
        let role = "admin";
        console.log(emailid)

        // showLoading('Creating your account...');
        firebase.auth().createUserWithEmailAndPassword(txtemail, txtpass)
        .then((userCredential) => {
            firebase.database().ref('userDetails/' + emailid).set({
                FirstName: txtfName,
                LastName: txtlName,
                Email: txtemail,
                status: status,
                role: role,
                CreatedBy: txtemail,
                CreatedOn: timenow
            })
            .then(() => {
                //hideLoading();
                alert( 'Account created successfully.');
            })
            .catch((error) => {
                //hideLoading();
                console.log(error);
                alert('Error occurred during registration.');
            });
        })
        .catch((error) => {
            //hideLoading();
            console.log(error);
            alert('Error occurred during registration.');
        });
    }

})