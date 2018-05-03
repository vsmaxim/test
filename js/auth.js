"use strict";
const VK_VERSION = "5.76";


class User {
    User(first_name, last_name, id, photo) {
        this.fn = first_name;
        this.ln = last_name;
        this.id = id;
        this.pl = photo;
    }
    static createContainer(tag, className) {
        let container = document.createElement(tag);
        container.className = className;
        return container;
    }
    asDiv(className) {
        let container = this.createContainer("div", "container");
        let credentials = this.createContainer("span", "credentials");
        credentials.innerHtml(`${this.fn} ${this.ln}`);
        let photo = this.createContainer("img", "profile-pic");
        photo.src = this.photo;
        container.appendChild(credentials);
        container.appendChild(photo);
        return container;
    }
}

VK.Auth.getLoginStatus(
    (resp) => {
        if (resp.status === "connected") {
            VK.api(
                "friends.get",
                {
                    "order": "hints",
                    "count": 5,
                    "fields": "photo_50",
                    "v": "5.74",
                },
                (i) => drawToContainer("friends-container", i.response.items)
            );
            VK.api(
                "users.get",
                {
                    "v": VK_VERSION,
                    "fields": "photo_50",
                },
                (i) => drawToContainer("profile-container", i.response)
            );
        } else {
            VK.UI.button("button-container");
        }
    }
);

function drawToContainer(containerId, userList) {
    let cont = document.getElementById(containerId);
    for (let i of userList) {
        cont.appendChild(
            new User(
                i["first_name"],
                i["last_name"],
                i["id"],
                i["photo_50"],
            )
        )
    }
}

