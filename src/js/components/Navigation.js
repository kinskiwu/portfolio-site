export default class Navigation {
    render(routes) {
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        routes.forEach(route => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${route.path}`;
            a.textContent = route.title;
            a.setAttribute('data-route', route.path);
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        return nav;
    }
}
