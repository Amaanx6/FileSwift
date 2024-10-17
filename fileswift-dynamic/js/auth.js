$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        // Simulate login process
        setTimeout(function() {
            alert(`Login successful for ${email}`);
            window.location.href = 'index.html';
        }, 1000);
    });

    $('#signup-form').submit(function(e) {
        e.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();

        // Simulate signup process
        setTimeout(function() {
            alert(`Account created for ${name} (${email})`);
            window.location.href = 'index.html';
        }, 1000);
    });
});