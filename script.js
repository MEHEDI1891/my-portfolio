// Grab all the window elements
const windows = Array.from(document.querySelectorAll('.window'));
let currentIndex = 0;

// Visual constants for the stacking effect
const scaleStep = 0.05;
const translateYStep = 45; // Pixels to move down per layer

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
            // Stacked Windows (below active)
            const offset = index - currentIndex;
            win.className = 'window';
            win.style.transform = `translateY(${offset * translateYStep}px) scale(${1 - (offset * scaleStep)})`;
            win.style.zIndex = 100 - offset;
            
            // Fade out slightly the further back it is
            win.style.opacity = 1 - (offset * 0.15); 
            win.style.pointerEvents = 'none'; // Prevent clicking background windows
        }
    });
}

// Attach click events to all the yellow minimize buttons
windows.forEach((win, index) => {
    const minBtn = win.querySelector('.min-btn');
    if(minBtn) {
        minBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent bubbling
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

// Jumps directly to a specific window (used by the 'Hire Me' button)
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
