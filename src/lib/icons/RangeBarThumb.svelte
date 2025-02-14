<script lang="ts">
  import type { MouseEventHandler, TouchEventHandler } from "svelte/elements";

  let {
    onmousedown,
    ontouchstart,
  }: {
    onmousedown: MouseEventHandler<SVGSVGElement>;
    ontouchstart: TouchEventHandler<SVGSVGElement>;
  } = $props();
</script>

<svg
  role="none"
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 50 50"
  class="text-white absolute top-[35px] -translate-x-1/2 left-1/2 cursor-grab active:cursor-grabbing"
  {onmousedown}
  {ontouchstart}
>
  <g filter="url(#filter0_dd_13461_15308)">
    <circle cx="25" cy="19" r="11" fill="white" />
  </g>
  <defs>
    <filter
      id="filter0_dd_13461_15308"
      x="0"
      y="0"
      width="50"
      height="50"
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
      <feOffset dy="2" />
      <feGaussianBlur stdDeviation="1.5" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_13461_15308"
      />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feMorphology
        radius="4"
        operator="dilate"
        in="SourceAlpha"
        result="effect2_dropShadow_13461_15308"
      />
      <feOffset dy="6" />
      <feGaussianBlur stdDeviation="5" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
      />
      <feBlend
        mode="normal"
        in2="effect1_dropShadow_13461_15308"
        result="effect2_dropShadow_13461_15308"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect2_dropShadow_13461_15308"
        result="shape"
      />
    </filter>
  </defs>
</svg>
