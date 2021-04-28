const getNodeIndex = (n) => {
    var i = 0;
    while ((n = n.previousSibling)) i++;
    return i;
}

const saveRangePosition = (el) => {
    var range = window.getSelection().getRangeAt(0);
    var sC = range.startContainer,
        eC = range.endContainer;

    const A = [];
    while (sC !== el) {
        A.push(getNodeIndex(sC));
        sC = sC.parentNode;
    }

    const B = [];
    while (eC !== el) {
        B.push(getNodeIndex(eC));
        eC = eC.parentNode;
    }

    return { sC: A, sO: range.startOffset, eC: B, eO: range.endOffset };
}

export default saveRangePosition
