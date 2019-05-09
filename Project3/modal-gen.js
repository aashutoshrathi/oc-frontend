movies = {
  "1": {
    name: "Captain Marvel",
    trailer: "https://www.youtube.com/embed/Z1BCujX3pw8",
    pic: "cap_marvel.jpg",
    desc:
      "A failed reporter is bonded to an alien entity, one of many entities who have invaded Earth. But the entity takes a liking to Earth and decides to protect it.",
    year: 2018,
    duration: "1h 52min",
    rating: 6.8,
    tags: ["Action", "Adventure"]
  },
  "2": {
    name: "Dumbo",
    trailer: "https://www.youtube.com/embed/7NiYVoqBt-8",
    pic: "dumbo.jpg",
    desc:
      "A young elephant, whose oversized ears enable him to fly, helps save a struggling circus, but when the circus plans a new venture, Dumbo and his friends discover dark secrets beneath its shiny veneer.",
    year: 2019,
    duration: "1h 52min",
    rating: 6.6,
    tags: ["Family", "Adventure"]
  },
  "3": {
    name: "Shazam!",
    trailer: "https://www.youtube.com/embed/go6GEIrcvFY",
    pic: "shazam.jpg",
    desc:
      "We all have a superhero inside us, it just takes a bit of magic to bring it out. In Billy Batson's case, by shouting out one word - SHAZAM.",
    year: 2019,
    duration: "2h 12min",
    rating: 7.5,
    tags: ["Action", "Comedy"]
  },
  "4": {
    name: "Avengers: Endgame",
    trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
    pic: "endgame.jpg",
    desc:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos' actions and restore order to the universe.",
    year: 2019,
    duration: "3h 01min",
    rating: 8.9,
    tags: ["Action", "Adventure"]
  },
  "5": {
    name: "The Shawshank Redemption",
    trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
    pic: "shawshank.jpg",
    desc:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    year: 1994,
    duration: "2h 22min",
    rating: 9.3,
    tags: ["Drama", "Thriller"]
  },
  "6": {
    name: "The Godfather",
    trailer: "https://www.youtube.com/embed/sY1S34973zA",
    pic: "godfather.jpg",
    desc:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    year: 1972,
    duration: "2h 55min",
    rating: 9.2,
    tags: ["Drama", "Crime"]
  },
  "7": {
    name: "The Dark Knight",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    pic: "dark_knight.jpg",
    desc:
      "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the psychological and physical tests of his ability to fight injustice.",
    year: 2008,
    duration: "2h 32min",
    rating: 9.0,
    tags: ["Drama", "Crime"]
  },
  "8": {
    name: "Fight Club",
    trailer: "https://www.youtube.com/embed/qtRKdVHc-cE",
    pic: "fight_club.jpg",
    desc:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    year: 1999,
    duration: "2h 19min",
    rating: 8.8,
    tags: ["Drama", "Crime"]
  },
};

function makeModals() {
  body = document.getElementsByTagName("body")[0];
  for (i in movies) {
    code = ` <div class="modal fade" id="movie${i}" tabindex="-1" role="dialog"
                aria-labelledby="Movie ${i}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title">
                      ${movies[i].name}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <iframe width="100%" height="300"
                        src="${movies[i].trailer}" frameborder="0"
                        allow="accelerometer; encrypted-media; gyroscope;
                        picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                </div>
            </div>`;
    movie_item = `<div class="movie row">
                    <div class="col-sm-3 col-lg-2 thumbnail">
                      <img class="rounded" src="assets/movies/${movies[i].pic}"
                        alt=${movies[i].name}>
                    </div>
                    <div class="col-sm-9 col-lg-10 details">
                      <ul class="list-unstyled list-inline type">
                        <li class="list-inline-item badge badge-primary">
                          ${movies[i].tags[0]}
                        </li>
                        <li class="list-inline-item badge badge-primary">
                          ${movies[i].tags[1]}
                        </li>
                      </ul>
                      <h3 class="title">${movies[i].name}</h3>
                      <p class="desc">${movies[i].desc}</p>
                      <ul class="list-unstyled list-inline meta">
                        <li class="list-inline-item"><i class="far fa-calendar-alt"></i>
                        ${movies[i].year}</li>
                        <li class="list-inline-item"> <i class="far fa-clock"></i>
                        ${movies[i].duration}</li>
                        <li class="list-inline-item"><i class="far fa-star"></i>
                        ${movies[i].rating}/10</li>
                        <li class="list-inline-item"><a href="#" data-toggle="modal"
                            data-target="#movie${i}"><i class="far fa-play-circle"></i>
                            Watch Trailer</a></li>
                      </ul>
                    </div>
                  </div><br>`;
    d_id = "day" + Math.ceil(i / 4);
    console.log(d_id);
    day = document.getElementById(d_id);
    day.insertAdjacentHTML("afterbegin", movie_item);
    body.insertAdjacentHTML("afterbegin", code);
  }
}

makeModals();
