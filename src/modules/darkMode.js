import { isDark, setState } from '../state/store.js';
import { buildDeskNav, buildMobNav, highlightNav } from './navigation.js';

export function toggleDM() { var newDarkState = !isDark; setState('isDark', newDarkState); document.documentElement.classList.toggle("dark", newDarkState); try { localStorage.setItem("dm", newDarkState ? "1" : "0") } catch (e) { } buildDeskNav(); buildMobNav(); highlightNav(); }