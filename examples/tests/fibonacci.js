Amperf.describe('Fibonacci sequence.', function(AmperfTest) {
    AmperfTest('10000 loops between 20 and 9', function() {
        let i = 0;

        do {
            fib = function(numMax){
                for(var fibArray = [0,1], i=0,j=1,k=0; k<numMax;i=j,j=x,k++ ){
                    x=i+j;
                    fibArray.push(x);
                }
            }

            fib((Math.random() * (20 - 9) + 9));
            i++;
        } while(i < 10000);
    }).bench({
        time_total: 1,
        time_average: 5.0,
    });

    AmperfTest('1000 loops between 30 and 3', function() {
        let i = 0;

        do {
            fib = function(numMax){
                for(var fibArray = [0,1], i=0,j=1,k=0; k<numMax;i=j,j=x,k++ ){
                    x=i+j;
                    fibArray.push(x);
                }
            }

            fib((Math.random() * (30 - 3) + 3));
            i++;
        } while(i < 1000);
    }).bench({
        time_total: 1,
        time_average: 20.0,
    });
});
