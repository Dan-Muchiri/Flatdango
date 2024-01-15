document.addEventListener("DOMContentLoaded", () => {
    const filmList = document.getElementById("films");
    const movieDetails = document.getElementById("movie-details");
    let data;

    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(apiData => {
            data = apiData;

            filmList.innerHTML='';

            data.forEach((movie, index) => {
                const movieName = document.createElement("li");
                movieName.classList.add(`film-item${movie.id}`);
                movieName.textContent = movie.title;
                movieName.addEventListener("click", () => showMovieDetails(movie));
                filmList.appendChild(movieName);

                if (index === 0) {
                    movieName.click();
                }
            });
        });

    function showMovieDetails(movie) {
        movieDetails.innerHTML = "";

        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("inner-details");
        const availableTickets = movie.capacity - movie.tickets_sold;
        detailsContainer.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">
                                    <p>Title: ${movie.title}</p>
                                    <p>Description: <span id=movie-description>${movie.description}</span></p>
                                    <p>Runtime: ${movie.runtime}</p>
                                    <p>Showtime: ${movie.showtime}</p>
                                    <p>Available tickets: <span id="ticket-count-${movie.id}">${availableTickets}</span></p>
                                    <button class="buy-ticket-button" <span id="data-movie-${movie.id}">Buy ticket</span></button>`;
        movieDetails.appendChild(detailsContainer);

        const ticketButton = detailsContainer.querySelector(".buy-ticket-button");
        if (ticketButton) {
            ticketButton.addEventListener("click", () => buyTicket(movie.id));
        }
    }

    function buyTicket(movieId) {
    const selectedMovie = data.find(movie => movie.id === movieId);
    let availableTickets = selectedMovie.capacity - selectedMovie.tickets_sold;

    if (selectedMovie) {
        if (availableTickets < 1) {
            availableTickets = "Sold out";

        } else {
            selectedMovie.tickets_sold += 1;
            availableTickets = selectedMovie.capacity - selectedMovie.tickets_sold;
        }

        if (availableTickets <= 0) {
            availableTickets = "Sold out";

            const filmItem = document.querySelector(`.film-item${movieId}`);
            if (filmItem) {
                filmItem.classList.add('sold-out');
            }


            const buyButton = document.getElementById(`data-movie-${movieId}`);
            if (buyButton) {
                buyButton.textContent = availableTickets;
                buyButton.classList.add('sold-out');
            }
        }

        const ticketElement = document.getElementById(`ticket-count-${movieId}`);
        if (ticketElement) {
            ticketElement.textContent = availableTickets;
        }
    }
}

    
});
