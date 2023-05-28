import { $createParagraphNode, $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection } from "lexical"
import { $setBlocksType } from "@lexical/selection"
import type { LexicalEditor } from "lexical/LexicalEditor"
import { $createHeadingNode, type HeadingTagType } from "@lexical/rich-text"

export function changeToParagraph(editor: LexicalEditor) {
    const selection = $getSelection()
    if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
    }
}

export function changeToHeading(editor: LexicalEditor, level: HeadingTagType) {
    const selection = $getSelection()
    if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(level))
    }
}
