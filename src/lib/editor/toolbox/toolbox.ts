import type { LexicalEditor } from "lexical/LexicalEditor"
import { $createParagraphNode, $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection } from "lexical"
import { $setBlocksType } from "@lexical/selection"
import { changeToHeading, changeToParagraph } from "$lib/editor/toolbox/text-actions"

export type Action = {
    name: string
    svg: string
    handler?: (editor: LexicalEditor) => void
}

export const texts: Action[] = [
    {
        name: "Text",
        svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V6.66667C20.75 7.08088 20.4142 7.41667 20 7.41667C19.5858 7.41667 19.25 7.08088 19.25 6.66667V4.75H12.75V19.25H16C16.4142 19.25 16.75 19.5858 16.75 20C16.75 20.4142 16.4142 20.75 16 20.75H8C7.58579 20.75 7.25 20.4142 7.25 20C7.25 19.5858 7.58579 19.25 8 19.25H11.25V4.75H4.75V6.66667C4.75 7.08088 4.41421 7.41667 4 7.41667C3.58579 7.41667 3.25 7.08088 3.25 6.66667V4Z"></path></svg>`,
        handler: (editor) => {
            changeToParagraph(editor)
        }
    },
    {
        name: "Heading 1",
        svg: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.25C3.41421 4.25 3.75 4.58579 3.75 5V11.25H10.25V5C10.25 4.58579 10.5858 4.25 11 4.25C11.4142 4.25 11.75 4.58579 11.75 5V19C11.75 19.4142 11.4142 19.75 11 19.75C10.5858 19.75 10.25 19.4142 10.25 19V12.75H3.75V19C3.75 19.4142 3.41421 19.75 3 19.75C2.58579 19.75 2.25 19.4142 2.25 19V5C2.25 4.58579 2.58579 4.25 3 4.25Z"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9057 6.75035C16.3267 6.802 15.7718 7.01946 15.3049 7.3801C14.8318 7.74548 14.4682 8.24309 14.2591 8.81605C14.1172 9.20517 13.6866 9.40552 13.2975 9.26355C12.9084 9.12157 12.708 8.69103 12.85 8.30191C13.155 7.46589 13.6877 6.73376 14.388 6.19294C15.0884 5.65199 15.927 5.32534 16.8055 5.25346L16.8277 5.25164L16.8499 5.25115C17.8967 5.22771 18.9191 5.56392 19.7537 6.20306C20.5868 6.84102 21.1843 7.74329 21.4548 8.76409C21.7891 9.97619 21.5425 11.1146 21.1354 12.0147C20.7302 12.9106 20.1448 13.6215 19.7055 14.0279L19.6986 14.0343L19.6916 14.0405C18.9491 14.6937 18.1744 15.3076 17.3705 15.88C16.4743 16.5815 15.6527 17.3759 14.9186 18.25H21.2C21.6142 18.25 21.95 18.5858 21.95 19C21.95 19.4142 21.6142 19.75 21.2 19.75H13.5917C12.9084 19.75 12.4943 18.9759 12.9002 18.4076C13.9053 16.9999 15.1041 15.7469 16.4602 14.6877L16.4735 14.6773L16.4872 14.6675C17.2512 14.1242 17.9876 13.5412 18.6934 12.9208C19.0046 12.631 19.4584 12.0827 19.7687 11.3966C20.0787 10.7111 20.2239 9.93968 20.008 9.16007L20.0056 9.15134C19.8193 8.44582 19.4083 7.82782 18.8418 7.394C18.2815 6.965 17.6006 6.73982 16.9057 6.75035Z"></path>
</svg>`,
        handler: (editor) => changeToHeading(editor, "h1")
    },

    {
        name: "Heading 2",
        svg: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.25C3.41421 4.25 3.75 4.58579 3.75 5V11.25H10.25V5C10.25 4.58579 10.5858 4.25 11 4.25C11.4142 4.25 11.75 4.58579 11.75 5V19C11.75 19.4142 11.4142 19.75 11 19.75C10.5858 19.75 10.25 19.4142 10.25 19V12.75H3.75V19C3.75 19.4142 3.41421 19.75 3 19.75C2.58579 19.75 2.25 19.4142 2.25 19V5C2.25 4.58579 2.58579 4.25 3 4.25Z"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3196 6.75154C16.8178 6.78189 16.3346 6.95347 15.926 7.24657C15.5153 7.54113 15.1968 7.94629 15.0075 8.41487C14.8523 8.79893 14.4152 8.98449 14.0312 8.82933C13.6471 8.67418 13.4616 8.23706 13.6167 7.853C13.9125 7.1209 14.4101 6.48789 15.0517 6.02769C15.6933 5.56749 16.4525 5.29903 17.2408 5.25359L17.2482 5.25316L17.2557 5.25288C18.2533 5.21525 19.2296 5.54803 19.9965 6.18714C20.7634 6.82626 21.2668 7.72652 21.4097 8.71457L21.4143 8.74618L21.4161 8.77807C21.4603 9.53257 21.2968 10.2847 20.9433 10.9528C20.6919 11.4279 20.3514 11.8475 19.9423 12.1898C20.4639 12.4619 20.9143 12.8568 21.2521 13.4177C21.8984 14.4739 21.8675 15.759 21.4573 16.838C21.0461 17.9197 20.2127 18.9107 19.0815 19.378L19.0786 19.3792C18.0333 19.8058 16.8745 19.8662 15.7905 19.5506C14.7065 19.2351 13.7612 18.5621 13.1082 17.6411C12.8686 17.3032 12.9483 16.8351 13.2862 16.5955C13.6241 16.3559 14.0923 16.4356 14.3318 16.7735C14.789 17.4183 15.4508 17.8895 16.2098 18.1104C16.9681 18.3312 17.7789 18.2891 18.5103 17.991C19.1943 17.7079 19.7645 17.0696 20.0552 16.305C20.3467 15.5381 20.3161 14.7606 19.9717 14.199L19.9682 14.1933C19.5426 13.4852 18.7016 13.1471 17.2275 13.1471C17.2201 13.1471 17.2121 13.1471 17.2038 13.1471C17.1523 13.1472 17.0876 13.1473 17.0508 13.1451C17.0439 13.1447 17.0076 13.1426 16.9647 13.1352L16.9637 13.135C16.9524 13.1332 16.865 13.1191 16.7673 13.0722L16.7655 13.0714C16.7295 13.0542 16.547 12.967 16.4309 12.7512C16.3831 12.6425 16.3413 12.3989 16.3519 12.2701C16.3793 12.1601 16.4656 11.9821 16.5164 11.914C16.6196 11.7908 16.7354 11.7347 16.7637 11.721C16.8085 11.6993 16.8465 11.6864 16.8651 11.6805C16.9035 11.6683 16.9346 11.662 16.9457 11.6597C16.9718 11.6545 16.993 11.6517 16.9996 11.6509C17.024 11.6477 17.0535 11.645 17.0677 11.6438L17.0706 11.6435C17.0761 11.643 17.082 11.6425 17.0882 11.6419C17.1709 11.6346 17.3161 11.6217 17.4965 11.597C17.9218 11.5387 18.3862 11.4336 18.6392 11.2811L18.6415 11.2798C19.0547 11.0326 19.3923 10.6769 19.6175 10.2513C19.8377 9.83509 19.9422 9.36767 19.9204 8.89772C19.8245 8.28862 19.5105 7.73468 19.0362 7.33947C18.5557 6.93905 17.9446 6.7298 17.3196 6.75154Z"></path>
</svg>`,
        handler: (editor) => changeToHeading(editor, "h2")
    },
    {
        name: "Heading 3",
        svg: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.25C3.41421 4.25 3.75 4.58579 3.75 5V11.25H10.25V5C10.25 4.58579 10.5858 4.25 11 4.25C11.4142 4.25 11.75 4.58579 11.75 5V19C11.75 19.4142 11.4142 19.75 11 19.75C10.5858 19.75 10.25 19.4142 10.25 19V12.75H3.75V19C3.75 19.4142 3.41421 19.75 3 19.75C2.58579 19.75 2.25 19.4142 2.25 19V5C2.25 4.58579 2.58579 4.25 3 4.25Z"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3196 6.75154C16.8178 6.78189 16.3346 6.95347 15.926 7.24657C15.5153 7.54113 15.1968 7.94629 15.0075 8.41487C14.8523 8.79893 14.4152 8.98449 14.0312 8.82933C13.6471 8.67418 13.4616 8.23706 13.6167 7.853C13.9125 7.1209 14.4101 6.48789 15.0517 6.02769C15.6933 5.56749 16.4525 5.29903 17.2408 5.25359L17.2482 5.25316L17.2557 5.25288C18.2533 5.21525 19.2296 5.54803 19.9965 6.18714C20.7634 6.82626 21.2668 7.72652 21.4097 8.71457L21.4143 8.74618L21.4161 8.77807C21.4603 9.53257 21.2968 10.2847 20.9433 10.9528C20.6919 11.4279 20.3514 11.8475 19.9423 12.1898C20.4639 12.4619 20.9143 12.8568 21.2521 13.4177C21.8984 14.4739 21.8675 15.759 21.4573 16.838C21.0461 17.9197 20.2127 18.9107 19.0815 19.378L19.0786 19.3792C18.0333 19.8058 16.8745 19.8662 15.7905 19.5506C14.7065 19.2351 13.7612 18.5621 13.1082 17.6411C12.8686 17.3032 12.9483 16.8351 13.2862 16.5955C13.6241 16.3559 14.0923 16.4356 14.3318 16.7735C14.789 17.4183 15.4508 17.8895 16.2098 18.1104C16.9681 18.3312 17.7789 18.2891 18.5103 17.991C19.1943 17.7079 19.7645 17.0696 20.0552 16.305C20.3467 15.5381 20.3161 14.7606 19.9717 14.199L19.9682 14.1933C19.5426 13.4852 18.7016 13.1471 17.2275 13.1471C17.2201 13.1471 17.2121 13.1471 17.2038 13.1471C17.1523 13.1472 17.0876 13.1473 17.0508 13.1451C17.0439 13.1447 17.0076 13.1426 16.9647 13.1352L16.9637 13.135C16.9524 13.1332 16.865 13.1191 16.7673 13.0722L16.7655 13.0714C16.7295 13.0542 16.547 12.967 16.4309 12.7512C16.3831 12.6425 16.3413 12.3989 16.3519 12.2701C16.3793 12.1601 16.4656 11.9821 16.5164 11.914C16.6196 11.7908 16.7354 11.7347 16.7637 11.721C16.8085 11.6993 16.8465 11.6864 16.8651 11.6805C16.9035 11.6683 16.9346 11.662 16.9457 11.6597C16.9718 11.6545 16.993 11.6517 16.9996 11.6509C17.024 11.6477 17.0535 11.645 17.0677 11.6438L17.0706 11.6435C17.0761 11.643 17.082 11.6425 17.0882 11.6419C17.1709 11.6346 17.3161 11.6217 17.4965 11.597C17.9218 11.5387 18.3862 11.4336 18.6392 11.2811L18.6415 11.2798C19.0547 11.0326 19.3923 10.6769 19.6175 10.2513C19.8377 9.83509 19.9422 9.36767 19.9204 8.89772C19.8245 8.28862 19.5105 7.73468 19.0362 7.33947C18.5557 6.93905 17.9446 6.7298 17.3196 6.75154Z"></path>
</svg>`,
        handler: (editor) => changeToHeading(editor, "h3")
    },
    {
        name: "Heading 4",
        svg: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.25C3.41421 4.25 3.75 4.58579 3.75 5V11.25H10.25V5C10.25 4.58579 10.5858 4.25 11 4.25C11.4142 4.25 11.75 4.58579 11.75 5V19C11.75 19.4142 11.4142 19.75 11 19.75C10.5858 19.75 10.25 19.4142 10.25 19V12.75H3.75V19C3.75 19.4142 3.41421 19.75 3 19.75C2.58579 19.75 2.25 19.4142 2.25 19V5C2.25 4.58579 2.58579 4.25 3 4.25Z"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1928 5.85878C18.6593 5.15904 19.75 5.48927 19.75 6.33028V14.25H21C21.4142 14.25 21.75 14.5858 21.75 15C21.75 15.4142 21.4142 15.75 21 15.75H19.75V19C19.75 19.4142 19.4142 19.75 19 19.75C18.5858 19.75 18.25 19.4142 18.25 19V15.75H13.1869C12.508 15.75 12.103 14.9934 12.4796 14.4285L18.1928 5.85878ZM18.25 14.25V8.47708L14.4014 14.25H18.25Z"></path>
</svg>`,
        handler: (editor) => changeToHeading(editor, "h4")
    },
    {
        name: "Heading 5",
        svg: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.25C3.41421 4.25 3.75 4.58579 3.75 5V11.25H10.25V5C10.25 4.58579 10.5858 4.25 11 4.25C11.4142 4.25 11.75 4.58579 11.75 5V19C11.75 19.4142 11.4142 19.75 11 19.75C10.5858 19.75 10.25 19.4142 10.25 19V12.75H3.75V19C3.75 19.4142 3.41421 19.75 3 19.75C2.58579 19.75 2.25 19.4142 2.25 19V5C2.25 4.58579 2.58579 4.25 3 4.25Z"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9558 5.94948C14.0287 5.5446 14.381 5.25 14.7924 5.25H20.892C21.3062 5.25 21.642 5.58579 21.642 6C21.642 6.41421 21.3062 6.75 20.892 6.75H15.3359L14.677 10.4122C14.7083 10.3958 14.7397 10.3796 14.7713 10.3638C15.4506 10.0234 16.193 9.8296 16.9512 9.79502L16.9745 9.79396L16.9978 9.79435C18.0629 9.81203 19.0907 10.1881 19.9189 10.8615C20.743 11.5316 21.3224 12.4578 21.5681 13.4941C21.8521 14.5302 21.8025 15.6309 21.4262 16.6371C21.048 17.6482 20.3593 18.512 19.4591 19.1014L19.4463 19.1098L19.4332 19.1176C17.1285 20.4957 13.8824 19.5672 12.3514 16.9306C12.1434 16.5724 12.2652 16.1134 12.6234 15.9054C12.9816 15.6974 13.4406 15.8192 13.6486 16.1774C14.8123 18.1815 17.1546 18.7212 18.6504 17.838C19.2754 17.4248 19.756 16.8207 20.0213 16.1116C20.2883 15.3975 20.3225 14.6155 20.1186 13.8802L20.1145 13.8654L20.1111 13.8506C19.9425 13.1297 19.5413 12.4877 18.9726 12.0253C18.41 11.5679 17.7152 11.3117 16.996 11.2946C16.4565 11.3225 15.928 11.462 15.4433 11.7049C15.047 11.9035 14.6868 12.1677 14.3774 12.4863C14.075 12.7978 13.6591 12.7916 13.385 12.6587C13.1072 12.524 12.8336 12.1871 12.9141 11.7396L13.9558 5.94948Z"></path>
</svg>`,
        handler: (editor) => changeToHeading(editor, "h5")
    },
    {
        name: "Heading 6",
        svg: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.25C3.41421 4.25 3.75 4.58579 3.75 5V11.25H10.25V5C10.25 4.58579 10.5858 4.25 11 4.25C11.4142 4.25 11.75 4.58579 11.75 5V19C11.75 19.4142 11.4142 19.75 11 19.75C10.5858 19.75 10.25 19.4142 10.25 19V12.75H3.75V19C3.75 19.4142 3.41421 19.75 3 19.75C2.58579 19.75 2.25 19.4142 2.25 19V5C2.25 4.58579 2.58579 4.25 3 4.25Z"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8428 6.08001C16.5038 5.78482 17.221 5.63827 17.9443 5.65076L17.9528 5.65091L17.9612 5.65124C18.6652 5.67922 19.3558 5.85344 19.9894 6.16278C20.6596 6.48991 21.0427 6.86843 21.4674 7.36832C21.7355 7.68402 21.697 8.15733 21.3813 8.42549C21.0656 8.69365 20.5923 8.65511 20.3241 8.33942C19.9679 7.92001 19.7421 7.71121 19.3314 7.51075C18.8869 7.29373 18.4031 7.17116 17.91 7.1504C17.4093 7.14298 16.9127 7.245 16.4544 7.44965C15.9982 7.65337 15.5906 7.95407 15.2596 8.3315C14.8157 8.89075 14.4914 9.53705 14.3076 10.2297C14.1125 10.9831 13.997 11.753 13.9617 12.5269C14.7663 11.5406 15.9873 10.9103 17.3576 10.9103C19.7888 10.9103 21.75 12.8945 21.75 15.3302C21.75 17.7659 19.7888 19.75 17.3576 19.75C15.6443 19.75 14.1643 18.7645 13.4398 17.3301C13.0351 16.5834 12.7496 15.7772 12.5937 14.9411L12.5912 14.9278L12.5892 14.9144C12.3372 13.226 12.428 11.5036 12.856 9.85144L12.8571 9.84743C13.0954 8.94816 13.5178 8.10867 14.0975 7.38296L14.1072 7.37079L14.1174 7.35903C14.5931 6.81178 15.1818 6.37518 15.8428 6.08001ZM14.821 16.7346C15.3136 17.6393 16.2672 18.25 17.3576 18.25C18.9497 18.25 20.25 16.9481 20.25 15.3302C20.25 13.7122 18.9497 12.4103 17.3576 12.4103C15.7655 12.4103 14.4652 13.7122 14.4652 15.3302C14.4652 15.7995 14.5747 16.2423 14.7689 16.6344C14.7763 16.6478 14.7836 16.6612 14.791 16.6746C14.802 16.6943 14.812 16.7143 14.821 16.7346Z"></path>
</svg>`,
        handler: (editor) => changeToHeading(editor, "h6")
    }
]
