<script lang="ts">
  let { fillColor = "#262626" }: { fillColor?: string } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="21"
  height="21"
  viewBox="0 0 21 21"
  fill="none"
>
  <mask
    id="mask0_5723_4727"
    style="mask-type:alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="21"
    height="21"
  >
    <rect width="21" height="21" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_5723_4727)">
    <path
      d="M6.125 18.375C5.64375 18.375 5.23177 18.2036 4.88906 17.8609C4.54635 17.5182 4.375 17.1062 4.375 16.625V5.25H3.5V3.5H7.875V2.625H13.125V3.5H17.5V5.25H16.625V16.625C16.625 17.1062 16.4536 17.5182 16.1109 17.8609C15.7682 18.2036 15.3562 18.375 14.875 18.375H6.125ZM14.875 5.25H6.125V16.625H14.875V5.25ZM7.875 14.875H9.625V7H7.875V14.875ZM11.375 14.875H13.125V7H11.375V14.875Z"
      fill={fillColor}
    />
  </g>
</svg>
