import justifiedLayout from 'justified-layout';

;(function() {

    // get the geometry
    var geometry = justifiedLayout([1.33, 1, 0.65]);
    console.log(geometry);

    // one more.
    var newGeo = justifiedLayout([0.5, 1.5, 1, 1.8, 0.4, 0.7, 0.9, 1.1, 1.7, 2, 2.1]);
    console.log(newGeo);
}())
