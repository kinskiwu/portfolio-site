import About from './About.js';
import Projects from './Projects.js';
import Collab from './Collab.js';

export default class Home {
    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <section id="home">
                <h1>Hello there! I'm Kinski👋</h1>
            </section>
            <section id="about"></section>
            <section id="projects"></section>
            <section id="collab"></section>
        `;

        element.querySelector('#about').appendChild(new About().render());
        element.querySelector('#projects').appendChild(new Projects().render());
        element.querySelector('#collab').appendChild(new Collab().render());

        return element;
    }
}
