import React, { useEffect, useState, useRef } from "react";
import EmojiConvertor from "emoji-js";
import pell from "pell";

import { EmojiEditor as BaseEmojiEditor } from "../components";
import { saveRangePosition, restoreRangePosition, placeCaretAtEnd } from "../utils/helpers";

let js_emoji = new EmojiConvertor();

js_emoji.img_set = "apple";
js_emoji.img_sets.apple.path = "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64/";
js_emoji.allow_native = true;

const EmojiEditor = ({ htmlProp, onChange, onSelectFiles, onSendEnter }) => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [pos, setPos] = useState(false);
    const editor = useRef(null);
    let id = Date.now();

    useEffect(() => {
        editor.current = pell.init({
            element: document.getElementById(id),
            onChange: (html) => {
                if(onChange) {
                    onChange(html);
                }
            },
            actions: [],
            defaultParagraphSeparator: "div"
        });
        editor.current.content.innerHTML = htmlProp;
    }, []);

    useEffect(() => {
        const el = document.querySelector('.chat-input__smile-btn');
        document.addEventListener("click", handleOutsideClick.bind(this, el));
        return () => document.addEventListener("click", handleOutsideClick.bind(this, el));
    }, []);

    const handleOutsideClick = (el, e) => {
        if(el && !el.contains(e.target)) {
            setShowEmojis(false);
        }
    };

    const getPos = (e) => {
        if (e && e.keyCode === 13) {
            editor.current.content.innerHTML = "";
            setPos(0);
            onSendEnter(e);
        }
        setPos(saveRangePosition(editor.current));
    };

    const handleEmojiClick = (obj) => {
      const emoji = js_emoji
          .replace_colons(obj.colons)
          .replace("span", "img")
          .slice(0, -7)
          .replace('style="background-image:url(', 'src="')
          .replace(')"', '"');
      if(pos) {
          restoreRangePosition(editor.current, pos);
          pell.exec("insertHTML", emoji);
          getPos();
      } else {
          placeCaretAtEnd(editor.current.content);
          pell.exec("insertHTML", emoji);
      }
    };

    const toggleEmojiPicker = () => {
        setShowEmojis(!showEmojis);
    };

    return (
        <BaseEmojiEditor
            id={id}
            handleEmojiClick={handleEmojiClick}
            toggleEmojiPicker={toggleEmojiPicker}
            showEmojis={showEmojis}
            editor={editor}
            htmlProp={htmlProp}
            onSelectFiles={onSelectFiles}
            getPos={getPos}
        />
    );
};

export default EmojiEditor;
