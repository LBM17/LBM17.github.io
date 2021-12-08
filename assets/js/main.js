/*=============== MOSTRAR EL MENÚ ===============*/
/*Recoger las variables del documento*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== MOSTRAR EL MENU =====*/
/*Validar si las constantes existen*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add("show-menu");
    })
}

/*===== ESCONDER EL MENU =====*/
/* Validar si las constantes existen */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link'); //Selecciona todos los elementos del documento con esa clase 

function linkAction(){
    const navMenu = document.getElementById('nav-menu'); 
    //Cada vez que se pulse un link del menu se oculta el menú de nuevo
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction)); //Añadir la funcion al evento click del link

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header'); 
    //Cuando el scroll es más grande de 50vh(vieewport height) se le añade la clase scroll a la cabecera 
    if(this.scrollY >= 50) {
        header.classList.add('scroll-header');
    }else{
        header.classList.remove('scroll-header'); 
    }
}
window.addEventListener('scroll', scrollHeader); 

/*=============== NEW SWIPER ===============
Para el script de la paginacion, crea los elementos con unos parámetros determinados
*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',
    slidesPerView: "auto",
    centeredSlides: true,
    
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
        992: {
          spaceBetween: 80,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]'); //Para recoger el elemento section llamado id

function scrollActive(){
    const scrollY = window.pageYOffset; //Es un identificador alternativo a scrollY, devuelve el número de 
                                        //píxeles que el documento actual se ha desplazado en el eje vertical: 0.0,
                                        // está en la zona superior del documento
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight; // devuelve el alto de un elemento, inclyendo el padding 
                                                    // vertical y los bordes, en píxeles, como un número entero
        const sectionTop = current.offsetTop - 58;  // (Distancia del elemento actual respecto al borde superior del nodo offsetParent)-(--header-height)
                                                    // OffsetParent retorna la referencia al elemeno contenedor más cercano
        const sectionId = current.getAttribute('id');
        //Identifica el id de la seccion actual y cuando se abra el menu, la seccion en la que se encuentre el usuario se visualizará ,de otro color en el menu
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link'); 
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link'); 
        }
    });
}
window.addEventListener('scroll', scrollActive); 
/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up'); 
    //Cuando el desplazamiento es superior a 350vh, añade la clase show-scroll a la etiqueta a con la clase scroll-top
    //Cuando nos desplacemos por la web y perdamos de vista la zona inicial aparecerá un botón que nos llevará al inicio de nuevo 
    //+ Nueva forma de formular if-else
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme'; 
const iconTheme = 'bx-sun'; 

//Cargar el tema si es que el usuario eligió uno en la visita anterior
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon'); 

//Obetener el tema actual de la interfaz
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'; 
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

//Validar si el usuario previamente ha escogido un tema 
if(selectedTheme){
    //Se averigua entonces si el usuario escogió o no el tema oscuro 
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
}

//Activar y desactivar el tema manualmente 
themeButton.addEventListener('click', () => {
    //Añadir o quitar el tema oscuro - icono
    document.body.classList.toggle(darkTheme); 
    themeButton.classList.toggle(iconTheme); 
    //Guardar en localStorage el icono que el usuario ha elegido 
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============
Genera una animación al cargar la página web, parte desde la zona superior de la web y se desplaza en 2.5 segundos
hasta su posición original, se usa la clase ScrollReveal
*/
const sr = ScrollReveal({
    origin:'top', 
    distance: '60px', 
    duration: 2500,
    delay: 400
})
//Aplicar el efecto a las clase CSS que se quiera
sr.reveal(`.home__img, .new__container, .footer__container, .panelAviso`);
sr.reveal(`.home__data`, {delay: 500}); 
sr.reveal(`.giving__content, .gift__card, .promocion, .wrapperPromociones`, {interval: 100}); 
sr.reveal(`.celebrate__data, .message__form, footer__img1,.supermarket__container,.section__title, .panelAviso__title`, {origin: 'left'}); 
sr.reveal(`celebrate__img, .message_img, .footer__img2`, {origin: 'right'}); 

/*
delay: es el tiempo que transcurre antes de que la animación comience
interval: es el tiempo que transcurre entre cada revelación
origin: desde qué punto se inicia la animación 
https://scrollrevealjs.org/api/interval.html
*/