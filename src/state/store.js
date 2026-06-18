export const pages = ["beranda", "destinasi", "tentang"];
export const pageLabels = ["Beranda", "Destinasi", "Tentang Kami"];

export let curPage = "beranda";
export let curDet = null;
export let cart = [];
export let wlist = [];
export let isDark = false;
export let searchQ = "";
export let filterK = "semua";
export let slideIdx = 0;
export let lbImgs = [];
export let lbIdx = 0;
export let slideTimer;

export function setState(key, value) {
    switch(key) {
        case 'curPage': curPage = value; break;
        case 'curDet': curDet = value; break;
        case 'cart': cart = value; break;
        case 'wlist': wlist = value; break;
        case 'isDark': isDark = value; break;
        case 'searchQ': searchQ = value; break;
        case 'filterK': filterK = value; break;
        case 'slideIdx': slideIdx = value; break;
        case 'lbImgs': lbImgs = value; break;
        case 'lbIdx': lbIdx = value; break;
        case 'slideTimer': slideTimer = value; break;
    }
}