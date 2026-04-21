/* ----------------------------------------------------------------
   Flipdish Internal Calculators — simple password gate
   ----------------------------------------------------------------
   This is a SOFT gate. The password sits in plain JS and anyone
   who views source can read it. It exists to keep casual / public
   visitors out of internal tools — it is NOT real security.
   Replace with SSO / Vercel password protection when available.
   ---------------------------------------------------------------- */
(function () {
  var SESSION_KEY = 'fdInternalAuth';
  var PASSWORD    = 'Flipdish';

  // If this tab has already been unlocked, do nothing.
  try {
    if (sessionStorage.getItem(SESSION_KEY) === '1') return;
  } catch (e) { /* sessionStorage blocked — fall through and ask anyway */ }

  function buildGate() {
    // Styles
    var style = document.createElement('style');
    style.id = 'fd-auth-style';
    style.textContent = [
      '#fd-auth-overlay{',
      '  position:fixed;inset:0;z-index:2147483647;',
      '  background:#F6F9FC;',
      '  display:flex;align-items:center;justify-content:center;',
      '  font-family:Roboto,-apple-system,BlinkMacSystemFont,sans-serif;',
      '  color:#0A1F33;padding:24px;',
      '}',
      '#fd-auth-overlay *{box-sizing:border-box;}',
      '#fd-auth-overlay .fd-card{',
      '  background:#fff;border:1px solid #E1E8EF;border-radius:16px;',
      '  box-shadow:0 2px 6px rgba(10,31,51,.08),0 12px 28px rgba(10,31,51,.12);',
      '  padding:36px 32px;max-width:420px;width:100%;text-align:center;',
      '}',
      '#fd-auth-overlay .fd-lock{',
      '  width:52px;height:52px;border-radius:14px;',
      '  background:rgba(6,72,133,.10);color:#064885;',
      '  display:flex;align-items:center;justify-content:center;',
      '  margin:0 auto 18px;',
      '}',
      '#fd-auth-overlay h1{',
      '  font-family:Domine,serif;font-size:22px;font-weight:600;',
      '  margin:0 0 8px;color:#0A1F33;',
      '}',
      '#fd-auth-overlay p{',
      '  margin:0 0 20px;font-size:14px;line-height:1.5;color:#5A6A7A;',
      '}',
      '#fd-auth-overlay form{display:flex;flex-direction:column;gap:10px;}',
      '#fd-auth-overlay input{',
      '  width:100%;padding:12px 14px;font-size:15px;',
      '  border:1px solid #E1E8EF;border-radius:10px;outline:none;',
      '  font-family:inherit;color:#0A1F33;background:#fff;',
      '}',
      '#fd-auth-overlay input:focus{border-color:#0074D9;box-shadow:0 0 0 3px rgba(0,116,217,.15);}',
      '#fd-auth-overlay button{',
      '  width:100%;padding:12px 14px;font-size:15px;font-weight:500;',
      '  border:0;border-radius:10px;cursor:pointer;',
      '  background:#0074D9;color:#fff;font-family:inherit;',
      '  transition:background .15s ease;',
      '}',
      '#fd-auth-overlay button:hover{background:#064885;}',
      '#fd-auth-overlay .fd-err{',
      '  margin-top:12px;font-size:13px;color:#C0392B;min-height:18px;',
      '}',
      '#fd-auth-overlay .fd-foot{',
      '  margin-top:22px;padding-top:18px;border-top:1px solid #E1E8EF;',
      '  font-size:12px;color:#5A6A7A;',
      '}',
      '#fd-auth-overlay .fd-back{',
      '  display:inline-block;margin-top:10px;font-size:13px;',
      '  color:#0074D9;text-decoration:none;',
      '}',
      '#fd-auth-overlay .fd-back:hover{text-decoration:underline;}'
    ].join('');
    document.head.appendChild(style);

    // Overlay markup
    var overlay = document.createElement('div');
    overlay.id = 'fd-auth-overlay';
    overlay.innerHTML = [
      '<div class="fd-card">',
      '  <div class="fd-lock">',
      '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
      '    </svg>',
      '  </div>',
      '  <h1>Internal calculator</h1>',
      '  <p>This tool is for Flipdish staff only. Enter the team password to continue.</p>',
      '  <form id="fd-auth-form">',
      '    <input id="fd-auth-input" type="password" autocomplete="off" autofocus placeholder="Team password" aria-label="Team password">',
      '    <button type="submit">Unlock</button>',
      '  </form>',
      '  <div class="fd-err" id="fd-auth-err" aria-live="polite"></div>',
      '  <div class="fd-foot">',
      '    Need access? Ask Commercial Enablement.',
      '    <br><a class="fd-back" href="../../">&larr; Back to calculator hub</a>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var form  = document.getElementById('fd-auth-form');
    var input = document.getElementById('fd-auth-input');
    var err   = document.getElementById('fd-auth-err');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PASSWORD) {
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
        overlay.remove();
        style.remove();
      } else {
        err.textContent = 'Wrong password — try again.';
        input.value = '';
        input.focus();
      }
    });

    // Focus helper: autofocus attr is flaky on some browsers
    setTimeout(function () { try { input.focus(); } catch (e) {} }, 50);
  }

  // Make sure the DOM is ready before we inject
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGate);
  } else {
    buildGate();
  }
})();
