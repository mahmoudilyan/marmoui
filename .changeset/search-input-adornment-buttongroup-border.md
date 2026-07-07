---
"@marmoui/ui": patch
---

Fix SelectSearchable and SelectCheckboxSearchable: the search-input magnifying-glass icon overlapped the typed text (hand-rolled absolute icon + manual `pl-8` instead of Input's own `startAdornment`, which reserves the correct space). Both now use `startAdornment`.
