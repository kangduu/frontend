function setAbortController() {
  var controller = new AbortController();
  var signal = controller.signal;
  var cancel = function () {
    controller.abort();
  };

  return { signal, cancel };
}

export default setAbortController;
