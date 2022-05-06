// Sidenav
const sidenavOpenbutton = document.querySelector('#sidenav-openbutton');
const sidenavClosebutton = document.querySelector('#sidenav-closebutton');
const sidenav = document.querySelector('.mobile-sidenav-container');

sidenavOpenbutton.addEventListener('click', () => {
  sidenav.classList.add('open');
})

sidenav.addEventListener('click', (event) => {
  if(event.target != sidenav) return;
  sidenav.classList.remove('open');
})

sidenavClosebutton.addEventListener('click', () => {
  sidenav.classList.remove('open');
})

// Opening Times
const currentDate = new Date();
const openingRows = document.querySelectorAll('.openings > div');
const currentDayIndex = currentDate.getDay() - 1;

const currentDayRow = openingRows[currentDayIndex];
currentDayRow.classList.add('today');

const currentOpeningTimes = currentDayRow.querySelectorAll('.col')[1];
if(currentOpeningTimes) {
  const innerText = currentOpeningTimes.innerHTML.trim();
  const timeStrings = innerText.split(' - ');
  if(timeStrings.length == 2) {

    try {
      const openDate = new Date();
      const openTime = timeStrings[0].split(':');
      openDate.setHours(openTime[0]);
      openDate.setMinutes(openTime[1]);
  
      const closeDate = new Date();
      const closeTime = timeStrings[1].split(':');
      closeDate.setHours(closeTime[0]);
      closeDate.setMinutes(closeTime[1]);
  
      if(currentDate >= openDate && currentDate <= closeDate) {
        currentOpeningTimes.innerHTML += `<span class="badge bg-primary">Geöffnet</span>`;
      } else {
        currentOpeningTimes.innerHTML += `<span class="badge bg-secondary">Geschlossen</span>`;
      }
    } catch(exception) {
      console.error(exception);
    }
  }
}

// Service Range Tabs
function hideAllTabContents() {
  document.querySelectorAll('.tabs-content > div').forEach((tab, index) => tab.classList.add('d-none'));
}
function showTabContent(index) {
  hideAllTabContents();
  document.querySelectorAll('.tabs-content > div')[index].classList.remove('d-none');
}
showTabContent(0);

const tabItems = document.querySelectorAll('.tabs-item');
tabItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    tabItems.forEach(item => item.classList.remove('active'));
    item.classList.add('active')
    showTabContent(index);
  });
})