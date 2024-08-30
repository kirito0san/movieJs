

const htmlElement = document.documentElement;
if (!localStorage.getItem("theme")) {
    localStorage.setItem('theme', "purple")
    htmlElement.setAttribute('data-theme', "purple");
} else {
    htmlElement.setAttribute('data-theme', localStorage.getItem("theme"))
}
document.getElementById('signup-button').addEventListener('click', function () {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    // curl "https://api-generator.retool.com/NzNpbh/data"
    fetch('https://api-generator.retool.com/NzNpbh/data')
        .then(data => data.json())
        .then(users => {
            console.log(users)
            const userExists = users.some(user => user.username === username);
            if (!userExists) {
                const newUser = { username: username, password: password, favorites: [] };
                updateUserJSON(newUser);
                localStorage.setItem('loggedInUser', JSON.stringify(newUser));

                window.location.href = '../index.html';
            } else {
                document.getElementById('signup-error').textContent = 'Username already exists';
            }
        });

    function updateUserJSON(users) {
        fetch("https://api-generator.retool.com/NzNpbh/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        })
            .then(data => data.json())
            .then(data => {
                console.log('User added successfully', data);
            })
            .catch(error => {
                console.error('Error updating user data:', error); // Changed throw to console.error
            });
    }
});
