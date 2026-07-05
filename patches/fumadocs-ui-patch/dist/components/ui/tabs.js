'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, use, useCallback, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import * as Primitive from '@radix-ui/react-tabs';
import { mergeRefs } from '@fumadocs/ui/merge-refs';
const listeners = new Map();
const TabsContext = createContext(null);
function useTabContext() {
    const ctx = use(TabsContext);
    if (!ctx)
        throw new Error('You must wrap your component in <Tabs>');
    return ctx;
}
export const TabsList = Primitive.TabsList;
export const TabsTrigger = Primitive.TabsTrigger;
export function Tabs({ ref, groupId, persist = false, updateAnchor = false, defaultValue, value: _value, onValueChange: _onValueChange, ...props }) {
    const tabsRef = useRef(null);
    const valueToIdMap = useMemo(() => new Map(), []);
    const onValueChangeRef = useRef(_onValueChange);
    onValueChangeRef.current = _onValueChange;
    const stableOnValueChange = useCallback((v) => onValueChangeRef.current?.(v), []);
    const [value, setValue] = _value === undefined
        ? // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
            useState(defaultValue)
        : // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
            [_value, stableOnValueChange];
    useLayoutEffect(() => {
        if (!groupId)
            return;
        let previous = sessionStorage.getItem(groupId);
        if (persist)
            previous ?? (previous = localStorage.getItem(groupId));
        if (previous)
            setValue(previous);
        const groupListeners = listeners.get(groupId) ?? new Set();
        groupListeners.add(setValue);
        listeners.set(groupId, groupListeners);
        return () => {
            groupListeners.delete(setValue);
        };
    }, [groupId, persist, setValue]);
    useLayoutEffect(() => {
        const hash = window.location.hash.slice(1);
        if (!hash)
            return;
        for (const [value, id] of valueToIdMap.entries()) {
            if (id === hash) {
                setValue(value);
                tabsRef.current?.scrollIntoView();
                break;
            }
        }
    }, [setValue, valueToIdMap]);
    return (_jsx(Primitive.Tabs, { ref: mergeRefs(ref, tabsRef), value: value, onValueChange: (v) => {
            if (updateAnchor) {
                const id = valueToIdMap.get(v);
                if (id) {
                    window.history.replaceState(null, '', `#${id}`);
                }
            }
            if (groupId) {
                const groupListeners = listeners.get(groupId);
                if (groupListeners) {
                    for (const listener of groupListeners)
                        listener(v);
                }
                sessionStorage.setItem(groupId, v);
                if (persist)
                    localStorage.setItem(groupId, v);
            }
            else {
                setValue(v);
            }
        }, ...props, children: _jsx(TabsContext, { value: useMemo(() => ({ valueToIdMap }), [valueToIdMap]), children: props.children }) }));
}
export function TabsContent({ value, ...props }) {
    const { valueToIdMap } = useTabContext();
    if (props.id) {
        valueToIdMap.set(value, props.id);
    }
    return (_jsx(Primitive.TabsContent, { value: value, ...props, children: props.children }));
}
