
        let currentSlide = 0;
        const totalSlides = 5; // Total number of review cards
        const sliderWrapper = document.getElementById('sliderWrapper');
        const navDots = document.querySelectorAll('.nav-dot');
        let cardsPerView = 3;

        // Adjust cards per view based on screen size
        function updateCardsPerView() {
            if (window.innerWidth <= 768) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 1200) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
        }

        function updateSlider() {
            updateCardsPerView();
            const maxSlides = Math.max(0, totalSlides - cardsPerView);
            currentSlide = Math.min(currentSlide, maxSlides);
            
            const cardWidth = 100 / cardsPerView;
            const translateX = -currentSlide * cardWidth;
            sliderWrapper.style.transform = `translateX(${translateX}%)`;
            
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            updateCardsPerView();
            const maxSlides = Math.max(0, totalSlides - cardsPerView);
            if (currentSlide < maxSlides) {
                currentSlide++;
            } else {
                currentSlide = 0; // Loop back to start
            }
            updateSlider();
        }

        function prevSlide() {
            updateCardsPerView();
            const maxSlides = Math.max(0, totalSlides - cardsPerView);
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = maxSlides; // Loop to end
            }
            updateSlider();
        }

        function goToSlide(slideIndex) {
            updateCardsPerView();
            const maxSlides = Math.max(0, totalSlides - cardsPerView);
            currentSlide = Math.min(slideIndex, maxSlides);
            updateSlider();
        }

        // Initialize
        updateSlider();

        // Auto-slide functionality
        setInterval(nextSlide, 4000);

        // Handle window resize
        window.addEventListener('resize', updateSlider);

        // Touch/swipe support for mobile
        let startX = 0;
        let isDragging = false;

        sliderWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        sliderWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        sliderWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const deltaX = startX - endX;
            
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });