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

$(function () {
    var items = $(".accordion-items");
    items.on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).next().removeClass("open");
        } else {
            $(this).siblings().removeClass("active");
            $(this).next().siblings().removeClass("open");
            $(this).toggleClass("active");
            $(this).next().toggleClass("open");
        }
    });
});
$(function () {
    var items = $(".accordion-items");
    items.on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).next().removeClass("open");
        } else {
            $(this).siblings().removeClass("active");
            $(this).next().siblings().removeClass("open");
            $(this).toggleClass("active");
            $(this).next().toggleClass("open");
        }
    });
});
(function ($) {

  var methods = {
    init : function() {
      return this.each(function() {

      // For each set of icons, we want to keep track of
      // which icon is active and its associated content
      var $this = $(this);

      var $active, $content, $links = $this.find('li.icon a'),
          $index = 0;

      // If the location.hash matches one of the links, use that as the active icon.
      $active = $($links.filter('[href="'+location.hash+'"]'));

      // If no match is found, use the first link or any with class 'active' as the initial active icon.
      if ($active.length === 0) {
          $active = $(this).find('li.icon a.active').first();
      }
      if ($active.length === 0) {
        $active = $(this).find('li.icon a').first();
      }

      $active.addClass('active');
      $index = $links.index($active);
      if ($index < 0) {
        $index = 0;
      }

      $content = $($active[0].hash);

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });

      // Bind the click event handler
      $this.on('click', 'a', function(e) {
        if ($(this).parent().hasClass('disabled')) {
          e.preventDefault();
          return;
        }

        // Make the old icon inactive.
        $active.removeClass('active');
        $content.hide();

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);
        $links = $this.find('li.icon a');

        // Make the icon active.
        $active.addClass('active');
        $index = $links.index($(this));
        if ($index < 0) {
          $index = 0;
        }

        $content.show();

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });

    },
    select_icon : function( id ) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };

  $.fn.icons = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
    }
  };

  $(document).ready(function(){
    $('ul.icons').icons();
  });
}( jQuery ));

(function($){

  $.fn.simplePagination = function(options)
  {
    var settings = $.extend({}, $.fn.simplePagination.defaults, options);

    /*
     NUMBER FORMATTING
     */
    function simple_number_formatter(number, digits_after_decimal, thousands_separator, decimal_separator)
    {
      //OTHERWISE 0==false==undefined
      digits_after_decimal = isNaN(digits_after_decimal) ? 2 : parseInt(digits_after_decimal);
      //was a thousands place separator provided?
      thousands_separator = (typeof thousands_separator === 'undefined') ? ',' : thousands_separator;
      //was a decimal place separator provided?
      decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;

      //123.45 => 123==integer; 45==fraction
      var parts = ((+number).toFixed(digits_after_decimal) + '').split(decimal_separator),  // Force Number typeof with +: +number
      //obtain the integer part
        integer = parts[0] + '',
      //obtain the fraction part IF one exists
        fraction = (typeof parts[1] === 'undefined') ? '' : parts[1],
      //create the decimal(fraction) part of the answer
        decimal = digits_after_decimal > 0 ? decimal_separator + fraction : '',
      //find 1 or more digits, EXACTLY PRECEDING, exactly 3 digits
        pattern = /(\d+)(\d{3})/;
      //pattern = /(\d)(?=(\d{3})+$)/; .replace(..., '$1' + thousands_separator

      //while the pattern can be matched
      while(pattern.test(integer))
      {
        //insert the specified thousands place separator
        integer = integer.replace(pattern, '$1' + thousands_separator + '$2');
      }

      //return the formated number!
      return integer + decimal;
    }

    return this.each(function()
    {
      var container_id = '#' + $(this).attr('id'),
        items = $(this).find(settings.pagination_container).children(),
        item_count = items.length,
        items_per_page = parseInt(settings.items_per_page),
        page_count = Math.ceil(item_count / items_per_page),
        number_of_visible_page_numbers = parseInt(settings.number_of_visible_page_numbers);

      // Show the appropriate items given the specific page_number
      function refresh_page(page_number, item_range_min, item_range_max)
      {
        items.hide();
        items.slice(item_range_min, item_range_max).show();
      }

      function refresh_first(page_number)
      {
        // e.g.
        // <a href="#" class="simple-pagination-navigation-first [simple-pagination-nagivation-disabled]"
        // data-simple-pagination-page-number="1">First</a>
        /*
         var element = document.createElement(settings.navigation_element);
         element.id = 'rawr';
         element.href = '#';
         element.className = settings.html_prefix + '-navigation-first';
         element.className += page_count === 1 || page_number === 1 ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
         element.setAttribute('data-' + settings.html_prefix + '-page-number', 1);
         element.appendChild(document.createTextNode(settings.first_content));
         */
        var first_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-first';
        first_html += page_count === 1 || page_number === 1 ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
        first_html += '" data-' + settings.html_prefix + '-page-number="' + 1 + '">' + settings.first_content + '</' + settings.navigation_element + '>';
        return first_html;  // return element.outerHTML;
      }

      function refresh_previous(page_number)
      {
        var previous_page = page_number > 1 ? page_number - 1 : 1,
          previous_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-previous';
        previous_html += page_count === 1 || page_number === 1 ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
        previous_html += '" data-' + settings.html_prefix + '-page-number="' + previous_page + '">' + settings.previous_content + '</' + settings.navigation_element + '>';
        return previous_html;
      }

      function refresh_next(page_number)
      {
        var next_page = page_number + 1 > page_count ? page_count : page_number + 1,
          next_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-next';
        next_html += page_count === 1 || page_number === page_count ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
        next_html += '" data-' + settings.html_prefix + '-page-number="' + next_page + '">' + settings.next_content + '</' + settings.navigation_element + '>';
        return next_html;
      }

      function refresh_last(page_number)
      {
        var last_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-last';
        last_html += page_count === 1 || page_number === page_count ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
        last_html += '" data-' + settings.html_prefix + '-page-number="' + page_count + '">' + settings.last_content + '</' + settings.navigation_element + '>';
        return last_html;
      }

      function refresh_page_numbers(page_number)
      {
        // half_of_number_of_page_numbers_visable causes even numbers to be treated the same as the next LOWEST odd number (e.g. 6 === 5)
        // Used to center the current page number in 'else' below
        var half_of_number_of_page_numbers_visable = Math.ceil(number_of_visible_page_numbers / 2) - 1,
          current_while_page = 0,
          page_numbers_html = [],
          create_page_navigation = function()
          {
            page_number_html = '<' + settings.navigation_element + ' href="#" class="' + settings.html_prefix + '-navigation-page';
            page_number_html += page_count === 1 || page_number === current_while_page ? ' ' + settings.html_prefix + '-navigation-disabled' : '';
            page_number_html += '" data-' + settings.html_prefix + '-page-number="' + current_while_page + '">' + simple_number_formatter(current_while_page, 0, settings.thousands_separator) + '</' + settings.navigation_element + '>';
            page_numbers_html.push(page_number_html);
          };

        //are we on the left half of the desired truncation length?
        if(page_number <= half_of_number_of_page_numbers_visable)
        {
          var max = half_of_number_of_page_numbers_visable * 2 + 1;
          max = max > page_count ? page_count : max;
          while(current_while_page < max)
          {
            ++current_while_page;
            create_page_navigation();
          }
        }
        //are we on the right side of the desired truncation length?
        else if(page_number > page_count - half_of_number_of_page_numbers_visable)
        {
          var min = page_count - half_of_number_of_page_numbers_visable * 2 - 1;
          current_while_page = min < 0 ? 0 : min;
          while(current_while_page < page_count)
          {
            ++current_while_page;
            create_page_navigation();
          }
        }
        //have lots of pages
        //half_of_num... + number_of_visible_page_numbers + half_of_num...
        //center the current page between: number_of_visible_page_numbers
        else
        {
          var min = page_number - half_of_number_of_page_numbers_visable - 1,
            max = page_number + half_of_number_of_page_numbers_visable;
          current_while_page = min < 0 ? 0 : min;
          max = max > page_count ? page_count : max;//shouldn't need this but just being cautious
          while(current_while_page < max)
          {
            ++current_while_page;
            create_page_navigation();
          }
        }

        return page_numbers_html.join('');
      }

      function refresh_items_per_page_list()
      {
        var items_per_page_html = '';
        $.each(settings.items_per_page_content, function(k, v){
          k = (typeof k === 'Number') ? simple_number_formatter(k, 0, settings.thousands_separator) : k;
          v = parseInt(v);
          items_per_page_html += '<option value="' + v + '"';
          items_per_page_html += v === items_per_page ? ' selected' : '';
          items_per_page_html += '>' + k + '</option>\n';
        });
        return items_per_page_html;
      }

      function refresh_specific_page_list(page_number)
      {
        var select_html = '';
        for(var i=1; i<=page_count; i++)
        {
          select_html += '<option value="' + i + '"';
          select_html += i === page_number ? ' selected' : '';
          select_html += '>' + simple_number_formatter(i, 0, settings.thousands_separator) + '</option>\n';
        }
        return select_html;
      }

      function refresh_simple_pagination(page_number)
      {
        var item_range_min = page_number * items_per_page - items_per_page,
          item_range_max = item_range_min + items_per_page;

        item_range_max = item_range_max > item_count ? item_count : item_range_max;

        refresh_page(page_number, item_range_min, item_range_max);

        if(settings.use_first)
        {
          $(container_id + ' .' + settings.html_prefix + '-first').html(refresh_first(page_number));
        }
        if(settings.use_previous)
        {
          $(container_id + ' .' + settings.html_prefix + '-previous').html(refresh_previous(page_number));
        }
        if(settings.use_next)
        {
          $(container_id + ' .' + settings.html_prefix + '-next').html(refresh_next(page_number));
        }
        if(settings.use_last)
        {
          $(container_id + ' .' + settings.html_prefix + '-last').html(refresh_last(page_number));
        }
        if(settings.use_page_numbers && number_of_visible_page_numbers !== 0)
        {
          $(container_id + ' .' + settings.html_prefix + '-page-numbers').html(refresh_page_numbers(page_number));
        }
        if(settings.use_page_x_of_x)
        {
          var page_x_of_x_html = '' + settings.page_x_of_x_content + ' ' + simple_number_formatter(page_number, 0, settings.thousands_separator) + ' of ' + simple_number_formatter(page_count, 0, settings.thousands_separator);
          $(container_id + ' .' + settings.html_prefix + '-page-x-of-x').html(page_x_of_x_html);
        }
        if(settings.use_page_count)
        {
          $(container_id + ' .' + settings.html_prefix + '-page-count').html(page_count);
        }
        if(settings.use_showing_x_of_x)
        {
          var showing_x_of_x_html = settings.showing_x_of_x_content + ' ' + simple_number_formatter(item_range_min + 1, 0, settings.thousands_separator) + '-' + simple_number_formatter(item_range_max, 0, settings.thousands_separator) + ' of ' + simple_number_formatter(item_count, 0, settings.thousands_separator);
          $(container_id + ' .' + settings.html_prefix + '-showing-x-of-x').html(showing_x_of_x_html);
        }
        if(settings.use_item_count)
        {
          $(container_id + ' .' + settings.html_prefix + '-item-count').html(item_count);
        }
        if(settings.use_items_per_page)
        {
          $(container_id + ' .' + settings.html_prefix + '-items-per-page').html(refresh_items_per_page_list);
        }
        if(settings.use_specific_page_list)
        {
          $(container_id + ' .' + settings.html_prefix + '-select-specific-page').html(refresh_specific_page_list(page_number));
        }
      }
      refresh_simple_pagination(1);

      $(container_id).on('click', settings.navigation_element + '[data-' + settings.html_prefix + '-page-number]', function(e)
      {
        e.preventDefault();

        var page_number = +$(this).attr('data-' + settings.html_prefix + '-page-number');
        refresh_simple_pagination(page_number);
      });

      $(container_id + ' .' + settings.html_prefix + '-items-per-page').change(function()
      {
        items_per_page = +$(this).val();
        page_count = Math.ceil(item_count / items_per_page);
        refresh_simple_pagination(1);
      });

      $(container_id + ' .' + settings.html_prefix + '-select-specific-page').change(function()
      {
        specific_page = +$(this).val();
        refresh_simple_pagination(specific_page);
      });
    });
  };

  $.fn.simplePagination.defaults = {
    pagination_container: 'tbody',
    html_prefix: 'simple-pagination',
    navigation_element: 'a',//button, span, div, et cetera
    items_per_page: 25,
    number_of_visible_page_numbers: 5,
    //
    use_page_numbers: true,
    use_first: true,
    use_previous: true,
    use_next: true,
    use_last: true,
    //
    use_page_x_of_x: true,
    use_page_count: false,// Can be used to combine page_x_of_x and specific_page_list
    use_showing_x_of_x: true,
    use_item_count: false,
    use_items_per_page: true,
    use_specific_page_list: true,
    //
    first_content: 'First',  //e.g. '<<'
    previous_content: 'Previous',  //e.g. '<'
    next_content: 'Next',  //e.g. '>'
    last_content: 'Last', //e.g. '>>'
    page_x_of_x_content: 'Page',
    showing_x_of_x_content: 'Showing',
    //
    items_per_page_content: {
      'Five': 5,
      'Ten': 10,
      'Twenty-five': 25,
      'Fifty': 50,
      'One hundred': 100
    },
    thousands_separator: ','
  };

})(jQuery);



$(function() {
  $('#progress').circliful();
});


//Note -- I removed the respondCanvas function from the circiful library
/* PROGRESS CIRCLE COMPONENT */
(function ($) {

  $.fn.circliful = function (options, callback) {

    var settings = $.extend({
      // These are the defaults.
      startdegree: 0,
      fgcolor: "#78909c",
      bgcolor: "#212121",
      fill: false,
      width: 15,
      dimension: 160,
      fontsize: 36,
      percent: 50,
      animationstep: 1.0,
      iconsize: '20px',
      iconcolor: '#999',
      border: 'default',
      complete: null,
      bordersize: 5
    }, options);

    return this.each(function () {

      var customSettings = ["fgcolor", "bgcolor", "fill", "width", "dimension", "fontsize", "animationstep", "endPercent", "icon", "iconcolor", "iconsize", "border", "startdegree", "bordersize"];

      var customSettingsObj = {};
      var icon = '';
      var endPercent = 0;
      var obj = $(this);
      var fill = false;
      var text, info;

      obj.addClass('circliful');

      checkDataAttributes(obj);

      if (obj.data('text') != undefined) {
        text = obj.data('text');

        if (obj.data('icon') != undefined) {
          icon = $('<i></i>')
            .addClass('fa ' + $(this).data('icon'))
            .css({
              'color': customSettingsObj.iconcolor,
              'font-size': customSettingsObj.iconsize
            });
        }

        if (obj.data('type') != undefined) {
          type = $(this).data('type');

          if (type == 'half') {
            addCircleText(obj, 'circle-text-half', (customSettingsObj.dimension / 1.45));
          } else {
            addCircleText(obj, 'circle-text', customSettingsObj.dimension);
          }
        } else {
          addCircleText(obj, 'circle-text', customSettingsObj.dimension);
        }
      }

      if ($(this).data("total") != undefined && $(this).data("part") != undefined) {
        var total = $(this).data("total") / 100;

        percent = (($(this).data("part") / total) / 100).toFixed(3);
        endPercent = ($(this).data("part") / total).toFixed(3)
      } else {
        if ($(this).data("percent") != undefined) {
          percent = $(this).data("percent") / 100;
          endPercent = $(this).data("percent")
        } else {
          percent = settings.percent / 100
        }
      }

      if ($(this).data('info') != undefined) {
        info = $(this).data('info');

        if ($(this).data('type') != undefined) {
          type = $(this).data('type');

          if (type == 'half') {
            addInfoText(obj, 0.9);
          } else {
            addInfoText(obj, 1.25);
          }
        } else {
          addInfoText(obj, 1.25);
        }
      }

      $(this).width(customSettingsObj.dimension + 'px');

      var canvas = $('<canvas></canvas>').attr({
        width: customSettingsObj.dimension,
        height: customSettingsObj.dimension
      }).appendTo($(this)).get(0);

      var context = canvas.getContext('2d');
      var container = $(canvas).parent();
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var degrees = customSettingsObj.percent * 360.0;
      var radians = degrees * (Math.PI / 180);
      var radius = canvas.width / 2.5;
      var startAngle = 2.3 * Math.PI;
      var endAngle = 0;
      var counterClockwise = false;
      var curPerc = customSettingsObj.animationstep === 0.0 ? endPercent : 0.0;
      var curStep = Math.max(customSettingsObj.animationstep, 0.0);
      var circ = Math.PI * 2;
      var quart = Math.PI / 2;
      var type = '';
      var fireCallback = true;
      var additionalAngelPI = (customSettingsObj.startdegree / 180) * Math.PI;

      if ($(this).data('type') != undefined) {
        type = $(this).data('type');

        if (type == 'half') {
          startAngle = 2.0 * Math.PI;
          endAngle = 3.13;
          circ = Math.PI;
          quart = Math.PI / 0.996;
        }
      }

      /**
       * adds text to circle
       *
       * @param obj
       * @param cssClass
       * @param lineHeight
       */
      function addCircleText(obj, cssClass, lineHeight) {
        $("<span></span>")
          .appendTo(obj)
          .addClass(cssClass)
          .text(text)
          .prepend(icon)
          .css({
            'line-height': lineHeight + 'px',
            'font-size': customSettingsObj.fontsize + 'px'
          });
      }

      /**
       * adds info text to circle
       *
       * @param obj
       * @param factor
       */
      function addInfoText(obj, factor) {
        $('<span></span>')
          .appendTo(obj)
          .addClass('circle-info-half')
          .css(
            'line-height', (customSettingsObj.dimension * factor) + 'px'
          )
          .text(info);
      }

      /**
       * checks which data attributes are defined
       * @param obj
       */
      function checkDataAttributes(obj) {
        $.each(customSettings, function (index, attribute) {
          if (obj.data(attribute) != undefined) {
            customSettingsObj[attribute] = obj.data(attribute);
          } else {
            customSettingsObj[attribute] = $(settings).attr(attribute);
          }

          if (attribute == 'fill' && obj.data('fill') != undefined) {
            fill = true;
          }
        });
      }

      /**
       * animate foreground circle
       * @param current
       */
      function animate(current) {

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.arc(x, y, radius, endAngle, startAngle, false);

        context.lineWidth = customSettingsObj.bordersize + 1;

        context.strokeStyle = customSettingsObj.bgcolor;
        context.stroke();

        if (fill) {
          context.fillStyle = customSettingsObj.fill;
          context.fill();
        }

        context.beginPath();
        context.arc(x, y, radius, -(quart) + additionalAngelPI, ((circ) * current) - quart + additionalAngelPI, false);

        if (customSettingsObj.border == 'outline') {
          context.lineWidth = customSettingsObj.width + 13;
        } else if (customSettingsObj.border == 'inline') {
          context.lineWidth = customSettingsObj.width - 13;
        }

        context.strokeStyle = customSettingsObj.fgcolor;
        context.stroke();

        if (curPerc < endPercent) {
          curPerc += curStep;
          requestAnimationFrame(function () {
            animate(Math.min(curPerc, endPercent) / 100);
          }, obj);
        }

        if (curPerc == endPercent && fireCallback && typeof(options) != "undefined") {
          if ($.isFunction(options.complete)) {
            options.complete();

            fireCallback = false;
          }
        }
      }

      animate(curPerc / 100);

    });
  };
}(jQuery));

jQuery(document).ready(function ($) {

  var slideCount = $('#slider > ul > li').length,
	    slideWidth = $('#slider > ul > li').width(),
      slideHeight = $('main').height(),
	    sliderUlWidth = $('#slider ul').width() * slideCount,
      currentPaginator = $('ul.pagination#controller li').index($('li.active')) + 1;

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

  $('ul.pagination > li > a').click(function () {
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
