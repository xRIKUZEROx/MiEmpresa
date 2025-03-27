// Función para traducir el contenido de la página
function translatePage(lang) {
    if (lang === 'es') return;
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Actualizar texto del selector de idioma
    const langSelector = document.querySelector('.dropdown a span');
    if (translations[lang] && translations[lang]['Idioma']) {
        langSelector.textContent = translations[lang]['Idioma'];
    }
    
    // Actualizar texto del selector de tema
    const themeToggle = document.querySelector('.theme-toggle a span');
    if (translations[lang] && translations[lang]['Tema']) {
        themeToggle.textContent = translations[lang]['Tema'];
    }
}

// Toggle para el menú móvil
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
});

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (document.querySelector('nav ul').classList.contains('active')) {
            document.querySelector('nav ul').classList.remove('active');
            document.querySelector('.mobile-menu i').classList.remove('fa-times');
        }
    });
});

// Efecto de header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Filtrado de portafolio
const filterButtons = document.querySelectorAll('.portfolio-nav button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            item.style.display = (filterValue === 'all' || item.getAttribute('data-category') === filterValue) ? 'block' : 'none';
        });
    });
});

// Ajustar velocidad del video hero
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) heroVideo.playbackRate = 0.7;

// Selector de idioma
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const languageOptions = document.querySelectorAll('.dropdown-menu a');
const languageSelector = document.querySelector('.dropdown a span');

// Mostrar/ocultar menú de idiomas
dropdown.addEventListener('click', (e) => {
    e.preventDefault();
    const isVisible = dropdownMenu.classList.contains('show');
    dropdownMenu.classList.toggle('show', !isVisible);
});

// Cerrar menú de idiomas al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// Cambiar idioma al seleccionar opción
languageOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        localStorage.setItem('language', lang);
        location.reload();
    });
});

// Selector de tema claro/oscuro
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleText = themeToggle.querySelector('span');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Ajustar sección "Nosotros" en responsive
function adjustAboutSection() {
    const aboutContainer = document.querySelector('.about-container');
    const aboutImage = document.querySelector('.about-image');
    
    if (window.innerWidth <= 768) {
        // Estilos para móvil
        aboutContainer.style.display = 'flex';
        aboutContainer.style.flexDirection = 'column';
        aboutImage.style.order = '1'; // Colocar imagen después del texto
        aboutImage.style.width = '100%';
        aboutImage.style.height = '250px';
        aboutImage.style.marginTop = '30px';
        aboutImage.querySelector('img').style.objectFit = 'cover';
    } else {
        // Restaurar estilos para desktop
        aboutContainer.style.display = 'grid';
        aboutImage.style.order = '';
        aboutImage.style.width = '';
        aboutImage.style.height = '';
        aboutImage.style.marginTop = '';
    }
}

// Cargar preferencias al iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Cargar idioma guardado
    const currentLang = localStorage.getItem('language') || 'es';
    translatePage(currentLang);
    if (currentLang !== 'es') {
        const selectedOption = document.querySelector(`.dropdown-menu a[data-lang="${currentLang}"]`);
        if (selectedOption) languageSelector.textContent = translations[currentLang]?.['Idioma'] || selectedOption.textContent;
    }

    // Inicializar ajustes responsive
    adjustAboutSection();
    window.addEventListener('resize', adjustAboutSection);
});

// Comportamiento del menú de idiomas en móviles
if (window.innerWidth <= 768) {
    dropdown.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
    });
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) dropdownMenu.style.display = 'none';
    });
}