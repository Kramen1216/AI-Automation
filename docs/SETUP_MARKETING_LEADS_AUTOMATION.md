# Setup: Marketing Leads Automation

## Beginner path for your interview

Use this first:

```text
workflows/marketing-leads-demo-safe.json
```

This version does not need credentials. It receives a website lead, scores it, and returns a business-style handoff that the website displays as cards.

## Business path with real actions

Use this after you are comfortable:

```text
workflows/marketing-leads-business-automation.json
```

This version contains disabled Google Sheets, Gmail, and Slack nodes. In n8n, connect your own credentials, then enable the nodes.

## Google Sheet setup

1. Open Google Sheets.
2. Create a blank sheet named `Leads`.
3. Copy the columns from `templates/marketing-leads-tracker.csv`.
4. In the Google Sheets node, select your spreadsheet and the `Leads` sheet.
5. Connect your Google Sheets credential.
6. Enable the node.

## Cloudflare URL

If your Cloudflare Tunnel gives you:

```text
https://example.trycloudflare.com
```

Your portfolio config should use:

```text
https://example.trycloudflare.com/webhook/marketing-lead-automation
```

## What to say in the interview

"This workflow is for a business that receives marketing leads from ads or a website. The website sends lead details to n8n through a webhook. n8n scores the lead, decides the next action, creates a lead tracker row, prepares a sales alert, and drafts a follow-up email. In production, the app nodes can write to Google Sheets, Gmail, Slack, or a CRM."
