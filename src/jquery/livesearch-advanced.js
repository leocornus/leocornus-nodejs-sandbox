/**
 * a jQuery plugin to make every input field and 
 * text area can use ui-autocomplet widget.
 */

;(function($) {

    var pluginLiveSearch = 'liveSearch';
    var defaults = {
        // the url endpoint for search.
        searchUrl : '/search',
        // filter query will depend on the search backend.
        // this plugin here will assume we are using solr alike
        // search backedn.
        filterOptions: [
           {label: 'All', value: ''},
           {label: 'Current Section', value: 'site: wiki'},
           {label: 'Custom Section', value: 'site: custom'},
           {label: 'User Profile', value: 'site: User Profile'},
           {label: 'Tickets', value: 'site: Tickets'}
        ],
        // default filter query is empty, search everything
        filterQuery: '',
        // TODO: allow user to customize the filter icon.
        // TODO: allow user to turn on and off the filter options.
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
        // the jQuery object.
        this.$element = $(element);
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
            
            // build the search button and/or filter button.
            var parentClass = 'input-group';
            this.buildGroupBtnInParent(parentClass);

            // get ready the data object for autocomplete.
            var searchData = this.buildSearchData();

            // hook in the jquery ui autocomplete.
            this.$element.autocomplete(searchData)
                    .data("ui-autocomplete")
                    ._renderItem = self.renderItem;
        },

        /**
         * build the search data.
         */
        buildSearchData: function() {

            var self = this;
            var searchData = {
                source: function(request, response) {

                    // get teh filter options as the filter query.
                    //var filterQuery = self.buildFilterQuery();

                    // send the ajax call.
                    $.ajax({
                      url: self.settings.searchUrl,
                      dataType: 'json',
                      data: {
                          term: request.term,
                          fq: self.settings.filterQuery 
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

            return searchData;
        },

        /**
         * build filter query
         */
        buildFilterQuery: function() {

            // filter query
        },

        /**
         * build the search and filter buttons for the 
         * search input group.
         */
        buildGroupBtnInParent: function(parentClass) {

            var self = this;

            // find the parent div.input-group
            var $inputGroup = this.$element.parent("." . parentClass);
            // add the ui-front class if it not present!
            if(!$inputGroup.hasClass('ui-front')) {
                $inputGroup.addClass('ui-front');
            }

            // build the all-in-one button, including:
            //  search button, filter label, and filter dropdown
            // build the search button with filter dropdown options.
            var options = this.buildFilterDropdownOptions();
            // get the first otpion's label as the default label.
            var filterLabel = this.settings.filterOptions[0].label;
            // update the placeholder value.
            this.$element.attr('placeholder', 
                               'Search ' + filterLabel);
            // build the filter dropdown button using filterOptions.
            var filterButton = 
              '<button type="button"' +
              '        class="btn btn-info dropdown-toggle"' +
              '        data-toggle="dropdown"' +
              '>' +
              '  <span class="glyphicon glyphicon-search"></span>' +
              '  <span id="filter-label">' + 
                   filterLabel + '</span>' +
              '  <span class="caret"></span>' +
              '  <span class="sr-only">Toggle Dropdown</span>' +
              '</button>' +
              '<ul class="dropdown-menu dropdown-menu-right">' +
              options +
              '</ul>';

            // compose div.input-group-btn
            var $btns = $('<span class="input-group-btn"></span>');
            //$btns.append(searchButton).append(filterButton);
            $btns.append(filterButton);
            $inputGroup.append($btns);

            // TODO: hook the click event.
            $inputGroup.find('li a').on('click', function(event) {
                console.log(event);
                console.log(this);
                self.handleFilterClick(this, event);
            });
        },

        /**
         * build filter dropdown options.
         * We will use the label of each option to display.
         */
        buildFilterDropdownOptions: function() {

            var options = '';

            $.each(this.settings.filterOptions, 
                   function(index, option) {
                var li = '<li';
                if(index == 0) {
                    li = li + ' class="active">';
                } else {
                    li = li + '>';
                }
                li = li + '<a href="#" value="' + 
                     option.value + '">' + 
                     option.label + 
                     '</a></li>';
                options = options + li;
            });

            return options;
        },

        /**
         * handle the filter option click, when user switch filers.
         */
        handleFilterClick: function(selectedElement, clickEvent) {

            // selected element should be <a>
            var $a = $(selectedElement);
            // find the direct parent <li>
            var $li = $a.parent('li');
            // find the <li> parent, which should be <ul>.
            var $ul = $li.parent('ul');

            if($li.hasClass('active')) {
                // Here is the current filter, nothing to do.
            } else {
                // find the current active <li>
                $ul.find('li.active').removeClass('active');
                // set active for current selection.
                $li.addClass('active');
                // update the filter label
                $('#filter-label').text($a.text());
                // update the placeholder value.
                this.$element.attr('placeholder',
                                   'Search ' + $a.text());
                this.settings.filterQuery = $a.attr('value');
            }
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
              '    <span class="text-warning fa-stack fa-lg">' +
              '      <i class="fa fa-circle fa-stack-2x"></i>' +
              '      <i class="fa fa-file-text-o fa-stack-1x fa-inverse"></i>' +
              '    </span>' +
              '  </div>' + 
              '  <div class="media-body">' +
              '    <h4 class="media-heading">' +
                     '<a href="' + item.url + 
                         '" style="padding: 0;">' + item.title + 
                     '</a>' +
              '    </h4>' +
              '    <small class="text-muted">' + 
                     item.site + '</small>' +
              '    <p class="media-description">' + 
                     item.description + 
              '    </p>' + 
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
