import "../css/reset.css";
import "../css/app.css";
import "element-plus/dist/index.css";

import axios from "axios";

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
