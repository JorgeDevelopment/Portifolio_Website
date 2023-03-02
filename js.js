let tabs = document.getElementsByClassName("tab-links");
let tabcont = document.getElementsByClassName("tab-cont");
let sidemenu = document.getElementById("sidemenu");
function opentab(tabname){
    for(tablink of tabs){
        tablink.classList.remove("active-link");
    }
    for(tabcon of tabcont){
        tabcon.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

function openMenu(){
    sidemenu.style.right = 0;
}
function closeMenu(){
    sidemenu.style.right = "-200px";
}

const msg= document.getElementById("msg");


