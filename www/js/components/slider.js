jQuery(document).ready(function ($) {
  
  var slideCount = $('#slider > ul > li').length,
	    slideWidth = $('#slider > ul > li').width(),
      slideHeight = $('main').height(),
	    sliderUlWidth = $('#slider ul').width() * slideCount,
      // For paginator only
      currentPaginator = $('ul.pagination#controller li').index($('li.active')) + 1,
      // For tabs only
      currentTab = $('ul.tabs#controller li').index($('li.active')) + 1;

  $('#slider > ul').css({ width: sliderUlWidth, height: slideHeight, marginLeft: -slideWidth });

  $('#slider > ul > li').css({ width: slideWidth, height: slideHeight });

  $('#slider > ul > li:last-child').prependTo('#slider > ul');

  function moveLeftPaginator(lengthMove) {
    $('ul#controller > li:nth-child(' + currentPaginator + ')').removeClass('active');
    currentPaginator -= lengthMove;
    if (currentPaginator === 1) {
      currentPaginator = slideCount + 1;
    }
    $('ul#controller > li:nth-child(' + currentPaginator + ')').addClass('active');
  }

  function moveRightPaginator(lengthMove) {
    $('ul#controller > li:nth-child(' + currentPaginator + ')').removeClass('active');
    currentPaginator += lengthMove;
    if (currentPaginator === slideCount + 2) {
      currentPaginator = 2;
    }
    $('ul#controller > li:nth-child(' + currentPaginator + ')').addClass('active');
  }

  function moveRightTab(lengthMove) {
    $('ul#controller > li:nth-child(' + currentTab + ')').removeClass('active');
    currentTab += lengthMove;
    $('ul#controller > li:nth-child(' + currentTab + ')').addClass('active');
  }

  function moveLeftTab(lengthMove) {
    $('ul#controller > li:nth-child(' + currentTab + ')').removeClass('active');
    currentTab -= lengthMove;
    $('ul#controller > li:nth-child(' + currentTab + ')').addClass('active');
  }

  function moveLeft(lengthMove) {
    if (currentPaginator) {
      moveLeftPaginator(lengthMove);
    }
    else {
      moveLeftTab(lengthMove);
    }
    $('#slider > ul').animate({
      left: +slideWidth
    }, 200, function () {
      for (var i = 1; i <= lengthMove; i++) {
        $('#slider > ul > li:last-child').prependTo('#slider > ul');
        $('#slider > ul').css('left', '');
        $('#slider > ul > li:last-child div.fixed-action-btn').css('display', 'none');
      }
      $('#slider > ul > li:nth-child(2) div.fixed-action-btn').css('display', '');
    });
  };

  function moveRight(lengthMove) {
    if (currentPaginator) {
      moveRightPaginator(lengthMove);
    }
    else {
      moveRightTab(lengthMove);
    }
    $('#slider > ul').animate({
      left: -slideWidth
    }, 200, function () {
      for (var i = 1; i <= lengthMove; i++) {
        $('#slider > ul > li:first-child').appendTo('#slider > ul');
        $('#slider > ul').css('left', '');
        $('#slider > ul > li:first-child div.fixed-action-btn').css('display', 'none');
      }
      $('#slider > ul > li:nth-child(2) div.fixed-action-btn').css('display', '');
    });
  };

  $('a').click(function () {
    console.log('New page: ');
    var newPageNumber,
        diffPages;
    if (currentPaginator &&
        this.className.search('control_prev') === -1 &&
        this.className.search('control_next') === -1) {
      newPageNumber = $('ul.pagination#controller li').index(this.parentElement) + 1,
      diffPages = newPageNumber - currentPaginator;
      if (diffPages < 0) {
        moveLeft(-diffPages);
      }
      else {
        moveRight(diffPages);
      }
    }
    else if (currentTab) {
      newPageNumber = $('ul.tabs#controller li').index(this.parentElement) + 1,
      diffPages = newPageNumber - currentTab;
      if (diffPages < 0) {
        moveLeft(-diffPages);
      }
      else {
        moveRight(diffPages);
      }
    }
  });

  $('a.control_prev').click(function () {
    moveLeft(1);
  });

  $('a.control_next').click(function () {
    moveRight(1);
  });

});    