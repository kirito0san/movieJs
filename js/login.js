
const htmlElement = document.documentElement;
if (!localStorage.getItem("theme")) {
    localStorage.setItem('theme', "purple")
    htmlElement.setAttribute('data-theme', "purple");
} else {
    htmlElement.setAttribute('data-theme', localStorage.getItem("theme"))
}
document.getElementById('login-button').addEventListener('click', function () {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    fetch('https://api-generator.retool.com/NzNpbh/data')
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
