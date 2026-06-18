import { cart, setState } from '../state/store.js';
import { cartTotal, updCartBadge } from './cart.js';
import { fR } from '../utils/formatter.js';
import { toastMsg } from '../utils/toast.js';

export function openCK() { 
    if (cart.length === 0) { toastMsg("Keranjang masih kosong", "w"); return; } 
    document.getElementById("cart-ov").classList.remove("op"); document.getElementById("cart-pn").classList.remove("op");
    setTimeout(function () { var h = ""; for (var i = 0; i < cart.length; i++) h += '<div class="flex justify-between"><span>' + cart[i].nm + ' x' + cart[i].q + '</span><span class="font-medium">' + fR(cart[i].pr * cart[i].q) + '</span></div>'; document.getElementById("cko-items").innerHTML = h; document.getElementById("cko-tot").textContent = fR(cartTotal()); document.getElementById("cko-modal").classList.add("op"); }, 350); 
}
export function closeCK() { document.getElementById("cko-modal").classList.remove("op"); }

export function doCheckout() { 
    var nm = document.getElementById("f-name").value.trim(), ph = document.getElementById("f-phone").value.trim(), em = document.getElementById("f-email").value.trim(); 
    if (!nm || !ph || !em) { toastMsg("Harap isi semua data", "w"); return; } 
    var py = document.getElementById("f-pay").value; var oid = "SMB-" + Math.floor(100000 + Math.random() * 900000), tot = cartTotal(), it = 0; 
    for (var i = 0; i < cart.length; i++) it += cart[i].q; 
    closeCK(); setState('cart', []); updCartBadge(); 
    setTimeout(function () { document.getElementById("s-oid").textContent = oid; document.getElementById("s-nm").textContent = nm; document.getElementById("s-py").textContent = py; document.getElementById("s-it").textContent = it + " item"; document.getElementById("s-tt").textContent = fR(tot); document.getElementById("suc-modal").classList.add("op"); launchConf(); }, 400); 
}
export function closeSuc() { document.getElementById("suc-modal").classList.remove("op"); document.getElementById("f-name").value = ""; document.getElementById("f-phone").value = ""; document.getElementById("f-email").value = ""; document.getElementById("f-note").value = ""; document.getElementById("f-pay").selectedIndex = 0; }

function launchConf() { var bx = document.getElementById("cf-box"); bx.innerHTML = ""; var cl = ["#0EA5E9", "#F97316", "#16A34A", "#A855F7", "#EF4444", "#FBBF24", "#EC4899"]; for (var i = 0; i < 40; i++) { var p = document.createElement("div"); p.className = "cfp"; p.style.left = Math.random() * 100 + "%"; p.style.top = (60 + Math.random() * 30) + "%"; p.style.background = cl[Math.floor(Math.random() * cl.length)]; p.style.animationDelay = Math.random() * 0.5 + "s"; p.style.animationDuration = (0.8 + Math.random() * 0.8) + "s"; p.style.width = (6 + Math.random() * 6) + "px"; p.style.height = (6 + Math.random() * 6) + "px"; p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px"; bx.appendChild(p); } setTimeout(function () { bx.innerHTML = "" }, 2500); }