import { createApp } from 'vue'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCAa_JFXa6TC51S685lFTeXJ0dQPyyf_q4',
    },
}).mount('#app')
