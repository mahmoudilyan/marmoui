import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

function assignRef<T>(ref: PossibleRef<T>, value: T | null) {
	if (typeof ref === 'function') {
		ref(value);
	} else if (ref != null) {
		(ref as React.MutableRefObject<T | null>).current = value;
	}
}

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
	return (node: T | null) => {
		refs.forEach(ref => assignRef(ref, node));
	};
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
	return React.useCallback(composeRefs<T>(...refs), refs);
}
