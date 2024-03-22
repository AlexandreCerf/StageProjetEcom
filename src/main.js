import './assets/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPenToSquare, faTrashCan)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

app.use(createPinia())
app.use(router)

app.mount('#app')
