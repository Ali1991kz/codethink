let pyodideReady = null;

async function getPython() {
  if (!pyodideReady) {
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
    pyodideReady = loadPyodide();
  }
  return pyodideReady;
}

self.onmessage = async event => {
  const { code, input } = event.data;
  const output = [];
  try {
    const pyodide = await getPython();
    const lines = String(input || '').split(/\r?\n/);
    pyodide.setStdout({ batched: text => output.push(text) });
    pyodide.setStderr({ batched: text => output.push(text) });
    pyodide.setStdin({ stdin: () => lines.length ? lines.shift() : '' });
    await pyodide.runPythonAsync(String(code || ''));
    self.postMessage({ ok: true, output: output.join('\n') || 'Программа орындалды, бірақ экранға нәтиже шығармады.' });
  } catch (error) {
    self.postMessage({ ok: false, output: output.concat(String(error && error.message ? error.message : error)).join('\n') });
  }
};
