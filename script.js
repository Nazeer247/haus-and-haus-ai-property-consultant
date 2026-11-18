const chatMessages=document.getElementById('chatMessages');
const quickReplies=document.getElementById('quickReplies');
const chatForm=document.getElementById('chatForm');
const chatInput=document.getElementById('chatInput');
const progressBar=document.getElementById('progressBar');
const resetChat=document.getElementById('resetChat');
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.desktop-nav');

const steps=[
  {key:'intent',question:'Are you looking to buy, rent, or explore an investment?',options:['Buy','Rent','Invest']},
  {key:'area',question:'Which Dubai areas interest you? You can name one or more, or say “not sure yet”.',options:['Dubai Marina','Downtown Dubai','Palm Jumeirah','Not sure yet']},
  {key:'budget',question:'What budget range should I keep in mind? A range is absolutely fine.',options:['Under AED 1M','AED 1M–2M','AED 2M–5M','AED 5M+','Still exploring']},
  {key:'bedrooms',question:'How many bedrooms would suit your plans?',options:['Studio','1 bedroom','2 bedrooms','3 bedrooms','4+ bedrooms','Flexible']},
  {key:'type',question:'What kind of property are you most interested in?',options:['Apartment','Villa / townhouse','Penthouse','Open to suggestions']},
  {key:'timing',question:'When would you ideally like to make your move?',options:['As soon as possible','Within 1–3 months','Within 3–6 months','Just researching']},
  {key:'name',question:'What should I call you? (You can use a first name or skip this.)',options:['Skip']},
  {key:'contact',question:'How would you prefer the team to follow up? This demo does not send or store your details. You can type an email or phone number, or skip.',options:['Skip']}
];
let currentStep=0;
let answers={};

function addMessage(text,who='assistant'){
  const wrap=document.createElement('div');
  wrap.className='message '+who;
  const bubble=document.createElement('div');
  bubble.className='bubble';
  bubble.textContent=text;
  const time=document.createElement('span');
  time.className='message-time';
  time.textContent=who==='user'?'YOU':'PROPERTY CONSULTANT · DEMO';
  wrap.append(bubble,time);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}
function setProgress(){
  const pct=Math.max(8,Math.round((currentStep/steps.length)*100));
  progressBar.style.width=pct+'%';
}
function showOptions(options){
  quickReplies.innerHTML='';
  options.forEach(option=>{
    const button=document.createElement('button');
    button.type='button';
    button.textContent=option;
    button.dataset.answer=option;
    quickReplies.appendChild(button);
  });
  quickReplies.hidden=false;
}
function askCurrent(){
  if(currentStep>=steps.length){showSummary();return;}
  const step=steps[currentStep];
  addMessage(step.question);
  showOptions(step.options);
  setProgress();
  chatInput.placeholder=step.key==='contact'?'Optional contact detail or type “skip”...':'Type your answer...';
}
function submitAnswer(value){
  const answer=value.trim();
  if(!answer)return;
  addMessage(answer,'user');
  const step=steps[currentStep];
  answers[step.key]=answer;
  currentStep++;
  quickReplies.hidden=true;
  setProgress();
  window.setTimeout(askCurrent,280);
}
function showSummary(){
  progressBar.style.width='100%';
  quickReplies.hidden=true;
  chatInput.disabled=true;
  chatForm.querySelector('button').disabled=true;
  const lines=[
    'PROPERTY SEARCH BRIEF',
    'Intent: '+(answers.intent||'Not specified'),
    'Preferred area: '+(answers.area||'Not specified'),
    'Budget: '+(answers.budget||'Not specified'),
    'Bedrooms: '+(answers.bedrooms||'Not specified'),
    'Property type: '+(answers.type||'Not specified'),
    'Timing: '+(answers.timing||'Not specified'),
    'Name: '+(answers.name||'Not provided'),
    'Preferred follow-up: '+(answers.contact||'Not provided')
  ];
  const summary=lines.join('\n');
  addMessage('Thank you. Your discovery brief is ready. In a live implementation, this could be securely routed to the Haus & Haus team. This demo does not transmit or save your answers.');
  const card=document.createElement('div');
  card.className='message assistant';
  const bubble=document.createElement('div');
  bubble.className='bubble';
  const pre=document.createElement('pre');
  pre.style.cssText='white-space:pre-wrap;font:10px/1.7 "DM Sans",sans-serif;margin:0;color:inherit';
  pre.textContent=summary;
  const copy=document.createElement('button');
  copy.type='button';
  copy.textContent='Copy my brief';
  copy.style.cssText='margin-top:12px;padding:9px 12px;background:#1b281f;color:white;border:0;font:10px "DM Sans",sans-serif;cursor:pointer';
  copy.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(summary);copy.textContent='Copied';}
    catch(e){copy.textContent='Select and copy the brief';}
  });
  bubble.append(pre,copy);card.appendChild(bubble);chatMessages.appendChild(card);
  const restart=document.createElement('button');
  restart.type='button';restart.textContent='Start a new search';restart.className='restart-button';
  restart.style.cssText='align-self:flex-start;margin:0 22px 15px;padding:9px 12px;border:1px solid #c7b28d;background:transparent;color:#4b574c;font:10px "DM Sans",sans-serif;cursor:pointer';
  restart.addEventListener('click',resetConversation);
  chatMessages.appendChild(restart);
  chatMessages.scrollTop=chatMessages.scrollHeight;
  chatInput.placeholder='Discovery complete';
}
function resetConversation(){
  currentStep=0;answers={};chatMessages.innerHTML='';
  chatInput.disabled=false;chatForm.querySelector('button').disabled=false;
  chatInput.value='';quickReplies.hidden=false;
  addMessage('Welcome back. Let’s shape a fresh Dubai property search. Are you looking to buy, rent, or explore an investment?');
  showOptions(steps[0].options);setProgress();
  chatInput.placeholder='Type your answer...';
}
quickReplies.addEventListener('click',event=>{
  const button=event.target.closest('button[data-answer]');
  if(button)submitAnswer(button.dataset.answer);
});
chatForm.addEventListener('submit',event=>{
  event.preventDefault();
  const value=chatInput.value;
  chatInput.value='';
  if(currentStep<steps.length)submitAnswer(value);
});
resetChat.addEventListener('click',resetConversation);
if(menuToggle&&nav){
  menuToggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('mobile-open')));
}
showOptions(steps[0].options);
setProgress();