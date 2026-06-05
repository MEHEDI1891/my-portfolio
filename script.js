class PortfolioManager {
    constructor() {
        this.currentWindow = 0;
        this.totalWindows = 7;
        this.windows = document.querySelectorAll('.window');
        this.navTabs = document.querySelectorAll('.nav-tab');
        this.minimizeButtons = document.querySelectorAll('.minimize-btn');
        this.init();
    }

    init() {
        this.navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.setActiveWindow(index));
        });

        this.minimizeButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const nextIndex = (this.currentWindow + 1) % this.totalWindows;
                this.setActiveWindow(nextIndex);
            });
        });

        document.getElementById('navPrev').addEventListener('click', () => this.previousWindow());
        document.getElementById('navNext').addEventListener('click', () => this.nextWindow());
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    setActiveWindow(index) {
        if (index < 0 || index >= this.totalWindows) return;

        this.windows.forEach(w => w.classList.remove('active'));
        this.navTabs.forEach(t => t.classList.remove('active'));

        this.windows[index].classList.add('active');
        this.navTabs[index].classList.add('active');

        this.currentWindow = index;
        document.getElementById('currentWindow').textContent = index + 1;
    }

    nextWindow() {
        const nextIndex = (this.currentWindow + 1) % this.totalWindows;
        this.setActiveWindow(nextIndex);
    }

    previousWindow() {
        const prevIndex = (this.currentWindow - 1 + this.totalWindows) % this.totalWindows;
        this.setActiveWindow(prevIndex);
    }

    handleKeyboard(e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.nextWindow();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.previousWindow();
        } else if (e.key >= '1' && e.key <= '7') {
            const index = parseInt(e.key) - 1;
            if (index < this.totalWindows) {
                this.setActiveWindow(index);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const manager = new PortfolioManager();
    
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.includes('My Work')) {
                manager.setActiveWindow(3);
            } else if (btn.textContent.includes('Hire Me')) {
                manager.setActiveWindow(6);
            }
        });
    });

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message!');
            form.reset();
        });
    });
});
