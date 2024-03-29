import React, { useState, useImperativeHandle, useEffect, useRef, forwardRef, useCallback, useMemo } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from "emoji-mart";
import t from 'prop-types';

import useDebounce from '../../utils/helpers/useDebounce';
import "./InputEmoji.scss";
import {Button, Tooltip} from "antd";
import SmileOutlined from "@ant-design/icons/SmileOutlined";
import {UploadField} from "@navjobs/upload";
import CameraOutlined from "@ant-design/icons/CameraOutlined";
import SendOutlined from "@ant-design/icons/SendOutlined";
import AudioOutlined from "@ant-design/icons/AudioOutlined";

const InputEmoji = ({
                        value,
                        onChange,
                        cleanOnEnter,
                        onEnter,
                        placeholder,
                        onResize,
                        onClick,
                        onFocus,
                        maxLength,
                        keepOpenend,
                        onKeyDown,
                        inputClass,
                        disableRecent,
                        tabIndex,
                        // style
                        height,
                        borderRadius,
                        borderColor,
                        fontSize,
                        fontFamily,
                        onSelectFiles
                    }, ref) => {
    const [showPicker, setShowPicker] = useState(false)
    const [allEmojiStyle, setAllEmojiStyle] = useState({})
    const [currentSize, setCurrentSize] = useState(null)

    const textInputRef = useRef(null)
    const cleanedTextRef = useRef('')
    const placeholderRef = useRef(null)

    useImperativeHandle(ref, () => ({
        get value () {
            return cleanedTextRef.current
        },
        set value (value) {
            setValue(value)
        },
        focus: () => {
            textInputRef.current.focus()
        },
        blur: () => {
            replaceAllTextEmojiToString()
        }
    }))

    useEffect(() => {
        if (value && value.length > 0) {
            placeholderRef.current.style.opacity = 0
        } else {
            placeholderRef.current.style.opacity = 1
        }
    }, [value])

    const replaceAllTextEmojis = useCallback((text) => {
        let allEmojis = getAllEmojisFromText(text)

        if (allEmojis) {
            allEmojis = [...new Set(allEmojis)] // remove duplicates

            allEmojis.forEach(emoji => {
                const style = allEmojiStyle[emoji]

                if (!style) return

                text = replaceAll(
                    text,
                    emoji,
                    `<img style="${style}" data-emoji="${emoji}" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />`
                )
            })
        }

        return text
    }, [allEmojiStyle])

    const updateHTML = useCallback((nextValue) => {
        nextValue = nextValue || value
        textInputRef.current.innerHTML = replaceAllTextEmojis(nextValue || '')
    }, [replaceAllTextEmojis])

    const checkAndEmitResize = useCallback(() => {
        const nextSize = {
            width: textInputRef.current.offsetWidth,
            height: textInputRef.current.offsetHeight
        }

        if (!currentSize ||
            currentSize.width !== nextSize.width ||
            currentSize.height !== nextSize.height) {
            onResize(nextSize)
            setCurrentSize(nextSize)
        }
    }, [currentSize, onResize])

    const emitChange = useCallback(() => {
        if (typeof onChange === 'function') {
            onChange(cleanedTextRef.current)
        }

        if (typeof onResize === 'function') {
            checkAndEmitResize()
        }
    }, [checkAndEmitResize, onChange, onResize])

    useEffect(() => {
        function handleCopy (e) {
            const selectedText = window.getSelection()

            let container = document.createElement('div')

            for (let i = 0, len = selectedText.rangeCount; i < len; ++i) {
                container.appendChild(selectedText.getRangeAt(i).cloneContents())
            }

            container = replaceEmojiToString(container)

            e.clipboardData.setData('text', container.innerText)
            e.preventDefault()

            function replaceEmojiToString (container) {
                const images = Array.prototype.slice.call(container.querySelectorAll('img'))

                images.forEach(image => {
                    image.outerHTML = image.dataset.emoji
                })

                return container
            }
        }

        function handlePaste (e) {
            e.preventDefault()
            let content
            if (window.clipboardData) {
                content = window.clipboardData.getData('Text')
                content = replaceAllTextEmojis(content)
                if (window.getSelection) {
                    var selObj = window.getSelection()
                    var selRange = selObj.getRangeAt(0)
                    selRange.deleteContents()
                    selRange.insertNode(document.createTextNode(content))
                }
            } else if (e.clipboardData) {
                content = e.clipboardData.getData('text/plain')
                content = replaceAllTextEmojis(content)
                document.execCommand('insertHTML', false, content)
            }
        }

        const inputEl = textInputRef.current

        const handleContentEditableInputCopyAndPaste = () => {
            inputEl.addEventListener('copy', handleCopy)
            inputEl.addEventListener('paste', handlePaste)
        }

        handleContentEditableInputCopyAndPaste()

        return () => {
            inputEl.removeEventListener('copy', handleCopy)
            inputEl.removeEventListener('paste', handlePaste)
        }
    }, [replaceAllTextEmojis])

    useEffect(() => {
        const allEmojiButton = Array.prototype.slice.call(document.querySelectorAll('.emoji-mart-category-list > li > button'))

        const allEmojiStyle = {}

        allEmojiButton.forEach(emojiButton => {
            const label = emojiButton.getAttribute('aria-label')
            const [emoji] = label.split(',')

            const emojiSpanEl = emojiButton.querySelector('span')

            const style = replaceAll(emojiSpanEl.style.cssText, '"', "'")

            allEmojiStyle[emoji] = style
        })

        setAllEmojiStyle(allEmojiStyle)
    }, [])

    useEffect(() => {
        updateHTML()
    }, [updateHTML])

    const replaceAllTextEmojiToString = useCallback(() => {
        if (!textInputRef.current) {
            cleanedTextRef.current = ''
        }

        const container = document.createElement('div')
        container.innerHTML = textInputRef.current.innerHTML

        const images = Array.prototype.slice.call(container.querySelectorAll('img'))

        images.forEach(image => {
            image.outerHTML = image.dataset.emoji
        })

        let text = container.innerText

        // remove all ↵ for safari
        text = text.replace(/\n/ig, '')

        cleanedTextRef.current = text

        checkPlaceholder()

        emitChange()
    }, [emitChange])

    const [ replaceAllTextEmojiToStringDebounced ] = useDebounce(replaceAllTextEmojiToString, 500)

    useEffect(() => {
        function handleKeydown (event) {
            placeholderRef.current.style.opacity = 0

            if (typeof maxLength !== 'undefined' && event.keyCode !== 8 && totalCharacters() >= maxLength) {
                event.preventDefault()
            }

            if (event.keyCode === 13) {
                event.preventDefault()

                replaceAllTextEmojiToString()

                const cleanedText = cleanedTextRef.current

                if (typeof onEnter === 'function') {
                    onEnter(cleanedText)
                }

                if (cleanOnEnter) {
                    updateHTML('')
                }

                if (typeof onKeyDown === 'function') {
                    onKeyDown(event)
                }

                return false
            }

            if (typeof onKeyDown === 'function') {
                onKeyDown(event)
            }
        }

        function handleKeyup(event) {
            replaceAllTextEmojiToStringDebounced()
        }

        const inputEl = textInputRef.current

        inputEl.addEventListener('keydown', handleKeydown)
        inputEl.addEventListener('keyup', handleKeyup)

        return () => {
            inputEl.removeEventListener('keydown', handleKeydown)
            inputEl.removeEventListener('keyup', handleKeyup)
        }
    }, [onChange, cleanOnEnter, onEnter, updateHTML, replaceAllTextEmojiToString, replaceAllTextEmojiToStringDebounced, emitChange, maxLength, onKeyDown])

    useEffect(() => {
        function handleFocus() {
            if (typeof onFocus === 'function') {
                onFocus()
            }
        }

        const inputEl = textInputRef.current

        inputEl.addEventListener('focus', handleFocus)

        return () => {
            inputEl.removeEventListener('focus', handleFocus)
        }
    }, [onFocus])

    function totalCharacters () {
        const text = textInputRef.current.innerText
        const html = textInputRef.current.innerHTML

        const textCount = text.length
        const emojisCount = (html.match(/<img/g) || []).length

        return textCount + emojisCount
    }

    useEffect(() => {
        if (textInputRef.current) {
            setCurrentSize({
                width: textInputRef.current.offsetWidth,
                height: textInputRef.current.offsetHeight
            })
        }
    }, [])

    const excluePicker = useMemo(() => {
        const exclude = []

        if (disableRecent) {
            exclude.push('recent')
        }

        return exclude
    }, [disableRecent])

    function setValue (value) {
        updateHTML(value)
        textInputRef.current.blur()
    }

    function toggleShowPicker () {
        setShowPicker(showPicker => !showPicker)
    }

    function pasteHtmlAtCaret (html) {
        let sel, range
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection()
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0)
                range.deleteContents()

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                const el = document.createElement('div')
                el.innerHTML = html
                const frag = document.createDocumentFragment(); var node; var lastNode
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node)
                }
                range.insertNode(frag)

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange()
                    range.setStartAfter(lastNode)
                    range.collapse(true)
                    sel.removeAllRanges()
                    sel.addRange(range)
                }
            }
        } else if (document.selection && document.selection.type !== 'Control') {
            // IE < 9
            document.selection.createRange().pasteHTML(html)
        }
    }

    function replaceAll (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace)
    }

    function getImage (emoji) {
        let shortNames = `${emoji.short_names}`

        shortNames = replaceAll(shortNames, ',', ', ')

        const emojiSpanEl = document.querySelector(
            `[aria-label="${emoji.native}, ${shortNames}"] > span`
        )

        if (!emojiSpanEl) return ''

        const style = replaceAll(emojiSpanEl.style.cssText, '"', "'")

        return `<img style="${style}" data-emoji="${emoji.native}" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />`
    }

    function handleSelectEmoji (emoji) {
        placeholderRef.current.style.opacity = 0

        textInputRef.current.focus()

        pasteHtmlAtCaret(getImage(emoji))

        textInputRef.current.focus()

        emitChange()

        // if (!keepOpenend) {
        //     toggleShowPicker()
        // }
    }

    function getAllEmojisFromText (text) {
        return text.match(
            /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g
        )
    }

    function checkPlaceholder () {
        const text = cleanedTextRef.current

        if (text !== '' && placeholderRef.current.opacity !== 0) {
            placeholderRef.current.style.opacity = 0
        } else {
            placeholderRef.current.style.opacity = 1
        }
    }

    function handleClick () {
        if (typeof onClick === 'function') {
            onClick()
        }
    }

    return (
        <div className="emoji-editor">
            <div className="emoji-editor__smile-btn">
                <div className="emoji-editor__emoji-picker">
                    {showPicker && (
                        <Picker
                            set='apple'
                            color="#3B76FC"
                            onSelect={handleSelectEmoji}
                            exclude={excluePicker}
                        />
                    )}
                </div>
                <Tooltip placement="top" title="Смайл">
                    <Button shape="circle" type="link" onClick={toggleShowPicker}>
                        <SmileOutlined />
                    </Button>
                </Tooltip>
            </div>

            <div className='react-input-emoji--wrapper' onClick={handleClick}>
                <div
                    ref={placeholderRef}
                    className='react-input-emoji--placeholder'>
                    {placeholder}
                </div>
                <div
                    ref={textInputRef}
                    tabIndex={tabIndex}
                    contentEditable
                    className={`react-input-emoji--input${inputClass ? ` ${inputClass}` : ''}`}
                    onBlur={emitChange}
                />
            </div>

            <div className="emoji-editor__actions">
                <Tooltip placement="top" title="Фото">
                    <Button shape="circle" type="link">
                        <UploadField
                            onFiles={onSelectFiles}
                            containerProps={{
                                className: 'upload-btn'
                            }}
                            uploadProps={{
                                accept: '.jpg,.jpeg,.png,.svg,.git,.bmp',
                                multiple: 'multiple'
                            }}>
                            <CameraOutlined />
                        </UploadField>
                    </Button>
                </Tooltip>
                {value
                    ?
                    <Tooltip placement="top" title="Надіслати">
                        <Button shape="circle" type="link">
                            <SendOutlined />
                        </Button>
                    </Tooltip>
                    :
                    <Tooltip placement="top" title="Запишіть повідомлення">
                        <Button shape="circle" type="link">
                            <AudioOutlined />
                        </Button>
                    </Tooltip>
                }
            </div>
        </div>
    );
};

const InputEmojiWithRef = forwardRef(InputEmoji);

InputEmojiWithRef.propTypes = {
    value: t.string,
    onChange: t.func,
    cleanOnEnter: t.bool,
    onEnter: t.func,
    placeholder: t.string,
    onResize: t.func,
    onClick: t.func,
    onFocus: t.func,
    maxLength: t.number,
    keepOpenend: t.bool,
    onKeyDown: t.func,
    inputClass: t.string,
    disableRecent: t.bool,
    tabIndex: t.number,
    // style
    height: t.number,
    borderRadius: t.number,
    borderColor: t.string,
    fontSize: t.number,
    fontFamily: t.string
}

InputEmojiWithRef.defaultProps = {
    height: 30,
    placeholder: 'Type a message',
    borderRadius: 21,
    borderColor: '#EAEAEA',
    fontSize: 15,
    fontFamily: 'sans-serif',
    tabIndex: 0
}

export default InputEmojiWithRef;
