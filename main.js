import { info } from './info.js';
console.log(info);
const display =async ()=>{
  const result = info.map((info)=>{
      return `
      <div class="product">
      <h2>${info.title}</h2>
      <a href="details.html?id=${info.id}"><img src="images/${info.image}"/></a>
      </div>
      `;
  }).join('');
  document.querySelector(".info").innerHTML=result;
}
display();