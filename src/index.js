import init from './engine/init';

if (navigator.serviceWorker) {
    window.addEventListener('load', async () => {
        try {
            await navigator.serviceWorker.register('/service-worker.js');
            console.log('SW registered.');
        } catch (registrationError) {
            console.error('SW registration failed.', registrationError);
        }
    });
}

setTimeout(init, 1);
