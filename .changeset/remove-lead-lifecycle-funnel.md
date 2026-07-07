---
"@marmoui/ui": major
---

Remove LeadLifecycleFunnel. Use the generic ChartFunnel for conversion funnels — it covers the same shapes without the lead-specific quality-flag coupling. Also in this release: breadcrumb current page is 1rem/text-ink, the PageSection sidebar toggle matches Button padding/radius, global-nav dropdown triggers show a visible open state, and SidebarPanel gets the ChatGPT-style collapsed rail: brand mark swaps to a SidebarSimple expand affordance on hover with a resize cursor, the expanded header is a 60px row (logo + SidebarSimple toggle) aligned with PageSection, and the PageSection/SectionWizard sidebar toggles default off since the affordance lives in the panel.
