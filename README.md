# Amperf

![Amperf](http://d.pr/i/16eAB+)

Amperf provides the following information;

* Total length of time for tests.
* Average test time.
* Average test memory usage.
* Fastest and slowest iteration times.

## Install
It's recommended that you install Amperf globally through NPM.
```
npm i -g @ampersarnie/amperf
```
You may need to [add an alias to `./bin/amperf` in your bash profile](https://www.digitalocean.com/community/tutorials/an-introduction-to-useful-bash-aliases-and-functions#how-to-declare-a-bash-alias). NPM will install global modules to `/usr/local/lib/node` or `/usr/local/lib/node_modules`. The full path will be similar to; `/usr/local/lib/node_modules/@ampersarnie/amperf/bin/amperf`.

## Tests
```js
Amperf.describe('Suite of tests being run', function(AmperfTest) {
    AmperfTest('Test spec', function() {
        // Test code here.
    });
});
```

## Benchmarking
Amperf provides some benchmarking capabilities allowing you to stipulate maximum speeds and memory usage to have.

```js
Amperf.describe('Suite of tests being run', function(AmperfTest) {
    AmperfTest('Test spec', function() {
        // Test code here.
    }).bench({
        time_total: 1, // seconds
        time_average: 5.0 // milliseconds
    });
});
```

## CLI Options
Amperf has a number of options for your test output from the command line.

### --file / --f
_Default: `./perf/test.js`_
```
amperf --file perf/my-test.js
```
Also allows for loading all files in a given directory.
```
amperf --file perf/
```

### --template / --t
_Default: `./DefaultTemplate.js`_
```
amperf --file perf/my-test.js --template MyTemplate.js
```

### --iterations / --i
_Default: `100`_
```
amperf --file perf/my-test.js --iterations 256
```

### --show
_Default: `cycle_time,time_average,memory_average,time_fastest,time_slowest`_

__Shows only the cycle and average times__
```
amperf --file perf/my-test.js --show cycle_time,time_average
```

## Templates
Amperf allows for custom output templates. A list of the required methods and their arguments can be found in the `./src/TemplateInterface.js` file. You can see examples of the usage in both `./src/DefaultTemplate.js` and `./examples/templates/src/ExampleTemplate.js`.

_The TemplateInterface does not need to be invoked within your template as these checks are handled by the AmperfTemplate class._
