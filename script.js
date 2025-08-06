// Estado da aplicação
let activeSection = 'intro';
let expandedCompetitor = null;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCompetitors();
    initializeTabs();
    initializeScrollSpy();
    initializeAnimations();
    initializeForm();
});

// Navegação entre seções
function initializeNavigation() {
    // Botões de navegação
    const navItems = document.querySelectorAll('.nav-item, [data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                scrollToSection(sectionId);
            }
        });
    });
}

function scrollToSection(sectionId) {
    activeSection = sectionId;
    updateActiveNavItem();
    
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function updateActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const sectionId = item.getAttribute('data-section');
        if (sectionId === activeSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Funcionalidade dos cards de concorrentes
function initializeCompetitors() {
    const competitorHeaders = document.querySelectorAll('.competitor-header');
    
    competitorHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const competitorId = this.getAttribute('data-competitor');
            toggleCompetitor(competitorId);
        });
    });
}

function toggleCompetitor(competitorId) {
    const content = document.getElementById(competitorId + '-content');
    const arrow = document.querySelector(`[data-competitor="${competitorId}"] .competitor-arrow`);
    
    if (expandedCompetitor === competitorId) {
        // Fechar o competitor atual
        content.classList.remove('expanded');
        arrow.classList.remove('rotated');
        expandedCompetitor = null;
    } else {
        // Fechar o competitor anteriormente aberto
        if (expandedCompetitor) {
            const prevContent = document.getElementById(expandedCompetitor + '-content');
            const prevArrow = document.querySelector(`[data-competitor="${expandedCompetitor}"] .competitor-arrow`);
            prevContent.classList.remove('expanded');
            prevArrow.classList.remove('rotated');
        }
        
        // Abrir o novo competitor
        content.classList.add('expanded');
        arrow.classList.add('rotated');
        expandedCompetitor = competitorId;
    }
}

// Sistema de abas para propostas
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Remover classe active de todos os botões e conteúdos
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Adicionar classe active ao botão e conteúdo selecionados
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId + '-tab');
    
    if (activeButton && activeContent) {
        activeButton.classList.add('active');
        activeContent.classList.add('active');
    }
}

// Scroll spy para atualizar navegação automaticamente
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    function updateActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        if (current && current !== activeSection) {
            activeSection = current;
            updateActiveNavItem();
        }
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Executar uma vez no carregamento
}

// Animações de entrada quando elementos entram na viewport
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos com animações
    const animatedElements = document.querySelectorAll('.competitor-card, .funnel-card, .section-header, .strategy-summary');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Formulário de contato
function initializeForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }
}

function handleFormSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validação básica
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Simular envio do formulário
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        document.querySelector('.contact-form form').reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funcionalidades adicionais

// Smooth scroll para navegação mobile
function initializeMobileMenu() {
    // Adicionar funcionalidade de menu mobile se necessário
    const navMenu = document.querySelector('.nav-menu');
    
    // Fechar menu ao clicar em um item (para mobile)
    if (window.innerWidth <= 768) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Fechar menu mobile se existir
            });
        });
    }
}

// Lazy loading para imagens
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Parallax suave para hero section
function initializeParallax() {
    const heroImage = document.querySelector('.hero-img');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Manter formato original (R$, x, etc.)
            const originalText = counter.textContent;
            const prefix = originalText.replace(/[\d,.-]/g, '');
            counter.textContent = prefix + Math.floor(current);
        }, 16);
    });
}

// Inicializar funcionalidades adicionais
window.addEventListener('load', function() {
    initializeMobileMenu();
    initializeLazyLoading();
    initializeParallax();
    
    // Animar contadores quando a seção de estratégia estiver visível
    const strategySection = document.getElementById('strategy');
    if (strategySection) {
        const strategyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    strategyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        strategyObserver.observe(strategySection);
    }
});

// Utilitários
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

// Otimizar scroll events
const optimizedScrollHandler = debounce(() => {
    // Handlers de scroll otimizados aqui
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Adicionar classe para indicar que JavaScript está carregado
document.documentElement.classList.add('js-loaded');

