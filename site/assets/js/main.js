(function(){
  // flip cards (touch support)
  document.querySelectorAll('.flip').forEach(function(card){
    card.addEventListener('click', function(){ card.classList.toggle('flipped'); });
  });

  // quote modal
  var overlay = document.getElementById('quoteOverlay');
  var quoteForm = document.getElementById('quoteForm');
  var quoteSuccess = document.getElementById('quoteSuccess');
  var quoteError = document.getElementById('quoteError');
  var lastFocused = null;

  function openQuote(){
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    quoteForm.classList.remove('hide');
    quoteSuccess.classList.remove('show');
    quoteError.classList.remove('show');
    var firstField = document.getElementById('qName');
    if (firstField) firstField.focus();
  }
  function closeQuote(){
    overlay.classList.remove('open');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-open-quote]').forEach(function(btn){
    btn.addEventListener('click', openQuote);
  });
  document.getElementById('quoteClose').addEventListener('click', closeQuote);
  overlay.addEventListener('click', function(e){ if (e.target === overlay) closeQuote(); });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeQuote();
  });
  function encodeForm(form){
    return new URLSearchParams(new FormData(form)).toString();
  }

  quoteForm.addEventListener('submit', function(e){
    e.preventDefault();
    var submitBtn = quoteForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    quoteError.classList.remove('show');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeForm(quoteForm)
    }).then(function(res){
      if (!res.ok) throw new Error('Network response was not ok');
      quoteForm.classList.add('hide');
      quoteSuccess.classList.add('show');
      quoteForm.reset();
    }).catch(function(){
      quoteError.classList.add('show');
    }).finally(function(){
      if (submitBtn) submitBtn.disabled = false;
    });
  });
})();
