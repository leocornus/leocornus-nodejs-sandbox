/**
 * a jQuery plugin to make every input field and 
 * text area can use ui-autocomplet widget.
 */

;(function($) {
    var pluginLiveSearch = 'liveSearch';
    var defaults = {
        // the url endpoint for search.
        searchUrl : '/search',
        // the minimium length of characters whil will trigger
        // auto complete process.
        minLength : 2,
        // Max items show on the suggestion. 
        // if set to 0, it will show all items from the suggestion.
        maxItems : 3 
    };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        this.id = element.id;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginLiveSearch;
        this.init();
    }

    $.fn[pluginLiveSearch] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginLiveSearch)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginLiveSearch, 
                       new Plugin(this, options));
            }
        });
    };

    // prototye for the plugin.
    $.extend(Plugin.prototype, {

        // initialize.
        init: function() {
            var self = this;
            var $element = $(this.element);

            // get ready the data object for autocomplete.
            var searchData = {
                source: function(request, response) {
                    $.ajax({
                      url: self.settings.searchUrl,
                      dataType: 'json',
                      data: {
                          term: request.term
                      },
                      success: function(data) {
                          var total = data.length;
                          var max = self.settings.maxItems;
                          if(max > 0 && total > max) {
                              // slice the result.
                              response(data.slice(0, max));
                          } else {
                              response(data);
                          }
                      }
                    });
                }, 

                minLength: self.settings.minLength,

                select: function(event, ui) {
                    event.preventDefault();
                    //alert(ui.item.url);
                    window.location.href = ui.item.url;
                },
            };

            $element.autocomplete(searchData)
                    .data("ui-autocomplete")
                    ._renderItem = self.renderItem;
        },

        // customize render of each item.
        renderItem: function($ul, item) {

            //console.log(item);

            var $li = $("<li>");
            // set the data-value
            $li.attr("data-value", item.title);
            $li.addClass('media');
            //$li.addClass('clearfix');
            // get ready the HTML for each item.
            var itemHtml = '<i class="fa fa-file-text-o text-primary"></i> ' + 
                item.title +
                '<br/>' +
                '<i class="fa fa-link text-warning"></i> ' + 
                item.url;

            // try using bootstrat media list
            var itemHtml = 
              //'<div class="media">' +
              '  <div class="media-left">' + 
              '    <span class="fa-stack fa-2x">' +
              '      <i class="fa fa-circle fa-stack-2x label-default"></i>' +
              '      <i class="fa fa-file-text-o fa-stack-1x text-danger"></i>' +
              '    </span>' +
              '  </div>' + 
              '  <div class="media-body">' +
              '    <h4 class="media-heading">' + item.title + 
              '    </h4>' +
              '    <p>' + item.description + 
              '    </p>' + 
              '<i class="fa fa-link text-warning"></i> ' + item.url +
              '  </div>';
              //'</div>';

            // try using button.
            var itemHtml1 = 
              '<i class="fa fa-file-text-o fa-2x fa-pull-left fa-border text-primary"></i>' +
              '<strong>' + item.title + '</strong>' + 
              '<div>' + item.description + '</div>' +
              '<i class="fa fa-link text-warning"></i> ' + item.url;

            $li.append(itemHtml);
            // append to ul
            $ul.addClass('media-list');
            $ul.append($li);

            return $li;
        }
    });

})(jQuery);
