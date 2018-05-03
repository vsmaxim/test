"use strict";

VK.Auth.getLoginStatus(
    (resp) => {
        if (resp.status === "connected") {
            console.log("Hooray!");
        } else {
            VK.UI.button("button-container");
        }
    }
);

