import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Импортируем Provider
import store from "./store"; // Импортируем store
import App from "./components/app/App";

import "./style/style.scss";
import './style/button.scss';
import './style/form.scss';
import './style/olrosa-lib.scss';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}> {/* Оборачиваем App в Provider */}
        <App />
    </Provider>
);
