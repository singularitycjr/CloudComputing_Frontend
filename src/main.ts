import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store/index'

import './axios/axiosConfig.js'
//导入Vant
import Vant, { Picker } from "vant"; //导入vant
import "vant/lib/index.css"; //导入样式
import { Tabbar, TabbarItem, Tab, Tabs, Popup, Circle, DatetimePicker} from 'vant';

import "amfe-flexible"; //导入，用于设置rem基准值

import   "normalize.css";

//导入全局样式
import "./styles/index.css"

// 导入element-plus
import ElementPlus from 'element-plus';

const app = createApp(App)
app.use(ElementPlus)

app.use(store)
app.use(router)
app.use(Vant)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Tab)
app.use(Tabs)
app.use(Popup)
app.use(DatetimePicker)
app.use(Circle)
app.use(createPinia())
app.mount('#app')


