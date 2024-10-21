import Router from './router.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Projects from './components/Projects.js';
import Collab from './components/Collab.js';
import Navigation from './components/Navigation.js';

class App {
    constructor() {
        this.router = new Router();
        this.navigation = new Navigation();
        this.routes = [
            { path: 'home', component: Home, title: 'Home' },
            { path: 'about', component: About, title: 'About' },
            { path: 'projects', component: Projects, title: 'Projects' },
            { path: 'collab', component: Collab, title: 'Collaborate' }
        ];
    }

    init() {
        this.setupRoutes();
        this.renderNavigation();
        this.setupEventListeners();
        this.router.handleRouting();
    }

    setupRoutes() {
        this.routes.forEach(route => {
            this.router.addRoute(route.path, new route.component());
        });
    }

    renderNavigation() {
        const navElement = this.navigation.render(this.routes);
        document.body.insertBefore(navElement, document.body.firstChild);
    }

    setupEventListeners() {
        window.addEventListener('popstate', () => this.router.handleRouting());
        document.addEventListener('click', (e) => {
            if (e.target.matches('nav a')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.router.navigateTo(route);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
