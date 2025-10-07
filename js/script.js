// JavaScript para funcionalidades do site

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll suave para links internos - VERSÃO CORRIGIDA
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calcula a posição considerando a navbar fixa
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 30;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de fade-in ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .section-title');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Formulário de contato
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulação de envio
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Ativar tooltips do Bootstrap
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Efeito de digitação no hero (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Inicializar efeito de digitação se necessário
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-section h1 span');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText);
    }
});

// Efeito de partículas no hero (opcional)
function createParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 6 + 4}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(particle);
    }
}

// CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(style);

// Inicializar partículas quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Efeito de brilho interativo
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = hero.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            hero.style.background = `
                radial-gradient(circle at ${x * 100}% ${y * 100}%, 
                var(--cor-primaria), 
                var(--cor-secundaria), 
                var(--cor-escura))
            `;
        });
    }
});

function enviarWhats(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    const telefone = "5584998464279";
    
    const texto = `Olá! Meu nome é ${nome}. 

    Assunto: ${assunto}

    ${mensagem}`;
    
    const mensagemCodificada = encodeURIComponent(texto);
    
    const urlWhatsApp = `https://wa.me/${telefone}?text=${mensagemCodificada}`;
    
    window.open(urlWhatsApp, '_blank');
    
    document.getElementById('formulario').reset();
    
    alert('Redirecionando para o WhatsApp...');
}