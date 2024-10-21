export default class Projects {
    constructor() {
        this.projects = [
            { id: 1, title: "Project 1", description: "Description of project 1" },
            { id: 2, title: "Project 2", description: "Description of project 2" },
            { id: 3, title: "Project 3", description: "Description of project 3" },
            { id: 4, title: "Project 4", description: "Description of project 4" },
        ];
        this.currentIndex = 0;
    }

    createProjectElement(project) {
        return `
            <div class="project-item">
                <h2 class="project-title">${project.title}</h2>
                <p class="project-description">${project.description}</p>
            </div>
        `;
    }

    render() {
        const element = document.createElement('div');
        element.className = 'projects-container';

        const projectsHTML = this.projects.map(project => this.createProjectElement(project)).join('');

        element.innerHTML = `
            <h1 class="projects-heading">Projects</h1>
            <div class="carousel-container">
                <div class="carousel">
                    ${projectsHTML}
                </div>
                <button class="carousel-button prev">&lt;</button>
                <button class="carousel-button next">&gt;</button>
            </div>
            <div class="carousel-dots"></div>
        `;

        this.setupCarousel(element);

        return element;
    }

    setupCarousel(element) {
        const carousel = element.querySelector('.carousel');
        const prevButton = element.querySelector('.carousel-button.prev');
        const nextButton = element.querySelector('.carousel-button.next');
        const dotsContainer = element.querySelector('.carousel-dots');

        // Create dot indicators
        this.projects.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index, carousel, dotsContainer));
            dotsContainer.appendChild(dot);
        });

        prevButton.addEventListener('click', () => this.prevSlide(carousel, dotsContainer));
        nextButton.addEventListener('click', () => this.nextSlide(carousel, dotsContainer));

        // Initial setup
        this.updateCarousel(carousel, dotsContainer);
    }

    prevSlide(carousel, dotsContainer) {
        this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.updateCarousel(carousel, dotsContainer);
    }

    nextSlide(carousel, dotsContainer) {
        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        this.updateCarousel(carousel, dotsContainer);
    }

    goToSlide(index, carousel, dotsContainer) {
        this.currentIndex = index;
        this.updateCarousel(carousel, dotsContainer);
    }

    updateCarousel(carousel, dotsContainer) {
        const offset = -this.currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        // Update active dot
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}
