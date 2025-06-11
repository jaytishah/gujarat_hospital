//   let currentSlide = 0;
        let cardsPerView1 = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
        let carousel = document.getElementById('carousel');
        let prevBtn = document.getElementById('prevBtn');
        let nextBtn = document.getElementById('nextBtn');
        let dotsContainer = document.getElementById('dots');
        
        const totalCards = document.querySelectorAll('.doctor-card').length;
        
        
        let totalSlides1 = Math.max(0, totalCards - cardsPerView1 + 1);
        console.log(totalSlides1);
        

        function updatecardsPerView1() {
            const newcardsPerView1 = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            if (newcardsPerView1 !== cardsPerView1) {
                location.reload(); // Simple solution for responsive changes
            }
        }

        // Create dots based on number of possible slides
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides1; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('data-slide', i);
                dotsContainer.appendChild(dot);
            }
        }

        function updateCarousel() {
            const cardWidth = carousel.children[0].offsetWidth;
            const gap = 20;
            const translateX = -(currentSlide * (cardWidth + gap));
            carousel.style.transform = `translateX(${translateX}px)`;
            
            // Update dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Update button states
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide >= totalSlides1 - 1;
        }

        function nextSlide() {
            console.log("hiiii");
            if (currentSlide < totalSlides1 - 1) {
                currentSlide++;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Dot navigation
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                goToSlide(slideIndex);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Handle window resize
        window.addEventListener('resize', updatecardsPerView1);

        // View Profile button functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-profile-btn')) {
                const doctorName = e.target.closest('.doctor-card').querySelector('.doctor-name').textContent;
                alert(`Viewing profile for ${doctorName}`);
                // Replace with actual profile navigation logic
            }
        });

        // Initialize
        createDots();
        updateCarousel();
  
        