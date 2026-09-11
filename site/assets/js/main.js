(function(){
  // flip cards (touch support)
  document.querySelectorAll('.flip').forEach(function(card){
    card.addEventListener('click', function(){ card.classList.toggle('flipped'); });
  });

  // quote modal
  var overlay = document.getElementById('quoteOverlay');
  var quoteForm = document.getElementById('quoteForm');
  var quoteSuccess = document.getElementById('quoteSuccess');
  var lastFocused = null;

  function openQuote(){
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    quoteForm.classList.remove('hide');
    quoteSuccess.classList.remove('show');
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
  quoteForm.addEventListener('submit', function(e){
    e.preventDefault();
    quoteForm.classList.add('hide');
    quoteSuccess.classList.add('show');
    quoteForm.reset();
  });
})();
