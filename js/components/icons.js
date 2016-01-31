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
