const windows = Array.from(document.querySelectorAll('.window'));
let currentIndex = 0;

const scaleStep = 0.05;
const translateYStep = 50; 

function updateStack() {
    windows.forEach((win, index) => {
        if (index < currentIndex) {
            // Window is hidden (thrown away)
            win.className = 'window window-minimized';
            win.style.zIndex = 0;
        } 
        else if (index === currentIndex) {
            // Active Window (Front)
            win.className = 'window';
            win.style.transform = `translateY(0) scale(1)`;
            win.style.zIndex = 100;
            win.style.opacity = 1;
            win.style.pointerEvents = 'auto';
        } 
        else {
            // Stacked Windows (Behind)
            const offset = index - currentIndex;
            win.className = 'window';
            win.style.transform = `translateY(${offset * translateYStep}px) scale(${1 - (offset * scaleStep)})`;
            win.style.zIndex = 100 - offset;
            win.style.opacity = 1 - (offset * 0.15); 
            win.style.pointerEvents = 'none'; 
        }
    });
}

// Go to the Next Window
function nextWindow() {
    if (currentIndex < windows.length - 1) {
        currentIndex++;
        updateStack();
    }
}

// Go to the Previous Window (Back Button Logic)
function prevWindow() {
    if (currentIndex > 0) {
        currentIndex--;
        updateStack();
    }
}

// Jump directly to a specific window
function goToWindow(index) {
    if(index >= 0 && index < windows.length) {
        currentIndex = index;
        updateStack();
    }
}

// Initialize stack
updateStack();
