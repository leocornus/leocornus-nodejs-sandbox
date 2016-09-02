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
        desc : "Video Preview jQuery plugin",
        embedCodeTag: 'embedCode'
    };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        this.$element = $(element);
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

            var previewHtml = self.buildCustomizeForm();
            self.$element.html(previewHtml);
            self.hookEvents();
            self.buildVideoTag();
        },

        /**
         * preview video.
         */
        buildVideoTag: function() {

            var videoHtml = this.buildVideoHtml();

            // replace the "#the-video" div.
            this.$element.find('#the-video').html(videoHtml);

            // preparing the embed code.
            var code = String(videoHtml).replace(/&/g, '&amp;').
                       replace(/</g, '&lt;')
            $('#' + this.settings.embedCodeTag).html(code);
        },

        /**
         * update the video tag.
         */
        updateVideoTag: function() {
            var self = this;

            self.buildVideoTag();

            // we need destroy the existing video.js object.
            var player = videojs('my-video').dispose();
            // load video.js by id of the video tag.
            videojs("my-video", {}, function() {});
        },

        /**
         * get video source.
         */
        getVideoSource: function() {
            return this.$element.find('#inputSource').val();
        },

        /**
         * get video source.
         */
        getVideoWidth: function() {
            return this.$element.find('#inputWidth').val();
        },

        /**
         * get video source.
         */
        getVideoHeight: function() {
            return this.$element.find('#inputHeight').val();
        },

        /**
         * build video html tag
         */
        buildVideoHtml: function() {

            // get the source, width, height
            var source = this.getVideoSource();
            var width = this.getVideoWidth();
            var height = this.getVideoHeight();

            // preparing the video tag.
            var videoHtml = 
              '<video \n' +
              '  id="my-video" class="video-js" \n' +
              '  controls preload="auto" width="' + width + '" \n' +
              '  height="' + height + '" \n' +
              '  poster="http://vjs.zencdn.net/v/oceans.png" \n' +
              '  data-setup="{}">\n' +
              '  <source src="' + source + '" type="video/mp4">\n' +
              '</video>';

            return videoHtml;
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
         * hoot events.
         */
        hookEvents: function() {

            var self = this;

            // hook the click event for preview button.
            // this happens after thhe form html is append to 
            // parent element.
            self.$element.find('#preview').on('click', function() {
                self.updateVideoTag();
            });
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
