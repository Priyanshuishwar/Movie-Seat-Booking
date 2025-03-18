const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieselect = document.getElementById('movie');

let ticketPrice = +movieselect.value;


function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


function updateselectedcount() {
    const selectedseats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedseats);
    
    const seatIndex = [...selectedseats].map(function(seat) {
        return [...seats].indexOf(seat);
    });
    

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    const selectedseatcount = selectedseats.length;
    // console.log(selectedseatcount); 
    count.innerText = selectedseatcount;
    total.innerText = selectedseatcount * ticketPrice;
}


movieselect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateselectedcount();
});


function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex != null) {
        movieselect.selectedIndex = selectedMovieIndex;
    }
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateselectedcount();
});


populateUI();
updateselectedcount();
