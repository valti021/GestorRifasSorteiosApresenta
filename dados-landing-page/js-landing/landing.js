        // Menu mobile
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Adicione isso ao seu JS existente:

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', function() {
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Fechar menu ao clicar fora (opcional)
        document.addEventListener('click', function(event) {
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if(this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        
        // Efeito de digitação no hero
        const heroTitle = document.querySelector('.hero-text h1');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Inicia a animação quando a página carrega
        window.addEventListener('load', () => {
            setTimeout(typeWriter, 500);
        });
        
        // Animação de scroll para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Aplicar animação aos elementos
        document.querySelectorAll('.feature-card, .example-preview').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });