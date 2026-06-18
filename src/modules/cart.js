import { cart, setState } from '../state/store.js';
import { fR } from '../utils/formatter.js';
import { toastMsg } from '../utils/toast.js';

export function addCart(nm, pr, im, dn) { 
    var newCart = [...cart];
    var f = false; 
    for (var i = 0; i < newCart.length; i++) { 
        if (newCart[i].nm === nm && newCart[i].dn === dn) { newCart[i].q++; f = true; break; } 
    } 
    if (!f) newCart.push({ nm, pr, im, dn, q: 1 }); 
    setState('cart', newCart);
    updCartBadge(); 
    toastMsg(nm + " ditambahkan ke keranjang"); 
}

export function updCartBadge() { 
    var c = 0; for (var i = 0; i < cart.length; i++) c += cart[i].q; 
    var b = document.getElementById("cart-badge"); b.textContent = c; 
    if (c > 0) { b.classList.remove("hidden"); b.style.display = "flex" } else { b.classList.add("hidden"); b.style.display = "" } 
}

export function cartTotal() { var t = 0; for (var i = 0; i < cart.length; i++) t += cart[i].pr * cart[i].q; return t; }

export function openCart() { document.getElementById("cart-ov").classList.add("op"); document.getElementById("cart-pn").classList.add("op"); renderCartList(); }
export function closeCart() { document.getElementById("cart-ov").classList.remove("op"); document.getElementById("cart-pn").classList.remove("op"); }

export function renderCartList() { 
    var bx = document.getElementById("cart-list"), ft = document.getElementById("cart-ft"); 
    if (cart.length === 0) { bx.innerHTML = '<div class="text-center py-12 text-gray-400 dark:text-gray-500"><iconify-icon icon="lucide:shopping-bag" class="text-5xl mb-3 opacity-50"></iconify-icon><p class="font-medium">Keranjang kosong</p></div>'; ft.style.display = "none"; return; } 
    ft.style.display = "block"; var h = ""; 
    for (var i = 0; i < cart.length; i++) { var c = cart[i]; h += '<div class="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-bg mb-2"><img src="' + c.im + '" class="w-16 h-16 rounded-lg object-cover flex-shrink-0"><div class="flex-1 min-w-0"><p class="font-medium text-sm truncate text-gray-800 dark:text-white">' + c.nm + '</p><p class="text-xs text-gray-500 dark:text-gray-400">' + c.dn + '</p><div class="flex items-center justify-between mt-1"><span class="text-primary font-semibold text-sm">' + fR(c.pr) + '</span><div class="flex items-center gap-2"><button data-ci="' + i + '" data-d="-1" class="cqty w-6 h-6 rounded-md bg-gray-200 dark:bg-dark-border text-gray-700 dark:text-gray-200 flex items-center justify-center text-xs hover:bg-gray-300 dark:hover:bg-dark-hover">-</button><span class="text-sm font-medium text-gray-800 dark:text-white">' + c.q + '</span><button data-ci="' + i + '" data-d="1" class="cqty w-6 h-6 rounded-md bg-gray-200 dark:bg-dark-border text-gray-700 dark:text-gray-200 flex items-center justify-center text-xs hover:bg-gray-300 dark:hover:bg-dark-hover">+</button><button data-ci="' + i + '" class="cdel text-red-400 hover:text-red-600 ml-1"><iconify-icon icon="lucide:trash-2" class="text-sm"></iconify-icon></button></div></div></div></div>'; } 
    bx.innerHTML = h; document.getElementById("cart-sub").textContent = fR(cartTotal()); document.getElementById("cart-tot").textContent = fR(cartTotal()); 
    bx.querySelectorAll(".cqty").forEach(function (b) { b.addEventListener("click", function () { var idx = parseInt(this.dataset.ci), d = parseInt(this.dataset.d); var newCart = [...cart]; newCart[idx].q += d; if (newCart[idx].q <= 0) newCart.splice(idx, 1); setState('cart', newCart); updCartBadge(); renderCartList(); }) }); 
    bx.querySelectorAll(".cdel").forEach(function (b) { b.addEventListener("click", function () { var newCart = [...cart]; newCart.splice(parseInt(this.dataset.ci), 1); setState('cart', newCart); updCartBadge(); renderCartList(); }) }); 
}