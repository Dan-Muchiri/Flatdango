document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movie-list");
    const movieDetails = document.getElementById("movie-details");
    
  
    let data;
  
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(apiData => {
            data = apiData;
  
            data.forEach(movie => {
                const movieName = document.createElement("button");
                movieName.textContent = movie.title;
                movieName.addEventListener("click", () => showAnimalDetails(movie));
                movieList.appendChild(movieName);
            });
        });
  

    function showAnimalDetails(movie) {
        movieDetails.innerHTML = "";
  
        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("inner-details");
        detailsContainer.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">
                                    <p>Name: ${movie.title}</p>
                                    <p>Tickets: <span id="ticket-count-${movie.id}">${movie.tickets_sold}</span></p>
                                    <button class="vote-button" data-animal-id="${movie.id}">Buy ${movie.title} ticket</button>`;
        movieDetails.appendChild(detailsContainer);
  
        const ticketButton = detailsContainer.querySelector(".buy-ticket-button");
        if (ticketButton) {
            ticketButton.addEventListener("click", () => buyTicket(movie.id));
        }
    }
  

    function buyTicket(movieId) {
        const selectedmovie = data.find(movie => movie.id === movieId);
        if (selectedmovie) {
            selectedmovie.tickets_sold -= 1;
  
            const ticketElement = document.getElementById(`ticket-count-${movieId}`);
            if (ticketElement) {
                ticketElement.textContent = selectedmovie.tickets;
            }
        }
    }
  
  });
  