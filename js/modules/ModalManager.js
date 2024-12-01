export class ModalManager {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
    }

    show() {
        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
    }
} 