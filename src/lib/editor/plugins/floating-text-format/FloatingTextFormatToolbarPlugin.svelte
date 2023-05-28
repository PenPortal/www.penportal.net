<script lang="ts">
    import type { LexicalEditor } from "lexical/LexicalEditor"
    import { COMMAND_PRIORITY_LOW, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from "lexical"
    import { onMount } from "svelte"
    import type { ReferenceElement } from "@floating-ui/dom/src/types"
    import type { PopupProperties } from "$lib/editor/plugins/floating-text-format/get-selection-text-props."
    import { getSelectionTextProps } from "$lib/editor/plugins/floating-text-format/get-selection-text-props."
    import { TOGGLE_LINK_COMMAND } from "@lexical/link"
    import { updateTextFormatFloatingToolbar } from "$lib/editor/plugins/floating-text-format/updateTextFormatFloatingToolbar"
    import { computePosition, flip } from "@floating-ui/dom"

    export let editor: LexicalEditor

    let virtualElm: ReferenceElement | null = null

    $: {
        if (virtualElm && dom) {
            updateFloating(virtualElm)
        } else {
            if (dom) {
                Object.assign(dom.style, {
                    display: "none"
                })
            }
        }
    }

    function updateFloating(elm: ReferenceElement) {
        computePosition(elm, dom, {
            placement: "bottom-start",
            middleware: [
                flip({
                    padding: 10,
                    boundary: editor.getRootElement()!
                })
            ]
        }).then(({ x, y }) => {
            Object.assign(dom.style, {
                left: `${x}px`,
                top: `${y}px`,
                display: "block"
            })
        })
    }

    onMount(() =>
        editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                virtualElm = updateTextFormatFloatingToolbar(editor)
            })
        })
    )

    onMount(() =>
        editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                virtualElm = updateTextFormatFloatingToolbar(editor)
                return false
            },
            COMMAND_PRIORITY_LOW
        )
    )

    let textProperties: PopupProperties | null = null

    function updateProperties() {
        editor.getEditorState().read(() => {
            textProperties = getSelectionTextProps(editor)
        })
    }

    onMount(() => editor.registerUpdateListener(updateProperties))
    onMount(() =>
        editor.registerRootListener(() => {
            if (editor.getRootElement() === null) {
                if (textProperties) {
                    textProperties = {
                        ...textProperties,
                        isText: false
                    }
                }
            }
        })
    )

    function handleClickOutside() {
        Object.assign(dom.style, {
            display: "none"
        })
    }

    export let dom: HTMLElement

    type Action = {
        name: string
        svg: string
        action: () => void
    }

    function getFormatValue(name: string): boolean {
        if (textProperties) {
            return textProperties[`is${name}`]
        } else {
            return false
        }
    }

    const actions: Action[] = [
        {
            name: "Bold",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-type-bold"><path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/></svg>`,
            action: () => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }
        },
        {
            name: "Italic",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-type-italic"><path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/></svg>`,
            action: () => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }
        },
        {
            name: "Underline",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-type-underline"><path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/></svg>`,
            action: () => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }
        },
        {
            name: "Strikethrough",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-type-strikethrough"><path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/></svg>`,
            action: () => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }
        },
        {
            name: "Subscript",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="none"><path d="M11.354 14.5v-.665l1.553-1.438c.132-.128.243-.243.332-.345.091-.102.16-.203.207-.3.047-.1.07-.207.07-.322a.574.574 0 0 0-.326-.546.748.748 0 0 0-.343-.077.721.721 0 0 0-.35.082.557.557 0 0 0-.23.232.753.753 0 0 0-.08.36h-.876c0-.286.065-.534.194-.744.13-.21.31-.373.543-.488.233-.115.502-.172.806-.172.312 0 .584.055.816.166.233.11.414.261.543.456.13.194.194.418.194.669 0 .165-.033.327-.098.488-.064.16-.178.339-.343.535a7.918 7.918 0 0 1-.697.7l-.637.625v.03h1.832v.754h-3.11ZM5.04 4.273 6.96 7.469h.068l1.93-3.196h1.803L8.073 8.636 10.805 13H8.972L7.03 9.825h-.068L5.018 13H3.194l2.757-4.364-2.723-4.363H5.04Z" fill="currentColor"/></svg>`,
            action: () => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
            }
        },
        {
            name: "Superscript",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="none"><path d="M11.354 6v-.665l1.553-1.438c.132-.128.243-.243.332-.345a1.31 1.31 0 0 0 .207-.3c.047-.1.07-.207.07-.322a.574.574 0 0 0-.326-.545.748.748 0 0 0-.343-.077.721.721 0 0 0-.35.08.557.557 0 0 0-.23.233.753.753 0 0 0-.08.36h-.876c0-.286.065-.534.194-.744.13-.21.31-.373.543-.488.233-.115.502-.172.806-.172.312 0 .584.055.816.166.233.11.414.261.543.456.13.194.194.417.194.669 0 .165-.033.327-.098.488-.064.16-.178.339-.343.535a7.92 7.92 0 0 1-.697.7l-.637.625v.03h1.832V6h-3.11ZM5.04 4.273 6.96 7.469h.068l1.93-3.196h1.803L8.073 8.636 10.805 13H8.972L7.03 9.825h-.068L5.018 13H3.194l2.757-4.364-2.723-4.363H5.04Z" fill="currentColor"/></svg>`,
            action: () => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
            }
        },
        {
            name: "Code",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-code"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg>`,
            action: () => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
            }
        },
        {
            name: "Link",
            svg: `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-link"><path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/></svg>`,
            action: () => {
                insertLink()
            }
        }
    ]

    function insertLink() {
        if (textProperties!.isLink != true) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
        }
    }
</script>

{#if virtualElm}
    {#key virtualElm}
        <div on:click_outside={handleClickOutside} bind:this={dom} class="context">
            <ol class="content">
                {#each actions as action}
                    <li>
                        <button
                            tabindex="0"
                            aria-label={action.name}
                            class="item body1"
                            on:click={() => {
                                action.action()
                                handleClickOutside()
                            }}
                            data-format={getFormatValue(action.name) ? true : undefined}
                        >
                            {@html action.svg}
                        </button>
                    </li>
                {/each}
            </ol>
        </div>
    {/key}
{/if}

<style>
    .context {
        display: none;
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;

        min-width: 128px;
        max-width: 300px;

        border: 1px solid var(--gray8);
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        border-radius: 8px;

        background: var(--gray1);

        padding: 4px;
    }

    ol {
        all: unset;
        display: flex;
        flex-direction: row;
        gap: 4px;
    }

    li {
        all: unset;
        display: block;
    }

    .item {
        border: 0;
        display: flex;
        background: none;
        border-radius: 10px;
        padding: 8px;
        cursor: pointer;
        vertical-align: middle;

        transition: background 0.2s ease-in-out;
    }

    .item :global(svg) {
        background-size: contain;
        display: inline-block;
        height: 18px;
        width: 18px;
        margin-top: 2px;
        vertical-align: -0.25em;
        display: flex;
    }

    .item:is(:hover, :focus) {
        background: var(--gray5);
    }

    .item[data-format],
    .item:focus {
        background: var(--gray6);
    }

    .content {
    }
</style>
