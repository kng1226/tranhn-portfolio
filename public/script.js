const canvas = document.getElementById('animation-canvas');
const context = canvas.getContext('2d');

const frameCount = 1500;
const framesPerFolder = 300;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render(lastRenderedIndex);
});

const getImagePath = (index) => {
    const folderNumber = Math.ceil(index / framesPerFolder);
    let frameNumber = index % framesPerFolder;
    if (frameNumber === 0) frameNumber = framesPerFolder;
    
    const paddedFrameNumber = frameNumber.toString().padStart(3, '0');
    
    return `${folderNumber}/ezgif-frame-${paddedFrameNumber}.jpg`;
};

const images = [];
let lastRenderedIndex = 1;

const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = getImagePath(i);
        images[i] = img;
    }
};

const firstImage = new Image();
firstImage.src = getImagePath(1);
firstImage.onload = () => {
    images[1] = firstImage;
    render(1);
    preloadImages();
};

const render = (index) => {
    if (images[index] && images[index].complete) {
        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let renderWidth, renderHeight, renderX, renderY;

        if (canvasRatio > imgRatio) {
            renderWidth = canvas.width;
            renderHeight = canvas.width / imgRatio;
            renderX = 0;
            renderY = (canvas.height - renderHeight) / 2;
        } else {
            renderWidth = canvas.height * imgRatio;
            renderHeight = canvas.height;
            renderX = (canvas.width - renderWidth) / 2;
            renderY = 0;
        }
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, renderX, renderY, renderWidth, renderHeight);
        lastRenderedIndex = index;
    }
};

let currentScroll = 0;
let targetScroll = 0;
const ease = 0.08; 

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
});

const updateAnimation = () => {
    currentScroll += (targetScroll - currentScroll) * ease;
    
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = Math.max(0, Math.min(1, currentScroll / maxScroll));
    
    let frameIndex = Math.min(
        frameCount,
        Math.max(1, Math.floor(scrollFraction * frameCount) + 1)
    );
    
    render(frameIndex);
    
    requestAnimationFrame(updateAnimation);
};

updateAnimation();
