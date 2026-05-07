# Marketing Leads Automation Portfolio Project

This is a business-applied n8n portfolio project for a marketing leads automation use case.

Instead of only showing output text, the workflow demonstrates business actions:

1. Capture a marketing lead from a website form.
2. Score and qualify the lead.
3. Save the lead to a Google Sheets lead tracker.
4. Prepare or send a sales notification.
5. Generate a follow-up email draft.

## Start here

1. Open `index.html` to view the portfolio demo.
2. Import `workflows/marketing-leads-demo-safe.json` into n8n first.
3. Publish the workflow.
4. Start Cloudflare Tunnel.
5. Put your tunnel URL in `assets/js/config.js`.

Example:

```js
n8nMarketingLeadWebhookUrl: "https://your-link.trycloudflare.com/webhook/marketing-lead-automation"
```

Use `workflows/marketing-leads-business-automation.json` when you are ready to connect real Google Sheets, Gmail, or Slack credentials.
