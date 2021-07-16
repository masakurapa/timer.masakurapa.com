import App from './App.svelte';

const elm = document.getElementById('app');
if (elm === null) {
    throw Error('element id "app" not found');
}

const app = new App({
    target: elm,
});

export default app;
