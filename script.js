// ==================== Menú Móvil ====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLink = document.querySelectorAll('.nav__link');

// Abrir menú
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Cerrar menú
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Cerrar menú cuando se hace click en un link
navLink.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ==================== Scroll Header ====================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

// ==================== Validación de Formulario ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.querySelector('input[name="nombre"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const telefono = document.querySelector('input[name="telefono"]').value.trim();
        const servicio = document.querySelector('select[name="servicio"]').value;
        const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

        // Validaciones
        if (!nombre || !email || !telefono || !servicio) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un email válido');
            return;
        }

        // Validar teléfono (solo números, espacios, guiones y +)
        const telefonoRegex = /^[+0-9\s\-()]+$/;
        if (!telefonoRegex.test(telefono)) {
            alert('Por favor ingresa un teléfono válido');
            return;
        }

        // Si todas las validaciones pasan
        console.log('Datos del formulario:', {
            nombre,
            email,
            telefono,
            servicio,
            mensaje
        });

        // Mostrar mensaje de éxito
        alert('¡Gracias! Tu presupuesto fue solicitado. Te contactaremos en breve.');

        // Enviar datos a través de WhatsApp (alternativa)
        const whatsappMensaje = `*Solicitud de Presupuesto TecnoAvanzadas*\n\n` +
            `*Nombre:* ${nombre}\n` +
            `*Email:* ${email}\n` +
            `*Teléfono:* ${telefono}\n` +
            `*Servicio:* ${servicio}\n` +
            `*Mensaje:* ${mensaje}`;
        
        const whatsappUrl = `https://wa.me/541138573602?text=${encodeURIComponent(whatsappMensaje)}`;
        console.log('WhatsApp URL:', whatsappUrl);

        // Aquí puedes agregar integración con backend
        // ejemplo: fetch('/api/contact', { method: 'POST', body: JSON.stringify({...}) })

        // Limpiar formulario
        this.reset();
    });
}

// ==================== Scroll Reveal Animation ====================
const revealElements = document.querySelectorAll('.service__card, .testimonio__card, .precio__card, .about__item, .faq__item');

const revealOnScroll = () => {
    const triggerPoint = window.innerHeight * 0.85;

    revealElements.forEach(element => {
        if (!element.classList.contains('revealed')) {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerPoint) {
                element.classList.add('revealed');
                element.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==================== Smooth Scroll para anclas ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Contador de Statistics (opcional) ====================
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 30;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

// ==================== Filtro de FAQ ====================
const faqItems = document.querySelectorAll('.faq__item');
const faqBtns = document.querySelectorAll('.faq__btn');

faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const faqItem = btn.closest('.faq__item');
        
        // Cerrar otros items
        faqItems.forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('faq__active');
            }
        });
        
        // Toggle del item actual
        faqItem.classList.toggle('faq__active');
    });
});

// ==================== Dark Mode (opcional) ====================
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Cargar preferencia guardada
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

console.log('Script de TecnoAvanzadas cargado correctamente');
