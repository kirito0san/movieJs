let nameUser = document.getElementById("NAMEUSER")
if (JSON.parse(localStorage.getItem("loggedInUser"))) {
    nameUser.innerText = JSON.parse(localStorage.getItem("loggedInUser")).username
}
document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'ed3cf244540561d19a7f1b4bef7b3c2b';
    const movieList = document.getElementById('movie-list');
    function fetchMovies() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(movie => {
                    const movieItem = document.createElement('div');
                    movieItem.className = 'movie-item';
                    movieItem.innerHTML = `
                        <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <h3 class="text-xl font-semibold text-center">${movie.title}</h3>
                    `;
                    movieItem.addEventListener('click', function () {
                        localStorage.setItem('selectedMovie', JSON.stringify(movie));
                        window.location.href = 'pages/movieDetails.html';
                    });
                    movieList.appendChild(movieItem);
                });
            })
            .catch(error => console.error('Error fetching movies:', error));
    }

    fetchMovies();
});
