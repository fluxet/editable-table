import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import EditableTable from "./components/EditableTable";
import store from "./store";
import "./styles/style.scss";

createRoot(document.getElementById("root")).render(<Provider store={store}><EditableTable /></Provider>);
