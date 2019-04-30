movies = {
  "1": {
    name: "Captain Marvel",
    trailer: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
  }
};

function makeModals() {
  body = document.getElementsByTagName("body");
  for (i in movies) {
    code = ` <div class="modal fade" id="movie${i}" tabindex="-1" role="dialog"
                  aria-labelledby="Movie ${i}" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                      <h5 class="modal-title" id="Movie ${i}">${i.name}</h5>
                      <button type="button" class="close" data-dismiss="modal"
                          aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>
                      <div class="modal-body">
                      <iframe width="100%" height="300"
                          src=${i.trailer} frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope;
                          picture-in-picture" allowfullscreen></iframe>
                      </div>
                  </div>
                  </div>
              </div>`;
    body.appendChild(code);
  }
}

makeModals();
