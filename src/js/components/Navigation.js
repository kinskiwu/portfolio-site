export default class Navigation {
    render() {
        const nav = document.createElement('nav');
        nav.className = 'main-navigation';

        nav.innerHTML = `
            <a href="#home" data-route="home">Home</a>
            <a href="#about" data-route="home">About</a>
            <a href="#projects" data-route="home">Projects</a>
            <a href="#collab" data-route="home">Collaborate</a>
        `;
        return nav;
    }
}
