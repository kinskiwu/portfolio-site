import Router from './router.js';
import Home from './components/Home.js';
import Navigation from './components/Navigation.js';
import NotFound from './components/NotFound.js';

class App {
    constructor() {
        this.router = new Router();
    }

    init() {
        this.setupRoutes();
        this.render();
        this.setupEventListeners();
        this.router.handleRouting();  // Initial routing
    }

    setupRoutes() {
        this.router.addRoute('home', new Home());
        this.router.setNotFoundHandler(new NotFound());
    }

    render() {
        const appElement = document.getElementById('app');
        const navElement = new Navigation().render();
        const contentElement = document.createElement('main');
        const footerElement = document.createElement('footer');
        footerElement.innerHTML = '<p>&copy; 2024 Kinski Wu. All rights reserved.</p>';

        appElement.appendChild(navElement);
        appElement.appendChild(contentElement);
        appElement.appendChild(footerElement);

        this.router.setContentElement(contentElement);
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('nav a')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.router.navigateTo(`/${route}`);
            }
        });

        this.router.listenForBackNavigation();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
