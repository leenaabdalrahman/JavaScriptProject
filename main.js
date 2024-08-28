import { info } from './info.js';
import { service } from './servicesArray.js';
import { slide } from './slide.js';
import { comments } from "./comments.js";

const generatePagination = (currentPage, totalPages, container) => {
  let paginationHTML = '';

  if (currentPage > 1) {
    paginationHTML += `<li class="page-item"><button data-page="${currentPage - 1}" class="page-link">&laquo;</button></li>`;
  } else {
    paginationHTML += `<li class="page-item"><button class="page-link disabled">&laquo;</button></li>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<li class="page-item${currentPage === i ? ' active' : ''}"><button data-page="${i}" class="page-link">${i}</button></li>`;
  }

  if (currentPage < totalPages) {
    paginationHTML += `<li class="page-item"><button data-page="${currentPage + 1}" class="page-link">&raquo;</button></li>`;
  } else {
    paginationHTML += `<li class="page-item"><button class="page-link disabled">&raquo;</button></li>`;
  }

  container.innerHTML = paginationHTML;
};

const generateInfoItems = (data, container) => {
  const items = data.map((info) => `
    <div class="cards">
      <div class="card">
        <img src="images/${info.image}" class="card-img-top rounded-5" alt="${info.title}" style="height: 180px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${info.title}</h5>
          <a href="details.html?id=${info.id}" class="btn btn-primary mt-auto">Get more information</a>
        </div>
      </div>
    </div>
  `).join('');
  container.innerHTML = items;
};
const generatecomments= (data, container) => {
  const items = data.map((info) => `
    <div class="comment card p-3 m-lg-2 g-2" style="width: 18rem;">
    <div class="title d-flex align-items-center">
        <img src="slide images/${info.img}" class="card-img-top rounded-circle me-2" alt="${info.name}" style="width: 50px; height: 50px; object-fit: cover;">
        <h4 class="card-title mb-0">${info.name}</h4>
    </div>
    <p class="mt-2">${info.comment}</p>
</div>
  `).join('');
  container.innerHTML = items;
};

const display = async (page = 1) => {
  try {
    // Carousel content generation
    const carousel = document.querySelector('.carousel .carousel-inner');
    carousel.innerHTML = slide.map((item, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''} vh-100" style="background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('slide images/${item.img}');">
        <div class="carousel-caption h-100 d-flex justify-content-center align-items-center">
          <div class="carousel-box g-2">
            <h2>Live your unique travel experience</h2>
            <p>Book your trip with us and enjoy hassle-free, discover amazing places with exclusive tourist offers. Eat, shop, and visit exciting places around the world</p>
            <div class="container mt-5">
              <div class="dropdown">
                <input type="text" class="form-control" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" placeholder="Choose your travel location">
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li><a class="dropdown-item" href="details.html?id=1">Bosnia and Herzegovina</a></li>
                  <li><a class="dropdown-item" href="details.html?id=3">Azerbaijan</a></li>
                  <li><a class="dropdown-item" href="details.html?id=4">Thailand</a></li>
                  <li><a class="dropdown-item" href="details.html?id=5">maldives</a></li>
                  <li><a class="dropdown-item" href="details.html?id=6">South Africa</a></li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Pagination and info generation
    const itemsPerPage = 4;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const totalPages = Math.ceil(info.length / itemsPerPage);

    // Information Section
    const infoContainer = document.querySelector('.information .container');
    generateInfoItems(info.slice(startIndex, endIndex), infoContainer);

    const infoPagination = document.querySelector('.information .pagination-container .pagination');
    generatePagination(page, totalPages, infoPagination);

    // Comments Section
    const commentsContainer = document.querySelector('.comments .container');
    generatecomments(comments.slice(startIndex, endIndex), commentsContainer);

    const commentsPagination = document.querySelector('.comments .pagination-container .pagination');
    generatePagination(page, totalPages, commentsPagination);

    // Services Section
    const servicesContainer = document.querySelector('.services .container .row .services_card');
    servicesContainer.innerHTML = service.map((service) => `
   <div class="cards">
    <div class="card ">
      <div class="image">
        <img src="icons/${service.img}" class="card-img-top rounded-4" alt="${service.title}" style="height: 100% ;object-fit: cover; width:100%">
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${service.title}</h5>
        <a href="service.html?id=${service.id}" class="btn btn-primary mt-auto">Get more information</a>
      </div>
    </div>
  </div>
`).join('');

    // Event listeners for pagination
    infoPagination.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('disabled')) {
        const newPage = parseInt(e.target.getAttribute('data-page'));
        display(newPage);
      }
    });

    commentsPagination.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('disabled')) {
        const newPage = parseInt(e.target.getAttribute('data-page'));
        display(newPage);
      }
    });

  } catch (error) {
    console.error('Error loading data:', error);
    document.querySelector(".information").innerHTML = `<h2>Error</h2>`;
  } finally {
    document.querySelector(".overlay").classList.add('d-none');
  }
};

display();

document.querySelector('.nav-item').addEventListener('click', function(event) {
  window.location.href = 'index.html'; // or '/'
});
document.querySelector('#darkModeToggle').addEventListener('click', function() {
  document.body.classList.remove("light");
  document.body.classList.add("dark");
});

document.querySelector('#lightModeToggle').addEventListener('click', function() {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
});
