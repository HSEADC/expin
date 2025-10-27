(function () {
    'use strict';
    var quizApp = document.getElementById('quizApp');
    var screens = quizApp.querySelectorAll('.quizScreen');
    var collectedIdeas = [];
    // Navigate to a specific screen
    function goToScreen(n) {
      for (var i = 0; i < screens.length; i++) {
        screens[i].classList.remove('is-active');
      }
      var target = quizApp.querySelector('[data-screen="' + n + '"]');
      if (target) {
        target.classList.add('is-active');
      }
      window.scrollTo(0, 0);
    }
    // Start button
    document.getElementById('quizStartBtn').addEventListener('click', function () {
      goToScreen(1);
    });
    // Answer buttons on screens 1-3 (data-next attribute)
    var nextBtns = quizApp.querySelectorAll('.quizActionBtn[data-next]');
    for (var i = 0; i < nextBtns.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var nextScreen = parseInt(btn.getAttribute('data-next'), 10);
          goToScreen(nextScreen);
        });
      })(nextBtns[i]);
    }
    // Save idea button (screen 4 -> screen 5)
    document.getElementById('saveQuizIdeaBtn').addEventListener('click', function () {
      var textarea = document.getElementById('quizIdeaInput');
      var ideaText = textarea.value.trim();
      // Collect selected answers from all question screens
      var allChecked = quizApp.querySelectorAll('input[type="checkbox"]:checked');
      for (var i = 0; i < allChecked.length; i++) {
        collectedIdeas.push(allChecked[i].value);
      }
      // Add the written idea
      if (ideaText) {
        collectedIdeas.push(ideaText);
      }
      // Populate the final notes list
      var notesList = document.getElementById('quizNotesList');
      notesList.innerHTML = '';
      for (var j = 0; j < collectedIdeas.length; j++) {
        var noteDiv = document.createElement('div');
        noteDiv.className = 'quizNoteItem';
        noteDiv.textContent = collectedIdeas[j];
        notesList.appendChild(noteDiv);
      }
      // If no ideas were collected, show a placeholder
      if (collectedIdeas.length === 0) {
        var emptyDiv = document.createElement('div');
        emptyDiv.className = 'quizNoteItem';
        emptyDiv.textContent = 'Пока нет записанных идей';
        notesList.appendChild(emptyDiv);
      }
      goToScreen(5);
    });
  })();