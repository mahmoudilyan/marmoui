#!/usr/bin/env sh
# One-time welcome after plugin install (SessionStart). Prints the tier menu
# once, then flags itself done. Claude relays it to the user at session start.
FLAG="${HOME}/.marmo/plugin-welcomed"
[ -f "$FLAG" ] && exit 0
mkdir -p "${HOME}/.marmo" 2>/dev/null
touch "$FLAG" 2>/dev/null

cat <<'EOF'
MARMO UI PLUGIN INSTALLED — relay this to the user verbatim at the start of your first reply, then proceed:

Marmo UI is connected. Pick how you want to use it (you can switch anytime):

  1. Anonymous (current) — full component knowledge, ~100 calls/day. Nothing to do.
  2. Free account — personal token, no daily limit: https://www.marmoui.com/connect
     (or run /mcp → marmo-ui → Authenticate to sign in from the browser)
  3. Pro — your DESIGN.md drives every generated screen + composition patterns:
     https://www.marmoui.com/pricing

Just ask for UI ("Build a billing dashboard with Marmo UI") and it works today.
EOF
exit 0
