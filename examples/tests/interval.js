Amperf.describe('Counter', function(AmperfTest) {
    AmperfTest('Increment every second until 100.', function() {
        let count = 0;
        let looper = function() {
            count++;
            if(count > 100) {
                clearInterval(id);
            }
        };
        let id = setInterval(looper, 1000);

        // console.log(id);
    });
});
