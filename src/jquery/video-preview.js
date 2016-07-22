/**
 * a simple jQuery plugin to preview any video in HTML 5 video tag
 *
 *   jQuery('#divid').videoPreview();
 */

;(function($) {

    // plugin name and default values.
    var pluginVideoPreview = "videoPreview";
    // se the default alue.
    var defaults = {
            desc : "Video Preview jQuery plugin"
    };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginVideoPreview;
        this.init();
    }

    // use extend method to avoid Plugin prototype confilcts.
    $.extend(Plugin.prototype, {

        /**
         * the initialize function.
         */
        init: function() {
            var self = this;
            var $element = $(this.element);

            var previewHtml = self.buildCustomizeForm();
            $element.html(previewHtml);
        },

        /**
         * build the customization form, using the form-horizontal
         * class from bootstrap
         */
        buildCustomizeForm: function() {
            var self = this;

            // build the input form groups. 
            var sourceHtml = self.buildFormGroup('inputSource',
                'url', 'Source', 'Media Source', 
                'http://vjs.zencdn.net/v/oceans.mp4');
            var widthHtml = self.buildFormGroup('inputWidth',
                'number', 'Width', 'Media Width', 640);
            var heightHtml = self.buildFormGroup('inputHeight',
                'url', 'Height', 'Media Height', 364); 
            var formHtml = 
              '<div class="col-md-4">' +
              '  <h2>Customization Form</h2>' +
              '  <form class="form-horizontal">' +
                  sourceHtml +
                  widthHtml + heightHtml +
              '    <div class="form-group">' +
              '      <div class="col-sm-offset-2 col-sm-10">' +
              '        <button type="button" id="preview"' +
              '                class="btn btn-default">' +
              '        Preview' +
              '        </button>' +
              '      </div>' +
              '    </div>' +
              '  </form>' + 
              '</div>' +
              '<div class="col-md-8">' +
              '  <h2>Preview HTML 5 player</h2>' +
              '  <div id="the-video"></div>' +
              '</div>';

            return formHtml;
        },

        /**
         * build a form group, which have the form-group class with 
         * lable and an input field.
         */
        buildFormGroup: function(id, type, label, placeholder, 
                                 value) {

            var groupHtml = 
              '<div class="form-group">' +
              '  <label for="' + id + '"' +
              '         class="col-sm-2 control-label">' +
              '  ' + label + '</label>' +
              '  <div class="col-sm-10">' +
              '    <input type="' + type + '" class="form-control"' +
              '           id="' + id + '"' +
              '           placeholder="' + placeholder + '"' +
              '           value="'+ value + '">' +
              '  </div>' +
              '</div>';

            return groupHtml;
        }
    });

    $.fn[pluginVideoPreview] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginVideoPreview)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginVideoPreview, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);
