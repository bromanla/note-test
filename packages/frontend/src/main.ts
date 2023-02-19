import App from './App.vue';
import router from '~/router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'uno.css';
import '~/styles/index.scss';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

/**
 * Без Chaining Function
 * Vue Devtools не видит плагины
 * https://github.com/vuejs/devtools/issues/1839
 */
createApp(App).use(router).use(createPinia()).mount('#app');
