const main = document.querySelector("main");
document.addEventListener("keydown", e =>{
    // let key_Name = e.keyCode === 32 ? "Space" : e.key;
    main.querySelector(".key_Code").innerText = e.keyCode;
    main.querySelector(".keyName").innerText =e.key;
    main.querySelector(".key span").innerText = e.key;
    main.querySelector(".code span").innerText = e.keyCode;
    main.classList.add("active");
    console.log(e);
});