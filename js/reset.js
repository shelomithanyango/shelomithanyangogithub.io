let btnreset = document.getElementById('btnreset')

btnreset.addEventListener('click', () => {

    let txtemail = document.getElementById('txtemail')

    auth.sendPasswordResetEmail(txtemail.value)
    .then(() => {
        alert('A reset link has been sent (If your email exists in our database)')
        txtemail.value = ""
    })
    .catch((error) => {
        alert(error.message)
        console.log(error)
        txtemail.value = ""
    });

})