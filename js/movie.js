const apiKey = 'ed3cf244540561d19a7f1b4bef7b3c2b'; // ضع مفتاح API هنا
const movieDetailsContainer = document.getElementById('movie-details');

// id
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams)
console.log(window.location.search)
const movieId = urlParams.get('id');

//  تفاصيل الفيلم
async function fetchMovieDetails(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
    const movie = await response.json();
    displayMovieDetails(movie);
}

// عرض التفاصيل 
function displayMovieDetails(movie) {
    movieDetailsContainer.innerHTML = `
        <img class="w-full" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="mb-4 rounded">
        <h1 class="text-4xl font-bold">${movie.title}</h1>
        <p class="text-gray-400">${movie.release_date}</p>
        <p class="mt-4">${movie.overview}</p>
        <p class="mt-4"><strong>Rating:</strong> ${movie.vote_average}/10</p>
    `;
}

// اول ماتحمل صفحه 
document.addEventListener('DOMContentLoaded', function () {
    if (movieId) {
        fetchMovieDetails(movieId);
    }
});
