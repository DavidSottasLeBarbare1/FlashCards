console.log('Hello World')

  const flashcard = document.getElementById('myFlashcard');

  flashcard.addEventListener('click', function() {
    this.classList.toggle('is-flipped');
  });

    const inputQ = document.getElementById('question');
    const outputQ = document.getElementById('question-text');

    inputQ.addEventListener('input', () => {
      outputQ.textContent = inputQ.value;
    });


    const inputA = document.getElementById('answer');
    const outputA = document.getElementById('answer-text');

    inputA.addEventListener('input', () => {
      outputA.textContent = inputA.value;
    });
