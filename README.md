# Prefetcher.js v1.0.0 [![bitHound Score](https://www.bithound.io/github/LuizPanariello/prefetcher/badges/score.svg)](https://www.bithound.io/github/LuizPanariello/prefetcher)
JS Lib to prefetch files for next page, you just need to pass an array to Prefecher obj.
Vanilla JS

## Minimal use:
```javascript
var prefetcher = new PREFETCHER([srcs]);
prefetcher.loadPrefetch();
```

### Callbacks:

Called on download start

```javascript
PREFETCHER.prototype.loadBegin = function(){};
```

Called on every item completition with success

```javascript
PREFETCHER.prototype.loadItemComplete = function(status){};
```

Called on every item completition with error

```javascript
PREFETCHER.prototype.loadItemError = function(status){};
````

Called after download completed

```javascript
PREFETCHER.prototype.loadComplete = function(){};
````

### Methods:

Begin donwload

```javascript
	PREFETCHER.prototype.loadPrefetch()
````
