import type { ClientRectObject } from "@floating-ui/core"
import { $getSelection } from "lexical"
import type { LexicalEditor } from "lexical/LexicalEditor"

export function updateTextFormatFloatingToolbar(editor: LexicalEditor) {
    const selection = $getSelection()
    const nativeSelection = window.getSelection()

    const rootElement = editor.getRootElement()

    if (
        selection !== null &&
        nativeSelection !== null &&
        !nativeSelection.isCollapsed &&
        rootElement !== null &&
        rootElement.contains(nativeSelection.anchorNode)
    ) {
        const rangeRect = getDOMRangeRect(nativeSelection, rootElement)

        const rect = document.getSelection()!.getRangeAt(0).getClientRects()[0]

        const { x, y } = rect

        return {
            getBoundingClientRect(): ClientRectObject {
                return rangeRect
            }
        }
    } else {
        return null
    }
}

function getDOMRangeRect(nativeSelection: Selection, rootElement: HTMLElement): ClientRectObject {
    const domRange = nativeSelection.getRangeAt(0)

    let rect

    if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement
        while (inner.firstElementChild != null) {
            inner = inner.firstElementChild as HTMLElement
        }
        rect = inner.getBoundingClientRect()
    } else {
        rect = domRange.getBoundingClientRect()
    }

    return rect
}
