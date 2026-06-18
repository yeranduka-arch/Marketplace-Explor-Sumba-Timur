import { lbImgs, lbIdx, setState } from '../state/store.js';

export function openLB(idx) { setState('lbIdx', idx); setState('lbImgs', lbImgs); document.getElementById("lb-img").src = lbImgs[idx]; document.getElementById("lb-box").classList.add("op"); document.body.style.overflow = "hidden"; }
export function closeLB() { document.getElementById("lb-box").classList.remove("op"); document.body.style.overflow = ""; }
export function lbNav(d) { var newIdx = (lbIdx + d + lbImgs.length) % lbImgs.length; setState('lbIdx', newIdx); document.getElementById("lb-img").src = lbImgs[newIdx]; }