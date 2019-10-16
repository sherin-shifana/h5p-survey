H5P.Survey = (function ($, UI) {

  function Survey(options, id) {
    const that = this;
    that.options = options;
    // Keep provided id.
    that.id = id;
  };

  Survey.prototype.createFeedback = function () {
    const that = this;
    this.$tableDiv = $('<table class="feedback-table"></table>');
    this.$row1 = $('<tr class="table-heading"></tr>').appendTo(this.$tableDiv);
    this.$questionCol = $('<th colspan="2">Questions</th>').appendTo(this.$row1);
    this.$answerCol = $('<th>Answer</th>').appendTo(this.$row1);
    this.$scoreCol = $('<th>Score</th>').appendTo(this.$row1);
    for (let i=0; i<this.options.questions.length; i++) {
      // this.$rowDiv = $('<div class="row"></div>');
      this.$row2 = $('<tr data-id="'+i+'"></tr>');

      this.$col1 = $('<td data-id="'+i+'" class="f-question-number"><span>'+(i+1)+'</span></td>');
      this.$col2 = $('<td data-id="'+i+'" class="f-question">'+this.options.questions[i].text+'</td>');
      this.$col3 = $('<td data-id="'+i+'" class="f-answer"></td>');
      this.$col4 = $('<td data-id="'+i+'" class="f-score"></td>');
      this.$col5 = $('<td data-id="'+i+'" class="f-feedback"></td>');
      this.$feedbackButton = UI.createButton({
        title: 'feedback',
        'text': '...',
        'class': 'show-feedback'
      });
      for (let j = 0; j < this.options.questions[i].answers.length; j++) {

        this.$coli1 = $('<td class="td" scope="row" data-id='+i+'.'+j+'>'+this.options.questions[i].answers[j].text+'</td><br>');
        this.$coli2 = $('<td class="td" scope="row" data-id='+i+'.'+j+'>'+this.options.questions[i].answers[j].score+'</td><br>');
        this.$coli3 = $('<td class="td" scope="row" data-id='+i+'.'+j+'>'+this.options.questions[i].answers[j].feedback+'</td><br>');

        if (this.$coli1[0].innerText === that.selected[i][0].innerText) {
          this.$coli1.addClass('selected-answer');
        }

        this.$coli1.appendTo(that.$col3);
        this.$coli2.appendTo(that.$col4);
        this.$coli3.appendTo(that.$col5);
      }
      this.$col1.appendTo(this.$row2);
      this.$col2.appendTo(this.$row2);
      this.$col3.appendTo(that.$row2);
      this.$col4.appendTo(that.$row2);
      this.$feedbackButton.appendTo(that.$col4);

      this.$feedbackButton.click(function(){
        that.showFeedbackPopup(i);
      });

      this.$row2.appendTo(this.$tableDiv);
      // this.$rowDiv.appendTo(that.$tableDiv);
    }
  };

  Survey.prototype.resetTask = function () {
    const that = this;
    that.$wrapper.remove();
    that.totalScore = 0;
    that.currentIndex = 0;
    that.attach(that.$container);
  };

  Survey.prototype.showFeedbackPopup = function (index) {
    const that = this;

    this.$feedbackPopup = $('<div class="modal ind-feedback"></div>').appendTo(that.$wrapper);
    this.$feedbackPopupContent = $('<div class="modal-content feedback-modal"></div>');
    this.$feedbackPopupBody = $('<table class="popup-body feedback-popup"></table>');
    this.$feedbackRow = $('<tr data-id="'+index+'"></tr>');

    this.$qNumCol = $('<td data-id="'+index+'" class="f-question-num">'+(index+1)+'</td>');
    this.$qCol = $('<td data-id="'+index+'" class="f-question">'+this.options.questions[index].text+'</td>');
    this.$ansCol = $('<td data-id="'+index+'" class="f-answer"></td>');
    this.$scoreCol = $('<td data-id="'+index+'" class="f-score"></td>');
    this.$feedbackCol = $('<td data-id="'+index+'" class="f-feedback"></td>');

    for (let j = 0; j < this.options.questions[index].answers.length; j++) {

      this.$coli1 = $('<td class="td" scope="row" data-id='+index+'.'+j+'>'+this.options.questions[index].answers[j].text+'</td><br>');
      this.$coli2 = $('<td class="td" scope="row" data-id='+index+'.'+j+'>'+this.options.questions[index].answers[j].score+'</td><br>');
      this.$coli3 = $('<td class="td" scope="row" data-id='+index+'.'+j+'>'+this.options.questions[index].answers[j].feedback+'</td><br>');

      if (this.$coli1[0].innerText === that.selected[index][0].innerText) {
        this.$coli1.addClass('selected-answer');
      }

      this.$coli1.appendTo(that.$ansCol);
      this.$coli2.appendTo(that.$scoreCol);
      this.$coli3.appendTo(that.$feedbackCol);
    }

    this.$closeBtn = UI.createButton( {
      title: 'close',
      'text': 'x',
      'class': 'close-button',
      click: function(){
        that.$feedbackPopup.remove();
      }
    });

    this.$qNumCol.appendTo(this.$feedbackRow);
    this.$qCol.appendTo(this.$feedbackRow);
    this.$ansCol.appendTo(that.$feedbackRow);
    this.$scoreCol.appendTo(that.$feedbackRow);
    this.$feedbackCol.appendTo(that.$feedbackRow);

    this.$closeBtn.appendTo(this.$feedbackPopupContent);
    this.$feedbackPopupBody.appendTo(this.$feedbackPopupContent);
    this.$feedbackPopupContent.appendTo(this.$feedbackPopup);
    that.$feedbackRow.appendTo(this.$feedbackPopupBody);
  };

  Survey.prototype.createFinalScreen = function () {
    const that = this;
    that.$gameContainer.remove();
    that.$popup.remove();
    that.createFeedback();
    that.$finalScreen = $('<div class="h5p-final-screen"></div>');
    that.$finalScreenElements = $('<div class="final-screen-elems"></div>');
    that.$feedbackTitle = $('<div class="final-screen-title"><h1>Feedback</h1></div>');
    that.$leftContainer = $('<div class="h5p-left-container"></div>');
    that.$rightContainer = $('<div class="h5p-right-container"></div>');

    that.$resultDiv = $('<div class="h5p-result-div"></div>');
    that.$retryButton = UI.createButton({
      title: 'retry',
      'text': 'Play Again',
      'class': 'retry-button',
      click: function() {
        that.resetTask();
      }
    });

    that.$totalScore = $('<div class="total-score">Total Score : </div>');
    that.$scoreDiv.appendTo(that.$totalScore);
    that.$totalScore.appendTo(that.$resultDiv);
    this.$scoreBar.appendTo(that.$resultDiv);
    that.$timeSpent.appendTo(that.$resultDiv);
    that.$resultDiv.appendTo(that.$leftContainer);
    that.$retryButton.appendTo(that.$leftContainer);
    that.$feedbackTitle.appendTo(that.$finalScreen);

    that.$tableDiv.appendTo(that.$rightContainer);

    that.$leftContainer.appendTo(that.$finalScreenElements);
    that.$rightContainer.appendTo(that.$finalScreenElements);
    that.$finalScreenElements.appendTo(that.$finalScreen);
    that.$finalScreen.appendTo(that.$wrapper);
  };

  Survey.prototype.createPopUp = function () {

    const that = this;
    that.timer.stop();

    this.$popup = $('<div class="modal"></div>');
    this.$popupContent = $('<div class="modal-content"></div>');
    this.$popupBody = $('<div class="popup-body"></div>');

    this.$img = $('<div/>', {
      'class': 'winner-icon'
    }).appendTo(this.$popupBody);
    this.$scoreDiv = $('<div class="score-bar"><span>'+that.totalScore+'</span>/'+that.maxScore+'</div>').appendTo(this.$popupBody);
    this.$scoreBar = UI.createScoreBar(that.maxScore)
    that.$scoreBar.setScore(that.totalScore);

    this.$scoreBar.appendTo(this.$popupBody);
    this.$timeSpent = $('<div class="time-spent">Total Time : <span>'+that.$timerDiv.find('time').text()+'</span></div>').appendTo(this.$popupBody);
    this.$popupFooter = $('<div class="modal-footer"></div>');

    this.$continueBtn = UI.createButton( {
      title: 'continue',
      'text': 'Continue',
      'class': 'continue-button',
      click: function(){
        that.createFinalScreen();
      }
    }).appendTo(this.$popupFooter);

    this.$popupBody.appendTo(this.$popupContent);
    this.$popupContent.appendTo(this.$popup);
    this.$popupFooter.appendTo(this.$popupContent);
    this.$popup.appendTo(that.$wrapper);
  };

  // Answer card
  Survey.prototype.createAnswerCard = function (index, answerIndex) {
    const that = this;
      this.$answercard = $('<div class="answer-card" data-id="'+that.dataId+'"></div>');
      this.$answerText = $('<div class="answer-text">'+this.options.questions[index].answers[answerIndex].text+'</div>');
      const hasImage = this.options.questions[index].answers[answerIndex].image.file ? true : false;

      if (hasImage) {
        const path = H5P.getPath(this.options.questions[index].answers[answerIndex].image.file.path,this.id);
        this.$answerImage = $('<img>', {
              'class': 'answer-image',
              'src': path
        });
      }

      that.$answerImage.appendTo(this.$answercard);
      that.$answerText.appendTo(this.$answercard);

      return this.$answercard;
  };

  Survey.prototype.calculateScore = function (score) {
    const that = this;
    that.$currentScore.empty();
    that.totalScore += score;
    that.$currentScore.append( '0000'.substr( String(that.totalScore).length ) + that.totalScore );
  };

  // Creating question card
  Survey.prototype.createQuestionCard = function () {
    const that = this;
    this.$questionCards = [];
    this.selected = [];
    this.maxScore = 0;
    that.dataId = 1;
    this.totalScore = 0;
    this.totalQuestions = this.options.questions.length;
    this.slidePercentage = 100 / this.totalQuestions;

    for (let i=0; i<this.options.questions.length; i++){
      this.$questionCard = $('<div class="question-card"></div>');
      this.$question = $('<div class="question">'+this.options.questions[i].text+'</div>');
      this.maxScore += that.options.questions[i].actualScore;
      this.$question.appendTo(this.$questionCard);

      for (let j=0; j<this.options.questions[i].answers.length;j++) {
        this.$answerDiv = $('<div class="answer-div"></div>');
        that.createAnswerCard(i, j);
        that.dataId += 1;
        that.$answercard.appendTo(this.$answerDiv);
        this.$answerDiv.appendTo(this.$questionCard);

        this.$answerDiv.click(function() {
          this.score = that.options.questions[i].answers[j].score;
          that.calculateScore(this.score);
          this.isAnswered = true;
          that.selected.push($(this));
          that.progress = (((i+1)/that.totalQuestions)*100);
          console.log(that.progress);
          that.updateProgress();
          if (that.currentIndex < that.$questionCards.length-1) {
            that.currentIndex = that.currentIndex + 1;
            that.showQuestionCard();
          }
          else if (that.currentIndex === that.$questionCards.length-1) {
            that.createPopUp();
          }
        });
      }

      this.$questionCards.push(this.$questionCard);

    }
    return this.$questionCards;
  };

  // Show Question card
  Survey.prototype.showQuestionCard = function () {
    const that = this;
    if (that.currentIndex > 0) {
          this.prevIndex = that.currentIndex - 1;
          that.$questionCards[this.prevIndex].remove();
    }
    if (that.currentIndex !== that.$questionCards.length) {
          this.nextIndex = that.currentIndex + 1;
    }

    that.$questionCards[that.currentIndex].appendTo(that.$questionDiv);
  };

  Survey.prototype.updateProgress = function (index) {
      const that = this;
      let percentage = 100 - that.progress;
      console.log(percentage);
      that.$progressBar.css('background-position', String(percentage) + '%');
      this.$dot = that.$progressBar.children();
      let tooltipPos = percentage - 7.5;
      this.$dot.css('right', String(tooltipPos) + '%');
      console.log(that.totalQuestions, that.currentIndex);
      tooltip = that.currentIndex + 1 +' / '+ that.totalQuestions;
      this.$dot.html(tooltip);
  };

  Survey.prototype.createProgressBar = function () {
    const that = this;
    let $bar, $dot, $tooltip, tooltip;
      $bar = $('<div>', { 'class': 'progressbar' });
      $bar.hide();

      $tooltip = $('<div>', { 'class': 'tooltip' });
      tooltip = that.currentIndex +' / '+ this.options.questions.length;
      $tooltip.html(tooltip);
      $bar.append($tooltip);

      return $bar;
  };
  // Start the game, when clicking the Start button
  Survey.prototype.startGame = function () {
    const that = this;
    this.currentIndex = 0;
    this.currentScore = 0;
    this.$gameContainer = $('<div class="h5p-game-container"></div>');
    this.$topDiv = $('<div class="h5p-top-div"></div>');
    this.$questionDiv = $('<div class="question-card"></div>');
    this.$skipButton = UI.createButton({
      title: 'skip',
      'text': 'Skip',
      'class': 'skip-button',
      click: function(){
        if (that.currentIndex === that.$questionCards.length-1) {
          that.createPopUp();
        }
        else {
          that.currentIndex = that.currentIndex + 1;
          that.showQuestionCard();
        }

      }
    });

//     this.$progressBar = $('<div class="progress">'+
//   '<div class="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" >'+
//         '<span  class="popOver" data-toggle="tooltip" data-placement="top" title="85%"> </span> '+
// '</div></div>');
    this.$progressBar = that.createProgressBar();
    this.$progressBar.show();
    this.$currentScore = $('<div class="score">0000</div>');
    this.$scoreDiv = $('<div class="current-score"><span>Current Score</span></div>');
    this.$timerDiv = $('<div class="timer"><div class="h5p-time-spent"><time role="timer" datetime="PT00H00M0S">00:00:00</time></div></div>');

    that.createQuestionCard();
    that.showQuestionCard();
    that.timer = new H5P.Survey.Timer(that.$timerDiv.find('time')[0]);
    that.timer.play();
    // console.log(that.timer);
    this.$currentScore.appendTo(this.$scoreDiv);
    this.$scoreDiv.appendTo(this.$topDiv);
    this.$timerDiv.appendTo(this.$topDiv);

    this.$topDiv.appendTo(this.$gameContainer);
    this.$questionDiv.appendTo(this.$gameContainer);
    this.$skipButton.appendTo(this.$gameContainer);
    this.$progressBar.appendTo(this.$gameContainer);

    this.$gameContainer.appendTo(that.$wrapper);
  };

  Survey.prototype.showHelp = function () {
    const that = this;
    this.$helpWrapper= $('<div class="help-wrapper"></div>');
    this.$helpContainer = $('<div class="help-container"></div>');
    this.$helpText = $('<div class="help-text">Click one of the option that fits for you OR skip that question.</div>');
    this.$cards = $('<div class="help-cards"></div>');
    this.$card1 = $('<div class="help-card1">1</div>');
    this.$card2 = $('<div class="help-card2">2</div>');
    this.$button = $('<div class="help-skip-button">Skip</div>');

    this.$card1.appendTo(this.$cards);
    this.$card2.appendTo(this.$cards);

    this.$helpText.appendTo(this.$helpContainer);
    this.$cards.appendTo(this.$helpContainer);
    this.$button.appendTo(this.$helpContainer);
    this.$helpContainer.appendTo(this.$helpWrapper);
    that.$startButton.click(function(){
      that.$helpWrapper.remove();
      that.startGame();
    }).appendTo(this.$helpWrapper);
    this.$helpWrapper.appendTo(that.$wrapper);
  };

  // Create title screen DOM elements
  Survey.prototype.createTitleScreen = function () {
    const that = this;

    this.$titleCard = $('<div class="h5p-title-card"></div>');
    this.$title = $('<div class="h5p-survey-title">'+this.options.titleScreen.title.text+'</div>');
    this.$taskDescription = $('<div class="h5p-task-description">'+this.options.titleScreen.description+'</div>');
    this.$help = $('<div class="h5p-survey-help"><a>How to play?</a></div>');

    this.$help.click(function() {
      that.$titleCard.remove();
      that.showHelp();
    });

    this.$startButton = UI.createButton({
      title: 'start',
      'text': 'Start',
      'class': 'start-button',
      click: function(){
        that.$titleCard.remove();
        // that.$wrapper.empty();
        that.startGame();
      }
    });

    this.$title.appendTo(this.$titleCard);
    this.$taskDescription.appendTo(this.$titleCard);
    this.$help.appendTo(this.$titleCard);
    this.$startButton.appendTo(this.$titleCard);

    return this.$titleCard;
  };

  // Attach the title screen elements to the container
  Survey.prototype.attach = function ($container) {
    const that = this;
    this.$container = $container;
    $container.addClass('h5p-survey');
    this.$wrapper = $('<div class="h5p-wrapper"></div>');
    that.createTitleScreen();

    this.$titleCard.appendTo(this.$wrapper);
    this.$wrapper.appendTo($container);
  };

  return Survey;

})(H5P.jQuery, H5P.JoubelUI);
