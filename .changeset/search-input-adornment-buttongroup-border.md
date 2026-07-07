---
"@marmoui/ui": patch
---

Fix SelectSearchable and SelectCheckboxSearchable: the search-input magnifying-glass icon overlapped the typed text (hand-rolled absolute icon + manual `pl-8` instead of Input's own `startAdornment`, which reserves the correct space). Both now use `startAdornment`.

Fix ButtonGroup: the attached/segmented outer border depended entirely on each child's own border rendering, so it read as "only visible on the active button." The group now owns a persistent outer border + rounded corners independent of any child's hover/focus/active state.
