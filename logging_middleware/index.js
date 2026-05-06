/**
 * Reusable function that makes an API call to the Test Server each time it is called.
 */
export async function Log(stack, level, pkg, message) {
  try {
    // Fire and forget API call to the test server
    fetch('http://20.207.122.201/evaluation-service/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    }).catch(() => {});
  } catch (err) {
    // Silently handle errors to not crash the main application
  }
}
