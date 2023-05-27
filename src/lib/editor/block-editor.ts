import { createEditor } from "lexical"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text"
import { HEADING, registerMarkdownShortcuts } from "@lexical/markdown"
import type { EditorThemeClasses } from "lexical/LexicalEditor"

import "./editors.css"
import { registerHistory } from "@lexical/history"

export function setupEditor() {
    const theming: EditorThemeClasses = {
        heading: {
            h1: "editor-h1",
            h2: "editor-h2",
            h3: "editor-h3",
            h4: "editor-h4",
            h5: "editor-h5",
            h6: "editor-h6"
        },
        text: {
            base: "editor-base",
            bold: "editor-bold"
        }
    }

    const config = {
        namespace: "MyEditor",
        theme: theming,
        nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
        onError: console.error
    }

    const editor = createEditor(config)

    registerRichText(editor)
    registerMarkdownShortcuts(editor, [HEADING])

    return editor
}
