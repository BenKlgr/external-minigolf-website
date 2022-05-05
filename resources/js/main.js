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