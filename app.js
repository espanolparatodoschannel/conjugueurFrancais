// Constants
const tenses = [
    { id: 'present', label: 'Présent' },
    { id: 'passe_compose', label: 'Passé Composé' },
    { id: 'imparfait', label: "L'Imparfait" },
    { id: 'futur_proche', label: 'Futur Proche' },
    { id: 'conditionnel', label: 'Cond. Présent' },
    { id: 'subjonctif', label: 'Subj. Présent' },
    { id: 'futur_simple', label: 'Futur Simple' },
    { id: 'plus_que_parfait', label: 'Plus-que-parfait' }
];

const persons = ["1ère pers. sing.", "2ème pers. sing.", "3ème pers. sing.", "1ère pers. plur.", "2ème pers. plur.", "3ème pers. plur."];

// State
let currentVerb = "être";
let currentTense = "present";

// DOM Elements
const verbListEl = document.getElementById('verbList');
const tenseSelectorEl = document.getElementById('tenseSelector');
const conjugationDisplayEl = document.getElementById('conjugationDisplay');
const currentVerbTitleEl = document.getElementById('currentVerbTitle');
const verbGroupEl = document.getElementById('verbGroup');
const searchInput = document.getElementById('verbSearch');

// Theme toggle elements
const themeToggleBtn = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Initialize
function init() {
    renderVerbList();
    renderTenseSelector();
    updateDisplay();
    initTheme();
}

function renderVerbList(filter = "") {
    verbListEl.innerHTML = "";
    let matchedCount = 0;
    
    verbsList.sort((a, b) => a.localeCompare(b, 'fr')).forEach(v => {
        if (v.includes(filter.toLowerCase())) {
            matchedCount++;
            const option = document.createElement('option');
            option.value = v;
            option.innerText = v.charAt(0).toUpperCase() + v.slice(1);
            if (currentVerb === v) {
                option.selected = true;
            }
            verbListEl.appendChild(option);
        }
    });

    verbListEl.onchange = (e) => {
        currentVerb = e.target.value;
        updateDisplay();
        
        // Mobile smooth scroll
        if (window.innerWidth < 768) {
            document.getElementById('verbHeader').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (matchedCount > 0 && !Array.from(verbListEl.options).some(opt => opt.value === currentVerb)) {
        verbListEl.selectedIndex = 0;
        currentVerb = verbListEl.options[0].value;
        updateDisplay();
    }
}

function renderTenseSelector() {
    tenseSelectorEl.innerHTML = "";
    tenses.forEach(t => {
        const option = document.createElement('option');
        option.value = t.id;
        option.innerText = t.label;
        if (currentTense === t.id) {
            option.selected = true;
        }
        tenseSelectorEl.appendChild(option);
    });

    tenseSelectorEl.onchange = (e) => {
        currentTense = e.target.value;
        updateDisplay();
    };
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR'; 
        utterance.rate = 0.9; 
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Lo siento, tu navegador no soporta la función de audio.");
    }
}

// Wrapper for animation feedback when touching an audio button
function speakVerbCardText(btn, text) {
    btn.classList.remove('animate-audio-click');
    void btn.offsetWidth; // trigger reflow to restart animation
    btn.classList.add('animate-audio-click');
    speakText(text);
}

function updateDisplay() {
    const data = verbData[currentVerb] || { 
        group: "Inconnu", meaning: "...", present: [], passe_compose: [], imparfait: [],
        futur_proche: [], conditionnel: [], subjonctif: [], futur_simple: [], plus_que_parfait: []
    };

    currentVerbTitleEl.innerText = currentVerb;
    verbGroupEl.innerText = data.meaning || "...";

    const conjugations = data[currentTense] || [];
    conjugationDisplayEl.innerHTML = "";

    conjugations.forEach((conj, idx) => {
        if (conj === "-") return; // Skip for impersonal verbs

        let displayConj = conj;
        // Adjust display for 3rd person singular/plural
        if (idx === 2 && currentVerb !== "falloir") {
            displayConj = displayConj.replace(/^il(\/elle)?\s/, "il/elle/on ");
            displayConj = displayConj.replace(/^qu'il(\/elle)?\s/, "qu'il/elle/on ");
        }
        if (idx === 5) {
            displayConj = displayConj.replace(/^ils(\/elles)?\s/, "ils/elles ");
            displayConj = displayConj.replace(/^qu'ils(\/elles)?\s/, "qu'ils/elles ");
        }

        const card = document.createElement('div');
        card.className = "opacity-0 animate-fade-in bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/50 dark:border-slate-600/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col verb-card hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgb(99,102,241,0.12)] hover:border-indigo-200 dark:hover:shadow-[0_12px_30px_rgb(99,102,241,0.08)] dark:hover:border-indigo-500/50 transition-all duration-300";
        card.style.animationDelay = `${idx * 40}ms`;

        card.innerHTML = `
            <span class="person-label text-slate-500/80 dark:text-slate-400/80 block mb-2 uppercase text-[0.8rem] tracking-wider">${persons[idx]}</span>
            <div class="flex items-center gap-3">
                <span class="conjugation-text text-slate-800 dark:text-slate-100 flex-1">${displayConj}</span>
                <button class="text-slate-400 border border-slate-200 dark:border-slate-600 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-600/50 p-1.5 rounded-full transition-all flex-shrink-0 bg-white dark:bg-slate-800" title="Écouter la prononciation" onclick="speakVerbCardText(this, '${displayConj.replace(/il\/elle\/on/g, 'il').replace(/ils\/elles/g, 'ils').replace(/'/g, "\\'")}')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `;
        conjugationDisplayEl.appendChild(card);
    });
}

function initTheme() {
    // Check locally saved theme or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            localStorage.theme = 'light';
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    });
}

// Búsqueda en vivo
searchInput.oninput = (e) => {
    renderVerbList(e.target.value);
};

// Start
window.onload = init;
