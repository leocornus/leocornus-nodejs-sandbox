describe('JavaScript date testing specs', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {

    });

    describe('Testing cases to get a date range', function() {

        /**
         * test case for get a list of dates in the format.
         */
        it('test get range.', function() {

            /**
             * define the function to get date range.
             *   getDates('05/01/2017', '05/15/2017');
             * inclusive!
             */
            var getDates = function(startDate, endDate) {
                var current = new Date(startDate);
                var end = new Date(endDate); 
                var dates = [];

                while(current <= end) {

                    var m = current.getMonth() + 1;
                    var d = current.getDate();
                    var oneDate = [
                        current.getFullYear(),
                        m < 10 ? "0" + m : m,
                        d < 10 ? "0" + d : d].join('-');

                    dates.push(oneDate);
                    current.setDate(current.getDate() + 1);
                }

                return dates;
            };

            // the format 2017-05-01 will be considered as 
            // UTC!
            //var dateRange = getDates("2017-05-01", "2017-05-04");
            // it is safe to use this format: MM/DD/YYYY.
            var dateRange = getDates("05/01/2017", "05/04/2017");
            expect(dateRange).toEqual(['2017-05-01', '2017-05-02', '2017-05-03', '2017-05-04']);
        });
    });

    /**
     * test case for parse the format a date string.
     */
    describe('test parse and format date', function() {

        /**
         */ 
        it('parse date string', function() {

            var theString = '2016-01-13T16:33:17Z';
            var theDate = new Date(theString);

            expect(theDate.getMonth()).toEqual(0);
        });
    });
});
