import { info } from './info.js';
console.log(info);
const display=async ()=>{
  const params=new URLSearchParams(window.location.search);//globale obj
  const id =params.get('id');
  console.log(id);
  function findById(id) {
    return info.find(item => item.id === id);
  }
  const IDinfo = findById(parseInt(id));
  console.log(IDinfo);
  const carouselInner = document.querySelector('#carouselExample .carousel-inner');
  const images = IDinfo.pictures.map((ele, index)=>{
    return `
          <div class="carousel-item ${index === 0 ? 'active' : ''} carousel-custom-height"
                  style="background-image: url('pictures/${ele}');">
              </div>
  `;
}).join('')
console.log(images);
  const offer = IDinfo.offers.map((ele)=>{
    return `
      <li><p>${ele}</p></li>
    `;
}).join('')
console.log(offer);
const result =`
</div>
<p>${IDinfo.description}</p>
<p>Cost starts from :<spam>${IDinfo.price}$</spam></p>
</div>`
const titleimg =`
<div class="titlee active w-100 h-200 d-flex justify-content-center align-items-center"
          style="background-image: url('images/${IDinfo.titleImg}');height: 200px; background-position: center bottom; background-size: cover;">
          <h2>${IDinfo.title}</h2>
</div>`
document.querySelector(".title").innerHTML=titleimg;
document.querySelector(".offers ul").innerHTML=offer;
document.querySelector(".description").innerHTML=result;
carouselInner.innerHTML = images;
}
display();
document.querySelector('.nav-item').addEventListener('click', function(event) {
  window.location.href = 'index.html'; // or '/'
});