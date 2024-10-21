export default class About {
    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <h1>About Me</h1>
            <p>I'm a passionate software engineer with expertise in JavaScript, React, and Node.js.
            I'm particularly interested in creating accessible and performant web applications.</p>
        `;
        return element;
    }
}
