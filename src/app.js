import { setState, isDark } from './state/store.js';
import { buildDeskNav, buildMobNav, highlightNav, goPage, renderApp } from './modules/navigation.js';
import { toggleDM } from './modules/darkMode.js';
import { openCart, closeCart, updCartBadge } from './modules/cart.js';
import { openCK, closeCK, doCheckout, closeSuc } from './modules/checkout.js';
import { openWL, closeWL, updWLBadge } from './modules/wishlist.js';
import { closeLB, lbNav } from './modules/lightbox.js';

// Init Dark Mode
try { if (localStorage.getItem("dm") === "1") { setState('isDark', true); document.documentElement.classList.add("dark") } } catch (e) { }

// Build Navigation
buildDeskNav();
buildMobNav();
highlightNav();

// Event Listeners Static Elements
document.getElementById('logo-btn').addEventListener('click', (e) => { e.preventDefault(); goPage('beranda'); });
document.getElementById('dm-btn').addEventListener('click', toggleDM);
document.getElementById('cart-btn').addEventListener('click', openCart);
document.getElementById('cart-x').addEventListener('click', closeCart);
document.getElementById('cart-ov').addEventListener('click', closeCart);

document.getElementById('wl-btn').addEventListener('click', openWL);
document.getElementById('wl-x').addEventListener('click', closeWL);
document.getElementById('wl-ov').addEventListener('click', closeWL);

document.getElementById('cko-btn').addEventListener('click', openCK);
document.getElementById('cko-x').addEventListener('click', closeCK);
document.getElementById('cko-confirm').addEventListener('click', doCheckout);
document.getElementById('suc-close').addEventListener('click', closeSuc);

document.getElementById('mm-btn').addEventListener('click', () => {
    var m = document.getElementById("mob-menu");
    var ic = document.getElementById("mm-icon");
    m.classList.toggle("hidden");
    ic.setAttribute("icon", m.classList.contains("hidden") ? "lucide:menu" : "lucide:x");
});

// Lightbox Listeners
document.getElementById('lb-box').addEventListener('click', closeLB);
document.getElementById('lb-close').addEventListener('click', closeLB);
document.getElementById('lb-prev').addEventListener('click', (e) => { e.stopPropagation(); lbNav(-1); });
document.getElementById('lb-next').addEventListener('click', (e) => { e.stopPropagation(); lbNav(1); });
document.getElementById('lb-img').addEventListener('click', (e) => e.stopPropagation());

// Scroll Event
window.addEventListener("scroll", function () { 
    var nv = document.getElementById("navbar"), bt = document.getElementById("btt"); 
    if (window.scrollY > 50) { nv.classList.add("gl", "shadow-lg") } else { nv.classList.remove("gl", "shadow-lg") } 
    if (window.scrollY > 400) { bt.style.opacity = "1"; bt.style.visibility = "visible"; bt.classList.remove("hidden"); bt.classList.add("flex") } 
    else { bt.style.opacity = "0"; bt.style.visibility = "hidden"; bt.classList.add("hidden"); bt.classList.remove("flex") } 
});

// Back to top
document.getElementById('btt').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Init App & Remove Loader
updCartBadge();
updWLBadge();
goPage("beranda");

window.addEventListener("load", function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 1500);
});