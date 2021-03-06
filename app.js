/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'How many regular season games are played in a year total?',
      answers: [
        '162',
        '584',
        '2430',
        '1950'
      ],
      correctAnswer: '2430',
      funFact: 'Each team play 162 games in a year, the 2430 number factors in overlap in each games 162 schedule.  The most recent exception to this is the 2020 season, where COVID-19 shortened the regular season to 60 games per team'
    },
    {
      question: 'Which award is for the best pitcher in each division?',
      answers: [
        'Hank Aaron',
        'Cy Young',
        'Roberto Clemente',
        'Edgar Martinez'
      ],
      correctAnswer: 'Cy Young',
      funFact: 'Despite having the pitching award named after him, Cy Young is not in the top 50 in ERA (Earned Run Average).  He still holds the record for most wins of all time by a pitcher'
    },
    {
      question: 'Which team was originally the Montreal Expos?',
      answers: [
        'Colorado Rockies',
        'Miami Marlins',
        'Washington Nationals',
        'Seattle Mariners'
      ],
      correctAnswer: 'Washington Nationals',
      funFact: 'Many consider the 1994-45 Major League Baseball Strike to be the down fall of of the Expos, having the best record in baseball (74-40) before the stoppage.  Fans lost interest and Montreal never recovered, leading to the move and name change in 2004'
    },
    {
      question: 'Which player has the current all time batting average (minimum 1000 games played and 1000 at bats)?',
      answers: [
        'Pete Rose',
        'Ty Cobb',
        'Babe Ruth',
        'Billy Hamilton'
      ],
      correctAnswer: 'Ty Cobb',
      funFact: 'Ty Cobb\'s batting average is all the more impressive since he played during the "dead ball" era of baseball, where rules favored pitchers'
    },
    {
      question: 'Which team has the most Pennant wins?',
      answers: [
        'New York Yankees',
        'Boston Red Sox',
        'San Francisco Giants',
        'Los Angeles Dodgers'
      ],
      correctAnswer: 'Los Angeles Dodgers',
      funFact: 'The Dodgers while holding the record for most Pennant wins, they also hold the record for World Series losses with 14 (although the Yankees are not too far behind with 13)'
    }
  ],
  quizStarted: false,
  questionNumber: 1,
  questionIndex: 0,
  score: function () {
    return (this.totalCorrect / this.questions.length) * 100;
  },
  totalCorrect: 0,
  totalIncorrect: 0
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateStartPage() {
  return `<div class="page">
    <h2>Are you ready to answer some Baseball Trivia?</h2>
    <button class="startQuiz">Start</button>
  </div>`;
}

function generateQuestionPage(questionObject) {
  let answers = questionObject.answers.map((answer, idx) => {
    if (idx === 0) {
      return `<div class="spaceBottom"><input type="radio" id="answer${idx}" name="answer" value="${answer}" required>
      <label for="answer${idx}">${answer}</label></div>`;
    }
    return `<div class="spaceBottom"><input type="radio" id="answer${idx}" name="answer" value="${answer}">
      <label for="answer${idx}">${answer}</label></div>`;
  });

  return `<div class="page">
      <div class="side-by-side">
        <h3>Question ${store.questionNumber} of ${store.questions.length}</h3>
        <h3>Current Grade: ${store.score()}%</h3>
      </div>
      <h2>${questionObject.question}</h2>
      <form class="answers">
          ${answers.join("")}
        <button class="submitOptions" type="submit">Submit</button>
      </form>
    </div>`;
}

function generateCorrectPage(questionObject) {
  return `<div class="page">
      <h2>Correct!</h2>
      <div class="shelf">
      <div class="funFact flex-two">
        <p>Fun Fact!</p>
        <p>${questionObject.funFact}</p>
      </div>
      <div class="score flex-one">
        <p>You have answered:</p>
        <p class="center">${store.totalCorrect} correctly</p>
        <p class="center">${store.totalIncorrect} incorrectly</p>
      </div>
      </div>
      <button class="nextQuestion">Next</button>
    </div>`;
}

function generateIncorrectPage(questionObject) {
  return `<div class="page">
      <h2>Incorrect!</h2>
      <div class ="shelf">
      <p class="score">The correct answer was: ${questionObject.correctAnswer}</p>
      <div class="score flex-one">
        <p>You have answered:</p>
        <p class="center">${store.totalCorrect} correctly</p>
        <p class="center">${store.totalIncorrect} incorrectly</p>
      </div>
      </div>
      <button class="nextQuestion">Next</button>
    </div>`;
}

function generateScorePage() {
  return `<div class="page">
      <h2>It's Over!</h2>
      <h2>Final score: ${store.score()}%</h2>
      <img src="Images/outfield.jpg" alt="I just want to use your love TONIIIIIIGIHT">
      <button class="startOver">Again?</button>
    </div>`;
}

/********** ASSISTANT FUNCTION(S) **********/

//These Functions keep the Event Handlers clean

function addCorrect(questionObject) {
  //append the correct page option
  let html = generateCorrectPage(questionObject);
  $('main').append(html);
}

function addIncorrect(questionObject) {
  //append the incorrect page option
  let html = generateIncorrectPage(questionObject);
  $('main').append(html);
}

function shuffleQuestions(array) {
  //A simple array shuffle using the Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuizApp() {
  let html = '';

  if (store.quizStarted === false) {
    html = generateStartPage();
    $('main').html(`${html}`);
  } else if (store.questionNumber > store.questions.length) {
    html = generateScorePage();
    $('main').html(html);
  } else {
    html = generateQuestionPage(store.questions[store.questionIndex]);
    $('main').html(html);
  }
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startQuizApp() {
  //What happens when the user hits submit
  //Randomize all questions and their answers
  //load in the first question page
  $('main').on('click', '.startQuiz', function (e) {
    e.preventDefault();

    shuffleQuestions(store.questions);
    for (let i = 0; i < store.questions.length; i++) {
      shuffleQuestions(store.questions[i].answers);
    }

    store.quizStarted = true;
    renderQuizApp();
  });
}

function submitAnswer() {
  //What happens then the user hits submit on the radio buttons
  //Should evaluate if the answer is true or not and then load the Correct/Incorrect Page
  $('main').on('submit', '.answers', function (e) {
    e.preventDefault();
    $('.submitOptions').remove();

    const playerAnswer = $('input[name="answer"]:checked').val();

    if (playerAnswer === store.questions[store.questionIndex].correctAnswer) {
      store.totalCorrect++;
      addCorrect(store.questions[store.questionIndex]);
    } else {
      store.totalIncorrect++;
      addIncorrect(store.questions[store.questionIndex]);
    }
  })
}

function clickNext() {
  //Increment Number and Index so the render can do its checks
  $('main').on('click', '.nextQuestion', function (e) {
    e.preventDefault();
    store.questionNumber++;
    store.questionIndex++;
    renderQuizApp();
  })
}

function playAgain() {
  //After the quiz is done, the player has the option to play again
  //by resetting the array and rendering
  $('main').on('click', '.startOver', function (e) {
    e.preventDefault();

    store.quizStarted = false;
    store.questionIndex = 0;
    store.questionNumber = 1;
    store.totalCorrect = 0;
    store.totalIncorrect = 0;

    renderQuizApp();
  })
}

/********** START UP FUNCTIONS **********/
function main() {
  renderQuizApp();
  startQuizApp();
  submitAnswer();
  clickNext();
  playAgain();
}

main();