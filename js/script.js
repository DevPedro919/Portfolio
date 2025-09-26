// Variáveis globais
let isScrolling = false;
let countersAnimated = false;

// Dados dos desenvolvedores
const developers = {
    gustavo: {
        name: "Gustavo das Neves",
        role: "Desenvolvedor Back-End",
        image: "../img/Gustavo.jpeg",
        bio: "Desenvolvedor Back-End cursando o 4º semestre de Desenvolvimento de Sistema na instituição de ensino Senai.",
        skills: ["Java", "MySQL", "Insomnia", "CSS", "Figma", "GitHub"],
        email: "nevesgustavo2020@gmail.com",
        phone: "+55 (48) 99860-3554",
        linkedin: "https://linkedin.com/in/gustavo-neves",
        github: "https://github.com/gustavo-neves",
        experience: "À procura da primeira oportunidade",
        projects: 10
    },
    pedro: {
        name: "Pedro Henrique Cucker Santana",
        role: "Desenvolvedor Back-End",
        image: "../img/Pedro.jpeg",
        bio: "Desenvolvedor Back-End cursando o 4º semestre de Desenvolvimento de Sistema na instituição de ensino Senai.",
        skills: ["Java", "PostgreSQL", "Spring", "GitHub"],
        email: "santanapedro0105@gmail.com",
        phone: "+55 (48) 99673-1277",
        linkedin: "https://www.linkedin.com/in/pedro-henrique-cucker-santana-9720b4351/",
        github: "https://github.com/DevPedro919",
        experience: "À procura da primeira oportunidade",
        projects: 15
    },
    lucas: {
        name: "Lucas Silveira",
        role: "Desenvolvedor Front-End",
        image: "../img/Silveira.jpeg",
        bio: "Desenvolvedor Front-End cursando o 4º semestre de Desenvolvimento de Sistema na instituição de ensino Senai.",
        skills: ["CSS", "JavaScript", "Figma"],
        email: "lucas.silveira.bp@gmail.com",
        phone: "+55 (48) 9610-6798",
        linkedin: "https://www.linkedin.com/in/lucas-silveira-88313a34b",
        github: "https://github.com/lucas-silveira2",
        experience: "À procura da primeira oportunidade",
        projects: 10
    }
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupAnimations();
    setupContactForm();
    setupThemeToggle();
    setupTypingAnimation();
    setupEasterEgg();
});

// ==================== NAVEGAÇÃO ====================
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    
    // Scroll da navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });
    
    // Fechar menu mobile ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function scrollToSection(sectionId) {
    if (isScrolling) return;
    
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    isScrolling = true;
    
    const headerOffset = 80;
    const elementPosition = section.offsetTop;
    const offsetPosition = elementPosition - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// ==================== ANIMAÇÕES ====================
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('stats-row') && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 100;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
}

function setupTypingAnimation() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;
    
    const text = textElement.textContent;
    textElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        textElement.textContent = text.slice(0, i + 1);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}

// ==================== MODAL DOS DESENVOLVEDORES ====================
function openDeveloperModal(developerId) {
    const developer = developers[developerId.toLowerCase()];
    if (!developer) return;
    
    const modal = document.getElementById('developerModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Perfil - ${developer.name}`;
    
    modalBody.innerHTML = `
        <div class="developer-profile">
            <div class="row">
                <div class="col-md-4">
                    <div class="developer-avatar">
                        <img src="${developer.image}" alt="${developer.name}" class="rounded-circle img-fluid shadow">
                        <h4 class="mt-3">${developer.name}</h4>
                        <p class="text-muted">${developer.role}</p>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="developer-info">
                        <h5>Sobre</h5>
                        <p class="mb-4">${developer.bio}</p>
                        
                        <div class="row mb-4">
                            <div class="col-6">
                                <strong>Experiência:</strong><br>
                                ${developer.experience}
                            </div>
                            <div class="col-6">
                                <strong>Projetos:</strong><br>
                                ${developer.projects} concluídos
                            </div>
                        </div>
                        
                        <h6>Principais Habilidades:</h6>
                        <div class="developer-skills mb-4">
                            ${developer.skills.map(skill => `<span class="badge bg-primary">${skill}</span>`).join(' ')}
                        </div>
                        
                        <div class="developer-contact">
                            <h6>Informações de Contato</h6>
                            <div class="contact-detail">
                                <i class="fas fa-envelope me-3"></i>
                                <span><a href="mailto:${developer.email}">${developer.email}</a></span>
                            </div>
                            <div class="contact-detail">
                                <i class="fas fa-phone me-3"></i>
                                <span>${developer.phone}</span>
                            </div>
                            
                            <div class="social-links-modal">
                                <a href="${developer.linkedin}" target="_blank" class="social-link">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="${developer.github}" target="_blank" class="social-link">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="mailto:${developer.email}" class="social-link">
                                    <i class="fas fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// ==================== FORMULÁRIO DE CONTATO ====================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(contactForm)) {
            showNotification('Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        
        // Simular envio
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Enviado!';
            showNotification('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        }, 2000);
    });
    
    // Validação em tempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    field.classList.remove('is-invalid', 'is-valid');
    
    // Validações
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Digite um email válido';
        }
    } else if (field.name === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Nome deve ter pelo menos 2 caracteres';
    } else if (field.name === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    // Mostrar erro
    let errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) errorDiv.remove();
    
    if (!isValid && errorMessage) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// ==================== SISTEMA DE NOTIFICAÇÕES ====================
function showNotification(message, type = 'info', duration = 5000) {
    // Remover notificação existente
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = {
        'success': 'check-circle',
        'error': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    }[type] || 'info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon} me-2"></i>
            <span>${message}</span>
        </div>
        <button class="btn-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remover
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

// ==================== SISTEMA DE TEMA ====================
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        updateThemeIcon(newTheme);
        localStorage.setItem('theme', newTheme);

        showNotification(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`, 'info', 2000);
    });
}

function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('themeToggle');
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ==================== EASTER EGG ====================
function setupEasterEgg() {
    let clickCount = 0;
    const navbarBrand = document.querySelector('.navbar-brand');
    
    if (navbarBrand) {
        navbarBrand.addEventListener('click', function(e) {
            e.preventDefault();
            clickCount++;
            
            if (clickCount === 5) {
                showNotification('🎉 Easter Egg descoberto! Equipe Yupi agradece!', 'info', 8000);
                createConfetti();
                clickCount = 0;
            }
            
            setTimeout(() => {
                if (clickCount < 5) clickCount = 0;
            }, 3000);
        });
    }
}

function createConfetti() {
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ==================== FUNÇÕES GLOBAIS ====================
window.scrollToSection = scrollToSection;
window.openDeveloperModal = openDeveloperModal;
window.showNotification = showNotification;

// ==================== TECLADO ====================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const bsModal = bootstrap.Modal.getInstance(openModal);
            if (bsModal) bsModal.hide();
        }
    }
});

console.log('🚀 Equipe Yupi - Website carregado com sucesso!');