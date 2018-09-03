const { TimeoutResolvePromise, TimeoutRejectPromise } = require('nodejs-promise-timeout');

const promises = {}

/**
 * Pauses execution of a function until you choose to continue it, or until 
 * a timeout expires.
 */
class PauseUntil {
  /**
   * 
   * @param {string} identifier - An arbitrary identifier. Must be passed to
   *   `resume()` when unpausing.
   * @param {number} [timeout] - Optional: resolve the promise automatically after
   *   this many milliseconds if it's not resolved yet.
   * @param {boolean} [reject] - Optional: if the promise times out without being
   *   resolved (by using the `timeout` parameter), reject the promise instead
   *   of resolving it.
   * @returns {Promise<void>}
   */
  static pause(identifier, timeout, reject) {
    promises[identifier] = {};
    promises[identifier].promise = new Promise((resolve, reject) => {
      promises[identifier].resolve = resolve;
      promises[identifier].reject = reject;
    });

    if (timeout) {
      const TimeoutPromise = reject ? TimeoutRejectPromise : TimeoutResolvePromise;
      promises[identifier].promise = TimeoutPromise
        .setTimeout(timeout, promises[identifier].promise);
    }

    return promises[identifier].promise;
  }

  /**
   * Resume a task that was previously paused.
   * @param {string} identifier - The same arbitrary identifier that was used
   * when calling `pause()`.
   */
  static resume(identifier) {
    if (typeof promises[identifier].resolve === 'function') {
      promises[identifier].resolve();
    }
  }
}

module.exports = PauseUntil;