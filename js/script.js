
        // Toggle Password Visibility
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword.addEventListener('click', function () {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });

        // Loading Spinner Simulation
        const loginForm = document.querySelector('#loginForm');
        const submitBtn = document.querySelector('#submitBtn');
        const spinner = document.querySelector('#spinner');
        const btnText = document.querySelector('.btn-text');

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            spinner.classList.remove('hidden');
            btnText.textContent = 'Authenticating...';

            // Simulate API Call (Replace with your actual backend logic)
            setTimeout(() => {
                submitBtn.disabled = false;
                spinner.classList.add('hidden');
                btnText.textContent = 'Sign In';
                alert('Login successful! Redirecting to dashboard...');
            }, 2000);
        });

