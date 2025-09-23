let isScrolling = false;
let countersAnimated = false;

// Dados dos desenvolvedores
const developers = {
    Gustavo: {
        name: "Gustavo das Neves",
        role: "Desenvolvedor Back - End",
        image: "../img/Gustavo.jpeg",
        bio: "Desenvolvedor Back - End cursando o 4 semestre de Desenvolvimento de Sistema na instituição de ensino Senai.",
        skills: ["Java", "MySql", "Insomnia", "CSS", "Figma", "Git Hub"],
        email: "nevesgustavo2020@gmail.com",
        phone: "+55 (48) 99860-3554",
        linkedin: "https://linkedin.com/in/joaosilva",
        github: "https://github.com/joaosilva",
        experience: "A procura da primeira oportunidade",
        projects: 10
    },
    maria: {
        name: "Maria Santos",
        role: "Frontend Specialist & UI/UX Designer",
        image: "https://images.unsplash.com/photo-1494790108755-2616b9358ce9?w=300&h=300&fit=crop&crop=face",
        bio: "Desenvolvedor Front - End cursando o 4 semestre de Desenvolvimento de Sistema na instituição de ensino Senai.",
        skills: ["CSS", "JS", "Figma", "Git Hub"],
        email: "lucas.silveira.bp@gmail.com",
        phone: "+55 (48) 99765-4321",
        linkedin: "https://linkedin.com/in/mariasantos",
        github: "https://github.com/mariasantos",
        experience: "A procura da primeira oportunidade",
        projects: 10
    },
    lucas: {
        name: "Lucas Silveira",
        role: "Desenvolvedor Front - End",
        image: "../img/Silveira.jpeg",
        bio: "Desenvolvedor Front - End cursando o 4 semestre de Desenvolvimento de Sistema na instituição de ensino Senai.",
        email: "lucas.silveira.bp@gmail.com",
        phone: "+55 (48) 9610-6798",
        linkedin: "https://www.linkedin.com/in/lucas-silveira-88313a34b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github: "https://github.com/lucas-silveira2",
        experience: "A procura da primeira oportunidade",
        projects: 10
    }
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupAnimations();
    setupContactForm();
    setupScrollEffects();
    setupSmoothScroll();
    setupTypingAnimation();
    setupThemeToggle();
}

// ==================== NAVEGAÇÃO ====================
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }, 16));
    
    // Mobile menu auto-close
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
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
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// ==================== SCROLL SUAVE ====================
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                scrollToSection(targetId);
            }
        });
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

// ==================== ANIMAÇÃO DE DIGITAÇÃO ====================
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
            // Remove o cursor depois de um tempo
            setTimeout(() => {
                textElement.style.setProperty('--cursor', 'none');
            }, 2000);
        }
    }, 100);
}

// ==================== ANIMAÇÕES ====================
function setupAnimations() {
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animação especial para contadores
                if (entry.target.classList.contains('stats-row') && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos com animação
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ==================== EFEITOS DE SCROLL ====================
function setupScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScrollEffects() {
    const scrollY = window.scrollY;
    
    // Parallax effect para o hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }
    
    // Fade effect para cards de projeto
    animateProjectCards();
}

function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
            const opacity = Math.min(scrollProgress * 1.5, 1);
            const translateY = Math.max((1 - scrollProgress) * 30, 0);
            
            card.style.opacity = opacity;
            card.style.transform = `translateY(${translateY}px)`;
        }
    });
}

// ==================== MODAL DOS DESENVOLVEDORES ====================
function openDeveloperModal(developerId) {
    const developer = developers[developerId];
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
                                <span>${developer.email}</span>
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

// Tornar função disponível globalmente
window.openDeveloperModal = openDeveloperModal;

// ==================== FORMULÁRIO DE CONTATO ====================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Validação em tempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validar formulário
    if (!validateForm(form)) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Simular envio
    simulateFormSubmission(submitBtn, form);
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
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remover classes de erro anteriores
    field.classList.remove('is-invalid', 'is-valid');
    
    // Validar campo obrigatório
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }
    
    // Validar email
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Digite um email válido';
        }
    }
    
    // Validar nome (mínimo 2 caracteres)
    if (field.name === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    // Validar assunto (mínimo 3 caracteres)
    if (field.name === 'subject' && value && value.length < 3) {
        isValid = false;
        errorMessage = 'Assunto deve ter pelo menos 3 caracteres';
    }
    
    // Validar mensagem (mínimo 10 caracteres)
    if (field.name === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    // Aplicar classes de validação
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    // Mostrar/esconder mensagem de erro
    let errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
        errorDiv.remove();
    }
    
    if (!isValid && errorMessage) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = errorMessage;
        errorDiv.style.display = 'block';
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    return isValid;
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    if (field.value.trim()) {
        if (validateField(field)) {
            field.classList.add('is-valid');
        }
    } else {
        field.classList.remove('is-valid');
    }
}

function simulateFormSubmission(submitBtn, form) {
    const originalText = submitBtn.innerHTML;
    const formData = new FormData(form);
    
    // Estado de loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    
    // Simular tempo de envio (2-4 segundos)
    const sendTime = Math.random() * 2000 + 2000;
    
    setTimeout(() => {
        // 90% de chance de sucesso para simulação
        const success = Math.random() > 0.1;
        
        if (success) {
            // Estado de sucesso
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('btn-success');
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Enviado com Sucesso!';
            
            // Mostrar notificação de sucesso
            showNotification(
                `Obrigado ${formData.get('name')}! Sua mensagem foi enviada com sucesso. Retornaremos em breve através do email ${formData.get('email')}.`, 
                'success'
            );
            
            // Limpar formulário
            form.reset();
            form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
            
            // Remover mensagens de erro
            form.querySelectorAll('.invalid-feedback').forEach(error => {
                error.remove();
            });
            
        } else {
            // Simular erro
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('btn-danger');
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Erro no Envio';
            
            showNotification('Ops! Ocorreu um erro ao enviar sua mensagem. Tente novamente.', 'error');
        }
        
        // Restaurar botão após 3 segundos
        setTimeout(() => {
            submitBtn.classList.remove('btn-success', 'btn-danger');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 3000);
        
    }, sendTime);
}

// ==================== SISTEMA DE NOTIFICAÇÕES ====================
function showNotification(message, type = 'info', duration = 5000) {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => existingNotification.remove(), 300);
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
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
    
    // Auto remover após duração especificada
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ==================== EASTER EGG ====================
let clickCount = 0;
document.querySelector('.navbar-brand').addEventListener('click', function(e) {
    e.preventDefault();
    clickCount++;
    
    if (clickCount === 5) {
        showNotification('🎉 Você descobriu nosso Easter Egg! A Equipe Yupi agradece sua curiosidade!', 'info', 8000);
        
        // Adicionar confetti effect
        createConfetti();
        clickCount = 0;
    }
    
    // Reset counter após 3 segundos
    setTimeout(() => {
        if (clickCount < 5) clickCount = 0;
    }, 3000);
});

function createConfetti() {
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Adicionar CSS para confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ==================== SISTEMA DE TEMA ====================
function setupThemeToggle() {
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Aplicar tema inicial
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    // Configurar botão de toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        // Definir ícone inicial
        updateThemeIcon(initialTheme);

        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            updateThemeIcon(newTheme);
            saveTheme(newTheme);

            // Mostrar notificação
            showNotification(
                `Tema alterado para ${newTheme === 'dark' ? 'escuro' : 'claro'}`,
                'info',
                2000
            );
        });
    }

    // Ouvir mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Só aplicar se o usuário não tiver uma preferência manual salva
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function applyTheme(theme) {
    // Remover todas as classes de tema
    document.body.classList.remove('dark-theme', 'light-theme');

    // Adicionar a classe do tema atual
    document.body.classList.add(`${theme}-theme`);

    // Atualizar meta tag de cor do tema para mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
    }
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// ==================== UTILITÁRIOS ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== PERFORMANCE ====================
// Lazy loading para imagens
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==================== ACESSIBILIDADE ====================
// Melhorar navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar modal
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const bsModal = bootstrap.Modal.getInstance(openModal);
            if (bsModal) bsModal.hide();
        }
    }
    
    // Enter ou Space para ativar botões customizados
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('btn-custom')) {
        e.preventDefault();
        e.target.click();
    }
});

// ==================== DETECÇÃO DE DISPOSITIVO ====================
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// ==================== EXPORTAR FUNÇÕES GLOBAIS ====================
// Tornar funções disponíveis globalmente
window.scrollToSection = scrollToSection;
window.openDeveloperModal = openDeveloperModal;
window.showNotification = showNotification;

// ==================== INICIALIZAÇÕES FINAIS ====================
// Setup adicional após DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    
    // Adicionar indicador de loading inicial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// ==================== SERVICE WORKER (OPCIONAL) ====================
// Registrar service worker para cache offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}

// ==================== ANALYTICS (PLACEHOLDER) ====================
function trackEvent(category, action, label = '') {
    // Placeholder para Google Analytics ou similar
    console.log('Event tracked:', { category, action, label });
}

// Rastrear cliques importantes
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('Button', 'Click', 'Primary Button');
    }
    
    if (e.target.matches('.project-card')) {
        trackEvent('Project', 'View', 'Project Card');
    }
    
    if (e.target.matches('.social-link')) {
        trackEvent('Social', 'Click', 'Social Link');
    }
});


