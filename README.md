# Pause Until

## Pauses the execution of a function until you choose to continue or until a timeout expires.

`pause()` returns a promise that resolves when you call `resume()`, or when a timeout expires.

### Basic example

The `search()` function relies on the `data` cached in memory. We want to pause this function and
let it continue only when the data is loaded.

```js
const { pause, resume } = require('pause-until');

let data = null;

async function search(searchWhat) {
	if (!data) {
		// We'll wait here until the data is loaded:
		await pause('data loaded');
	}

	findInData(data, what);
}

async function loadDataIntoMemory() {
  data = getDataFromSomewhere();

  // Calling this will resume the search() function:
  resume('data loaded');
}

loadDataIntoMemory();

```

### Don't wait forever - add a timeout

In the same example as above, we will pause the `search()` function
for 15 seconds at most, since we don't want to get stuck forever:

```js
const { pause, resume } = require('pause-until');

let data = null;

async function search(searchWhat) {
	if (!data) {
		// We'll wait here until the data is loaded,
		// but for 15 seconds maximum:
		await pause('data loaded', 15000);
	}

	findInData(data, what);
}

async function loadDataIntoMemory() {
  data = getDataFromSomewhere();

  // Calling this will resume the search() function:
  resume('data loaded');
}

loadDataIntoMemory();

```

### Throw an exception instead of continue if we hit the timeout

```js
const { pause, resume } = require('pause-until');

let data = {};

async function search(searchWhat) {
	if (!data) {
		// We'll wait here until the data is loaded,
		// but for 15 seconds maximum:
		await pause('data loaded', 15000, true);
	}

	findInData(data, what);
}

async function loadDataIntoMemory() {
  data = getDataFromSomewhere();

  // Calling this will resume the search() function:
  resume('data loaded');
}

loadDataIntoMemory();

```

## Methods

All methods in this class are static. There are two methods: `pause()` and
`resume()`. You can add them into your code in one of the two ways:

```js
const { pause, resume } = require('pause-until');
// You can call pause(), resume() now.


// Or:
const Tasks = require('pause-until');
// You can call Tasks.pause(), Tasks.resume() now.

```

### static async pause(identifier, timeout, reject)

Returns a promise that resolves when `resume()` is called or when a timeout
expires.

- `identifier` - An arbitrary identifier. Must be passed to `resume()` when
unpausing.
- `timeout` - Optional: resolve the promise automatically after this many
milliseconds if it's not resolved yet.
- `reject` - Optional: if the promise times out without being resolved (by
using the `timeout` parameter), reject the promise instead of resolving it.

### static async resume(identifier)

Resolves the promise created by `pause()`.

- `identifier` - An arbitrary identifier. Must be the same as the one used
with `pause()`.
