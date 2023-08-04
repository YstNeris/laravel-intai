import "./bootstrap";

import { createApp, h } from "vue";

import ElementPlus from "element-plus";
import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
    return pages[`./Pages/${name}.vue`];
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(ElementPlus)
      .use(createPinia())
      .use(plugin)
      .mount(el);
  },
  progress: {
    delay: 0,
    color: "#409EFF",
  },
});
