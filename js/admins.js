// Ensure Firebase is initialized before running
document.addEventListener('DOMContentLoaded', () => {
    console.log("Admins script loaded...");

    // Check if Firebase was initialized in config.js
    if (typeof firebase === 'undefined') {
        console.error("Firebase is not defined. Check your config.js and script tags.");
        return;
    }

    const auth = firebase.auth();
    const database = firebase.database();

    // Elements
    const btnCreate = document.getElementById('btnaddadmin');
    const tableBody = document.getElementById('tablebody');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    // --- Mobile Menu ---
    if(menuToggle) {
        menuToggle.onclick = () => nav.classList.toggle('active');
    }

    // --- Auth State ---
    auth.onAuthStateChanged(user => {
        if (user) {
            document.getElementById('lbusername').innerText = user.email;
            fetchAdmins(database);
        } else {
            console.warn("No user logged in. Redirecting...");
            // window.location.href = 'login.html'; // Uncomment this once login is ready
        }
    });

    // --- Form Submission ---
    btnCreate.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent page refresh
        
        const fname = document.getElementById('txtadminfname').value;
        const lname = document.getElementById('txtadminlname').value;
        const email = document.getElementById('txtadminemail').value;
        const role = document.getElementById('selectrole').value;

        if (!fname || !email) {
            alert("Fill in at least name and email.");
            return;
        }

        console.log("Attempting to save:", fname);

        database.ref('admins').push({
            FirstName: fname,
            LastName: lname,
            Email: email,
            role: role
        })
        .then(() => {
            alert("Admin added!");
            document.getElementById('txtadminfname').value = ""; // Clear field
        })
        .catch(err => {
            console.error("Firebase Write Error:", err);
            alert("Permission Denied! Check your Database Rules.");
        });
    });
});

function fetchAdmins(db) {
    db.ref('admins').on('value', (snapshot) => {
        const tableBody = document.getElementById('tablebody');
        tableBody.innerHTML = "";
        snapshot.forEach(child => {
            const data = child.val();
            tableBody.innerHTML += `
                <tr>
                    <td>${data.FirstName}</td>
                    <td>${data.LastName}</td>
                    <td>${data.Email}</td>
                    <td><button class="btn btnred">Revoke</button></td>
                </tr>`;
        });
    });
}