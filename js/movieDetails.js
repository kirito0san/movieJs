document.addEventListener('DOMContentLoaded', function () {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));
    if (movie) {
        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById('movie-description').textContent = movie.overview;
    }

    document.getElementById('favorite-button').addEventListener('click', function () {
        fetch('../data/users.json')
            .then(response => response.json())
            .then(users => {
                let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
                if (loggedInUser) {
                    const userIndex = users.findIndex(user => user.username === loggedInUser.username);
                    if (userIndex !== -1) {
                        users[userIndex].favorites.push(movie);
                        // تحديث ملف JSON بمعلومات المستخدمين
                        updateUserJSON(users);
                        alert('Movie added to favorites!');
                    }
                } else {
                    alert('You need to log in first!');
                }
            });
    });

    function updateUserJSON(users) {
        fetch('../data/users.json', {
            method: 'POST', // يعتمد على الخادم الذي تتعامل معه. هذه هي الطريقة العامة
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        })
            .then(response => response.json())
            .then(data => {
                console.log('User data updated successfully', data);
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    }
});
