---
"@marmoui/ui": minor
---

Standardize the "more options" affordance on DotsThreeOutline (weight="fill") across Pagination, PageSection, Breadcrumbs, DataNav, and DataTableActionBar — replaces the plain DotsThree glyph everywhere.

Docs: the Profile Dropdown Menu preview was hand-built with unstyled divs (no hover, fake Github row, plain-text Log out). Rebuilt on the real DropdownMenu primitives — Github is now a working DropdownMenuSub with a real submenu, all rows get proper hover/focus states, and Log out uses the actual destructive variant.

PageSectionWizard header is now a fixed 60px row, matching PageSection.
