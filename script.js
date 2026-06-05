// Grab all the window elements
const windows = Array.from(document.querySelectorAll('.window'));
let currentIndex = 0;

// Visual constants for the stacking effect behind the main window
const scaleStep = 0.06;
const translateYStep = 55; 

// Function to calculate and apply the position of every window
function updateStack() {
    windows.forEach((win, index) => {
        if (index < currentIndex) {
            // Window has been minimized (thrown downwards/hidden)
            win.className = 'window window-minimized';
            win.style.zIndex = 0;
        } 
        else if (index === currentIndex) {
            // Active Window (front)
            win.className = 'window';
            win.style.transform = `translateY(0) scale(1)`;
            win.style.zIndex = 100;
            win.style.opacity = 1;
            win.style.pointerEvents = 'auto';
        } 
        else {
            // Stacked Windows (peeking out from behind the active one)
            const offset = index - currentIndex;
            win.className = 'window';
            win.style.transform = `translateY(${offset * translateYStep}px) scale(${1 - (offset * scaleStep)})`;
            win.style.zIndex = 100 - offset;
            
            // Fade out slightly the further back it is
            win.style.opacity = 1 - (offset * 0.2); 
            win.style.pointerEvents = 'none'; 
        }
    });
}

// Attach click events to all the yellow minimize buttons
windows.forEach((win) => {
    const minBtn = win.querySelector('.min-btn');
    if(minBtn) {
        minBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            minimizeCurrent();
        });
    }
});

// Move the stack forward by one window
function minimizeCurrent() {
    if (currentIndex < windows.length - 1) {
        currentIndex++;
        updateStack();
    }
}

// Jumps directly to a specific window (used by the 'RESUME' and 'Hire Me' buttons)
function minimizeTo(targetId) {
    if(targetId === 'contact') {
        currentIndex = windows.length - 1;
        updateStack();
    }
}

// Resets the stack back to the Home window
function resetStack() {
    currentIndex = 0;
    updateStack();
}

// Initialize stack as soon as the page loads
updateStack();
