# Marketing Leads Automation Portfolio

This is a portfolio project built by Stephen Matthew Malabanan for an AI Automation Engineer role.

## Project Overview

This project demonstrates a business automation workflow for handling marketing leads.

The workflow captures a lead from a website form, sends the data to n8n through a webhook, qualifies the lead, saves the lead to Google Sheets, and sends a Gmail follow-up email.

## Business Problem

Many small businesses receive leads from Facebook Ads, Google Search, referrals, or website forms. These leads are often manually copied into spreadsheets, and follow-ups can be delayed or missed.

## Solution

The automation handles the process end-to-end:

1. Website form captures the lead.
2. n8n receives the lead through a Webhook node.
3. A Code node qualifies the lead.
4. Google Sheets stores the lead record.
5. Gmail sends a follow-up email.
6. The website receives a response from n8n.

## Tools Used

- n8n
- Docker Desktop
- Cloudflare Tunnel
- Google Sheets
- Gmail
- JavaScript
- HTML, CSS, and JavaScript
- Webhooks

## Workflow Architecture

Website Form  
→ n8n Webhook  
→ Lead Qualification Logic  
→ Prepare Lead Row  
→ Google Sheets  
→ Gmail  
→ Respond to Website

## Demo Notes

For the live demo, n8n is self-hosted locally using Docker Desktop and exposed through Cloudflare Tunnel.

For production, this setup can be moved to a VPS with a permanent domain.

## Files

- `index.html` - portfolio website
- `assets/css/styles.css` - website styling
- `assets/js/app.js` - website form and webhook logic
- `assets/js/config.js` - webhook configuration
- `workflows/marketing-leads-business-automation.json` - n8n workflow export

## Important Security Note

This repository does not include private credentials, OAuth secrets, Gmail tokens, or Google API secrets.
