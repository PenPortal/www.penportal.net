import { createEditor, type EditorState } from "lexical"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import type { EditorThemeClasses } from "lexical/LexicalEditor"

import "./editors.css"
import { CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import type { SerializedEditorState } from "lexical"
import { offset } from "@floating-ui/dom"

export function setupEditor(state: SerializedEditorState | null = null) {
    const theming: EditorThemeClasses = {
        heading: {
            h1: "editor-h1",
            h2: "editor-h2",
            h3: "editor-h3",
            h4: "editor-h4",
            h5: "editor-h5",
            h6: "editor-h6"
        },
        code: "editor-code-root",
        link: "editor-link",
        text: {
            base: "editor-base",
            bold: "editor-bold",
            italic: "editor-italic",
            underline: "editor-underline",
            strikethrough: "editor-strikethrough",
            code: "editor-code"
        }
    }

    const config = {
        namespace: "pen-portal-editor",
        theme: theming,
        nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, LinkNode, AutoLinkNode],
        onError: console.error
    }

    const editor = createEditor(config)

    if (state) {
        editor.setEditorState(editor.parseEditorState(state))
    }

    return editor
}
