import { createApp } from 'vue'
import App from './app/App.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SvgIcon from '~virtual/svg-component'

const app = createApp(App)

app.component(SvgIcon.name, SvgIcon)

app.mount('#app')
