import type { LexicalEditor } from "lexical/LexicalEditor"
import { $getSelection, $isRangeSelection, $isTextNode, ElementNode, type RangeSelection, TextNode } from "lexical"
import { $isAtNodeEnd } from "@lexical/selection"
import { $isLinkNode } from "@lexical/link"
import { $isCodeHighlightNode } from "@lexical/code"

export type PopupProperties = {
    isText: boolean
    isBold: boolean
    isItalic: boolean
    isUnderline: boolean
    isStrikethrough: boolean
    isSubscript: boolean
    isSuperscript: boolean
    isCode: boolean
    isLink: boolean
}

export function getSelectionTextProps(editor: LexicalEditor): PopupProperties | null {
    if (editor.isComposing()) {
        return null
    }

    const props: PopupProperties = {
        isText: false,
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isStrikethrough: false,
        isSubscript: false,
        isSuperscript: false,
        isCode: false,
        isLink: false
    }

    const selection = $getSelection()
    const nativeSelection = window.getSelection()
    const rootElement = editor.getRootElement()

    if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) || rootElement === null || !rootElement.contains(nativeSelection.anchorNode))
    ) {
        props.isText = false
        return props
    }

    if (!$isRangeSelection(selection)) {
        return props
    }

    const node = getSelectedNode(selection)

    // Update text format
    // setIsBold(selection.hasFormat("bold"))
    // setIsItalic(selection.hasFormat("italic"))
    // setIsUnderline(selection.hasFormat("underline"))
    // setIsStrikethrough(selection.hasFormat("strikethrough"))
    // setIsSubscript(selection.hasFormat("subscript"))
    // setIsSuperscript(selection.hasFormat("superscript"))
    // setIsCode(selection.hasFormat("code"))

    props.isBold = selection.hasFormat("bold")
    props.isItalic = selection.hasFormat("italic")
    props.isUnderline = selection.hasFormat("underline")
    props.isStrikethrough = selection.hasFormat("strikethrough")
    props.isSubscript = selection.hasFormat("subscript")
    props.isSuperscript = selection.hasFormat("superscript")
    props.isCode = selection.hasFormat("code")

    // Update links
    const parent = node.getParent()
    props.isLink = !!($isLinkNode(parent) || $isLinkNode(node))

    if (!$isCodeHighlightNode(selection.anchor.getNode()) && selection.getTextContent() !== "") {
        props.isText = $isTextNode(node)
    } else {
        props.isText = false
    }

    const rawTextContent = selection.getTextContent().replace(/\n/g, "")
    if (!selection.isCollapsed() && rawTextContent === "") {
        props.isText = false
        return props
    }

    return props
}

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
    const anchor = selection.anchor
    const focus = selection.focus
    const anchorNode = selection.anchor.getNode()
    const focusNode = selection.focus.getNode()
    if (anchorNode === focusNode) {
        return anchorNode
    }
    const isBackward = selection.isBackward()
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode
    } else {
        return $isAtNodeEnd(anchor) ? anchorNode : focusNode
    }
}
