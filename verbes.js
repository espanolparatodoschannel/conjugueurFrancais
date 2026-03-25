const verbsList = [
    "être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir",
    "devoir", "prendre", "trouver", "donner", "falloir", "parler", "mettre", "regarder", "passer",
    "croire", "aimer", "penser", "laisser", "arriver", "devenir", "partir", "demander", "tenir",
    "comprendre", "rendre", "rester", "sortir", "entendre", "connaître", "porter", "appeler",
    "tomber", "vivre", "chercher", "marcher", "paraître", "manger", "perdre", "écrire", "lire",
    "attendre", "ouvrir", "commencer", "finir", "travailler"
];

const verbData = {};

function addVerb(verb, meaning, group, present, pp_aux, pp, imparfait_stem, futur_stem, subj_stem) {
    const isEtre = pp_aux === 'être';

    // Passé composé
    const aux_pc = isEtre ?
        ["je suis", "tu es", "il est", "nous sommes", "vous êtes", "ils sont"] :
        ["j'ai", "tu as", "il a", "nous avons", "vous avez", "ils ont"];

    const pp_arr = isEtre ?
        [`${pp}(e)`, `${pp}(e)`, `${pp}`, `${pp}(e)s`, `${pp}(e)s`, `${pp}s`] :
        [pp, pp, pp, pp, pp, pp];

    let passe_compose = [];
    for (let i = 0; i < 6; i++) {
        passe_compose.push(`${aux_pc[i]} ${pp_arr[i]}`);
    }

    // Plus-que-parfait
    const aux_pqp = isEtre ?
        ["j'étais", "tu étais", "il était", "nous étions", "vous étiez", "ils étaient"] :
        ["j'avais", "tu avais", "il avait", "nous avions", "vous aviez", "ils avaient"];

    let plus_que_parfait = [];
    for (let i = 0; i < 6; i++) {
        plus_que_parfait.push(`${aux_pqp[i]} ${pp_arr[i]}`);
    }

    // Imparfait
    const imp_endings = ["ais", "ais", "ait", "ions", "iez", "aient"];
    let imparfait = [];
    for (let i = 0; i < 6; i++) {
        let prefix = (i < 3 || i === 5) && imparfait_stem.match(/^[aeiouh]/i) && !imparfait_stem.startsWith('y') ? "j'" : "je ";
        if (i === 0) imparfait.push(`${prefix}${imparfait_stem}${imp_endings[i]}`.replace("je j'", "j'"));
        else if (i === 1) imparfait.push(`tu ${imparfait_stem}${imp_endings[i]}`);
        else if (i === 2) imparfait.push(`il ${imparfait_stem}${imp_endings[i]}`);
        else if (i === 3) imparfait.push(`nous ${imparfait_stem}${imp_endings[i]}`);
        else if (i === 4) imparfait.push(`vous ${imparfait_stem}${imp_endings[i]}`);
        else imparfait.push(`ils ${imparfait_stem}${imp_endings[i]}`);
    }
    // Fix je / j' for present and others if needed, but present is hardcoded

    // Futur Proche
    const fp_aux = ["je vais", "tu vas", "il va", "nous allons", "vous allez", "ils vont"];
    let futur_proche = fp_aux.map(a => `${a} ${verb}`);

    // Futur Simple
    const fs_endings = ["ai", "as", "a", "ons", "ez", "ont"];
    let futur_simple = [];
    for (let i = 0; i < 6; i++) {
        let prefix = i === 0 && futur_stem.match(/^[aeiouh]/i) ? "j'" : (i === 0 ? "je " : "");
        if (i === 0) futur_simple.push(`${prefix}${futur_stem}${fs_endings[i]}`);
        else if (i === 1) futur_simple.push(`tu ${futur_stem}${fs_endings[i]}`);
        else if (i === 2) futur_simple.push(`il ${futur_stem}${fs_endings[i]}`);
        else if (i === 3) futur_simple.push(`nous ${futur_stem}${fs_endings[i]}`);
        else if (i === 4) futur_simple.push(`vous ${futur_stem}${fs_endings[i]}`);
        else futur_simple.push(`ils ${futur_stem}${fs_endings[i]}`);
    }

    // Conditionnel
    const cond_endings = ["ais", "ais", "ait", "ions", "iez", "aient"];
    let conditionnel = [];
    for (let i = 0; i < 6; i++) {
        let prefix = i === 0 && futur_stem.match(/^[aeiouh]/i) ? "j'" : (i === 0 ? "je " : "");
        if (i === 0) conditionnel.push(`${prefix}${futur_stem}${cond_endings[i]}`);
        else if (i === 1) conditionnel.push(`tu ${futur_stem}${cond_endings[i]}`);
        else if (i === 2) conditionnel.push(`il ${futur_stem}${cond_endings[i]}`);
        else if (i === 3) conditionnel.push(`nous ${futur_stem}${cond_endings[i]}`);
        else if (i === 4) conditionnel.push(`vous ${futur_stem}${cond_endings[i]}`);
        else conditionnel.push(`ils ${futur_stem}${cond_endings[i]}`);
    }

    // Subjonctif
    const subj_endings = ["e", "es", "e", "ions", "iez", "ent"];
    let subjonctif = [];
    let stem1 = Array.isArray(subj_stem) ? subj_stem[0] : subj_stem; // for je, tu, il, ils
    let stem2 = Array.isArray(subj_stem) ? subj_stem[1] : subj_stem; // for nous, vous
    for (let i = 0; i < 6; i++) {
        let s = (i === 3 || i === 4) ? stem2 : stem1;
        let prefix1 = i === 0 && s.match(/^[aeiouh]/i) ? "qu'j'" : "que je "; // will fix
        if (i === 0) subjonctif.push(s.match(/^[aeiouh]/i) ? `que j'${s}${subj_endings[i]}` : `que je ${s}${subj_endings[i]}`);
        else if (i === 1) subjonctif.push(`que tu ${s}${subj_endings[i]}`);
        else if (i === 2) subjonctif.push(s.match(/^[aeiouh]/i) ? `qu'il ${s}${subj_endings[i]}` : `qu'il ${s}${subj_endings[i]}`);
        else if (i === 3) subjonctif.push(`que nous ${s}${subj_endings[i]}`);
        else if (i === 4) subjonctif.push(`que vous ${s}${subj_endings[i]}`);
        else subjonctif.push(s.match(/^[aeiouh]/i) ? `qu'ils ${s}${subj_endings[i]}` : `qu'ils ${s}${subj_endings[i]}`);
    }

    verbData[verb] = {
        meaning, group, present, passe_compose, imparfait, futur_proche, conditionnel, subjonctif, futur_simple, plus_que_parfait
    };
}

// 1. Être
verbData["être"] = {
    meaning: "Ser/Estar", group: "Auxiliaire",
    present: ["je suis", "tu es", "il est", "nous sommes", "vous êtes", "ils sont"],
    passe_compose: ["j'ai été", "tu as été", "il a été", "nous avons été", "vous avez été", "ils ont été"],
    imparfait: ["j'étais", "tu étais", "il était", "nous étions", "vous étiez", "ils étaient"],
    futur_proche: ["je vais être", "tu vas être", "il va être", "nous allons être", "vous allez être", "ils vont être"],
    conditionnel: ["je serais", "tu serais", "il serait", "nous serions", "vous seriez", "ils seraient"],
    subjonctif: ["que je sois", "que tu sois", "qu'il soit", "que nous soyons", "que vous soyez", "qu'ils soient"],
    futur_simple: ["je serai", "tu seras", "il sera", "nous serons", "vous serez", "ils seront"],
    plus_que_parfait: ["j'avais été", "tu avais été", "il avait été", "nous avions été", "vous aviez été", "ils avaient été"]
};

// 2. Avoir
verbData["avoir"] = {
    meaning: "Tener/Haber", group: "Auxiliaire",
    present: ["j'ai", "tu as", "il a", "nous avons", "vous avez", "ils ont"],
    passe_compose: ["j'ai eu", "tu as eu", "il a eu", "nous avons eu", "vous avez eu", "ils ont eu"],
    imparfait: ["j'avais", "tu avais", "il avait", "nous avions", "vous aviez", "ils avaient"],
    futur_proche: ["je vais avoir", "tu vas avoir", "il va avoir", "nous allons avoir", "vous allez avoir", "ils vont avoir"],
    conditionnel: ["j'aurais", "tu aurais", "il aurait", "nous aurions", "vous auriez", "ils auraient"],
    subjonctif: ["que j'aie", "que tu aies", "qu'il ait", "que nous ayons", "que vous ayez", "qu'ils aient"],
    futur_simple: ["j'aurai", "tu auras", "il aura", "nous aurons", "vous aurez", "ils auront"],
    plus_que_parfait: ["j'avais eu", "tu avais eu", "il avait eu", "nous avions eu", "vous aviez eu", "ils avaient eu"]
};

// 3. Faire
addVerb("faire", "Hacer", "3ème groupe", ["je fais", "tu fais", "il fait", "nous faisons", "vous faites", "ils font"], "avoir", "fait", "fais", "fer", "fass");

// 4. Dire
addVerb("dire", "Decir", "3ème groupe", ["je dis", "tu dis", "il dit", "nous disons", "vous dites", "ils disent"], "avoir", "dit", "dis", "dir", "dis");

// 5. Aller
verbData["aller"] = {
    meaning: "Ir", group: "3ème groupe",
    present: ["je vais", "tu vas", "il va", "nous allons", "vous allez", "ils vont"],
    passe_compose: ["je suis allé(e)", "tu es allé(e)", "il est allé", "nous sommes allé(e)s", "vous êtes allé(e)s", "ils sont allés"],
    imparfait: ["j'allais", "tu allais", "il allait", "nous allions", "vous alliez", "ils allaient"],
    futur_proche: ["je vais aller", "tu vas aller", "il va aller", "nous allons aller", "vous allez aller", "ils vont aller"],
    conditionnel: ["j'irais", "tu irais", "il irait", "nous irions", "vous iriez", "ils iraient"],
    subjonctif: ["que j'aille", "que tu ailles", "qu'il aille", "que nous allions", "que vous alliez", "qu'ils aillent"],
    futur_simple: ["j'irai", "tu iras", "il ira", "nous irons", "vous irez", "ils iront"],
    plus_que_parfait: ["j'étais allé(e)", "tu étais allé(e)", "il était allé", "nous étions allé(e)s", "vous étiez allé(e)s", "ils étaient allés"]
};

// 6. Voir
addVerb("voir", "Ver", "3ème groupe", ["je vois", "tu vois", "il voit", "nous voyons", "vous voyez", "ils voient"], "avoir", "vu", "voy", "verr", ["voi", "voy"]);

// 7. Savoir
addVerb("savoir", "Saber", "3ème groupe", ["je sais", "tu sais", "il sait", "nous savons", "vous savez", "ils savent"], "avoir", "su", "sav", "saur", "sach");

// 8. Pouvoir
addVerb("pouvoir", "Poder", "3ème groupe", ["je peux", "tu peux", "il peut", "nous pouvons", "vous pouvez", "ils peuvent"], "avoir", "pu", "pouv", "pourr", ["puiss", "puiss"]);

// 9. Vouloir
addVerb("vouloir", "Querer", "3ème groupe", ["je veux", "tu veux", "il veut", "nous voulons", "vous voulez", "ils veulent"], "avoir", "voulu", "voul", "voudr", ["veuill", "voul"]);

// 10. Venir
addVerb("venir", "Venir", "3ème groupe", ["je viens", "tu viens", "il vient", "nous venons", "vous venez", "ils viennent"], "être", "venu", "ven", "viendr", ["vienn", "ven"]);

// 11. Devoir
addVerb("devoir", "Deber", "3ème groupe", ["je dois", "tu dois", "il doit", "nous devons", "vous devez", "ils doivent"], "avoir", "dû", "dev", "devr", ["doiv", "dev"]);

// 12. Prendre
addVerb("prendre", "Tomar / Coger", "3ème groupe", ["je prends", "tu prends", "il prend", "nous prenons", "vous prenez", "ils prennent"], "avoir", "pris", "pren", "prendr", ["prenn", "pren"]);

// 13. Trouver
addVerb("trouver", "Encontrar", "1er groupe", ["je trouve", "tu trouves", "il trouve", "nous trouvons", "vous trouvez", "ils trouvent"], "avoir", "trouvé", "trouv", "trouver", "trouv");

// 14. Donner
addVerb("donner", "Dar", "1er groupe", ["je donne", "tu donnes", "il donne", "nous donnons", "vous donnez", "ils donnent"], "avoir", "donné", "donn", "donner", "donn");

// 15. Falloir
verbData["falloir"] = {
    meaning: "Hacer falta", group: "3ème groupe (Impersonnel)",
    present: ["-", "-", "il faut", "-", "-", "-"],
    passe_compose: ["-", "-", "il a fallu", "-", "-", "-"],
    imparfait: ["-", "-", "il fallait", "-", "-", "-"],
    futur_proche: ["-", "-", "il va falloir", "-", "-", "-"],
    conditionnel: ["-", "-", "il faudrait", "-", "-", "-"],
    subjonctif: ["-", "-", "qu'il faille", "-", "-", "-"],
    futur_simple: ["-", "-", "il faudra", "-", "-", "-"],
    plus_que_parfait: ["-", "-", "il avait fallu", "-", "-", "-"]
};

// 16. Parler
addVerb("parler", "Hablar", "1er groupe", ["je parle", "tu parles", "il parle", "nous parlons", "vous parlez", "ils parlent"], "avoir", "parlé", "parl", "parler", "parl");

// 17. Mettre
addVerb("mettre", "Poner", "3ème groupe", ["je mets", "tu mets", "il met", "nous mettons", "vous mettez", "ils mettent"], "avoir", "mis", "mett", "mettr", "mett");

// 18. Regarder
addVerb("regarder", "Mirar", "1er groupe", ["je regarde", "tu regardes", "il regarde", "nous regardons", "vous regardez", "ils regardent"], "avoir", "regardé", "regard", "regarder", "regard");

// 19. Passer
addVerb("passer", "Pasar", "1er groupe", ["je passe", "tu passes", "il passe", "nous passons", "vous passez", "ils passent"], "avoir", "passé", "pass", "passer", "pass"); // Usually conjugated with avoir or être depending on context, using avoir as default

// 20. Croire
addVerb("croire", "Creer", "3ème groupe", ["je crois", "tu crois", "il croit", "nous croyons", "vous croyez", "ils croient"], "avoir", "cru", "croy", "croir", ["croi", "croy"]);

// 21. Aimer
addVerb("aimer", "Amar / Gustar", "1er groupe", ["j'aime", "tu aimes", "il aime", "nous aimons", "vous aimez", "ils aiment"], "avoir", "aimé", "aim", "aimer", "aim");

// 22. Penser
addVerb("penser", "Pensar", "1er groupe", ["je pense", "tu penses", "il pense", "nous pensons", "vous pensez", "ils pensent"], "avoir", "pensé", "pens", "penser", "pens");

// 23. Laisser
addVerb("laisser", "Dejar", "1er groupe", ["je laisse", "tu laisses", "il laisse", "nous laissons", "vous laissez", "ils laissent"], "avoir", "laissé", "laiss", "laisser", "laiss");

// 24. Arriver
addVerb("arriver", "Llegar", "1er groupe", ["j'arrive", "tu arrives", "il arrive", "nous arrivons", "vous arrivez", "ils arrivent"], "être", "arrivé", "arriv", "arriver", "arriv");

// 25. Devenir
addVerb("devenir", "Convertirse", "3ème groupe", ["je deviens", "tu deviens", "il devient", "nous devenons", "vous devenez", "ils deviennent"], "être", "devenu", "deven", "deviendr", ["devienn", "deven"]);

// 26. Partir
addVerb("partir", "Irse / Partir", "3ème groupe", ["je pars", "tu pars", "il part", "nous partons", "vous partez", "ils partent"], "être", "parti", "part", "partir", "part");

// 27. Demander
addVerb("demander", "Pedir / Preguntar", "1er groupe", ["je demande", "tu demandes", "il demande", "nous demandons", "vous demandez", "ils demandent"], "avoir", "demandé", "demand", "demander", "demand");

// 28. Tenir
addVerb("tenir", "Mantener / Tener", "3ème groupe", ["je tiens", "tu tiens", "il tient", "nous tenons", "vous tenez", "ils tiennent"], "avoir", "tenu", "ten", "tiendr", ["tienn", "ten"]);

// 29. Comprendre
addVerb("comprendre", "Comprender", "3ème groupe", ["je comprends", "tu comprends", "il comprend", "nous comprenons", "vous comprenez", "ils comprennent"], "avoir", "compris", "compren", "comprendr", ["comprenn", "compren"]);

// 30. Rendre
addVerb("rendre", "Devolver / Hacer", "3ème groupe", ["je rends", "tu rends", "il rend", "nous rendons", "vous rendez", "ils rendent"], "avoir", "rendu", "rend", "rendr", "rend");

// 31. Rester
addVerb("rester", "Quedarse", "1er groupe", ["je reste", "tu restes", "il reste", "nous restons", "vous restez", "ils restent"], "être", "resté", "rest", "rester", "rest");

// 32. Sortir
addVerb("sortir", "Salir", "3ème groupe", ["je sors", "tu sors", "il sort", "nous sortons", "vous sortez", "ils sortent"], "être", "sorti", "sort", "sortir", "sort");

// 33. Entendre
addVerb("entendre", "Oír / Entender", "3ème groupe", ["j'entends", "tu entends", "il entend", "nous entendons", "vous entendez", "ils entendent"], "avoir", "entendu", "entend", "entendr", "entend");

// 34. Connaître
addVerb("connaître", "Conocer", "3ème groupe", ["je connais", "tu connais", "il connaît", "nous connaissons", "vous connaissez", "ils connaissent"], "avoir", "connu", "connaiss", "connaîtr", "connaiss");

// 35. Porter
addVerb("porter", "Llevar", "1er groupe", ["je porte", "tu portes", "il porte", "nous portons", "vous portez", "ils portent"], "avoir", "porté", "port", "porter", "port");

// 36. Appeler
addVerb("appeler", "Llamar", "1er groupe", ["j'appelle", "tu appelles", "il appelle", "nous appelons", "vous appelez", "ils appellent"], "avoir", "appelé", "appel", "appeller", ["appell", "appel"]);

// 37. Tomber
addVerb("tomber", "Caer", "1er groupe", ["je tombe", "tu tombes", "il tombe", "nous tombons", "vous tombez", "ils tombent"], "être", "tombé", "tomb", "tomber", "tomb");

// 38. Vivre
addVerb("vivre", "Vivir", "3ème groupe", ["je vis", "tu vis", "il vit", "nous vivons", "vous vivez", "ils vivent"], "avoir", "vécu", "viv", "vivr", "viv");

// 39. Chercher
addVerb("chercher", "Buscar", "1er groupe", ["je cherche", "tu cherches", "il cherche", "nous cherchons", "vous cherchez", "ils cherchent"], "avoir", "cherché", "cherch", "chercher", "cherch");

// 40. Marcher
addVerb("marcher", "Caminar", "1er groupe", ["je marche", "tu marches", "il marche", "nous marchons", "vous marchez", "ils marchent"], "avoir", "marché", "march", "marcher", "march");

// 41. Paraître
addVerb("paraître", "Parecer", "3ème groupe", ["je parais", "tu parais", "il paraît", "nous paraissons", "vous paraissez", "ils paraissent"], "avoir", "paru", "paraiss", "paraîtr", "paraiss");

// 42. Manger
addVerb("manger", "Comer", "1er groupe", ["je mange", "tu manges", "il mange", "nous mangeons", "vous mangez", "ils mangent"], "avoir", "mangé", "mange", "manger", "mang");
// Small manual fix for manger imparfait (nous mangions instead of nous mangeions)
verbData["manger"].imparfait[3] = "nous mangions";
verbData["manger"].imparfait[4] = "vous mangiez";

// 43. Perdre
addVerb("perdre", "Perder", "3ème groupe", ["je perds", "tu perds", "il perd", "nous perdons", "vous perdez", "ils perdent"], "avoir", "perdu", "perd", "perdr", "perd");

// 44. Écrire
addVerb("écrire", "Escribir", "3ème groupe", ["j'écris", "tu écris", "il écrit", "nous écrivons", "vous écrivez", "ils écrivent"], "avoir", "écrit", "écriv", "écrir", "écriv");

// 45. Lire
addVerb("lire", "Leer", "3ème groupe", ["je lis", "tu lis", "il lit", "nous lisons", "vous lisez", "ils lisent"], "avoir", "lu", "lis", "lir", "lis");

// 46. Attendre
addVerb("attendre", "Esperar", "3ème groupe", ["j'attends", "tu attends", "il attend", "nous attendons", "vous attendez", "ils attendent"], "avoir", "attendu", "attend", "attendr", "attend");

// 47. Ouvrir
addVerb("ouvrir", "Abrir", "3ème groupe", ["j'ouvre", "tu ouvres", "il ouvre", "nous ouvrons", "vous ouvrez", "ils ouvrent"], "avoir", "ouvert", "ouvr", "ouvrir", "ouvr");

// 48. Commencer
addVerb("commencer", "Empezar", "1er groupe", ["je commence", "tu commences", "il commence", "nous commençons", "vous commencez", "ils commencent"], "avoir", "commencé", "commenç", "commencer", "commenc");
// Manual fix for commencer imparfait (nous commencions instead of nous commençions)
verbData["commencer"].imparfait[3] = "nous commencions";
verbData["commencer"].imparfait[4] = "vous commenciez";

// 49. Finir
addVerb("finir", "Terminar", "2ème groupe", ["je finis", "tu finis", "il finit", "nous finissons", "vous finissez", "ils finissent"], "avoir", "fini", "finiss", "finir", "finiss");

// 50. Travailler
addVerb("travailler", "Trabajar", "1er groupe", ["je travaille", "tu travailles", "il travaille", "nous travaillons", "vous travaillez", "ils travaillent"], "avoir", "travaillé", "travaill", "travailler", "travaill");

// Subjonctif fix for 'avoir' to ensure correct start
// Already hardcoded above
