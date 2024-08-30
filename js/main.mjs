
const movieList = document.getElementById('movie-list');
let nameUser = document.getElementById("NAMEUSER")
let favoriteMovie = document.querySelector(".Favorite-Movie")
console.log(favoriteMovie)
if (JSON.parse(localStorage.getItem("loggedInUser"))) {
    nameUser.innerText = JSON.parse(localStorage.getItem("loggedInUser")).username
    document.querySelector(".login-signup").classList.add("hidden")
    document.querySelector(".logout").classList.remove("hidden")
    nameUser.classList.remove("hidden")
    favoriteMovie.classList.remove("hidden")
}
document.querySelector(".logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser")
    document.querySelector(".logout").classList.add("hidden")
    document.querySelector(".login-signup").classList.remove("hidden")
    nameUser.classList.remove("flex")
    nameUser.classList.add("hidden")
    favoriteMovie.classList.add("hidden")
})
async function getMovieDetail(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en&api_key=ed3cf244540561d19a7f1b4bef7b3c2b`
    );
    const data = await res.json();
    window.open(data.homepage, '_blank');
}
async function fetchMovies() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ed3cf244540561d19a7f1b4bef7b3c2b&language=en-US&page=1`)
        const movies = await res.json()
        movies.results.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                        <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <h3 >${movie.title}</h3>
                    `;
            movieItem.addEventListener('click', function () {
                localStorage.setItem('selectedMovie', JSON.stringify(movie));
                window.location.href = `pages/movieDetails.html?id=${movie.id}`;
            });
            movieList.appendChild(movieItem);
        })
        // edit carousel
        document.querySelectorAll(".carousel").forEach((item, i) => {
            item.src = "https://image.tmdb.org/t/p/w500" + movies.results[i].poster_path
            item.addEventListener("click", () => {
                getMovieDetail(movies.results[i].id)
            })
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
fetchMovies();

