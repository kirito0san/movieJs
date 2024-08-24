document.getElementById('login-button').addEventListener('click', function () {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('../data/users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = '../index.html';
            } else {
                document.getElementById('login-error').textContent = 'Invalid username or password';
            }
        });
});
