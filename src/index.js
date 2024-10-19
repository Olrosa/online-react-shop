import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";
import './style/button.scss';
import './style/form.scss';
import './style/olrosa-lib.scss';


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
