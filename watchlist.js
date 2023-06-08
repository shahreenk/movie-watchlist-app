import { moviesFromLocalStorage, renderMovieList, getMovieDataFromIds } from "./index.js";

const watchListEl = document.getElementById('watchlist');

// Event listener for remove buttons that deletes a movie from local storage and renders a new watchlist
document.addEventListener('click', e => {
    const myMovies = moviesFromLocalStorage;
    if (e.target.dataset.remove) {
        myMovies.splice(myMovies.indexOf(e.target.dataset.remove), 1);
    }
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
    renderWatchlist();
})

// Displays movies from local storage, or empty error message if there are none
async function renderWatchlist() {
    if (moviesFromLocalStorage.length) {
        const moviesData = await getMovieDataFromIds(moviesFromLocalStorage);
        renderMovieList(moviesData, watchListEl, 'remove', '-');
    } else {
        watchListEl.innerHTML = `
            <div class="empty-list-msg flex">
                <p>Your Watchlist is looking a little empty...</p>
                <a href="index.html"
                ><span>+</span>&nbsp;&nbsp;Let's add some movies!</a
                >
            </div>
        `
    }
} 

renderWatchlist();