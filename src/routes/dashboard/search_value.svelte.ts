let searchValue = $state("");

function set(searchTerm: string) {
	searchValue = searchTerm;
}

export function getSearchValue() {
	return {
		get search() {
			return searchValue;
		},
		set
	};
}