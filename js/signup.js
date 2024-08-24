document.getElementById('signup-button').addEventListener('click', function () {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    fetch('../data/users.json')
        .then(response => response.json())
        .then(users => {
            const userExists = users.some(user => user.username === username);
            if (!userExists) {
                const newUser = { username, password, favorites: [] };
                users.push(newUser);

                // تحديث ملف JSON بمعلومات المستخدمين الجدد
                updateUserJSON(users);

                localStorage.setItem('loggedInUser', JSON.stringify(newUser));
                window.location.href = '../index.html';
            } else {
                document.getElementById('signup-error').textContent = 'Username already exists';
            }
        });

    function updateUserJSON(users) {
        fetch('../data/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        })
            .then(response => response.json())
            .then(data => {
                console.log('User added successfully', data);
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    }
});
