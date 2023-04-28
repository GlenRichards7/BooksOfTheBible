const bible = [
  { book: "Genesis", chapters: 50 },
  { book: "Exodus", chapters: 40 },
  { book: "Leviticus", chapters: 27 },
  { book: "Numbers", chapters: 36 },
  { book: "Deuteronomy", chapters: 34 },
  { book: "Joshua", chapters: 24 },
  { book: "Judges", chapters: 21 },
  { book: "Ruth", chapters: 4 },
  { book: "1 Samuel", chapters: 31 },
  { book: "2 Samuel", chapters: 24 },
  { book: "1 Kings", chapters: 22 },
  { book: "2 Kings", chapters: 25 },
  { book: "1 Chronicles", chapters: 29 },
  { book: "2 Chronicles", chapters: 36 },
  { book: "Ezra", chapters: 10 },
  { book: "Nehemiah", chapters: 13 },
  { book: "Esther", chapters: 10 },
  { book: "Job", chapters: 42 },
  { book: "Psalms", chapters: 150 },
  { book: "Proverbs", chapters: 31 },
  { book: "Ecclesiastes", chapters: 12 },
  { book: "Song of Solomon", chapters: 8 },
  { book: "Isaiah", chapters: 66 },
  { book: "Jeremiah", chapters: 52 },
  { book: "Lamentations", chapters: 5 },
  { book: "Ezekiel", chapters: 48 },
  { book: "Daniel", chapters: 12 },
  { book: "Hosea", chapters: 14 },
  { book: "Joel", chapters: 3 },
  { book: "Amos", chapters: 9 },
  { book: "Obadiah", chapters: 1 },
  { book: "Jonah", chapters: 4 },
  { book: "Micah", chapters: 7 },
  { book: "Nahum", chapters: 3 },
  { book: "Habakkuk", chapters: 3 },
  { book: "Zephaniah", chapters: 3 },
  { book: "Haggai", chapters: 2 },
  { book: "Zechariah", chapters: 14 },
  { book: "Malachi", chapters: 4 },
  { book: "Matthew", chapters: 28 },
  { book: "Mark", chapters: 16 },
  { book: "Luke", chapters: 24 },
  { book: "John", chapters: 21 },
  { book: "Acts", chapters: 28 },
  { book: "Romans", chapters: 16 },
  { book: "1 Corinthians", chapters: 16 },
  { book: "2 Corinthians", chapters: 13 },
  { book: "Galatians", chapters: 6 },
  { book: "Ephesians", chapters: 6 },
  { book: "Philippians", chapters: 4 },
  { book: "Colossians", chapters: 4 },
  { book: "1 Thessalonians", chapters: 5 },
  { book: "2 Thessalonians", chapters: 3 },
  { book: "1 Timothy", chapters: 6 },
  { book: "2 Timothy", chapters: 4 },
  { book: "Titus", chapters: 3 },
  { book: "Philemon", chapters: 1 },
  { book: "Hebrews", chapters: 13 },
  { book: "James", chapters: 5 },
  { book: "1 Peter", chapters: 5 },
  { book: "2 Peter", chapters: 3 },
  { book: "1 John", chapters: 5 },
  { book: "2 John", chapters: 1 },
  { book: "3 John", chapters: 1 },
  { book: "Jude", chapters: 1 },
  { book: "Revelation", chapters: 22 },
];
let bibleIndexNum = 0; // Math.floor(Math.random() * bible.length) // Pick a random question.
let mode = "How many chapters in "; // 'What is book # '

loadDependingOnMode();

// Hitting <Enter> key is the same as clicking.
document
  .getElementById("answer")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("check").click();
    }
  });

document.getElementById("check").addEventListener("click", function () {
  checkAnswer(document.getElementById("answer").value);
});

document.getElementById("reset").addEventListener("click", function () {
  resetForm(false);
});

document.getElementById("modeToggle").addEventListener("click", function () {
  resetForm(true);
});

function loadDependingOnMode() {
  if (mode == "What is book # ") {
    document.getElementById("question").innerHTML =
      mode + (bibleIndexNum + 1) + "?";
  } else {
    document.getElementById("question").innerHTML =
      mode + bible[bibleIndexNum].book + "?";
  }
}

function checkAnswer(answer) {
  let isAnswerCorrect;
  let resultText;
  if (mode == "What is book # ") {
    isAnswerCorrect =
      answer.toLowerCase() == bible[bibleIndexNum].book.toLowerCase();
    resultText =
      bibleIndexNum +
      1 +
      " - your answer: " +
      answer +
      ", right answer: " +
      bible[bibleIndexNum].book;
  } else {
    isAnswerCorrect = answer == bible[bibleIndexNum].chapters;
    resultText =
      bible[bibleIndexNum].book +
      " - your answer: " +
      answer +
      ", right answer: " +
      bible[bibleIndexNum].chapters;
  }

  const row = document.getElementById("result").insertRow(0);
  if (!isAnswerCorrect) {
    row.classList.add("wrongAnswer");
  }
  row.insertCell(0).innerHTML = resultText;

  document.getElementById("answer").value = "";
  document.getElementById("answer").select();

  bibleIndexNum++;
  if (bibleIndexNum < bible.length) {
    loadDependingOnMode();
  } else {
    document.getElementById("question").innerHTML = mode + "Complete!";
    document.getElementById("answer").disabled = true;
    document.getElementById("check").disabled = true;
  }
}

function resetForm(toggle) {
  bibleIndexNum = 0;
  document.getElementById("result").innerHTML = "";
  document.getElementById("answer").value = "";

  document.getElementById("answer").disabled = false;
  document.getElementById("check").disabled = false;

  if (toggle) {
    if (mode == "What is book # ") {
      document.getElementById("modeToggle").textContent =
        "Change to Book Order";
      mode = "How many chapters in ";
    } else {
      document.getElementById("modeToggle").textContent =
        "Change to How Many Chapters";
      mode = "What is book # ";
    }
  }

  loadDependingOnMode();

  document.getElementById("answer").select();
}
