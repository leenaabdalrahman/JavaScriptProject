import { service } from './servicesArray.js';

console.log(service);

const display = async () => {
  const params = new URLSearchParams(window.location.search); // global obj
  const id = params.get('id');
  console.log(id);

  function findById(id) {
    return service.find(item => item.id === id);
  }

  const IDinfo = findById(parseInt(id));
  console.log(IDinfo);

  if (!IDinfo) {
    // Handle the case where IDinfo is not found
    console.error('Item not found');
    return;
  }

  // Function to generate HTML for title and description
  const generateTitleAndDisc = (title, disc) => {
    if (title || disc) {
      return `
        <div class="first">
          ${title ? `<h2>${title}</h2>` : ''}
          ${disc ? `<p class="formatted-disc">${disc}</p>` : ''}
        </div>
      `;
    }
    return '';
  };

  // Function to generate HTML for hajez information
  const generateHajezInfo = (hajeztitle, hajezimage, hajezdisc) => {
    if (hajeztitle || hajezimage || hajezdisc) {
      return `
        <div class="hajez-info">
          ${hajeztitle ? `<h2>${hajeztitle}</h2>` : ''}
          ${hajezimage ? `<img src="pictures/${hajezimage}" />` : ''}
          ${hajezdisc ? `<p>${hajezdisc}</p>` : ''}
        </div>
      `;
    }
    return '';
  };

  // Function to generate HTML for study information
  const generateStudyInfo = (studyTitle, div1, div2, studyImage, studyDisc) => {
    if (studyTitle || div1 || div2 || studyImage || studyDisc) {
      return `
        <div class="study">
          ${studyTitle ? `<h1>${studyTitle}</h1>` : ''}
          <div class="dives">
            ${div1 ? `<div><h2>${div1}</h2></div>` : ''}
            ${div2 ? `<div><h2>${div2}</h2></div>` : ''}
          </div>
          ${studyImage ? `<img src="pictures/${studyImage}" />` : ''}
          ${studyDisc ? `<p class="formatted-disc">${studyDisc}</p>` : ''}
        </div>
      `;
    }
    return '';
  };
  const DrivingInfo = (Drivingdisc,Drivingtitle) => {
    if (Drivingdisc || Drivingtitle) {
      return `
      <div class="Driving">
        ${Drivingtitle ? `<h2>${Drivingtitle}</h2>` : ''}
        ${Drivingdisc ? `<p class="formatted-disc">${Drivingdisc}</p>` : ''}
      </div>
    `;
    }
    return '';
  };
  const drivingContent = IDinfo.content.map(Item =>
    DrivingInfo(Item.Drivingdisc, Item.Drivingtitle)
  ).join('');
const drivingSection = drivingContent ? `
<div class="info rounded-4" style="background-image: url('pictures/drive.jpeg'); background-size: cover; background-position: center;">
  ${drivingContent}
</div>
` : '';

  // Generate HTML content for all items in the content array
  const serviceInformation = IDinfo.content.map(Item => `
    <div class="info w-100 h-200">
      ${generateTitleAndDisc(Item.title, Item.disc)}
      ${generateHajezInfo(Item.hajeztitle, Item.hajezimage, Item.hajezdisc)}
      ${generateStudyInfo(Item.studyTitle, Item.div1, Item.div2, Item.studyImage, Item.studyDisc)}
    </div>
  `).join('');

// Combine the driving section with other content
const serviceInformation2 = serviceInformation + drivingSection;

// Set the content to the Inner element
const Inner = document.querySelector('.services .serviceInfo'); // Replace with your actual container class or ID
if (Inner) {
  Inner.innerHTML = serviceInformation2;
} else {
  console.error('Container element not found');
}
}

display();

document.querySelector('.nav-item').addEventListener('click', function(event) {
  window.location.href = 'index.html'; // or '/'
});
