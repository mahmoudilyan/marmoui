---
'@marmoui/ui': patch
---

Fix DataTable and PageSection polish bugs found in plugin testing:

- PageSection header no longer renders a bottom border.
- DataTable columns-menu button says "Columns" instead of the leftover literal `MdOutlineViewColumn` (same for the fallback column group name).
- DataTable count text shows the actual visible row count instead of `pageSize` ("Showing 0 of 0 subscribers", not "Showing 50 of 0 subscriber") and pluralizes `dataType`.
- DataTable empty state pluralizes correctly for singular `dataType` values ("No subscribers found" / "creating your first subscriber", no more chopped "subscribe").
