const cfg = window.PORTFOLIO_CONFIG || {};
const $ = (s, scope=document) => scope.querySelector(s);
const $$ = (s, scope=document) => Array.from(scope.querySelectorAll(s));

function initConfig(){
  $$('[data-name]').forEach(el => el.textContent = cfg.name || 'Your Name');
  const email=$('[data-email]'); if(email){ email.href=`mailto:${cfg.email||'you@example.com'}`; email.textContent=cfg.email||'you@example.com'; }
  const gh=$('[data-github]'); if(gh && cfg.github) gh.href=cfg.github;
  const li=$('[data-linkedin]'); if(li && cfg.linkedin) li.href=cfg.linkedin;
}

function qualifyLead(payload){
  const interest = `${payload.interest||''}`.toLowerCase();
  const budget = payload.budget || 'unknown';
  const timeline = payload.timeline || 'unknown';
  const companySize = payload.company_size || 'unknown';
  const pain = `${payload.pain||''}`.toLowerCase();
  let score = 20;
  if(['500-2000','2000+'].includes(companySize)) score += 18;
  if(['this-week','this-month'].includes(timeline)) score += 20;
  if(['1000-3000','3000+'].includes(budget)) score += 18;
  ['lead','ads','facebook','meta','google ads','crm','email','follow up','follow-up','sales','website'].forEach(k=>{ if(pain.includes(k) || interest.includes(k)) score += 4; });
  score = Math.min(score, 100);
  const tier = score >= 80 ? 'Hot lead' : score >= 55 ? 'Warm lead' : 'Nurture lead';
  const owner = score >= 80 ? 'Sales closer' : score >= 55 ? 'Sales development rep' : 'Marketing nurture list';
  const stage = score >= 80 ? 'Book discovery call today' : score >= 55 ? 'Send qualification email' : 'Add to weekly nurture campaign';
  const first = (payload.full_name || 'there').split(' ')[0];
  return {
    status:'success',
    workflow:'Marketing Leads Automation',
    lead:{
      full_name:payload.full_name, company:payload.company, email:payload.email, phone:payload.phone,
      source:payload.source, interest:payload.interest, company_size:companySize, budget, timeline, pain:payload.pain
    },
    qualification:{score,tier,owner,stage},
    business_actions:[
      `Add lead to Google Sheet: ${tier}, score ${score}`,
      `Create CRM task for ${owner}`,
      score >= 80 ? 'Send instant sales alert to Slack/email' : 'Add lead to nurture/follow-up queue',
      'Generate personalized follow-up email'
    ],
    sheet_row:{
      created_at:new Date().toISOString(), name:payload.full_name, company:payload.company, email:payload.email,
      phone:payload.phone, source:payload.source, interest:payload.interest, score, tier, owner, next_action:stage
    },
    sales_notification:`New ${tier}: ${payload.full_name} from ${payload.company}\nScore: ${score}/100\nInterest: ${payload.interest}\nSource: ${payload.source}\nNext action: ${stage}\nPain point: ${payload.pain}`,
    follow_up_email:{
      subject:`Thanks for your interest in marketing automation, ${first}`,
      body:`Hi ${first},\n\nThanks for reaching out about ${payload.interest}. Based on what you shared, the best next step is: ${stage}.\n\nI can help build an automation that captures leads, scores them, saves them to a tracker, and notifies the sales team so follow-ups do not get missed.\n\nBest,\n${cfg.name || 'Your Name'}`
    }
  };
}

function renderBusinessResult(data){
  const container = $('#businessResult');
  if(!container) return;
  if(data.status === 'running'){
    container.innerHTML = `<div class="email-box">Running automation...</div>`;
    return;
  }
  if(data.status === 'error'){
    container.innerHTML = `<div class="email-box">Error: ${escapeHtml(data.message || 'Something went wrong')}\n\nCheck Docker, n8n, Cloudflare Tunnel, published workflow, and config.js.</div>`;
    return;
  }
  const q = data.qualification || data.lead_qualification || {};
  const actions = data.business_actions || [];
  const row = data.sheet_row || {};
  const email = data.follow_up_email || {};
  const notice = data.sales_notification || data.admin_notification || '';
  container.innerHTML = `
    <div class="result-top">
      <div class="metric"><strong>${escapeHtml(String(q.score ?? '—'))}</strong><span>Lead score</span></div>
      <div class="metric"><strong>${escapeHtml(q.tier || '—')}</strong><span>Lead tier</span></div>
      <div class="metric"><strong>${escapeHtml(q.owner || '—')}</strong><span>Assigned owner</span></div>
    </div>
    <div class="action-list">
      ${actions.map(a=>`<div class="action-item"><span class="check">✓</span><div>${escapeHtml(a)}</div></div>`).join('')}
    </div>
    <h3>Google Sheet row created</h3>
    <div class="sheet-box">${escapeHtml(JSON.stringify(row, null, 2))}</div>
    <h3>Sales team notification</h3>
    <div class="email-box">${escapeHtml(notice)}</div>
    <h3>Follow-up email draft</h3>
    <div class="email-box"><strong>${escapeHtml(email.subject || '')}</strong>\n\n${escapeHtml(email.body || '')}</div>
  `;
}

function escapeHtml(str){ return String(str).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

async function runAutomation(payload){
  const url = (cfg.n8nMarketingLeadWebhookUrl || '').trim();
  if(!url){
    await new Promise(r=>setTimeout(r,350));
    return {...qualifyLead(payload), mode:'local business simulation'};
  }
  const res = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,source_system:'portfolio_website',submitted_at:new Date().toISOString()})});
  const text = await res.text();
  let data = {}; try{data = text ? JSON.parse(text) : {}; }catch{data={message:text};}
  if(!res.ok) throw new Error(data.message || `Webhook returned ${res.status}`);
  return data;
}

function initForm(){
  const form = $('#leadForm'); if(!form) return;
  const button = $('#submitLead');
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    button.disabled = true; button.textContent = 'Sending lead into automation...';
    renderBusinessResult({status:'running'});
    try{ renderBusinessResult(await runAutomation(payload)); }
    catch(err){ renderBusinessResult({status:'error',message:err.message}); }
    finally{ button.disabled = false; button.textContent = 'Submit marketing lead'; }
  });
}

initConfig();
initForm();
