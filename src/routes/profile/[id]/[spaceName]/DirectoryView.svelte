<script lang="ts">
    import type { Directory } from "$lib/controller/Controller"
    import { page } from "$app/stores"

    export let directory: Directory<any, any>

    $: directories = directory.directories
    $: notes = directory.notes

    $: console.log($directories, $notes)
</script>

<ol class="box">
    {#each Object.entries($directories) as [name, dir] (dir.id)}
        <li>
            <a href="{$page.url.pathname}/{name}">
                <svg
                    viewBox="0 0 141 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    class=""
                >
                    <path
                        d="M0 15.5273C0 7.15264 6.78899 0.363647 15.1636 0.363647H35.9094C39.3671 0.363647 42.7035 1.63836 45.2803 3.94395V3.94395C47.8571 6.24955 51.1935 7.52425 54.6512 7.52425H123.836C132.211 7.52425 139 14.3132 139 22.6879V23.9515C139 32.3262 132.211 39.1152 123.836 39.1152H15.1636C6.78899 39.1152 0 32.3262 0 23.9515V15.5273Z"
                        fill="url(#paint0_linear_13_627)"
                    />
                    <path
                        d="M0 29.8485C0 23.8001 4.90316 18.897 10.9515 18.897H128.048C134.097 18.897 139 23.8001 139 29.8485V94.7152C139 103.09 132.211 109.879 123.836 109.879H15.1636C6.78899 109.879 0 103.09 0 94.7152V29.8485Z"
                        fill="url(#paint1_linear_13_627)"
                    />
                    <line
                        x1="0.424076"
                        y1="97.8758"
                        x2="139.002"
                        y2="98.1576"
                        stroke="black"
                        stroke-opacity="0.13"
                        stroke-width="1.68485"
                    />
                    <line
                        x1="0.582788"
                        y1="99.2818"
                        x2="140.005"
                        y2="100"
                        stroke="white"
                        stroke-opacity="0.03"
                        stroke-width="2"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_13_627"
                            x1="69.5"
                            y1="0.363647"
                            x2="69.5"
                            y2="39.1152"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#2D82E7" />
                            <stop offset="1" stop-color="#083258" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_13_627"
                            x1="69.5"
                            y1="18.897"
                            x2="69.5"
                            y2="109.879"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#319DCB" />
                            <stop offset="1" stop-color="#264BA8" />
                        </linearGradient>
                    </defs>
                </svg>
                <p class="body2">{name}</p>
            </a>
        </li>
    {/each}

    {#each Object.entries($notes) as [name, note] (note.id)}
        <li>
            <a href="{$page.url.pathname}/{name}/edit">
                <svg viewBox="0 0 247 312" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1_20)">
                        <path
                            d="M221.988 72.0685C227.407 77.4872 230.451 84.8366 230.451 92.5V271.715C230.451 287.673 217.515 300.609 201.557 300.609H35.8945C19.9365 300.609 7 287.673 7 271.715L7.00001 40.5584C7.00001 24.6004 19.9366 11.6638 35.8946 11.6638L147.068 10.537C154.732 10.537 162.081 13.5812 167.5 19L221.988 72.0685Z"
                            fill="url(#paint0_linear_1_20)"
                        />
                        <path
                            d="M221.988 72.0685C227.407 77.4872 230.451 84.8366 230.451 92.5V271.715C230.451 287.673 217.515 300.609 201.557 300.609H35.8945C19.9365 300.609 7 287.673 7 271.715L7.00001 40.5584C7.00001 24.6004 19.9366 11.6638 35.8946 11.6638L147.068 10.537C154.732 10.537 162.081 13.5812 167.5 19L221.988 72.0685Z"
                            fill="url(#paint1_linear_1_20)"
                            fill-opacity="0.2"
                        />
                        <path
                            d="M221.988 72.0685C227.407 77.4872 230.451 84.8366 230.451 92.5V271.715C230.451 287.673 217.515 300.609 201.557 300.609H35.8945C19.9365 300.609 7 287.673 7 271.715L7.00001 40.5584C7.00001 24.6004 19.9366 11.6638 35.8946 11.6638L147.068 10.537C154.732 10.537 162.081 13.5812 167.5 19L221.988 72.0685Z"
                            stroke="url(#paint2_radial_1_20)"
                            stroke-width="5"
                        />
                    </g>
                    <g filter="url(#filter1_d_1_20)">
                        <path
                            d="M152 55.6936V9C159.404 10.2017 166.255 13.666 171.611 18.9172L197.516 44.3145L223.505 69.7941C228.757 74.9427 231.954 81.8272 232.5 89.1613H185.468C166.984 89.1613 152 74.1773 152 55.6936Z"
                            fill="url(#paint3_linear_1_20)"
                        />
                        <path
                            d="M153.5 55.6936V10.8087C159.929 12.1906 165.848 15.368 170.561 19.9883L196.466 45.3856L222.455 70.8652C227.06 75.3797 230.003 81.2983 230.839 87.6613H185.468C167.812 87.6613 153.5 73.3489 153.5 55.6936Z"
                            stroke="url(#paint4_radial_1_20)"
                            stroke-width="3"
                        />
                    </g>
                    <g filter="url(#filter2_d_1_20)">
                        <path
                            d="M152 55.6936V9C159.404 10.2017 166.255 13.666 171.611 18.9172L197.516 44.3145L223.505 69.7941C228.757 74.9427 231.954 81.8272 232.5 89.1613H185.468C166.984 89.1613 152 74.1773 152 55.6936Z"
                            fill="url(#paint5_linear_1_20)"
                        />
                        <path
                            d="M153.5 55.6936V10.8087C159.929 12.1906 165.848 15.368 170.561 19.9883L196.466 45.3856L222.455 70.8652C227.06 75.3797 230.003 81.2983 230.839 87.6613H185.468C167.812 87.6613 153.5 73.3489 153.5 55.6936Z"
                            stroke="url(#paint6_radial_1_20)"
                            stroke-width="3"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_1_20"
                            x="0.5"
                            y="8.03699"
                            width="236.451"
                            height="303.072"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20" result="shape" />
                        </filter>
                        <filter
                            id="filter1_d_1_20"
                            x="128"
                            y="0"
                            width="118.5"
                            height="118.161"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="-5" dy="10" />
                            <feGaussianBlur stdDeviation="9.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20" result="shape" />
                        </filter>
                        <filter
                            id="filter2_d_1_20"
                            x="128"
                            y="0"
                            width="118.5"
                            height="118.161"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="-5" dy="10" />
                            <feGaussianBlur stdDeviation="9.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20" result="shape" />
                        </filter>
                        <linearGradient
                            id="paint0_linear_1_20"
                            x1="119"
                            y1="249"
                            x2="119"
                            y2="301"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#252633" />
                            <stop offset="1" stop-color="#20212A" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_1_20"
                            x1="25.5"
                            y1="28.5"
                            x2="201"
                            y2="80"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#36364F" />
                            <stop offset="1" stop-opacity="0" />
                        </linearGradient>
                        <radialGradient
                            id="paint2_radial_1_20"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(83 109) rotate(81.8057) scale(252.579 194.569)"
                        >
                            <stop stop-color="#4A496B" />
                            <stop offset="0.75" stop-color="#20212D" />
                        </radialGradient>
                        <linearGradient
                            id="paint3_linear_1_20"
                            x1="206.045"
                            y1="37.6468"
                            x2="152.845"
                            y2="80.9321"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#313347" />
                            <stop offset="1" stop-color="#20222F" />
                        </linearGradient>
                        <radialGradient
                            id="paint4_radial_1_20"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(138.5 72.5) rotate(-22.0564) scale(62.58 62.8444)"
                        >
                            <stop stop-color="#464967" />
                            <stop offset="1" stop-opacity="0" />
                        </radialGradient>
                        <linearGradient
                            id="paint5_linear_1_20"
                            x1="206.045"
                            y1="37.6468"
                            x2="152.845"
                            y2="80.9321"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#313347" />
                            <stop offset="1" stop-color="#20222F" />
                        </linearGradient>
                        <radialGradient
                            id="paint6_radial_1_20"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(138.5 72.5) rotate(-22.0564) scale(62.58 62.8444)"
                        >
                            <stop stop-color="#464967" />
                            <stop offset="1" stop-opacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
                <p class="body2">{name}</p>
            </a>
        </li>
    {/each}
</ol>

<style>
    ol {
        all: unset;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
    }

    li {
        all: unset;
        display: block;
    }

    a {
        all: unset;
        width: 96px;
        max-height: 180px;

        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    a:hover {
        cursor: pointer;
    }

    svg {
        transition: transform 0.2s ease-in-out, background 0.2s ease-in-out;
    }

    a:active svg {
        transform: scale(0.95);
    }

    a:focus svg {
        background: var(--blue6);
    }

    svg {
        border-radius: 18px;

        padding-left: 13px;
        padding-right: 13px;

        min-width: 70px;
        height: 96px;
    }

    p {
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>
