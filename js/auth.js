"use strict";

document.addEventListener("DOMContentLoaded", () => VK.Auth.getLoginStatus(
    (resp) => {
        if (resp.status === "connected") {
            console.log("Hooray!");
        } else {
            VK.UI.button("button-container");
        }
    }
));

