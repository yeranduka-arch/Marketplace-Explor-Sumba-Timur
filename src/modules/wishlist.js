import { wlist, setState, curPage } from '../state/store.js';
import { dests, getD } from '../data/destinations.js'; // Mengambil getD dari data
import { toastMsg } from '../utils/toast.js';

export function isW(id) { return wlist.indexOf(id) > -1; }

export function toggleWL(id) { 
    var newWlist = [...wlist]; var idx = newWlist.indexOf(id); 
    if (idx > -1) { newWlist.splice(idx, 1); toastMsg("Dihapus dari wishlist", "i") } else { newWlist.push(id); toastMsg("Ditambahkan ke wishlist") } 
    setState('wlist', newWlist); updWLBadge(); 
    
    // Gunakan window.appRenderApp untuk menghindari circular dependency
    if (curPage === "destinasi" || curPage === "detail") {
        if(window.appRenderApp) window.appRenderApp();
    } 
}

export function updWLBadge() { 
    var b = document.getElementById("wl-badge"); b.textContent = wlist.length; 
    if (wlist.length > 0) { b.classList.remove("hidden"); b.style.display = "flex" } else { b.classList.add("hidden"); b.style.display = "" } 
}

export function openWL() { document.getElementById("wl-ov").classList.add("op"); document.getElementById("wl-pn").classList.add("op"); renderWLList(); }
export function closeWL() { document.getElementById("wl-ov").classList.remove("op"); document.getElementById("wl-pn").classList.remove("op"); }

export function renderWLList() { 
    var bx = document.getElementById("wl-list"); 
    if (wlist.length === 0) { bx.innerHTML = '<div class="text-center py-12 text-gray-400 dark:text-gray-500"><iconify-icon icon="lucide:heart" class="text-5xl mb-3 opacity-50"></iconify-icon><p class="font-medium">Wishlist kosong</p></div>'; return; } 
    bx.innerHTML = ""; 
    for (var i = 0; i < wlist.length; i++) { 
        (function (id) { 
            var d = getD(id); 
            if (!d) return; 
            var div = document.createElement("div"); 
            div.className = "flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-bg mb-2 cursor-pointer"; 
            div.innerHTML = '<img src="' + d.img + '" class="w-16 h-16 rounded-lg object-cover flex-shrink-0"><div class="flex-1 min-w-0"><p class="font-medium text-sm truncate text-gray-800 dark:text-white">' + d.name + '</p><p class="text-xs text-primary">' + d.cat + '</p></div>'; 
            var btn = document.createElement("button"); 
            btn.className = "text-red-400 hover:text-red-600 self-center flex-shrink-0"; 
            btn.innerHTML = '<iconify-icon icon="lucide:heart" class="text-lg" style="fill:currentColor"></iconify-icon>'; 
            btn.addEventListener("click", function (e) { e.stopPropagation(); toggleWL(id); renderWLList() }); 
            div.appendChild(btn); 
            
            // Gunakan window.appGoPage untuk navigasi
            div.addEventListener("click", function () { 
                closeWL(); 
                if(window.appGoPage) window.appGoPage("detail", id); 
            }); 
            
            bx.appendChild(div); 
        })(wlist[i]); 
    } 
}