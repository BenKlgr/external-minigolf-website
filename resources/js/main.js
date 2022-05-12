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
const currentDate = moment();
const openingRows = document.querySelectorAll('.openings > div');
const currentDayIndex = currentDate.day() - 1;

(async () => {
  const response = await fetch('/resources/data/openingTimes.json');
  const json = await response.json();
  
  json.forEach((times, index) => {
    const currentDayRow = openingRows[index];
    const openingTimesCol = currentDayRow.querySelectorAll('.col')[1];

    openingTimesCol.innerHTML = `${times.opening} - ${times.closing}`;

    if(index == currentDayIndex) {
      currentDayRow.classList.add('today');

      const openDate = moment(times.opening, 'HH:mm');
      const closeDate = moment(times.closing, 'HH:mm');

      if(currentDate >= openDate && currentDate <= closeDate) {
        const differenceToClose = Math.abs(currentDate.diff(closeDate, 'minutes'));
        if(differenceToClose <= 60) {
          openingTimesCol.innerHTML += `<span class="badge bg-warning">Schließt bald</span>`;
        } else {
          openingTimesCol.innerHTML += `<span class="badge bg-primary">Geöffnet</span>`;
        }
      } else {
        openingTimesCol.innerHTML += `<span class="badge bg-secondary">Geschlossen</span>`;
      }
    }
  })
})();

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