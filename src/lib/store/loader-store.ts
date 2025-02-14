import { derived, writable } from "svelte/store";

const loading = writable<boolean>(false);
const loadingText = writable<string>("");

export const showLoader = () => {
    loading.set(true);
}
export const hideLoader = () => {
    loading.set(false);
}
export const setLoaderText = (text: string) => {
    loadingText.set(text);
}

export const isLoading = derived(loading, $loading => $loading)
export const loaderText = derived(loadingText, $loadingText => $loadingText)