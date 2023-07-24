let status = document.querySelectorAll('.status');

for(let s of status){
    if(s.innerText == "Not Placed"){
        s.style.color = "rgb(221, 31, 31)";
        s.style.backgroundColor = "rgba(221, 31, 31, 0.2)";
    }
}
