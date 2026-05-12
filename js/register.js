const btncreate = document.getElementById('btncreate');

btncreate.addEventListener('click', (event) => {
    event.preventDefault();

    const txtfName = document.getElementById('txtfName').value.trim();
    const txtlName = document.getElementById('txtlName').value.trim();
    const txtemail = document.getElementById('txtemail').value.trim();
    const txtpass = document.getElementById('txtpass').value;
    const txtconpass = document.getElementById('txtconpass').value;

    if (!txtfName || !txtemail) {
        alert('Name and email must be filled');
        return;
    }

    if (txtpass !== txtconpass) {
        alert('Password does not match');
        return;
    }

    const emailid = txtemail.replace(/\./g, '__dot__').replace(/@/g, '__at__');
    const status = 'active';

    firebase.auth().createUserWithEmailAndPassword(txtemail, txtpass)
        .then((userCredentials) => {
            return firebase.database().ref('userDetails/' + emailid).set({
                FirstName: txtfName,
                LastName: txtlName,
                Email: txtemail,
                Status: status,
                CreatedBy: txtemail,
                CreatedOn: new Date().toISOString(),
            });
        })
        .then(() => {
            alert('Account created successfully');
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
});

   