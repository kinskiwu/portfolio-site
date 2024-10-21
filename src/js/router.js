import NotFound from './components/NotFound.js';

export default class Router {
    constructor() {
        this.routes = {};
        this.notFoundComponent = new NotFound();
    }

    addRoute(name, component) {
        this.routes[name] = component;
    }

    navigateTo(route) {
        window.history.pushState(null, null, `#${route}`);
        this.handleRouting();
    }

    handleRouting() {
        const app = document.getElementById('app');
        let route = window.location.hash.slice(1) || 'home';

        app.innerHTML = '';
        if (this.routes[route]) {
            app.appendChild(this.routes[route].render());
        } else {
            app.appendChild(this.notFoundComponent.render());
        }
    }
}
