# @marmoui/ui

## 2.0.0

### Major Changes

- 45a5eef: Remove LeadLifecycleFunnel. Use the generic ChartFunnel for conversion funnels — it covers the same shapes without the lead-specific quality-flag coupling. Also in this release: breadcrumb current page is 1rem/text-ink, the PageSection sidebar toggle matches Button padding/radius, global-nav dropdown triggers show a visible open state, and SidebarPanel gets the ChatGPT-style collapsed rail: brand mark swaps to a SidebarSimple expand affordance on hover with a resize cursor, the expanded header is a 60px row (logo + SidebarSimple toggle) aligned with PageSection, and the PageSection/SectionWizard sidebar toggles default off since the affordance lives in the panel.

### Minor Changes

- 4b1b13a: DataTable: Notion-style dynamic filters (add/remove rule rows inline, per-row clear, "Add filter" menu) replacing the static filter form — same TableFilter API and state shape. Columns menu is now "Manage columns" with the SquareSplitHorizontal (bold) icon. PageSection sidebar toggle uses the List icon at regular weight on all breakpoints, and the header band is a fixed 60px in every layout variant, matching the Figma spec.
- 8ae2ec4: Standardize the "more options" affordance on DotsThreeOutline (weight="fill") across Pagination, PageSection, Breadcrumbs, DataNav, and DataTableActionBar — replaces the plain DotsThree glyph everywhere.

  Docs: the Profile Dropdown Menu preview was hand-built with unstyled divs (no hover, fake Github row, plain-text Log out). Rebuilt on the real DropdownMenu primitives — Github is now a working DropdownMenuSub with a real submenu, all rows get proper hover/focus states, and Log out uses the actual destructive variant.

  PageSectionWizard header is now a fixed 60px row, matching PageSection.

### Patch Changes

- a0c7606: Add package README so npmjs.com shows install/usage instead of "no README" warning.
- 7727fb2: Fix SelectSearchable and SelectCheckboxSearchable: the search-input magnifying-glass icon overlapped the typed text (hand-rolled absolute icon + manual `pl-8` instead of Input's own `startAdornment`, which reserves the correct space). Both now use `startAdornment`.

## 1.0.2

### Patch Changes

- b1dffbc: Fix DataTable and PageSection polish bugs found in plugin testing:
  - PageSection header no longer renders a bottom border.
  - DataTable columns-menu button says "Columns" instead of the leftover literal `MdOutlineViewColumn` (same for the fallback column group name).
  - DataTable count text shows the actual visible row count instead of `pageSize` ("Showing 0 of 0 subscribers", not "Showing 50 of 0 subscriber") and pluralizes `dataType`.
  - DataTable empty state pluralizes correctly for singular `dataType` values ("No subscribers found" / "creating your first subscriber", no more chopped "subscribe").

## 1.0.1

### Patch Changes

- 16fe28f: Tooltip border uses the border token instead of currentColor (was rendering black); sidebar collapse toggle uses the Phosphor List icon instead of BookOpen; PageSection sticky header border softened to border-muted.

## 1.6.0

### Minor Changes

- 48290ff: Added (Beta):
  1. Charts Compponent
  2. Funnel Chart Component
  3. Leads Life Cycle Component
  4. Widget

## 1.5.1

### Patch Changes

- 3e8144a: Fixing Depency Flating UI

## 1.5.0

### Minor Changes

- 4db0b9a: Added:
  1. Tabs component
  2. Card
     Fixed:
  3. Tabs Trigger space
  4. Card Previews
  5. Removed AvatarCheckbox component doc page
  6. Enhanced mcp to know how to generate the content and wizard

## 1.4.0

### Minor Changes

- 99c1ebe: Added:
  Avatar Checkbox component
  Fixed:
  PageSection & Sidebar IconButton Size
  Main checkbox component in table header to stop sorting

## 1.3.0

### Minor Changes

- ce434c5: New: MonthPicker component added
  DatePicker: Major enhancements (217 lines changed)
  Dialog: Significant updates (145 lines changed)
  Button / ButtonGroup / ButtonVariants: Refactored variants
  Radio / RadioCard: Updated styles and logic
  Tag: Redesigned
  CheckboxCard: Updates
  IconButton: Refactored
  Calendar: Minor fixes
  globals.css: Style token updates

  PS: Matched with Figma

## 1.2.0

### Minor Changes

- 114e515: 1. Border color fixes accorss components 2. Select Searchable Component Added

## 1.1.1

### Patch Changes

- e850e51: 1. Secondary Button small changes, border color changed, background changed and icon 2. Date picker error fixed in Input type trigger 3. Added new tokens for Icon destructive and Icon Primary Color

## 1.1.0

### Minor Changes

- 09b57cf: ## Added
  1. SidebarPanel automatically detects SidebarProvider
  2. useMobile hook, detects if mobile or not
  3. sheet component

  ## Fixes
  - PageSection and PageSectionWizard padding

## 1.0.2

### Patch Changes

- 90d2c69: remove development from exports , keep the output as dist
- 1810c7f: Adding tokens.css to the output

## 1.0.1

### Patch Changes

- 5432cd2: removed mcp-server as pacakge, and removed prepare and postinstall scripts from ui package

## 1.0.0

### Major Changes

- 2a45310: initial release
