import React from 'react';
import Button from "@jetbrains/ring-ui/components/button/button";

const App = () => <Button onClick={() => alert("Yes")}>This is a button</Button>

const dashboardTab = document.getElementById("app")
if (dashboardTab != null) {
    console.log(ReactUI.renderConnected)
    ReactUI.renderConnected(dashboardTab, App)
}