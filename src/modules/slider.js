import { hSlides } from '../data/team.js';
import { slideIdx, slideTimer, setState } from '../state/store.js';

export function startSlide() { clearInterval(slideTimer); var newTimer = setInterval(function () { setState('slideIdx', (slideIdx + 1) % hSlides.length); updSlide(); }, 5000); setState('slideTimer', newTimer); }
export function updSlide() { var ss = document.querySelectorAll(".hslide"), ds = document.querySelectorAll(".hdot"); for (var i = 0; i < ss.length; i++) { ss[i].classList.toggle("on", i === slideIdx); if (ds[i]) { ds[i].classList.toggle("bg-white", i === slideIdx); ds[i].classList.toggle("bg-white/40", i !== slideIdx); } } }
export function goSlide(i) { setState('slideIdx', i); updSlide(); startSlide(); }