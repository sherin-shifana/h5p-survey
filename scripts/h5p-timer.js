(function (Survey, Timer) {

  /**
   * Adapter between memory game and H5P.Timer
   *
   * @class H5P.Survey.Timer
   * @extends H5P.Timer
   * @param {H5P.jQuery} element
   */
  Survey.Timer = function (element) {

    /**
    * @alias H5P.Survey.Timer#
    */
    const that = this;

    // Initialize event inheritance
    Timer.call(that, 100);

    /**
    * @private {string}
    */
    const naturalState = element.innerText;

    /**
     * Set up callback for time updates.
     * Formats time stamp for humans.
     * @private
     */
    const update = function () {
      const time = that.getTime();
      let hours = Timer.extractTimeElement(time, 'hours');
      let minutes = Timer.extractTimeElement(time, 'minutes');
      let seconds = Timer.extractTimeElement(time, 'seconds') % 60;

      // Update duration attribute
      element.setAttribute('datetime', 'PT' + hours + 'H' + minutes + 'M' + seconds + 'S');

      // Add leading zero
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (hours < 10) {
        hours = '0' + hours;
      }
      element.innerText = hours + ':' + minutes + ':' + seconds;
    };

    // Setup default behavior
    that.notify('every_tenth_second', update);
    that.on('reset', function () {
      element.innerText = naturalState;
      that.notify('every_tenth_second', update);
    });
    // that.notify('every_tenth_minutes', update);
    that.on('reset', function () { 
      element.innerText = naturalState;
    });
  };

  // Inheritance
  Survey.Timer.prototype = Object.create(Timer.prototype);
  // Survey.Timer.prototype.constructor = Survey.Timer;

})(H5P.Survey, H5P.Timer);
