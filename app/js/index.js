var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

var modals = {

  initialize: function () {
    const $loginModal = $('#login');
    $loginModal.openModal();
    $loginModal.addClass('active');
    this.bindModalListneres();
  },

  bindModalListneres: function() {
    var $modalTriggers = document.getElementsByClassName('modal-trigger');
    for (var i = 0; i < $modalTriggers.length; i++) {
      const $modalTrigger = $modalTriggers[i];
      $modalTrigger.addEventListener('click', function () {
        const hrefTest = this.hash;
        const $openModal = $(hrefTest),
          $closeModal = $('.modal.active');
        $closeModal.closeModal();
        $closeModal.removeClass('active');
        $openModal.openModal();
        $openModal.addClass('active');
      }, false);
    }
  }
};

app.initialize();
modals.initialize();
