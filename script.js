const windows = document.querySelectorAll(".window");

windows.forEach((win,index)=>{

    const btn = win.querySelector(".minimize");

    btn.addEventListener("click",()=>{

        win.style.transform =
        "translate(-50%,-50%) scale(.7)";

        win.style.opacity = "0";

        setTimeout(()=>{
            win.style.display = "none";
        },500);

    });

});
