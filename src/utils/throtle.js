export default  (fn, delay) =>{
  var timer = null;
  return function () {
    if (timer) {
      return;
    } else {
      fn()
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null;
      }, delay);
    }
  }
}