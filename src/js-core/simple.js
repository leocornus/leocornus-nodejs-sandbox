/**
 * some very simple javascript funcitons for tesitng and learning.
 */

;(function() {
    /**
     * simple function to show message.
     */
    var showMessage = function(msg) {
    
        alert('...' + msg + '---');
    }

    // export the function to window object, so everybody can use it.
    window.showMessage = showMessage;

}());
