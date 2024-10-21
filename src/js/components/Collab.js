export default class Collab {
    constructor() {
        this.apiUrl = '';
    }

    render() {
        const element = document.createElement('div');
        element.className = 'collab-container';
        element.innerHTML = `
            <h1 class="collab-title">Let's Collaborate!</h1>
            <p class="collab-description">Excited to work together? Fill out this form and let's create something amazing!</p>
            <form id="collab-form" class="collab-form">
                <div class="form-group">
                    <label for="name" class="form-label">Name *</label>
                    <input type="text" id="name" name="name" class="form-input" required>
                    <span class="error-message" id="name-error"></span>
                </div>
                <div class="form-group">
                    <label for="email" class="form-label">Email *</label>
                    <input type="email" id="email" name="email" class="form-input" required>
                    <span class="error-message" id="email-error"></span>
                </div>
                <div class="form-group">
                    <label for="message" class="form-label">Message *</label>
                    <textarea id="message" name="message" class="form-input" required></textarea>
                    <span class="error-message" id="message-error"></span>
                </div>
                <div class="form-group">
                    <button type="submit" class="submit-btn">Send Message</button>
                </div>
            </form>
            <div id="form-messages" class="form-messages"></div>
        `;

        const form = element.querySelector('#collab-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));

        ['name', 'email', 'message'].forEach(fieldId => {
            const input = element.querySelector(`#${fieldId}`);
            input.addEventListener('input', () => this.validateField(input));
        });

        return element;
    }

    validateField(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (input.validity.valid) {
            errorElement.textContent = '';
            input.classList.remove('invalid');
        } else {
            this.showError(input, errorElement);
        }
    }

    showError(input, errorElement) {
        if (input.validity.valueMissing) {
            errorElement.textContent = `${input.name} is required.`;
        } else if (input.validity.typeMismatch) {
            errorElement.textContent = `Please enter a valid ${input.name}.`;
        }
        input.classList.add('invalid');
    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!form.checkValidity()) {
            ['name', 'email', 'message'].forEach(fieldId => {
                const input = form.elements[fieldId];
                this.validateField(input);
            });
            return;
        }

        const messagesElement = document.getElementById('form-messages');
        messagesElement.textContent = 'Sending message...';

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                messagesElement.textContent = 'Message sent successfully! We\'ll be in touch soon.';
                messagesElement.className = 'form-messages success';
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            messagesElement.textContent = 'Failed to send message. Please try again.';
            messagesElement.className = 'form-messages error';
        }
    }
}
