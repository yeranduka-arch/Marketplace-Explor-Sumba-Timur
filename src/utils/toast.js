export function toastMsg(m, t) { 
    var e = document.getElementById("toast"); 
    e.textContent = m; 
    e.className = "tt tt-" + (t || "s") + " sh"; 
    setTimeout(function () { e.classList.remove("sh") }, 3000); 
}