import { createApp } from 'vue'
import { createRouter, createWebHashHistory} from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue'
import HomePage from './pages/HomePage.vue';
import InvoiceDetails from './pages/InvoiceDetails.vue';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';




const routes = [
    { path: '/', component: HomePage },
    { path: '/invoice/:invoiceId', component: InvoiceDetails }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
pinia.use(piniaPluginPersistedState);
app.use(pinia);


app.mount('#app');

