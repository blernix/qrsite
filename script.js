// script.js

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
        autoRotateInterval = setInterval(() => {
            rotation += 0.1;
            carousel.style.transform = `rotateY(${rotation}deg)`;
        }, 20);
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    function applyInertia(speed) {
        const inertiaInterval = setInterval(() => {
            speed *= 0.98; // Réduire la vitesse plus lentement
            rotation += speed;
            carousel.style.transform = `rotateY(${rotation}deg)`;
            if (Math.abs(speed) < 0.1) {
                clearInterval(inertiaInterval);
            }
        }, 20);
        setTimeout(() => {
            clearInterval(inertiaInterval);
        }, 800000); // Durée de l'inertie (par exemple, 8000 ms)
    }
    

    // carousel.addEventListener('mousedown', (e) => {
    //     isDragging = true;
    //     startX = e.pageX - carousel.offsetLeft;
    //     startTime = Date.now();
    //     carousel.style.transition = 'none';
    //     stopAutoRotate();
    // });

    // document.addEventListener('mouseup', (e) => {
    //     if (!isDragging) return;
    //     isDragging = false;
    //     endTime = Date.now();
    //     const timeDiff = endTime - startTime;
    //     const distance = (e.pageX - carousel.offsetLeft) - startX;
    //     const speed = distance / timeDiff;
    //     applyInertia(speed * 8000); // Appliquer l'inertie en fonction de la vitesse du mouvement
    //     carousel.style.transition = 'transform 0.5s linear';
    //     startAutoRotate();
    // });

    // document.addEventListener('mousemove', (e) => {
    //     if (!isDragging) return;
    //     e.preventDefault();
    //     currentX = e.pageX - carousel.offsetLeft;
    //     const walk = (currentX - startX) * 0.6;
    //     rotation += walk;
    //     carousel.style.transform = `rotateY(${rotation}deg)`;
    //     startX = currentX;
    // });

    // carousel.addEventListener('touchstart', (e) => {
    //     isDragging = true;
    //     startX = e.touches[0].pageX - carousel.offsetLeft;
    //     startTime = Date.now();
    //     carousel.style.transition = 'none';
    //     stopAutoRotate();
    // });

    // document.addEventListener('touchend', (e) => {
    //     if (!isDragging) return;
    //     isDragging = false;
    //     endTime = Date.now();
    //     const timeDiff = endTime - startTime;
    //     const distance = (e.changedTouches[0].pageX - carousel.offsetLeft) - startX;
    //     const speed = distance / timeDiff;
    //     applyInertia(speed * 8000); // Appliquer l'inertie en fonction de la vitesse du mouvement
    //     carousel.style.transition = 'transform 0.5s linear';
    //     startAutoRotate();
    // });

    // document.addEventListener('touchmove', (e) => {
    //     if (!isDragging) return;
    //     currentX = e.touches[0].pageX - carousel.offsetLeft;
    //     const walk = (currentX - startX) * 0.3;
    //     rotation += walk;
    //     carousel.style.transform = `rotateY(${rotation}deg)`;
    //     startX = currentX;
    // });


    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        startTime = Date.now();
        carousel.style.transition = 'none';
        stopAutoRotate();
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        endTime = Date.now();
        const timeDiff = endTime - startTime;
        const distance = (e.pageX - carousel.offsetLeft) - startX;
        const speed = distance / timeDiff;
        applyInertia(speed * 8000); // Appliquer l'inertie en fonction de la vitesse du mouvement
        carousel.style.transition = 'transform 0.5s linear';
        startAutoRotate();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.pageX - carousel.offsetLeft;
        const walk = (currentX - startX) * 0.6;
        rotation += walk;
        carousel.style.transform = `rotateY(${rotation}deg)`;
        startX = currentX;
    });
    
    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        startTime = Date.now();
        carousel.style.transition = 'none';
        stopAutoRotate();
    });
    
    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        endTime = Date.now();
        const timeDiff = endTime - startTime;
        const distance = (e.changedTouches[0].pageX - carousel.offsetLeft) - startX;
        const speed = distance / timeDiff;
        applyInertia(speed * 8000); // Appliquer l'inertie en fonction de la vitesse du mouvement
        carousel.style.transition = 'transform 0.5s linear';
        startAutoRotate();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (currentX - startX) * 0.3;
        rotation += walk;
        carousel.style.transform = `rotateY(${rotation}deg)`;
        startX = currentX;
    });
    
    const btcButton = document.querySelector('.carousel-item[data-type="btc"]');
    const ethButton = document.querySelector('.carousel-item[data-type="eth"]');
    const btcNotification = document.getElementById('btcNotification');
    const ethNotification = document.getElementById('ethNotification');
    const btcAddress = 'votre-adresse-btc-ici';
    const ethAddress = 'votre-adresse-eth-ici';

    btcButton.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(btcAddress).then(() => {
            btcNotification.style.display = 'block';
            setTimeout(() => {
                btcNotification.style.display = 'none';
            }, 2000);
        });
        
    });

    ethButton.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(ethAddress).then(() => {
            ethNotification.style.display = 'block';
            setTimeout(() => {
                ethNotification.style.display = 'none';
            }, 2000);
        });
    });

    startAutoRotate(); // Commence la rotation automatique dès le chargement
});
