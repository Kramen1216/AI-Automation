# Interview Script

Use this wording:

> This is a marketing leads automation for a business that gets leads from Facebook Ads, Google Search, or website forms. The problem is that sales teams often copy leads manually into spreadsheets and forget to follow up. My workflow automates the first part of the sales process.

Then show the flow:

```text
Website form -> n8n Webhook -> Lead scoring -> Google Sheets row -> Sales alert -> Follow-up email draft
```

Important honest line:

> For this interview demo, I am running n8n locally using Docker and Cloudflare Tunnel. For production, I would host n8n on a VPS and connect real business credentials.
```
