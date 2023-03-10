const btn = document.querySelector("button");
const input = document.querySelector("input");
const div = document.querySelector(".body_box");
const userCount = document.querySelector(".user_id");
const text = document.querySelector(".title_description");
const postId = document.querySelector(".post_id");
const commentsShow = document.querySelector(".comments_id");
const regNumb = /^[1-9]$|^[1-9][0-9]$|^(100)$/gm;

btn.addEventListener("click", (event) => {
    if (regNumb.test(input.value)) {
        const comBtn = document.createElement("button");
        comBtn.textContent = "Comments";
        commentsShow.appendChild(comBtn);
        fetch("https://jsonplaceholder.typicode.com/posts/" + input.value)
            .then((response) => response.json())
            .then((data) => {
                (userCount.textContent = "User-id:" + data.userId),
                    (div.textContent = "Body: " + data.body),
                    (text.textContent = "Title: " + data.title),
                    (postId.textContent = "Post-id: " + data.id);
            })
            .catch((err) => alert(err));

        comBtn.addEventListener("click", (action) => {
            fetch(
                "https://jsonplaceholder.typicode.com/posts/" +
                input.value +
                "/comments"
            )
                .then((response) => response.json())
                .then((item) => {
                    item.forEach((element) => {
                        const comPostId = document.createElement("div");
                        const comId = document.createElement("div");
                        const comName = document.createElement("div");
                        const comEmail = document.createElement("div");
                        const comBody = document.createElement("div");
                        commentsShow.appendChild(comPostId);
                        commentsShow.appendChild(comId);
                        commentsShow.appendChild(comName);
                        commentsShow.appendChild(comEmail);
                        commentsShow.appendChild(comBody);
                        comPostId.textContent = "Post-id: " + element.postId;
                        comId.textContent = "User-id:" + element.id;
                        comName.textContent = "Name: " + element.name;
                        comEmail.textContent = "Email: " + element.email;
                        comBody.textContent = "Body: " + element.body;
                        comPostId.classList.add("mr");
                    });
                })
                .catch((err) => alert(err));
        });
    }
});