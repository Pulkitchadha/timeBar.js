# timeBar.js [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> A creative jQuery duration picker plugin that makes it easy to select a time duration in seconds from a horizontal time bar with custom scales and markers

## Demo
* [Link](https://codepen.io/pulkitchadha/pen/dywKWpB)

![image](https://github.com/Pulkitchadha/timeBar.js/assets/30553038/3ff4e9e3-4967-4e47-82a7-079f9b0554ca)


## How to use it:

1) Add the timeBar.js plugin's files to the HTML page.

```bash
    <link href="https://cdn.jsdelivr.net/gh/pulkitchadha/time-bar/src/css/timebar.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/pulkitchadha/time-bar/src/js/timebar.min.js"></script>
```

2) Create a container to place the time bar

```bash
    <div id="timelineId"></div>
```

3) Initialize the plugin and specify an array of preset points as follows
```bash
    $(document).ready( function () {
        const timebar = $("#timelineId").timebar({
          totalTimeInSecond: 550,
          cuepoints: [0, 110, 220, 330, 440, 550]
        });
    } );
```
5) All default options to customize the time bar.
```bash
const timebar = $("#timelineId").timebar({
      element: null,
      totalTimeInSecond: 0,
      cuepoints: [],
      width: 0,
      globalPageX: 0,
      selectedTime: 0,
      multiSelect:false,
      showCuepoints:true,
});
```
7) Callback functions that can be used to display the selected time duration
```bash
const timebar = $("#timelineId").timebar({
      barClicked(time) {
        // do something
      },
      pointerClicked(time) {
        // do something
      }
});
```
9) API methods.
```bash
//Add a new point
timebar.addCuepoints(time);
 
// updates the selected point
timebar.updateSelectedCuepoint(time);
 
// deletes selected point
timebar.deleteSelectedCuepoints();
 
// shows/hides points
timebar.showHideCuepoints();
```


## Options

1) totalTimeInSecond: Integer, Default value: 60
2) cuepoints: Array, Default: 60
3) width: String, Default: '1000px'
4) multiSelect: Boolean, Default: false
5) selectedTime: Integer, Default  : 0
6) showCuepoints: Boolean, Default: false

## Methods
1) addCuepoints: Accept time in sec.
2) updateSelectedCuepoint: Accept new time in sec.
3) deleteSelectedCuepoints: NA
4) showHideCuepoints: Accept value in boolean.
5) getSelectedTime: return time in sec.
6) setSelectedTime: pass the time in sec.
7) getTotalTime: return total time in sec.
8) setTotalTime: Accept time in sec.
9) getWidth: return width.
10) setWidth: Accept width.
11) getCuepoints: return cuepoints.

## License

MIT © [pulkitchdha]()


[npm-image]: https://badge.fury.io/js/generator-js-plugin.svg
[npm-url]: https://npmjs.org/package/generator-js-plugin
[travis-image]: https://travis-ci.org/Pulkitchadha/generator-js-plugin.svg?branch=master
[travis-url]: https://travis-ci.org/Pulkitchadha/generator-js-plugin
[daviddm-image]: https://david-dm.org/Pulkitchadha/generator-js-plugin.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Pulkitchadha/generator-js-plugin
