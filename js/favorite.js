const htmlElement = document.documentElement;
const movieList = document.getElementById('movie-list');
let nameUser = document.getElementById("NAMEUSER")
htmlElement.setAttribute('data-theme', localStorage.getItem("theme"));
if (JSON.parse(localStorage.getItem("loggedInUser"))) {
    nameUser.innerText = JSON.parse(localStorage.getItem("loggedInUser")).username
    document.querySelector(".login-signup").classList.add("hidden")
    document.querySelector(".logout").classList.remove("hidden")
    nameUser.classList.remove("hidden")
    movieList.classList.remove("hidden")
}
document.querySelector(".logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser")
    localStorage.removeItem("selectedMovie")
    movieList.classList.add("hidden")
    document.querySelector(".logout").classList.add("hidden")
    document.querySelector(".login-signup").classList.remove("hidden")
    nameUser.classList.remove("flex")
    nameUser.classList.add("hidden")
    if (movieList.childElementCount === 0) {
        movieList.innerHTML = "No Favorites Movies"
    }
})
let favorite = document.querySelector(".favorite-show")
let data = JSON.parse(localStorage.getItem("loggedInUser"))

data.favorites.map((movie) => {
    const movieItem = document.createElement('div');
    const btn = document.createElement("button")
    movieItem.className = 'movie-item';
    movieItem.innerHTML = `
                        <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <h3 >${movie.title}</h3>
                        <button class="remover-favorite"></button>
                    `;
    btn.className = "remover-favorite"
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`
    movieItem.appendChild(btn)
    movieList.appendChild(movieItem);
    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        let removedIndex = data.favorites.findIndex(item => item.id === movie.id)
        data.favorites.splice(removedIndex, 1)
        localStorage.setItem("loggedInUser", JSON.stringify(data))
        btn.parentElement.remove()
        fetch("https://api-generator.retool.com/NzNpbh/data/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User data updated successfully", data);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
        if (movieList.innerHTML === "") {
            movieList.innerHTML = "No Favorites Movies"
        }
    });
    movieItem.addEventListener('click', () => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        window.open(`./movieDetails.html?id=${movie.id}`, '_blank');
    });
    if (movieList.childElementCount === 0) {
        movieList.innerHTML = "No Favorites Movies"
    }
})

