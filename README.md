# Amperf
## Install
```
npm install @ampersarnie/amperf
```

## CLI Options
Amperf has a number of options for your test output from the command line.

### --file / --f
_Default: `./perf/test.js`_
```
node amperf-node.js --file perf/my-test.js
```

### --template / --t
_Default: `./DefaultTemplate.js`_
```
node amperf-node.js --template MyTemplate.js
```

### --iterations / --i
_Default: `100`_
```
node amperf-node.js --iterations 256
```

### --show
_Default: `cycle_time,time_average,memory_average,time_fastest,time_slowest`_

__Shows only the cycle and average times__
```
node amperf-node.js --show cycle_time,time_average
```
