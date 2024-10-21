export default class Router {
    constructor() {
        this.routes = {};
        this.notFoundHandler = null;
        this.contentElement = null;
    }

    addRoute(path, component) {
        this.routes[path] = component;
    }

    setNotFoundHandler(component) {
        this.notFoundHandler = component;
    }

    setContentElement(element) {
        this.contentElement = element;
    }

    navigateTo(path) {
        history.pushState(null, '', path);
        this.handleRouting();
    }

    handleRouting() {
        const path = window.location.pathname.slice(1) || 'home';
        if (this.routes[path]) {
            this.contentElement.innerHTML = '';
            this.contentElement.appendChild(this.routes[path].render());
        }
    }

    listenForBackNavigation() {
        window.addEventListener('popstate', () => this.handleRouting());
    }
}
