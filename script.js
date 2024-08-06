document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    let isDragging = false;
    let startX;
    let currentX;
    let rotation = 0;
    const autoRotateSpeed = 0.2; // Speed of the auto-rotation
    let autoRotateInterval;

    function startAutoRotate() {
        console.log("Starting auto-rotate");
        autoRotateInterval = setInterval(() => {
            rotation += autoRotateSpeed;
            carousel.style.transform = `rotateY(${rotation}deg)`;
        }, 20);
    }

    function stopAutoRotate() {
        console.log("Stopping auto-rotate");
        clearInterval(autoRotateInterval);
    }

    function onPointerDown(e) {
        console.log("Pointer down:", e);
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
        carousel.style.transition = 'none';
        stopAutoRotate();
    }

    function onPointerUp(e) {
        console.log("Pointer up:", e);
        if (!isDragging) return;
        isDragging = false;
        startAutoRotate(); // Restart auto-rotation after dragging
        carousel.style.transition = 'transform 0.5s linear';
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
        const walk = (currentX - startX) * 0.3;
        rotation += walk;
        carousel.style.transform = `rotateY(${rotation}deg)`;
        startX = currentX;
        console.log("Pointer move:", e, "Rotation:", rotation);
    }

    carousel.addEventListener('mousedown', onPointerDown);
    carousel.addEventListener('touchstart', onPointerDown, { passive: false });

    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchend', onPointerUp, { passive: false });

    document.addEventListener('mousemove', onPointerMove, { passive: false });
    document.addEventListener('touchmove', onPointerMove, { passive: false });

    const btcButton = document.querySelector('.carousel-item[data-type="btc"]');
    const ethButton = document.querySelector('.carousel-item[data-type="eth"]');
    const btcNotification = document.getElementById('btcNotification');
    const ethNotification = document.getElementById('ethNotification');
    const btcAddress = 'votre-adresse-btc-ici';
    const ethAddress = 'votre-adresse-eth-ici';

    btcButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("BTC button clicked");
        copyToClipboard(btcAddress, btcNotification);
    });

    ethButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("ETH button clicked");
        copyToClipboard(ethAddress, ethNotification);
    });

    function copyToClipboard(address, notification) {
        console.log("Copying to clipboard:", address);
        navigator.clipboard.writeText(address).then(() => {
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        });
    }

    startAutoRotate(); // Start the auto-rotation when the page loads
});
