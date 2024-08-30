let movie = JSON.parse(localStorage.getItem("selectedMovie"));
const getId = new URLSearchParams(window.location.search);
let id = getId.get("id");
const htmlElement = document.documentElement;
htmlElement.setAttribute('data-theme', localStorage.getItem("theme"));
async function getMovieDetail(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en&api_key=ed3cf244540561d19a7f1b4bef7b3c2b`
    );
    const data = await res.json();
    console.log(data);
    document.getElementById("go-to-movie").href = data.homepage
}
getMovieDetail(id);
document.addEventListener("DOMContentLoaded", function () {
    if (movie) {
        document.getElementById("movie-title").textContent = movie.title;
        document.getElementById(
            "movie-poster"
        ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById("movie-description").textContent = movie.overview;
    }
    document.getElementById("favorite-button").addEventListener("click", function () {
        fetch("https://api-generator.retool.com/NzNpbh/data")
            .then((response) => response.json())
            .then((users) => {
                let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
                if (loggedInUser) {
                    const userIndex = users.findIndex((user) => user.username === loggedInUser.username);
                    if (userIndex !== -1) {
                        users[userIndex].favorites.push(movie);
                        localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
                        updateUserJSON(users[userIndex]);
                        alert("Movie added to favorites!");
                    }
                } else {
                    alert("You need to log in first!");
                }
            });
    });

    function updateUserJSON(users) {
        fetch("https://api-generator.retool.com/NzNpbh/data/" + users.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(users),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User data updated successfully", data);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    }
});
