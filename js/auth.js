document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const indexPage = document.getElementById('index-page');

    const goToSignup = document.getElementById('go-to-signup');
    const goToLogin = document.getElementById('go-to-login');
    const goToIndex = document.getElementById('go-to-index');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const userEmailElement = document.getElementById('user-email');
    const logoutButton = document.getElementById('logout-btn');

    const signupNav = document.getElementById('signup-nav');
    const profileNav = document.getElementById('profile-nav');
    const userProfileName = document.getElementById('user-profile-name');

    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownToggle = document.getElementById('dropdown-toggle');

    // Fungsi untuk menampilkan pesan error
    const showError = (element, message) => {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        element.parentElement.appendChild(errorElement);

        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    };

    // Navigasi ke halaman signup
    if (goToSignup) {
        goToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginPage) loginPage.style.display = 'none';
            if (signupPage) signupPage.style.display = 'block';
        });
    }

    // Navigasi ke halaman login
    if (goToLogin) {
        goToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupPage) signupPage.style.display = 'none';
            if (loginPage) loginPage.style.display = 'block';
        });
    }

    // Penanganan form signup
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('signup-email')?.value.trim();
            const password = document.getElementById('signup-password')?.value.trim();
            const confirmPassword = document.getElementById('signup-confirm-password')?.value.trim();

            // Validasi email
            if (!email) {
                showError(signupForm, 'Email is required.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(signupForm, 'Please enter a valid email address.');
                return;
            }

            // Validasi password
            if (!password) {
                showError(signupForm, 'Password is required.');
                return;
            }
            if (password.length < 6) {
                showError(signupForm, 'Password must be at least 6 characters.');
                return;
            }

            // Validasi konfirmasi password
            if (password !== confirmPassword) {
                showError(signupForm, 'Passwords do not match!');
                return;
            }

            // Simpan data pengguna di localStorage (simulasi penyimpanan lokal)
            try {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);
                alert('Signup successful!');
                // Alihkan ke halaman login setelah signup
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        });
    }

    // Penanganan form login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email')?.value.trim();
            const password = document.getElementById('login-password')?.value.trim();

            // Validasi email
            if (!email) {
                showError(loginForm, 'Email is required.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(loginForm, 'Please enter a valid email address.');
                return;
            }

            // Validasi password
            if (!password) {
                showError(loginForm, 'Password is required.');
                return;
            }

            // Cek kecocokan dengan data yang disimpan di localStorage
            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email !== storedEmail || password !== storedPassword) {
                showError(loginForm, 'Invalid email or password.');
                return;
            }

            alert('Login successful!');
            // Redirect ke halaman index.html
            window.location.href = 'index.html';
        });
    }

    // Menampilkan profil email pengguna di index.html
    if (indexPage) {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            // Jika pengguna sudah login, tampilkan email mereka di profil
            if (userEmailElement) userEmailElement.textContent = `Email: ${storedEmail}`;
        } else {
            // Jika belum login, alihkan ke halaman login
            window.location.href = 'login.html';
        }
    }

    // Tombol logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Hapus data login dari localStorage
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
            // Redirect ke halaman login
            window.location.href = 'login.html';
        });
    }

    // Mengubah elemen navigasi sesuai status login
    const updateNavigation = () => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            // Jika pengguna sudah login, tampilkan profile dan logout
            signupNav.style.display = 'none'; // Sembunyikan tombol signup
            profileNav.style.display = 'block'; // Tampilkan tombol profile
            // Set nama pengguna di profil
            userProfileName.textContent = `Hello, ${storedEmail}`;
        } else {
            // Jika belum login, tampilkan tombol signup
            signupNav.style.display = 'block';
            profileNav.style.display = 'none';
        }
    };

    // Panggil fungsi updateNavigation untuk mengubah tampilan menu
    updateNavigation();

    // Menangani klik dropdown untuk toggle menu
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle tampilan dropdown
            dropdownMenu.style.display = (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') ? 'block' : 'none';
        });
    }
});


// ?
const form = document.getElementById('search-form');
    const searchButton = document.getElementById('search-button');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent actual form submission
        
        // Change button appearance to simulate completion
        searchButton.disabled = true; // Disable button to prevent further clicks
        searchButton.style.backgroundColor = '#4CAF50'; // Change button color to indicate completion
        searchButton.innerHTML = 'Done'; // Change button text to "Done"

        // Optionally, you can add a delay to make it feel like it's processing
        setTimeout(function () {
            // After delay, you can reset the button (if desired)
            // searchButton.style.backgroundColor = '#1b1b1a'; // Reset color
            // searchButton.innerHTML = 'Search'; // Reset text
            // searchButton.disabled = false; // Enable the button again
        }, 2000); // Simulate a 2-second process time
    });