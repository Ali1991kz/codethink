const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const CONFIG = window.CODE_THINK_CONFIG || {};
const TOKEN_KEY = 'codeThinkSessionToken';
const USER_KEY = 'codeThinkSessionUser';

const diagnostics = {
  7: [
    { title: 'Мәселені түсіну', prompt: 'Мектеп асханасында тапсырыс сомасы 3000 теңгеден кем емес болса, 10% жеңілдік беріледі. Программа тапсырыс сомасын қабылдап, төленетін соңғы соманы көрсетуі керек. Кіріс дерегін, тексерілетін шартты және шығыс нәтижесін жазыңыз.' },
    { title: 'Деректер мен шарттарды реттеу', prompt: 'Робототехника үйірмесіне 12–14 жастағы және медициналық рұқсаты бар оқушы қатыса алады. Қажетті деректерді атап, күрделі шартты сөзбен жазыңыз.' },
    { title: 'Әрекеттердің ретін құру', prompt: 'Программа input.txt файлынан екі бүтін санды оқып, үлкенін output.txt файлына жазуы керек. Әрекеттерді 1-ден 7-ге дейін дұрыс ретпен нөмірлеңіз: нәтижені жазу; екі санды оқу; output.txt файлын ашу; input.txt файлын ашу; сандарды салыстыру; input.txt файлын жабу; output.txt файлын жабу.' },
    { title: 'Тармақталған алгоритмді кодтау', prompt: 'score бүтін саны енгізіледі. Егер score 10-нан кем болмаса, «Өтті», әйтпесе «Қайта орында» мәтінін шығаратын Python кодын жазыңыз.', code: '# Python кодын төмендегі жауап өрісіне жазыңыз' },
    { title: 'Алгоритм трассировкасы', prompt: 'Код екі рет орындалады: біріншіде x = 12, екіншіде x = -3. Әр жағдайда экранға не шығатынын және қандай шарттар тексерілетінін жазыңыз.', code: 'x = int(input())\nif x > 0:\n    if x % 2 == 0:\n        print("A")\n    else:\n        print("B")\nelse:\n    print("C")' },
    { title: 'Қатені табу және түзету', prompt: 'Кодта кемінде үш қате бар. Қателерді атап, кодтың дұрыс нұсқасын жазыңыз.', code: 'age = int(input())\nif age =< 12\nprint("Жеңілдік")\nelse:\n    print("Толық баға")' },
    { title: 'Шешімді түсіндіру және жаңа жағдайда қолдану', prompt: 'Кітапты кешіктірмесе айыппұл 0 теңге; 1–5 күн кешіксе 100 теңге; 5 күннен артық кешіксе 200 теңге. Шешу алгоритмін сөзбен жазыңыз, кірістірілген шарттардың ретін көрсетіңіз және неге дәл осы рет тиімді екенін түсіндіріңіз.' }
  ],
  8: [
    { title: 'Мәселені түсіну', prompt: 'Мектеп ауласына n қатар гүл отырғызылады, әр қатарға 6 гүлден орналастырылады. Программа әр қатардан кейін отырғызылған гүлдердің жалпы санын көрсетуі керек. Кіріс дерегін, қайталанатын әрекетті және соңғы нәтижені жазыңыз.' },
    { title: 'Цикл параметрлерін реттеу', prompt: 'range(2, 12, 2) өрнегі үшін циклдің бастапқы мәнін, тоқтау шегін, қадамын және алынатын мәндерді жазыңыз.' },
    { title: 'Алгоритм ретін құру', prompt: '1-ден n-ге дейінгі бүтін сандардың қосындысын табу үшін әрекеттерді дұрыс ретпен жазыңыз: n енгізу; s = 0 орнату; i = 1 орнату; i ≤ n шартын тексеру; s = s + i орындау; i мәнін 1-ге арттыру; s нәтижесін шығару.' },
    { title: 'while циклін қолданып кодтау', prompt: 'n бүтін саны енгізіледі. 1-ден n-ге дейінгі жұп сандарды экранға шығаратын while циклі бар Python кодын жазыңыз.', code: '# Python кодын төмендегі жауап өрісіне жазыңыз' },
    { title: 'Алгоритм трассировкасы', prompt: 'Әр қадамдағы i және s мәндерін көрсетіп, программа соңында экранға шығатын нәтижені жазыңыз.', code: 's = 0\nfor i in range(1, 8):\n    if i == 3:\n        continue\n    if i == 7:\n        break\n    s = s + i\nprint(s)' },
    { title: 'Қатені табу және түзету', prompt: 'Бұл программа 5-тен 1-ге дейінгі сандарды шығаруы керек, бірақ шексіз орындалады. Себебін түсіндіріп, кодты түзетіңіз.', code: 'n = 5\nwhile n > 0:\n    print(n)\nn = n - 1' },
    { title: 'Циклді таңдау және білімді көшіру', prompt: 'Пайдаланушы 0 санын енгізгенге дейін сандар енгізеді. Программа енгізілген оң сандардың санын есептейді. Бұл есепке for немесе while циклінің қайсысы қолайлы? Таңдауыңызды түсіндіріп, сөздік алгоритм немесе Python кодының негізгі бөлігін жазыңыз.' }
  ]
};

const finalDiagnostics = {
  7: [
    { title: 'Мәселені түсіну', prompt: 'Мектеп дүкенінде сатып алу сомасы 5000 теңгеден асса, 15% жеңілдік беріледі. Программа соңғы төлемді көрсетуі керек. Кіріс дерегін, шартты және шығыс нәтижесін жазыңыз.' },
    { title: 'Деректер мен шарттарды реттеу', prompt: 'Экскурсияға 7–8 сыныпта оқитын және ата-анасының рұқсаты бар оқушы қатыса алады. Қажетті деректерді және күрделі шартты сөзбен жазыңыз.' },
    { title: 'Әрекеттердің ретін құру', prompt: 'Программа data.txt файлынан үш санды оқып, олардың орташа мәнін result.txt файлына жазады. Файлдарды ашу, оқу, есептеу, жазу және жабу әрекеттерін дұрыс ретпен жазыңыз.' },
    { title: 'Тармақталған алгоритмді кодтау', prompt: 'temperature саны енгізіледі. Егер температура 0-ден төмен болса «Аяз», әйтпесе «Жылы» мәтінін шығаратын Python кодын жазыңыз.', code: '# Python кодын төмендегі жауап өрісіне жазыңыз' },
    { title: 'Алгоритм трассировкасы', prompt: 'Код x = 7 және x = 14 мәндерімен орындалады. Әр жағдайда нәтижені және тексерілген шарттарды жазыңыз.', code: 'x = int(input())\nif x >= 10:\n    if x % 2 == 0:\n        print("X")\n    else:\n        print("Y")\nelse:\n    print("Z")' },
    { title: 'Қатені табу және түзету', prompt: 'Кодтағы кемінде үш қатені атап, дұрыс нұсқасын жазыңыз.', code: 'number = int(input())\nif number > 0\n    print("Оң")\nelse\nprint("Оң емес")' },
    { title: 'Шешімді түсіндіру және жаңа жағдайда қолдану', prompt: 'Билет бағасы: 7 жасқа дейін тегін, 7–15 жас аралығы 500 теңге, 15 жастан жоғары 1000 теңге. Алгоритмді түсіндіріп, шарттардың ретін негіздеңіз және басқа ұқсас жағдаят ұсыныңыз.' }
  ],
  8: [
    { title: 'Мәселені түсіну', prompt: 'Оқушы n апта бойы әр аптада 5000 теңгеден жинайды. Программа әр аптадан кейін жиналған жалпы соманы көрсетуі керек. Кіріс дерегін, қайталанатын әрекетті және нәтижені жазыңыз.' },
    { title: 'Цикл параметрлерін реттеу', prompt: 'range(10, 0, -2) өрнегінің бастапқы мәнін, тоқтау шегін, қадамын және алынатын мәндерді жазыңыз.' },
    { title: 'Алгоритм ретін құру', prompt: '1-ден n-ге дейінгі сандардың көбейтіндісін табу алгоритмін дұрыс ретпен жазыңыз: n енгізу, нәтиже айнымалысын дайындау, цикл құру, көбейту, нәтижені шығару.' },
    { title: 'for циклін қолданып кодтау', prompt: 'n бүтін саны енгізіледі. 1-ден n-ге дейінгі 3-ке бөлінетін сандарды шығаратын for циклі бар Python кодын жазыңыз.', code: '# Python кодын төмендегі жауап өрісіне жазыңыз' },
    { title: 'Алгоритм трассировкасы', prompt: 'Әр қадамдағы i және total мәндерін көрсетіп, соңғы нәтижені жазыңыз.', code: 'total = 0\nfor i in range(2, 9):\n    if i == 4:\n        continue\n    if i == 8:\n        break\n    total += i\nprint(total)' },
    { title: 'Қатені табу және түзету', prompt: 'Программа 1-ден 5-ке дейінгі сандарды шығаруы керек, бірақ шексіз орындалады. Себебін түсіндіріп, түзетіңіз.', code: 'n = 1\nwhile n <= 5:\n    print(n)\n    n = n - 1' },
    { title: 'Циклді таңдау және білімді көшіру', prompt: 'Пайдаланушы -1 енгізгенге дейін бағалар енгізеді. Программа бағалардың орташа мәнін есептейді. Қай цикл қолайлы екенін негіздеп, алгоритмнің негізгі бөлігін жазыңыз.' }
  ]
};

function diagnosticTasks(grade, type = state.activeDiagnosticType) { return (type === 'final' ? finalDiagnostics : diagnostics)[grade]; }

const methodSteps = [
  { code: 'C', short: '1', title: 'Түсін', english: 'Challenge', help: 'Жағдаяттың мәнін және күтілетін нәтижені өз сөзіңмен түсіндір.', placeholder: 'Мәселе тұжырымы: нені шешу қажет?' },
  { code: 'OD', short: '2', title: 'Жоспарла', english: 'Organize + Design', help: 'Кіріс пен шығысты анықтап, шешу алгоритмін ретімен құр.', placeholder: 'Кіріс: ... Шығыс: ... Алгоритм: ...' },
  { code: 'E', short: '3', title: 'Кодта', english: 'Execute', help: 'Құрған алгоритмді Python кодына айналдырып, іске қос.', placeholder: 'Python коды және орындалу нәтижесі' },
  { code: 'TH', short: '4', title: 'Тексер', english: 'Trace + Hunt', help: 'Айнымалыларды қадамдап бақыла, тест жүргіз және қатенің себебін анықта.', placeholder: 'Тест: ... Қадамдар: ... Қате және түзету: ...' },
  { code: 'INK', short: '5', title: 'Түсіндір және қолдан', english: 'Improve + Narrate + Know', help: 'Шешімді жақсарт, дұрыстығын түсіндір және тәсілді жаңа жағдайға қолдан.', placeholder: 'Неге жұмыс істейді? Қалай жақсарттың? Қайда қолдануға болады?' }
];
const scenarios = {
  7: 'Оқушының жасы енгізіледі. Егер жасы 12–14 аралығында болса, «Қатыса алады», әйтпесе «Қатыса алмайды» деп шығаратын программа құрастыр.',
  8: 'n саны енгізіледі. 1-ден n-ге дейінгі 3-ке бөлінетін сандардың қосындысын есептейтін программа құрастыр.'
};

const state = {
  token: localStorage.getItem(TOKEN_KEY) || '',
  user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  myData: { attempts: [], method: [], skills: [] }, teacherData: { attempts: [], users: [] },
  workspace: { assignments: [], classes: [] }, teacherWorkspace: { classes: [], tasks: [], assignments: [] },
  attempt: null, answers: Array(7).fill(''), methodAnswers: Array(5).fill(''), switches: 0,
  activeDiagnosticType: 'baseline', diagnosticProfiles: [], finalDiagnosticOpen: false
};
const skillLabels = { understanding: 'Мәселені түсіну', organization: 'Деректерді ұйымдастыру', algorithm: 'Алгоритм құру', coding: 'Кодтау', debugging: 'Debugging', explanation: 'Түсіндіру', transfer: 'Жаңа жағдайға қолдану' };
let currentTask = 0, currentStep = 0, activeLabStep = 0, activeAssignmentId = '', timerId = null, loadingAttempt = false, pythonWorker = null;

function apiConfigured() { return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(CONFIG.apiUrl || ''); }
async function api(action, data = {}) {
  if (!apiConfigured()) throw new Error('config.js файлына Google Apps Script Web App сілтемесін енгізіңіз.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(CONFIG.apiUrl, { method: 'POST', redirect: 'follow', signal: controller.signal, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action, token: state.token, ...data }) });
    if (!response.ok) throw new Error('Серверге қосылу қатесі: ' + response.status);
    const result = await response.json(); if (!result.ok) throw new Error(result.error || 'Сервер қатесі'); return result.data;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Сервер 30 секунд ішінде жауап бермеді. Қайта көріңіз.');
    throw error;
  } finally { clearTimeout(timeout); }
}
function setSession(data) { state.token = data.token; state.user = data.user; localStorage.setItem(TOKEN_KEY, state.token); localStorage.setItem(USER_KEY, JSON.stringify(state.user)); updateGlobalUI(); }
async function changeTemporaryPasswordIfNeeded() {
  if (!state.user?.mustChangePassword) return;
  while (state.user?.mustChangePassword) {
    const password = prompt('Бұл уақытша құпиясөз. Жаңа құпиясөз енгізіңіз (кемінде 8 таңба):');
    if (!password) { await clearSession(); throw new Error('Жаңа құпиясөз орнатылмайынша аккаунтқа кіру мүмкін емес.'); }
    try { await api('changePassword', { password }); state.user.mustChangePassword = false; localStorage.setItem(USER_KEY, JSON.stringify(state.user)); toast('Жаңа құпиясөз сақталды'); }
    catch (err) { alert(err.message); }
  }
}
async function clearSession(callServer = true) {
  if (callServer && state.token) { try { await api('logout'); } catch {} }
  stopTimer(); state.token = ''; state.user = null; state.attempt = null; state.myData = { attempts: [], method: [] }; state.teacherData = { attempts: [], users: [] };
  localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); updateGlobalUI();
}
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function toast(message, isError = false) { const el = $('#toast'); el.textContent = message; el.style.background = isError ? 'var(--danger)' : 'var(--green)'; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); }
function setBusy(button, busy, text = 'Күте тұрыңыз...') { if (!button) return; if (!button.dataset.label) button.dataset.label = button.textContent; button.disabled = busy; button.textContent = busy ? text : button.dataset.label; }
function debounce(fn, wait) { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), wait); }; }

function go(route) {
  let target = document.getElementById(route) ? route : 'home';
  if (target === 'teacher' && state.user?.role === 'student') { toast('Мұғалім бөлімі оқушы аккаунтына қолжетімсіз', true); target = 'home'; }
  if (['diagnostic','method','assignments','progress'].includes(target) && state.user?.role === 'teacher') target = 'teacher';
  $$('.page').forEach(page => page.classList.toggle('active', page.id === target)); $$('[data-route]').forEach(link => link.classList.toggle('active', link.dataset.route === target));
  $('#mainNav').classList.remove('open'); $('#menuButton').setAttribute('aria-expanded', 'false');
  if (target === 'diagnostic') renderDiagnostic(); if (target === 'method') renderMethod(); if (target === 'assignments') renderAssignments(); if (target === 'progress') renderProgress(); if (target === 'teacher') renderTeacherArea();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function updateGlobalUI() {
  const role = state.user?.role;
  $('#studentChip').textContent = state.user ? `${state.user.name} · ${role === 'teacher' ? 'мұғалім' : state.user.grade + '-сынып'}` : 'Кіру';
  $('#studentChip').title = state.user ? 'Аккаунттан шығу' : 'Платформаға кіру';
  $('#teacherNavLink').classList.toggle('hidden', role === 'student');
  $$('[data-student-nav]').forEach(link => link.classList.toggle('hidden', role === 'teacher'));
}

function openLoginModal(role = 'student') {
  if (state.user) return;
  const selected = role === 'teacher' ? 'teacher' : 'student';
  $('#loginRole').value = selected; $('#loginError').textContent = '';
  $$('[data-role-choice]').forEach(button => button.classList.toggle('active', button.dataset.roleChoice === selected));
  $('#loginName').placeholder = selected === 'teacher' ? 'Мұғалім логині' : 'Оқушы логині';
  $('#loginModal').classList.remove('hidden'); setTimeout(() => $('#loginName').focus(), 0);
}
function closeLoginModal() { $('#loginModal').classList.add('hidden'); $('#loginPassword').value = ''; $('#loginError').textContent = ''; }

async function syncStudentData() {
  const data = await api('me'); state.user = data.user; state.myData = data; state.diagnosticProfiles = data.diagnosticProfiles || []; state.finalDiagnosticOpen = Boolean(data.finalDiagnosticOpen);
  const inProgress = data.attempts.find(a => a.status === 'in_progress');
  if (inProgress) state.activeDiagnosticType = attemptType(inProgress);
  state.attempt = diagnosticAttempt(state.activeDiagnosticType);
  state.answers = Array(7).fill(''); if (state.attempt) (state.attempt.answers || []).forEach(a => state.answers[Number(a.taskIndex)] = String(a.answer || ''));
  state.methodAnswers = normalizeMethodAnswers(data.method || []);
  localStorage.setItem(USER_KEY, JSON.stringify(state.user)); updateGlobalUI();
}
function attemptType(attempt) { return String(attempt?.attemptType || 'baseline') === 'final' ? 'final' : 'baseline'; }
function diagnosticAttempt(type) { return (state.myData.attempts || []).find(a => attemptType(a) === type) || null; }
function diagnosticProfile(type) { return state.diagnosticProfiles.find(p => String(p.attemptType || 'baseline') === type) || null; }
function normalizeMethodAnswers(rows) {
  const v5 = rows.filter(x => String(x.modelVersion) === '5');
  if (v5.length) { const result = Array(5).fill(''); v5.forEach(x => result[Number(x.stepIndex)] = String(x.answer || '')); return result; }
  const old = {}; rows.forEach(x => old[Number(x.stepIndex)] = String(x.answer || ''));
  return [old[0] || '', [old[1], old[2]].filter(Boolean).join('\n'), old[3] || '', [old[4], old[5]].filter(Boolean).join('\n'), [old[6], old[7], old[8]].filter(Boolean).join('\n')];
}
async function ensureAttempt() { if (state.attempt || loadingAttempt || state.user?.role !== 'student') return; loadingAttempt = true; try { state.attempt = await api('startAttempt', { attemptType: state.activeDiagnosticType }); await syncStudentData(); } finally { loadingAttempt = false; } }

async function renderDiagnostic() {
  const isStudent = state.user?.role === 'student'; $('#profileGate').classList.toggle('hidden', isStudent); $('#diagnosticWorkspace').classList.toggle('hidden', !isStudent);
  if (!isStudent) { stopTimer(); return; }
  const isFinal = state.activeDiagnosticType === 'final';
  $('#diagnosticKicker').textContent = isFinal ? 'ҚОРЫТЫНДЫ ДЕҢГЕЙ' : 'БАСТАПҚЫ ДЕҢГЕЙ';
  $('#diagnosticTitle').textContent = isFinal ? 'Қорытынды диагностика' : 'Бастапқы диагностика';
  const baseline = diagnosticAttempt('baseline');
  if (isFinal && (!state.finalDiagnosticOpen || !baseline || !['submitted', 'graded'].includes(baseline.status))) {
    stopTimer();
    $('#diagnosticWorkspace').classList.add('single-panel');
    $('#diagnosticWorkspace').innerHTML = `<div class="task-panel"><div class="empty-state"><h2>Қорытынды диагностика әлі ашылмаған</h2><p>Оны оқыту циклі аяқталғаннан кейін мұғалім ашады.</p><button class="small-button" id="backToBaseline">Бастапқы диагностикаға қайту</button></div></div>`;
    $('#backToBaseline').addEventListener('click', () => switchDiagnosticType('baseline'));
    return;
  }
  state.attempt = diagnosticAttempt(state.activeDiagnosticType);
  state.answers = Array(7).fill(''); if (state.attempt) (state.attempt.answers || []).forEach(a => state.answers[Number(a.taskIndex)] = String(a.answer || ''));
  if (!state.attempt) {
    $('#diagnosticWorkspace').classList.add('single-panel');
    $('#diagnosticWorkspace').innerHTML = '<div class="loading">Диагностика жүктелуде...</div>';
    try { await ensureAttempt(); } catch (err) { $('#diagnosticWorkspace').innerHTML = `<div class="notice"><span>!</span><p>${escapeHtml(err.message)}</p></div>`; return; }
    restoreDiagnosticWorkspace();
  }
  if (!diagnosticProfile(state.activeDiagnosticType)) { renderDiagnosticPrelude(); stopTimer(); return; }
  if (!$('#taskPanel')) restoreDiagnosticWorkspace();
  renderTaskDots(); renderTask(); updateTimer(); if (state.attempt?.status === 'in_progress') startTimer(); else stopTimer();
}

async function switchDiagnosticType(type) {
  await persistVisibleAnswer(); stopTimer(); state.activeDiagnosticType = type; state.attempt = diagnosticAttempt(type); currentTask = 0; state.switches = 0; renderDiagnostic();
}

function renderDiagnosticPrelude() {
  $('#diagnosticWorkspace').classList.add('single-panel');
  const tests = state.user.grade === '7'
    ? [
      ['Python-да «кем емес» шарты қалай жазылады?', ['score > 10', 'score >= 10', 'score = 10']],
      ['Шарттан кейін қай белгі қойылады?', [';', ':', '.']],
      ['Қай құрылым шешімді екі бағытқа бөледі?', ['if / else', 'print', 'input']]
    ]
    : [
      ['range(2, 8, 2) қандай мәндер береді?', ['2, 4, 6', '2, 4, 6, 8', '1, 3, 5, 7']],
      ['Қайталау саны алдын ала белгісіз болса, қай цикл ыңғайлы?', ['for', 'while', 'if']],
      ['continue командасы не істейді?', ['циклді толық тоқтатады', 'ағымдағы қадамды өткізіп жібереді', 'кодты өшіреді']]
    ];
  $('#diagnosticWorkspace').innerHTML = `<div class="task-panel"><span class="kicker">1-БӨЛІМ · САУАЛНАМА</span><h2>Өзіңді бағала</h2><p class="helper">Бұл бөлімге дұрыс немесе қате жауап жоқ.</p><form id="diagnosticPreludeForm"><div class="cards three">${['Python есебін неден бастау керегін білемін.','Кодтағы қатені өзім тауып, түсіндіре аламын.','Алгоритмді жаңа жағдаятқа қолдана аламын.'].map((q,i)=>`<label class="field-label">${q}<select data-survey="${i}"><option value="1">Әлі қиын</option><option value="2">Кейде орындаймын</option><option value="3">Сенімді орындаймын</option></select></label>`).join('')}</div><span class="kicker">2-БӨЛІМ · ҚЫСҚА ТЕСТ</span><h2>Бастапқы біліміңді тексер</h2>${tests.map((q,i)=>`<div class="quiz-item"><strong>${i+1}. ${q[0]}</strong>${q[1].map((a,j)=>`<label><input type="radio" name="quiz${i}" value="${j}" required> ${a}</label>`).join('')}</div>`).join('')}<button class="primary" type="submit">Практикалық бөлімге өту →</button></form></div>`;
  $('#diagnosticPreludeForm').addEventListener('submit', async event => {
    event.preventDefault(); const button = $('button', event.currentTarget); const survey = $$('[data-survey]').map(x => Number(x.value)); const test = tests.map((_,i)=>Number($(`[name="quiz${i}"]:checked`).value));
    try { setBusy(button,true,'Сақталуда...'); const saved = await api('saveDiagnosticProfile',{survey,test,attemptType:state.activeDiagnosticType}); await syncStudentData(); restoreDiagnosticWorkspace(); renderDiagnostic(); toast(`Тест нәтижесі: ${saved.testScore}/3`); } catch(err){ toast(err.message,true); } finally { setBusy(button,false); }
  });
}
function restoreDiagnosticWorkspace() {
  $('#diagnosticWorkspace').classList.remove('single-panel');
  const baseline = diagnosticAttempt('baseline'), finalEnabled = state.finalDiagnosticOpen && baseline && ['submitted','graded'].includes(baseline.status);
  $('#diagnosticWorkspace').innerHTML = `<aside class="task-sidebar"><div class="diagnostic-switcher"><button class="small-button ${state.activeDiagnosticType === 'baseline' ? 'active' : ''}" data-diagnostic-type="baseline">Бастапқы</button><button class="small-button ${state.activeDiagnosticType === 'final' ? 'active' : ''}" data-diagnostic-type="final" ${finalEnabled ? '' : 'disabled'}>Қорытынды</button></div><div class="side-title">Тапсырмалар <span id="answeredCount">0/7</span></div><div class="task-dots" id="taskDots"></div><div class="integrity-box"><small>Беттен ауысу</small><strong id="switchCount">0 рет</strong></div><button class="small-button" id="fullscreenButton" type="button">Толық экранға өту</button></aside><article class="task-panel" id="taskPanel"></article>`;
  $('#fullscreenButton').addEventListener('click', toggleFullscreen);
  $$('[data-diagnostic-type]').forEach(button => button.addEventListener('click', () => switchDiagnosticType(button.dataset.diagnosticType)));
}
function renderTaskDots() {
  $('#taskDots').innerHTML = diagnosticTasks(state.user.grade).map((_, i) => `<button class="task-dot ${i === currentTask ? 'active' : ''} ${state.answers[i]?.trim() ? 'done' : ''}" data-task="${i}">${i + 1}</button>`).join('');
  $('#answeredCount').textContent = `${state.answers.filter(a => a?.trim()).length}/7`; $('#switchCount').textContent = `${state.switches || Number(state.attempt.switches) || 0} рет`;
  $$('[data-task]').forEach(btn => btn.addEventListener('click', async () => { await persistVisibleAnswer(); currentTask = Number(btn.dataset.task); renderDiagnostic(); }));
}
function renderTask() {
  const task = diagnosticTasks(state.user.grade)[currentTask], submitted = state.attempt.status !== 'in_progress';
  const statusText = state.attempt.status === 'graded' ? `Бағаланды: ${state.attempt.totalScore}/21` : submitted ? 'Тапсырылды' : '0–3 БАЛЛ';
  $('#taskPanel').innerHTML = `<div class="task-meta"><span>ТАПСЫРМА ${currentTask + 1} / 7</span><span>${statusText}</span></div><h2>${task.title}</h2><p class="task-prompt">${task.prompt}</p>${task.code ? `<pre class="code-block"><code>${escapeHtml(task.code)}</code></pre>` : ''}<label class="field-label">Сіздің жауабыңыз<textarea id="diagnosticAnswer" ${submitted ? 'disabled' : ''} placeholder="Жауабыңызды осында жазыңыз...">${escapeHtml(state.answers[currentTask] || '')}</textarea></label>${feedbackForCurrentTask()}<div class="task-nav"><button class="small-button" id="prevTask" ${currentTask === 0 ? 'disabled' : ''}>← Алдыңғы</button><div class="right"><button class="small-button" id="saveAnswer" ${submitted ? 'disabled' : ''}>Сақтау</button>${currentTask < 6 ? '<button class="primary" id="nextTask">Келесі →</button>' : `<button class="primary" id="submitDiagnostic" ${submitted ? 'disabled' : ''}>Диагностиканы тапсыру</button>`}</div></div>`;
  $('#diagnosticAnswer')?.addEventListener('input', debounce(async () => { try { await persistVisibleAnswer(); toast('Жауап сақталды'); } catch (err) { toast(err.message, true); } }, 800));
  $('#prevTask')?.addEventListener('click', async () => { await persistVisibleAnswer(); currentTask--; renderDiagnostic(); }); $('#nextTask')?.addEventListener('click', async () => { await persistVisibleAnswer(); currentTask++; renderDiagnostic(); });
  $('#saveAnswer')?.addEventListener('click', async e => { try { setBusy(e.currentTarget, true); await persistVisibleAnswer(); toast('Жауап сақталды'); } catch (err) { toast(err.message, true); } finally { setBusy(e.currentTarget, false); } });
  $('#submitDiagnostic')?.addEventListener('click', () => submitDiagnostic(false));
}
function feedbackForCurrentTask() { if (state.attempt?.status !== 'graded') return ''; const item = (state.attempt.answers || []).find(a => Number(a.taskIndex) === currentTask); return `<div class="notice"><span>✓</span><p><strong>${item?.score ?? 0}/3 балл.</strong> ${escapeHtml(item?.feedback || 'Мұғалім пікірі жазылмаған.')}</p></div>`; }
async function persistVisibleAnswer() {
  const area = $('#diagnosticAnswer'); if (!area || state.attempt?.status !== 'in_progress') return; state.answers[currentTask] = area.value;
  await api('saveAnswer', { attemptId: state.attempt.id, taskIndex: currentTask, answer: area.value });
  const found = (state.attempt.answers || []).find(a => Number(a.taskIndex) === currentTask); if (found) found.answer = area.value; else (state.attempt.answers ||= []).push({ taskIndex: currentTask, answer: area.value }); renderTaskDots();
}
async function submitDiagnostic(force) {
  try {
    await persistVisibleAnswer(); const missing = state.answers.filter(a => !a.trim()).length; if (missing) throw new Error(`Барлық 7 тапсырманы орындаңыз. ${missing} жауап толтырылмаған.`);
    const secondsSpent = Math.max(0, Math.round((Date.now() - new Date(state.attempt.startedAt).getTime()) / 1000)); await api('submitAttempt', { attemptId: state.attempt.id, secondsSpent, switches: state.switches });
    await syncStudentData(); stopTimer(); renderDiagnostic(); toast('Диагностика тапсырылды');
  } catch (err) { toast(err.message, true); }
}
function startTimer() { if (timerId) return; timerId = setInterval(() => { updateTimer(); if (secondsLeft() <= 0) { stopTimer(); submitDiagnostic(true); } }, 1000); }
function stopTimer() { clearInterval(timerId); timerId = null; }
function secondsLeft() { return state.attempt ? Math.max(0, 2400 - Math.floor((Date.now() - new Date(state.attempt.startedAt).getTime()) / 1000)) : 2400; }
function updateTimer() { const sec = state.attempt?.status === 'in_progress' ? secondsLeft() : 0; $('#timer strong').textContent = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; }

function renderMethod() {
  const ready = state.user?.role === 'student'; $('#methodGate').classList.toggle('hidden', ready); $('#methodWorkspace').classList.toggle('hidden', !ready); if (!ready) return;
  const completed = state.methodAnswers.filter(a => a.trim()).length, pct = Math.round(completed / methodSteps.length * 100); $('#methodPercent').textContent = `${pct}%`; $('.completion-ring').style.setProperty('--method-pct', `${pct}%`);
  const unlocked = i => i === 0 || state.methodAnswers.slice(0, i).every(answer => String(answer || '').trim());
  if (!unlocked(currentStep)) currentStep = Math.max(0, state.methodAnswers.findIndex(answer => !String(answer || '').trim()));
  $('#stepList').innerHTML = methodSteps.map((s, i) => { const isLocked = !unlocked(i); return `<button class="step-button ${i === currentStep ? 'active' : ''} ${state.methodAnswers[i]?.trim() ? 'done' : ''} ${isLocked ? 'locked' : ''}" data-step="${i}" ${isLocked ? 'disabled' : ''}><span class="step-index">${s.short}</span><span class="step-title">${escapeHtml(s.title)}</span><span class="step-status">${state.methodAnswers[i]?.trim() ? '✓' : isLocked ? '🔒' : '·'}</span></button>`; }).join('');
  $$('[data-step]').forEach(btn => btn.addEventListener('click', async () => { await persistStep(); currentStep = Number(btn.dataset.step); renderMethod(); })); renderStep();
}
function renderStep() {
  const step = methodSteps[currentStep]; $('#stepPanel').innerHTML = `<span class="step-badge">КЕЗЕҢ ${currentStep + 1} / ${methodSteps.length} · ${escapeHtml(step.english)}</span><h2>${escapeHtml(step.title)}</h2><p class="helper">${escapeHtml(step.help)}</p><div class="scenario"><strong>${state.user.grade}-сынып тапсырмасы</strong><br>${scenarios[state.user.grade]}</div><label class="field-label">Ойлау жазбасы<textarea id="stepAnswer" placeholder="${escapeHtml(step.placeholder)}">${escapeHtml(state.methodAnswers[currentStep] || '')}</textarea></label><p class="helper">Нұсқау: ${escapeHtml(step.placeholder)}</p><div class="step-actions"><button class="small-button" id="prevStep" ${currentStep === 0 ? 'disabled' : ''}>← Алдыңғы</button><button class="primary" id="nextStep">${currentStep === methodSteps.length - 1 ? 'Сақтау' : 'Сақтау және келесі →'}</button></div>`;
  $('#stepAnswer').addEventListener('input', debounce(() => persistStep().catch(err => toast(err.message, true)), 800)); $('#prevStep').addEventListener('click', async () => { await persistStep(); currentStep--; renderMethod(); }); $('#nextStep').addEventListener('click', async () => { try { if (!$('#stepAnswer').value.trim()) throw new Error('Келесі кезеңге өту үшін осы кезеңнің жауабын жазыңыз.'); await persistStep(); if (currentStep < methodSteps.length - 1) currentStep++; renderMethod(); toast('Кезең сақталды'); } catch (err) { toast(err.message, true); } });
}
async function persistStep() { const area = $('#stepAnswer'); if (!area || state.user?.role !== 'student') return; state.methodAnswers[currentStep] = area.value; await api('saveMethodStep', { stepIndex: currentStep, answer: area.value }); }

async function renderAssignments() {
  const ready = state.user?.role === 'student';
  $('#assignmentLoginNotice').classList.toggle('hidden', ready); $('#assignmentWorkspace').classList.toggle('hidden', !ready); if (!ready) return;
  if (activeAssignmentId) { renderAssignmentDetail(); return; }
  $('#assignmentDetail').classList.add('hidden'); $('#assignmentList').classList.remove('hidden'); $('#assignmentList').innerHTML = '<div class="loading">Тапсырмалар жүктелуде...</div>';
  try {
    state.workspace = await api('studentWorkspace');
    const items = state.workspace.assignments || [];
    $('#assignmentList').innerHTML = items.length ? items.map(a => `<button class="assignment-card" data-open-assignment="${a.id}"><small>${escapeHtml(a.task?.topic || 'Python')} · ${escapeHtml(a.task?.difficulty || 'орта')}</small><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.task?.scenario || '')}</p><span class="assignment-state">${assignmentStatus(a.attempt?.status)}</span></button>`).join('') : '<div class="empty-state"><h2>Тапсырма әлі берілмеген</h2><p>Мұғалім сыныпқа тапсырма жариялағаннан кейін осы жерде көрінеді.</p></div>';
    $$('[data-open-assignment]').forEach(btn => btn.addEventListener('click', () => { activeAssignmentId = btn.dataset.openAssignment; activeLabStep = 0; renderAssignmentDetail(); }));
  } catch (err) { $('#assignmentList').innerHTML = `<div class="notice"><span>!</span><p>${escapeHtml(err.message)}</p></div>`; }
}

function assignmentStatus(status) { return status === 'graded' ? 'Бағаланды' : status === 'submitted' ? 'Тексерілуде' : status === 'in_progress' ? 'Орындалуда' : 'Басталмаған'; }
function currentAssignment() { return (state.workspace.assignments || []).find(a => a.id === activeAssignmentId); }
async function startAssignmentAttempt(assignment) {
  $('#assignmentDetail').innerHTML = '<div class="loading">Тапсырма ашылуда...</div>';
  try { assignment.attempt = await api('startTaskAttempt', { assignmentId: assignment.id }); renderAssignmentDetail(); }
  catch (err) { $('#assignmentDetail').innerHTML = `<div class="notice"><span>!</span><p>${escapeHtml(err.message)}</p></div>`; }
}

function renderAssignmentDetail() {
  const assignment = currentAssignment(); if (!assignment) { activeAssignmentId = ''; renderAssignments(); return; }
  $('#assignmentList').classList.add('hidden'); $('#assignmentDetail').classList.remove('hidden');
  if (!assignment.attempt) { startAssignmentAttempt(assignment); return; }
  const attempt = assignment.attempt;
  const completedBefore = i => i === 0 || methodSteps.slice(0, i).every(s => (attempt.steps || []).some(x => x.stepCode === s.code && String(x.response || '').trim()));
  if (!completedBefore(activeLabStep)) activeLabStep = Math.max(0, methodSteps.findIndex((s, i) => !completedBefore(i + 1)));
  const step = methodSteps[activeLabStep], code = step.code;
  const stepData = (attempt.steps || []).find(s => s.stepCode === code) || {};
  const locked = attempt.status !== 'in_progress';
  $('#assignmentDetail').innerHTML = `<button class="back-link" id="backAssignments">← Тапсырмаларға қайту</button><div class="lab-layout"><aside class="lab-sidebar"><h3>${escapeHtml(assignment.title)}</h3><div class="lab-tabs">${methodSteps.map((s, i) => { const d = (attempt.steps || []).find(x => x.stepCode === s.code), stepLocked = !completedBefore(i); return `<button class="lab-tab ${i === activeLabStep ? 'active' : ''} ${d?.response ? 'done' : ''} ${stepLocked ? 'locked' : ''}" data-lab-step="${i}" ${stepLocked ? 'disabled' : ''}><span class="step-index">${s.short}</span><span>${escapeHtml(s.title)}</span><span>${d?.response ? '✓' : stepLocked ? '🔒' : ''}</span></button>`; }).join('')}</div></aside><main class="lab-main"><div class="scenario-box"><strong>Өмірлік жағдаят</strong><br>${escapeHtml(assignment.task.scenario)}</div><span class="step-badge">${escapeHtml(step.english)}</span><h2>${escapeHtml(step.title)}</h2><p class="helper">${escapeHtml(step.help)}</p><label class="field-label">Ойлау жазбасы<textarea id="labStepAnswer" ${locked ? 'disabled' : ''} placeholder="${escapeHtml(step.placeholder)}">${escapeHtml(stepData.response || '')}</textarea></label>${code === 'E' ? codeEditorHtml(attempt, locked) : ''}${stepData.feedback ? `<div class="notice"><span>✓</span><p><strong>${stepData.score}/3.</strong> ${escapeHtml(stepData.feedback)}</p></div>` : ''}<div class="step-actions"><button class="small-button" id="labPrev" ${activeLabStep === 0 ? 'disabled' : ''}>← Алдыңғы</button><div><button class="small-button" id="saveLabStep" ${locked ? 'disabled' : ''}>Сақтау</button> <button class="primary" id="labNext">${activeLabStep === methodSteps.length - 1 ? (locked ? 'Тапсырылды' : 'Тапсыру') : 'Келесі →'}</button></div></div></main></div>`;
  $('#backAssignments').addEventListener('click', () => { activeAssignmentId = ''; renderAssignments(); });
  $$('[data-lab-step]').forEach(btn => btn.addEventListener('click', async () => { await saveCurrentLabStep(false); activeLabStep = Number(btn.dataset.labStep); renderAssignmentDetail(); }));
  $('#labPrev').addEventListener('click', async () => { await saveCurrentLabStep(false); activeLabStep--; renderAssignmentDetail(); });
  $('#saveLabStep')?.addEventListener('click', async () => { try { await saveCurrentLabStep(true); } catch (err) { toast(err.message, true); } });
  $('#labNext').addEventListener('click', async () => { try { if (locked) return; if (!$('#labStepAnswer').value.trim()) throw new Error('Келесі кезеңге өту үшін осы кезеңнің жауабын жазыңыз.'); await saveCurrentLabStep(false); if (activeLabStep < methodSteps.length - 1) { activeLabStep++; renderAssignmentDetail(); } else await submitActiveAssignment(); } catch (err) { toast(err.message, true); } });
  $('#runPython')?.addEventListener('click', runActiveCode); $('#saveCode')?.addEventListener('click', () => saveActiveCode(true));
  const editor = $('#pythonCode'); if (editor) editor.addEventListener('keydown', handleTabKey);
}

function codeEditorHtml(attempt, locked) {
  return `<div class="field-label">Python редакторы<textarea id="pythonCode" class="code-editor" ${locked ? 'disabled' : ''}>${escapeHtml(attempt.code || '')}</textarea></div><div class="code-controls"><textarea id="pythonInput" class="python-input" ${locked ? 'disabled' : ''} placeholder="input() мәндерін әр жолға жазыңыз">${escapeHtml(attempt.inputData || '')}</textarea><button class="small-button" id="saveCode" ${locked ? 'disabled' : ''}>Кодты сақтау</button><button class="primary" id="runPython" ${locked ? 'disabled' : ''}>▶ Орындау</button></div><pre class="code-output" id="pythonOutput">${escapeHtml(attempt.output || 'Нәтиже осы жерде көрсетіледі.')}</pre>`;
}

async function saveCurrentLabStep(showToast) {
  const assignment = currentAssignment(), area = $('#labStepAnswer'); if (!assignment || !area || assignment.attempt.status !== 'in_progress') return;
  const code = methodSteps[activeLabStep].code, response = area.value;
  await api('saveTaskStep', { attemptId: assignment.attempt.id, stepCode: code, response });
  let item = (assignment.attempt.steps || []).find(x => x.stepCode === code); if (item) item.response = response; else (assignment.attempt.steps ||= []).push({ stepCode: code, response });
  if (code === 'E' && $('#pythonCode')) await saveActiveCode(false); if (showToast) toast('Қадам сақталды');
}
async function saveActiveCode(showToast) {
  const assignment = currentAssignment(); if (!assignment || !$('#pythonCode')) return;
  const data = { code: $('#pythonCode').value, inputData: $('#pythonInput').value, output: $('#pythonOutput').textContent };
  await api('saveTaskCode', { attemptId: assignment.attempt.id, ...data }); Object.assign(assignment.attempt, data); if (showToast) toast('Код сақталды');
}
function handleTabKey(event) { if (event.key !== 'Tab') return; event.preventDefault(); const el = event.currentTarget, start = el.selectionStart; el.value = el.value.slice(0, start) + '    ' + el.value.slice(el.selectionEnd); el.selectionStart = el.selectionEnd = start + 4; }

function executePython(code, input) {
  return new Promise((resolve, reject) => {
    if (pythonWorker) pythonWorker.terminate(); pythonWorker = new Worker('python-worker.js');
    const timeout = setTimeout(() => { pythonWorker.terminate(); pythonWorker = null; reject(new Error('Код 6 секундтан ұзақ орындалды және тоқтатылды.')); }, 6000);
    pythonWorker.onmessage = event => { clearTimeout(timeout); resolve(event.data); };
    pythonWorker.onerror = event => { clearTimeout(timeout); reject(new Error(event.message || 'Python жүктеу қатесі')); };
    pythonWorker.postMessage({ code, input });
  });
}
async function runActiveCode(event) {
  const button = event.currentTarget, output = $('#pythonOutput');
  try { setBusy(button, true, 'Орындалуда...'); output.textContent = 'Python жүктелуде...'; const result = await executePython($('#pythonCode').value, $('#pythonInput').value); output.textContent = result.output; await saveActiveCode(false); }
  catch (err) { output.textContent = err.message; } finally { setBusy(button, false); }
}
async function submitActiveAssignment() {
  const assignment = currentAssignment(); const done = methodSteps.filter(step => (assignment.attempt.steps || []).some(s => s.stepCode === step.code && String(s.response || '').trim())).length;
  if (done < methodSteps.length) throw new Error(`Барлық 5 кезеңді толтырыңыз. ${methodSteps.length - done} кезең аяқталмаған.`);
  await api('submitTask', { attemptId: assignment.attempt.id }); assignment.attempt.status = 'submitted'; toast('Тапсырма мұғалімге жіберілді'); renderAssignmentDetail();
}

function renderProgress() {
  const ready = state.user?.role === 'student'; $('#progressEmpty').classList.toggle('hidden', ready); $('#progressContent').classList.toggle('hidden', !ready); if (!ready) return;
  const methodDone = state.methodAnswers.filter(a => a.trim()).length;
  const baseline = diagnosticAttempt('baseline'), finalAttempt = diagnosticAttempt('final'), attempt = finalAttempt || baseline;
  const diagnosticStatus = !attempt ? 'Басталмаған' : attempt.status === 'graded' ? `${attempt.totalScore}/21 балл` : attempt.status === 'submitted' ? 'Тексерілуде' : 'Орындалуда';
  const answered = attempt ? (attempt.answers || []).filter(a => String(a.answer || '').trim()).length : 0;
  const baseSkills = skillsForAttempt(baseline), finalSkills = skillsForAttempt(finalAttempt), latest = Object.keys(finalSkills).length ? finalSkills : baseSkills;
  const comparison = comparisonChart(baseSkills, finalSkills, Boolean(finalAttempt?.status === 'graded'));
  const lowest = Object.keys(skillLabels).sort((a,b)=>(latest[a] ?? 0)-(latest[b] ?? 0))[0];
  const recommendation = latest[lowest] !== undefined ? `${skillLabels[lowest]} дағдысына арналған тапсырмаларды қайталаңыз.` : 'Алдымен бастапқы диагностиканы аяқтаңыз.';
  const assignmentItems = (state.workspace.assignments || []).map(a => `<li><span>${escapeHtml(a.title)}</span><b>${assignmentStatus(a.attempt?.status || '')}</b></li>`).join('') || '<li><span>Әзірге тапсырма берілмеген</span><b>—</b></li>';
  const badges = [baseline?.status === 'graded' ? 'Диагностика аяқталды' : '', methodDone === 5 ? '5 кезең шебері' : '', finalAttempt?.status === 'graded' ? 'Өсім өлшенді' : ''].filter(Boolean);
  $('#progressContent').innerHTML = `<div class="profile-banner"><div class="profile-identity"><div class="profile-avatar">${escapeHtml(state.user.name.charAt(0).toUpperCase())}</div><div><small>ОҚУШЫНЫҢ ЖЕКЕ КАБИНЕТІ</small><h2>${escapeHtml(state.user.name)}</h2><p>${escapeHtml(state.user.className || state.user.grade + '-сынып')} · ${escapeHtml(state.user.login)}</p></div></div><div class="badge-row">${badges.map(x=>`<span>${escapeHtml(x)}</span>`).join('') || '<span>Алғашқы қадам</span>'}</div></div><div class="progress-hero"><article class="metric-card"><small>Соңғы диагностика</small><strong>${diagnosticStatus}</strong><p>${attempt?.teacherComment ? escapeHtml(attempt.teacherComment) : 'Мұғалім бағасы мен пікірі осы жерде көрсетіледі.'}</p><div class="progress-bar"><span style="width:${answered / 7 * 100}%"></span></div></article><article class="metric-card"><small>CODE THINK әдісі</small><strong>${methodDone}/5 кезең</strong><p>${methodDone === 5 ? 'Барлық ойлау кезеңі орындалды.' : 'Жаттығуды жалғастыруға болады.'}</p><div class="progress-bar"><span style="width:${methodDone / 5 * 100}%"></span></div></article></div><div class="dashboard-section"><div class="section-mini-heading"><div><span class="kicker">7 ДАҒДЫ</span><h2>Алгоритмдік ойлау профилі</h2></div><p>${finalAttempt?.status === 'graded' ? 'Бастапқы және қорытынды нәтиже салыстырылды.' : 'Қорытынды диагностикадан кейін өсім көрсетіледі.'}</p></div>${comparison}</div><div class="student-dashboard-grid"><article class="dashboard-section"><span class="kicker">ҰСЫНЫС</span><h2>Келесі қадам</h2><p class="recommendation">${escapeHtml(recommendation)}</p></article><article class="dashboard-section"><span class="kicker">ТАПСЫРМАЛАР</span><h2>Оқу жұмыстары</h2><ul class="compact-list">${assignmentItems}</ul></article></div>`;
}

function skillsForAttempt(attempt) {
  if (!attempt || attempt.status !== 'graded') return {};
  const result = {}; (state.myData.skills || []).filter(s => s.sourceId === attempt.id).forEach(s => result[s.skillKey] = Number(s.score || 0)); return result;
}
function comparisonChart(baseline = {}, finalScores = {}, showFinal = false) {
  return `<div class="comparison-chart">${Object.keys(skillLabels).map(key => { const b = Number(baseline[key] || 0), f = Number(finalScores[key] || 0); return `<div class="chart-row"><span>${escapeHtml(skillLabels[key])}</span><div class="bar-stack"><i class="baseline-bar" style="width:${b/3*100}%"></i>${showFinal ? `<i class="final-bar" style="width:${f/3*100}%"></i>` : ''}</div><b>${showFinal ? `${b.toFixed(1)} → ${f.toFixed(1)}` : b.toFixed(1)}</b></div>`; }).join('')}<div class="chart-legend"><span><i class="baseline-dot"></i> Бастапқы</span>${showFinal ? '<span><i class="final-dot"></i> Қорытынды</span>' : ''}</div></div>`;
}

async function renderTeacherArea() {
  const ready = state.user?.role === 'teacher'; $('#teacherLogin').classList.toggle('hidden', ready); $('#teacherDashboard').classList.toggle('hidden', !ready); if (!ready) return;
  $('#submissionList').innerHTML = '<div class="loading">Нәтижелер жүктелуде...</div>'; try { [state.teacherData, state.teacherWorkspace] = await Promise.all([api('teacherDashboard'), api('teacherWorkspace')]); renderTeacherData(); renderTeacherWorkspace(); } catch (err) { $('#submissionList').innerHTML = `<div class="notice"><span>!</span><p>${escapeHtml(err.message)}</p></div>`; }
}
function renderTeacherData() {
  const list = state.teacherData.attempts || [], submitted = list.filter(a => a.status !== 'in_progress'); $('#submissionTotal').textContent = submitted.length;
  $('#submissionList').innerHTML = submitted.length ? submitted.map(record => {
    const total = record.status === 'graded' ? Number(record.totalScore || 0) : null;
    const typeLabel = attemptType(record) === 'final' ? 'Қорытынды' : 'Бастапқы';
    return `<details class="submission" data-record="${record.id}"><summary><span class="submission-name"><strong>${escapeHtml(record.student.name)} · ${typeLabel}</strong><small>${escapeHtml(record.student.className || record.student.grade + '-сынып')} · ${formatDate(record.submittedAt)} · беттен ауысу: ${record.switches || 0}</small></span><span class="status-pill">${record.status === 'graded' ? 'Бағаланды' : 'Тексеру керек'}</span><span class="score-total">${total !== null ? total + '/21' : '— /21'}</span></summary><div class="review-body">${diagnosticTasks(record.grade, attemptType(record)).map((task, i) => { const answer = (record.answers || []).find(a => Number(a.taskIndex) === i) || {}; return `<div class="review-item"><div><h4>${i + 1}. ${task.title}</h4><div class="answer-text">${escapeHtml(answer.answer || 'Жауап берілмеген')}</div><textarea class="feedback-input" data-feedback="${i}" placeholder="Оқушыға пікір...">${escapeHtml(answer.feedback || '')}</textarea></div><select class="score-select" data-score="${i}">${[0, 1, 2, 3].map(n => `<option value="${n}" ${Number(answer.score) === n && answer.score !== '' ? 'selected' : ''}>${n} балл</option>`).join('')}</select></div>`; }).join('')}<label class="field-label teacher-comment">Жалпы пікір<textarea data-comment placeholder="Жалпы кері байланыс...">${escapeHtml(record.teacherComment || '')}</textarea></label><div class="review-actions"><button class="primary save-scores">Бағаны сақтау</button></div></div></details>`;
  }).join('') : '<div class="empty-state"><h2>Жұмыс әлі тапсырылмаған</h2><p>Оқушы диагностиканы тапсырғаннан кейін нәтиже осында пайда болады.</p></div>';
  $$('.save-scores').forEach(btn => btn.addEventListener('click', () => saveScores(btn.closest('[data-record]'), btn))); renderStudentList(); renderTeacherAnalytics();
}
function renderStudentList() {
  const users = state.teacherData.users || []; $('#studentList').innerHTML = users.length ? users.map(u => `<div class="student-row" data-user="${u.id}"><div><strong>${escapeHtml(u.name)}</strong><small>${escapeHtml(u.login)} · ${escapeHtml(u.className || u.grade + '-сынып')} · ${u.active ? 'белсенді' : 'бұғатталған'}</small></div><div class="student-actions"><button class="small-button show-student-progress">Прогресс</button><button class="small-button reset-password">Жаңа пароль</button><button class="small-button toggle-user">${u.active ? 'Бұғаттау' : 'Ашу'}</button></div><div class="student-snapshot hidden">${studentSnapshotHtml(u)}</div></div>`).join('') : '<p class="helper">Оқушы аккаунты әлі жоқ.</p>';
  $$('.show-student-progress').forEach(btn => btn.addEventListener('click', () => $('.student-snapshot', btn.closest('[data-user]')).classList.toggle('hidden'))); $$('.reset-password').forEach(btn => btn.addEventListener('click', () => resetStudentPassword(btn.closest('[data-user]').dataset.user))); $$('.toggle-user').forEach(btn => btn.addEventListener('click', () => toggleStudent(btn.closest('[data-user]').dataset.user)));
}

function studentSnapshotHtml(user) {
  const attempts = (state.teacherData.attempts || []).filter(a => a.userId === user.id), baseline = attempts.find(a => attemptType(a) === 'baseline'), finalAttempt = attempts.find(a => attemptType(a) === 'final');
  const b = baseline?.status === 'graded' ? Number(baseline.totalScore || 0) : null, f = finalAttempt?.status === 'graded' ? Number(finalAttempt.totalScore || 0) : null;
  const taskDone = (state.teacherData.taskAttempts || []).filter(x => x.userId === user.id && x.status === 'graded').length;
  return `<div class="snapshot-metrics"><div><small>Бастапқы</small><strong>${b === null ? '—' : b + '/21'}</strong></div><div><small>Қорытынды</small><strong>${f === null ? '—' : f + '/21'}</strong></div><div><small>Өсім</small><strong>${b !== null && f !== null ? (f-b >= 0 ? '+' : '') + (f-b) : '—'}</strong></div><div><small>Бағаланған тапсырма</small><strong>${taskDone}</strong></div></div>`;
}

function renderTeacherAnalytics() {
  const users = state.teacherData.users || [], attempts = state.teacherData.attempts || [], skills = state.teacherData.skillScores || [];
  const graded = attempts.filter(a => a.status === 'graded'), baseline = graded.filter(a => attemptType(a) === 'baseline'), finals = graded.filter(a => attemptType(a) === 'final');
  const avg = rows => rows.length ? (rows.reduce((s,x)=>s+Number(x.totalScore||0),0)/rows.length).toFixed(1) : '—';
  const skillAverages = {}; Object.keys(skillLabels).forEach(key => { const vals = users.map(u => { const own = attempts.filter(a=>a.userId===u.id && a.status==='graded').sort((a,b)=>String(b.submittedAt).localeCompare(String(a.submittedAt)))[0]; const row = own && skills.find(s=>s.userId===u.id && s.sourceId===own.id && s.skillKey===key); return row ? Number(row.score) : null; }).filter(Number.isFinite); skillAverages[key] = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0; });
  const weak = Object.keys(skillLabels).sort((a,b)=>skillAverages[a]-skillAverages[b])[0];
  $('#teacherAnalytics').innerHTML = `<div class="analytics-cards"><article><small>Оқушылар</small><strong>${users.length}</strong></article><article><small>Бастапқы орташа</small><strong>${avg(baseline)}/21</strong></article><article><small>Қорытынды орташа</small><strong>${avg(finals)}/21</strong></article><article><small>Тексеру керек</small><strong>${attempts.filter(a=>a.status==='submitted').length}</strong></article></div><div class="dashboard-section"><div class="section-mini-heading"><div><span class="kicker">СЫНЫП ПРОФИЛІ</span><h2>Жеті дағды бойынша орташа көрсеткіш</h2></div><p>${users.length ? `Негізгі қолдау бағыты: ${skillLabels[weak]}` : 'Оқушы қосылғаннан кейін аналитика шығады.'}</p></div>${comparisonChart(skillAverages, {}, false)}</div>`;
  renderDemoChart();
}

function renderTeacherWorkspace() {
  const ws = state.teacherWorkspace || { classes: [], tasks: [], assignments: [] };
  $('#toggleFinalDiagnostic').textContent = state.teacherData.finalDiagnosticOpen ? 'Қорытындыны жабу' : 'Қорытындыны ашу';
  $('#assignmentClass').innerHTML = ws.classes.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
  $('#assignmentTask').innerHTML = ws.tasks.map(t => `<option value="${t.id}">${escapeHtml(t.grade + '-сынып · ' + t.title)}</option>`).join('');
  $('#classList').innerHTML = ws.classes.length ? ws.classes.map(c => `<div class="class-block"><strong>${escapeHtml(c.name)}</strong> <span class="helper">${c.grade}-сынып · ${(c.studentIds || []).length} оқушы</span><div class="enroll-row"><select data-enroll-user>${(state.teacherData.users || []).map(u => `<option value="${u.id}">${escapeHtml(u.name)} · ${escapeHtml(u.login)}</option>`).join('')}</select><span></span><button class="small-button" data-enroll-class="${c.id}">Оқушыны тіркеу</button></div></div>`).join('') : '<p class="helper">Алдымен сынып құрыңыз.</p>';
  $('#taskBankCount').textContent = `${ws.tasks.length} есеп`;
  $('#taskBankList').innerHTML = ws.tasks.length ? ws.tasks.slice().sort((a,b) => Number(a.grade) - Number(b.grade) || a.title.localeCompare(b.title, 'kk')).map(t => `<article class="task-bank-item"><div><span class="task-grade">${escapeHtml(t.grade)}-сынып</span><span class="task-level">${escapeHtml(t.difficulty || 'орта')}</span></div><h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.topic || 'Python')}</p><small>${escapeHtml(t.scenario)}</small></article>`).join('') : '<p class="helper">Тапсырма әлі қосылмаған.</p>';
  $$('[data-enroll-class]').forEach(btn => btn.addEventListener('click', async () => { const row = btn.closest('.enroll-row'), userId = $('[data-enroll-user]', row).value; try { await api('enrollStudent', { classId: btn.dataset.enrollClass, userId }); await refreshTeacherWorkspace(); toast('Оқушы сыныпқа тіркелді'); } catch (err) { toast(err.message, true); } }));
  renderTaskSubmissions();
}

function renderTaskSubmissions() {
  const assignments = state.teacherWorkspace.assignments || [];
  const attempts = assignments.flatMap(a => (a.attempts || []).filter(x => x.status === 'submitted' || x.status === 'graded').map(x => ({ ...x, assignment: a })));
  $('#taskSubmissionList').innerHTML = attempts.length ? attempts.map(item => `<details class="submission" data-task-attempt="${item.id}"><summary><span class="submission-name"><strong>${escapeHtml(item.student.name)}</strong><small>${escapeHtml(item.assignment.title)} · ${escapeHtml(item.assignment.classInfo?.name || '')}</small></span><span class="status-pill">${item.status === 'graded' ? 'Бағаланды' : 'Тексеру керек'}</span><span class="score-total">${item.status === 'graded' ? item.score + '/15' : '— /15'}</span></summary><div class="review-body">${methodSteps.map(step => { const code = step.code, data = (item.steps || []).find(s => s.stepCode === code) || {}; return `<div class="review-item"><div><h4>${escapeHtml(step.title)} · ${escapeHtml(step.english)}</h4><div class="answer-text">${escapeHtml(data.response || 'Жауап берілмеген')}</div><textarea class="feedback-input" data-task-feedback="${code}" placeholder="Пікір...">${escapeHtml(data.feedback || '')}</textarea></div><select class="score-select" data-task-score="${code}">${[0,1,2,3].map(n => `<option value="${n}" ${Number(data.score) === n && data.score !== '' ? 'selected' : ''}>${n} балл</option>`).join('')}</select></div>`; }).join('')}<div class="review-item"><div><h4>Python коды</h4><pre class="code-block">${escapeHtml(item.code || 'Код жазылмаған')}</pre><div class="answer-text">Нәтиже: ${escapeHtml(item.output || '—')}</div></div></div><label class="field-label teacher-comment">Жалпы пікір<textarea data-task-comment>${escapeHtml(item.teacherComment || '')}</textarea></label><div class="review-actions"><button class="primary save-task-grade">Бағаны сақтау</button></div></div></details>`).join('') : '<div class="empty-state"><h2>Тапсырылған жұмыс жоқ</h2><p>Оқушылар CODE → THINK тапсырмасын жібергенде осында көрінеді.</p></div>';
  $$('.save-task-grade').forEach(btn => btn.addEventListener('click', () => gradeTaskAttempt(btn.closest('[data-task-attempt]'), btn)));
}

async function gradeTaskAttempt(container, button) {
  const scores = {}, feedback = {}; $$('[data-task-score]', container).forEach(x => scores[x.dataset.taskScore] = Number(x.value)); $$('[data-task-feedback]', container).forEach(x => feedback[x.dataset.taskFeedback] = x.value);
  try { setBusy(button, true, 'Сақталуда...'); await api('gradeTask', { attemptId: container.dataset.taskAttempt, scores, feedback, teacherComment: $('[data-task-comment]', container).value }); await refreshTeacherWorkspace(); await syncTeacherData(); toast('Тапсырма бағаланды'); }
  catch (err) { toast(err.message, true); } finally { setBusy(button, false); }
}
async function refreshTeacherWorkspace() { state.teacherWorkspace = await api('teacherWorkspace'); renderTeacherWorkspace(); }
async function syncTeacherData() { state.teacherData = await api('teacherDashboard'); renderTeacherData(); }
async function saveScores(container, button) {
  try { setBusy(button, true, 'Сақталуда...'); const scores = $$('.score-select', container).map(s => Number(s.value)), feedback = $$('.feedback-input', container).map(s => s.value); await api('gradeAttempt', { attemptId: container.dataset.record, scores, feedback, teacherComment: $('[data-comment]', container).value }); state.teacherData = await api('teacherDashboard'); renderTeacherData(); toast('Баға сақталды'); }
  catch (err) { toast(err.message, true); } finally { setBusy(button, false); }
}
async function resetStudentPassword(userId) { if (!confirm('Оқушыға жаңа уақытша құпиясөз жасалсын ба? Бұрынғы құпиясөз жарамсыз болады.')) return; try { const result = await api('resetStudentPassword', { userId }); showCredential('Жаңа уақытша құпиясөз', result.temporaryPassword); toast('Жаңа уақытша құпиясөз жасалды'); } catch (err) { toast(err.message, true); } }
async function toggleStudent(userId) { const user = state.teacherData.users.find(u => u.id === userId); if (!user) return; try { await api('updateStudent', { userId, active: !user.active }); state.teacherData = await api('teacherDashboard'); renderTeacherData(); toast('Аккаунт жаңартылды'); } catch (err) { toast(err.message, true); } }
function showCredential(title, password, login = '') {
  const text = [login ? `Логин: ${login}` : '', `Уақытша құпиясөз: ${password}`].filter(Boolean).join('\n');
  const box = $('#credentialResult'); if (box) { box.classList.remove('hidden'); box.innerHTML = `<strong>${escapeHtml(title)}</strong><code>${escapeHtml(text)}</code><button class="small-button" type="button" id="copyCredential">Көшіру</button><small>Бұл құпиясөз ашық түрде сақталмайды. Қазір көшіріп, оқушыға жеке беріңіз.</small>`; $('#copyCredential').onclick = async () => { await navigator.clipboard.writeText(text); toast('Логин мен құпиясөз көшірілді'); }; }
  else alert(`${title}\n${text}\n\nБұл құпиясөзді қазір сақтап алыңыз.`);
}
function exportCsv() {
  const rows = [['Оқушы', 'Логин', 'Сынып', 'Диагностика', 'Тапсырылған уақыт', 'Беттен ауысу', 'Жалпы балл', ...Object.values(skillLabels)]]; (state.teacherData.attempts || []).filter(a => a.status !== 'in_progress').forEach(r => { const skillRows = (state.teacherData.skillScores || []).filter(s=>s.userId===r.userId && s.sourceId===r.id); const map={}; skillRows.forEach(s=>map[s.skillKey]=s.score); rows.push([r.student.name, r.student.login, r.student.className || r.student.grade, attemptType(r)==='final'?'Қорытынды':'Бастапқы', formatDate(r.submittedAt), r.switches || 0, r.status === 'graded' ? r.totalScore : '', ...Object.keys(skillLabels).map(k=>map[k]??'')]); });
  const csv = '\ufeff' + rows.map(row => row.map(v => `"${String(v ?? '').replaceAll('"', '""')}"`).join(';')).join('\n'), blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }), a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'code-think-results.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function requireXlsx() { if (!window.XLSX) throw new Error('Excel модулі жүктелмеді. Интернетті тексеріп, бетті Ctrl + F5 арқылы жаңартыңыз.'); }
function downloadStudentTemplate() {
  try {
    requireXlsx();
    const headers = ['Аты-жөні', 'Логин', 'Сынып', 'Сынып атауы', 'Құпиясөз (міндетті емес)'];
    const students = XLSX.utils.aoa_to_sheet([headers, ['', '', '', '', ''], ['', '', '', '', '']]);
    students['!cols'] = [{wch:28},{wch:18},{wch:10},{wch:16},{wch:26}];
    const info = XLSX.utils.aoa_to_sheet([
      ['CODE THINK оқушыларын жаппай тіркеу'],
      ['1. «Оқушылар» парағындағы баған атауларын өзгертпеңіз.'],
      ['2. Сынып бағанына тек 7 немесе 8 санын жазыңыз.'],
      ['3. Сынып атауына 7А, 7Ә, 8А сияқты толық атауды жазыңыз.'],
      ['4. Құпиясөзді бос қалдырсаңыз, платформа қауіпсіз уақытша құпиясөз жасайды.'],
      ['5. Дайын файлды платформаға жүктегеннен кейін парольдер жазылған нәтиже файлы автоматты түрде беріледі.']
    ]);
    info['!cols'] = [{wch:105}];
    const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, students, 'Оқушылар'); XLSX.utils.book_append_sheet(book, info, 'Нұсқаулық');
    XLSX.writeFile(book, 'CODE_THINK_оқушылар_шаблоны.xlsx');
  } catch (err) { toast(err.message, true); }
}
async function importStudentsFromExcel() {
  const input = $('#studentExcelFile'), button = $('#importStudentsButton'), resultBox = $('#batchImportResult');
  try {
    requireXlsx();
    const file = input.files?.[0]; if (!file) throw new Error('Алдымен толтырылған Excel файлын таңдаңыз.');
    setBusy(button, true, 'Тіркелуде...'); resultBox.classList.add('hidden'); resultBox.classList.remove('error');
    const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames.includes('Оқушылар') ? 'Оқушылар' : workbook.SheetNames[0]];
    const matrix = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });
    const headerIndex = matrix.findIndex(row => String(row[0] || '').trim() === 'Аты-жөні' && row.some(cell => String(cell || '').trim() === 'Логин'));
    if (headerIndex < 0) throw new Error('Excel файлынан «Аты-жөні» және «Логин» бағандары табылмады. Дайын шаблонды пайдаланыңыз.');
    const headers = matrix[headerIndex].map(value => String(value || '').trim());
    const column = name => headers.indexOf(name);
    const required = ['Аты-жөні', 'Логин', 'Сынып', 'Сынып атауы'];
    if (required.some(name => column(name) < 0)) throw new Error('Excel шаблонының міндетті бағандары өзгертілген.');
    const passwordColumn = column('Құпиясөз (міндетті емес)');
    const students = matrix.slice(headerIndex + 1).map(row => ({
      name: String(row[column('Аты-жөні')] || '').trim(),
      login: String(row[column('Логин')] || '').trim(),
      grade: String(row[column('Сынып')] || '').trim(),
      className: String(row[column('Сынып атауы')] || '').trim(),
      password: passwordColumn >= 0 ? String(row[passwordColumn] || '').trim() : ''
    })).filter(x => x.name || x.login || x.className);
    if (!students.length) throw new Error('«Оқушылар» парағында толтырылған жол жоқ.');
    if (students.length > 200) throw new Error('Бір импортта ең көбі 200 оқушы тіркеуге болады.');
    const response = await api('createStudentsBatch', { students });
    downloadStudentImportResult(response.results || []);
    resultBox.textContent = `${response.created} оқушы тіркелді. ${response.failed ? response.failed + ' жолда қате бар. ' : ''}Логин мен уақытша құпиясөздер файлы жүктелді.`;
    resultBox.classList.remove('hidden'); if (response.failed) resultBox.classList.add('error');
    input.value = ''; await syncTeacherData(); await refreshTeacherWorkspace();
    toast(`${response.created} оқушы тіркелді`);
  } catch (err) {
    resultBox.textContent = err.message; resultBox.classList.remove('hidden'); resultBox.classList.add('error'); toast(err.message, true);
  } finally { setBusy(button, false); }
}
function downloadStudentImportResult(rows) {
  requireXlsx();
  const data = rows.map(x => ({ 'Жол': x.row, 'Аты-жөні': x.name, 'Логин': x.login, 'Сынып': x.grade, 'Сынып атауы': x.className, 'Уақытша құпиясөз': x.temporaryPassword, 'Нәтиже': x.status }));
  const sheet = XLSX.utils.json_to_sheet(data, { header: ['Жол','Аты-жөні','Логин','Сынып','Сынып атауы','Уақытша құпиясөз','Нәтиже'] });
  sheet['!cols'] = [{wch:8},{wch:28},{wch:18},{wch:10},{wch:16},{wch:24},{wch:36}];
  const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Аккаунттар'); XLSX.writeFile(book, 'CODE_THINK_оқушы_логиндері.xlsx');
}
function formatDate(value) { return value ? new Date(value).toLocaleString('kk-KZ') : '—'; }
async function toggleFullscreen() { try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen(); } catch { toast('Толық экран қолжетімсіз', true); } }

document.addEventListener('click', event => { const goButton = event.target.closest('[data-go]'); if (goButton) location.hash = goButton.dataset.go; }); window.addEventListener('hashchange', () => go(location.hash.slice(1)));
$('#menuButton').addEventListener('click', () => { const open = $('#mainNav').classList.toggle('open'); $('#menuButton').setAttribute('aria-expanded', String(open)); });
$$('.open-login').forEach(button => button.addEventListener('click', () => openLoginModal(button.dataset.loginRole)));
$$('[data-role-choice]').forEach(button => button.addEventListener('click', () => openLoginModal(button.dataset.roleChoice)));
$('#closeLoginModal').addEventListener('click', closeLoginModal);
$('#loginModal').addEventListener('click', event => { if (event.target === $('#loginModal')) closeLoginModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#loginModal').classList.contains('hidden')) closeLoginModal(); });
$('#loginForm').addEventListener('submit', async event => {
  event.preventDefault(); const button = $('button[type="submit"]', event.currentTarget), role = $('#loginRole').value; $('#loginError').textContent = '';
  try {
    setBusy(button, true, 'Кіру...');
    const data = await api('login', { login: $('#loginName').value, password: $('#loginPassword').value });
    if (data.user.role !== role) throw new Error(role === 'teacher' ? 'Мұғалім аккаунтымен кіріңіз.' : 'Оқушы аккаунтымен кіріңіз.');
    setSession(data); closeLoginModal();
    if (role === 'student') { await changeTemporaryPasswordIfNeeded(); await syncStudentData(); state.workspace = await api('studentWorkspace'); go('assignments'); toast('Оқушы кабинетіне қош келдіңіз!'); }
    else { await renderTeacherArea(); go('teacher'); toast('Мұғалім панелі ашылды'); }
  } catch (err) { $('#loginError').textContent = err.message; } finally { setBusy(button, false); }
});
$('#createStudentForm').addEventListener('submit', async event => {
  event.preventDefault(); const form = event.currentTarget; const button = $('button', form); $('#createStudentError').textContent = '';
  try { setBusy(button, true, 'Құрылуда...'); const login = $('#newStudentLogin').value; const result = await api('createStudent', { name: $('#newStudentName').value, login, grade: $('#newStudentGrade').value, className: $('#newStudentClass').value, password: $('#newStudentPassword').value }); form.reset(); await syncTeacherData(); renderTeacherWorkspace(); showCredential('Оқушы аккаунты құрылды', result.temporaryPassword, result.user.login || login); toast('Оқушы аккаунты құрылды'); }
  catch (err) { $('#createStudentError').textContent = err.message; } finally { setBusy(button, false); }
});
$('#downloadStudentTemplate').addEventListener('click', downloadStudentTemplate);
$('#importStudentsButton').addEventListener('click', importStudentsFromExcel);
function showTeacherPanel(id) { ['analyticsPanel', 'resultsPanel', 'taskResultsPanel', 'studentsPanel', 'managementPanel'].forEach(x => $('#' + x).classList.toggle('hidden', x !== id)); }
$('#showAnalytics').addEventListener('click', () => showTeacherPanel('analyticsPanel')); $('#showResults').addEventListener('click', () => showTeacherPanel('resultsPanel')); $('#showTaskResults').addEventListener('click', () => showTeacherPanel('taskResultsPanel')); $('#showStudents').addEventListener('click', () => showTeacherPanel('studentsPanel')); $('#showManagement').addEventListener('click', () => showTeacherPanel('managementPanel')); $('#exportButton').addEventListener('click', exportCsv); $('#printReport').addEventListener('click', () => window.print());
$('#toggleFinalDiagnostic').addEventListener('click', async () => { const button = $('#toggleFinalDiagnostic'); let changed = false; try { setBusy(button, true, 'Сақталуда...'); const result = await api('setFinalDiagnosticOpen', { open: !state.teacherData.finalDiagnosticOpen }); state.teacherData.finalDiagnosticOpen = result.open; changed = true; toast(result.open ? 'Қорытынды диагностика ашылды' : 'Қорытынды диагностика жабылды'); } catch (err) { toast(err.message, true); } finally { setBusy(button, false); if (changed) renderTeacherWorkspace(); } });
$('#createClassForm').addEventListener('submit', async event => { event.preventDefault(); const form = event.currentTarget; const button = $('button', form); try { setBusy(button, true, 'Құрылуда...'); await api('createClass', { name: $('#newClassName').value, grade: $('#newClassGrade').value }); form.reset(); await refreshTeacherWorkspace(); toast('Сынып құрылды'); } catch (err) { toast(err.message, true); } finally { setBusy(button, false); } });
$('#createTaskForm').addEventListener('submit', async event => { event.preventDefault(); const form = event.currentTarget; const button = $('button', form); try { setBusy(button, true, 'Қосылуда...'); await api('createTask', { title: $('#newTaskTitle').value, grade: $('#newTaskGrade').value, topic: $('#newTaskTopic').value, scenario: $('#newTaskScenario').value, starterCode: $('#newTaskCode').value, difficulty: 'орта', testCases: [] }); form.reset(); await refreshTeacherWorkspace(); toast('Тапсырма банкке қосылды'); } catch (err) { toast(err.message, true); } finally { setBusy(button, false); } });
$('#createAssignmentForm').addEventListener('submit', async event => { event.preventDefault(); const form = event.currentTarget; const button = $('button', form); try { setBusy(button, true, 'Жариялануда...'); await api('createAssignment', { classId: $('#assignmentClass').value, taskId: $('#assignmentTask').value, dueAt: $('#assignmentDue').value }); form.reset(); await refreshTeacherWorkspace(); toast('Тапсырма сыныпқа берілді'); } catch (err) { toast(err.message, true); } finally { setBusy(button, false); } });
$('#teacherExit').addEventListener('click', async () => { await clearSession(); renderTeacherArea(); go('home'); }); $('#studentChip').addEventListener('click', async () => { if (!state.user) return openLoginModal('student'); if (confirm('Аккаунттан шығасыз ба?')) { await clearSession(); go('home'); } });
document.addEventListener('visibilitychange', () => { if (document.hidden && state.user?.role === 'student' && state.attempt?.status === 'in_progress' && $('#diagnostic').classList.contains('active')) { state.switches++; api('recordEvent', { attemptId: state.attempt.id, type: 'visibility_hidden', value: state.switches }).catch(() => {}); } });
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && state.attempt?.status === 'in_progress') api('recordEvent', { attemptId: state.attempt.id, type: 'fullscreen_exit' }).catch(() => {}); });
$('#diagnosticWorkspace').addEventListener('copy', event => { event.preventDefault(); toast('Диагностика кезінде көшіру өшірілген', true); if (state.attempt) api('recordEvent', { attemptId: state.attempt.id, type: 'copy_attempt' }).catch(() => {}); }); $('#diagnosticWorkspace').addEventListener('cut', event => event.preventDefault()); $('#diagnosticWorkspace').addEventListener('contextmenu', event => event.preventDefault());

async function boot() {
  updateGlobalUI(); if (state.token && state.user) { try { if (state.user.role === 'student') { await syncStudentData(); state.workspace = await api('studentWorkspace'); } else if (state.user.role === 'teacher') { state.teacherData = await api('teacherDashboard'); state.teacherWorkspace = await api('teacherWorkspace'); } } catch { await clearSession(false); } }
  $('#authorName').textContent = CONFIG.authorName || 'Информатика пәні мұғалімі'; renderDemoChart(); go(location.hash.slice(1) || 'home'); if (!apiConfigured()) toast('Алдымен config.js файлына сервер сілтемесін енгізіңіз', true);
}
function renderDemoChart() {
  const target = $('#demoChart'); if (!target) return; const baseline = { understanding:2, organization:2, algorithm:1, coding:2, debugging:1, explanation:1, transfer:1 }, finalScores = { understanding:3, organization:2, algorithm:3, coding:3, debugging:3, explanation:2, transfer:1 }; target.innerHTML = comparisonChart(baseline, finalScores, true);
}
boot();
