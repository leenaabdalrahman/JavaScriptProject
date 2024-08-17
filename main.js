import { info } from './info.js';
import { slide } from './slide.js';
console.log(info);
const display = async (page = 1) => {
  try {
  const carousel = document.querySelector('.carousel .carousel-inner');
  const res = slide.map((item,index) => {
    return `
        <div class="carousel-item ${index === 0 ? 'active' : ''} vh-100 "
          style="background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('slide images/${item.img}');">
          <div class="carousel-caption h-100 d-flex justify-content-center align-items-center">
            <div class="carousel-box g-2">
              <h2>Live your unique travel experience</h2>
              <p>Book your trip with us and enjoy hassle-free, discover amazing places with exclusive tourist offers. Eat, shop, and visit exciting places around the world</p>
              <div class="container mt-5">
                <div class="dropdown ">
                    <input type="text" class="form-control" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" placeholder="Choose your travel location">
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
            </div>
          </div>
        </div>
    `;
  }).join('');
  carousel.innerHTML = res;
    const itemsPerPage = 2; // Number of items per page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const carouselInner = document.querySelector('.information .container');
    const numberOpage = Math.ceil(info.length / itemsPerPage);

    const result = info.slice(startIndex, endIndex).map((info) => {
      return `
      <div class="info row d-flex p-3 m-lg-2 g-2" style="width: 18rem;">
        <img src="images/${info.image}" class="card-img-top" alt="${info.title}" >
        <div class="card-body d-flex row g-2">
          <h5 class="card-title">${info.title}</h5>
          <a href="details.html?id=${info.id}" class="btn btn-primary">Get more information</a>
        </div>
      </div>
      `;
    }).join('');

    carouselInner.innerHTML = result;

    // Pagination logic
    const paginationoo = document.querySelector('.information .pagination-container .pagination');
    let paginationl = '';

    if (page > 1) {
      paginationl += `<li class="page-item"><button data-page="${page - 1}" class="page-link">&laquo;</button></li>`;
    } else {
      paginationl += `<li class="page-item"><button class="page-link disabled">&laquo;</button></li>`;
    }

    for (let i = 1; i <= numberOpage; i++) {
      paginationl += `<li class="page-item${page === i ? ' active' : ''}"><button data-page="${i}" class="page-link">${i}</button></li>`;
    }

    if (page < numberOpage) {
      paginationl += `<li class="page-item"><button data-page="${page + 1}" class="page-link">&raquo;</button></li>`;
    } else {
      paginationl += `<li class="page-item"><button class="page-link disabled">&raquo;</button></li>`;
    }

    paginationoo.innerHTML = paginationl;
    // Add event listener for pagination buttons
    paginationoo.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('disabled')) {
        const newPage = parseInt(e.target.getAttribute('data-page'));
        display(newPage);
      }
    });

  } catch (error) {
    const result = `
    <h2>Error</h2>
    `;
    document.querySelector(".information").innerHTML = result;
  } finally {
    document.querySelector(".overlay").classList.add('d-none');
  }
};

display();
document.querySelector('.nav-item').addEventListener('click', function(event) {
  window.location.href = 'index.html'; // or '/'
});
////////////////////////////////////////
