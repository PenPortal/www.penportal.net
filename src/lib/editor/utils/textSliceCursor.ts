import { $getSelection, $isRangeSelection, TextNode } from "lexical"

export function textSliceCursor(stopToolbar: () => void) {
    const selection = $getSelection()

    if (!$isRangeSelection(selection)) {
        stopToolbar()
        return
    }

    if (!selection.isCollapsed()) {
        stopToolbar()
        return
    }

    const node = selection.getNodes()[0]

    const text = node.getTextContent().slice(0, selection.anchor.offset)

    const indexOfSlash = text.lastIndexOf("/")

    if (indexOfSlash === -1) {
        stopToolbar()
        return
    }

    const strippedText = text.slice(indexOfSlash + 1)

    // regex: a-z + A-Z + 0-9
    const regex = /^[a-zA-Z0-9]*$/

    if (!regex.test(strippedText)) {
        stopToolbar()
        return
    }

    return {
        position: document.getSelection()!.getRangeAt(0).getClientRects()[0],
        text: strippedText,
        selection: selection
    }
}
