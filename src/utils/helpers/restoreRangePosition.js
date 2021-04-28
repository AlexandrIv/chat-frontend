const restoreRangePosition = (el, rp) => {
    el.focus();
    let sel = window.getSelection(),
        range = sel.getRangeAt(0);
    let x,
        C,
        sC = el,
        eC = el;

    C = rp.sC;
    x = C.length;
    while (x--) sC = sC.childNodes[C[x]];
    C = rp.eC;
    x = C.length;
    while (x--) eC = eC.childNodes[C[x]];

    range.setStart(sC, rp.sO);
    range.setEnd(eC, rp.eO);
    sel.removeAllRanges();
    sel.addRange(range);
};

export default restoreRangePosition;
