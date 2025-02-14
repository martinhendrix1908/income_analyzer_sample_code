<script lang="ts">
  import { clsx } from "clsx";

  let {
    onclick,
    children,
    type = "button",
    variant = "black",
    disabled = false,
    outlined = false,
    isLink = false,
    class: customClass = "",
    title = "",
  }: {
    onclick?: (e: Event) => void;
    children: any;
    type?: "button" | "reset" | "submit" | null | undefined;
    variant?: "default" | "primary" | "secondary" | "black" | "blue" | "red";
    disabled?: boolean;
    outlined?: boolean;
    isLink?: boolean;
    class?: string;
    title?: string;
  } = $props();

  let buttonClass = $derived.by(() => {
    return clsx(
      // Common button styles - only apply if not a link
      !isLink && "flex items-center justify-center gap-2 px-4 py-2 rounded",
      // Link styles - only apply hover:underline when not disabled
      isLink && "inline-flex items-center gap-2 p-0",
      isLink && !disabled && "hover:underline",
      // Disabled state - different handling for link vs regular buttons
      disabled && "cursor-not-allowed",
      disabled && isLink && "opacity-50",
      disabled &&
        !isLink &&
        "text-[#A0A0A0] bg-[#E0E0E0] border border-transparent",
      {
        // Default variant
        "bg-white text-[#666666] border border-[#D1D5DB] hover:bg-gray-50 hover:border-[#B0B0B0] active:bg-gray-100":
          variant === "default" && !outlined && !disabled && !isLink,
        "border border-[#D1D5DB] text-[#666666] hover:bg-gray-50":
          variant === "default" && outlined && !disabled && !isLink,
        "text-[#666666]": variant === "default" && isLink,

        // Primary variant
        "bg-[#09814A] text-white border border-transparent hover:border-[#005F35] hover:bg-[#09814A] active:bg-[#005F35] hover:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_2px_6px_2px_rgba(0,0,0,0.15)]":
          variant === "primary" && !outlined && !disabled && !isLink,
        "border border-[#09814A] text-[#09814A] hover:bg-[#F5FFF4]":
          variant === "primary" && outlined && !disabled && !isLink,
        "text-[#09814A]": variant === "primary" && isLink,

        // Black variant
        "bg-[#222222] text-white border border-black rounded shadow-[0px_2px_8px_0px_#00000040]":
          variant === "black" && !outlined && !disabled && !isLink,
        "bg-white text-[#222222] border border-[#222222] hover:bg-[#D9D9D9] shadow-[0px_2px_8px_0px_#00000040]":
          variant === "black" && outlined && !disabled && !isLink,
        "text-[#222222]": variant === "black" && isLink,

        // Blue variant
        "bg-[#007BFF] text-white border border-transparent hover:bg-[#0069D9] active:bg-[#0056B3]":
          variant === "blue" && !outlined && !disabled && !isLink,
        "border border-[#007BFF] text-[#007BFF] hover:text-white hover:bg-[#007BFF]":
          variant === "blue" && outlined && !disabled && !isLink,
        "text-[#007BFF]": variant === "blue" && isLink,

        // Secondary variant
        "bg-[#98C43D] text-[#222222] border border-transparent hover:bg-[#85AD35]":
          variant === "secondary" && !outlined && !disabled && !isLink,
        "border border-[#98C43D] text-[#222222] hover:bg-[#F5FFE5]":
          variant === "secondary" && outlined && !disabled && !isLink,
        "text-[#98C43D]": variant === "secondary" && isLink,

        // Red variant
        "bg-[#BE0027] text-white border border-transparent hover:bg-[#A30020] active:bg-[#A30020]":
          variant === "red" && !outlined && !disabled && !isLink,
        "border border-[#BE0027] text-[#BE0027] hover:bg-[#BE00271A]":
          variant === "red" && outlined && !disabled && !isLink,
        "text-[#BE0027]": variant === "red" && isLink,
      },
      customClass
    );
  });
</script>

<button {onclick} {type} class={buttonClass} {disabled} {title}>
  {@render children()}
</button>
