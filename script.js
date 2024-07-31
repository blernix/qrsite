document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    let isDragging = false;
    let startX;
    let currentX;
    let startTime;
    let endTime;
    let rotation = 0;
    let autoRotateInterval;

    function startAutoRotate() {
        console.log("Starting auto-rotate");
        autoRotateInterval = setInterval(() => {
            rotation += 0.3;
            carousel.style.transform = `rotateY(${rotation}deg)`;
        }, 20);
    }

    function stopAutoRotate() {
        console.log("Stopping auto-rotate");
        clearInterval(autoRotateInterval);
    }

    function applyInertia(speed) {
        if (isNaN(speed)) {
            console.log("Invalid speed, skipping inertia");
           // startAutoRotate();
            return;
        }
        console.log("Applying inertia with speed:", speed);
        const inertiaInterval = setInterval(() => {
            speed *= 0.95;
            rotation += speed;
            carousel.style.transform = `rotateY(${rotation}deg)`;
            if (Math.abs(speed) < 0.01) {
                clearInterval(inertiaInterval);
                startAutoRotate(); // Restart auto-rotation after inertia ends
            }
        }, 20);
    }

    function onPointerDown(e) {
        console.log("Pointer down:", e);
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
        startTime = Date.now();
        carousel.style.transition = 'none';
        stopAutoRotate();
    }

    function onPointerUp(e) {
        console.log("Pointer up:", e);
        if (!isDragging) return;
        isDragging = false;
        endTime = Date.now();
        const timeDiff = endTime - startTime;
        const distance = (e.pageX || e.changedTouches[0].pageX) - carousel.offsetLeft - startX;
        const speed = distance / timeDiff;
        console.log("Time diff:", timeDiff, "Distance:", distance, "Speed:", speed);
        applyInertia(speed * 50);
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
        e.stopPropagation(); // Prevent the event from propagating
        e.preventDefault(); // Empêche le comportement par défaut du clic
        console.log("BTC button clicked");
        copyToClipboard(btcAddress, btcNotification);
    });

    ethButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the event from propagating
        e.preventDefault(); // Empêche le comportement par défaut du clic
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

    startAutoRotate(); // Commence la rotation automatique dès le chargement
});
