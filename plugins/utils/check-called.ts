/**
 * Checker that the plugin is called only once at build time
 * 플러그인 호출시 한 번만 호출되도록 체크하는 역할을 한다
 */
export default function checkCalled() {
  let _isCalled = false;
  return {
    isCalled() {
      return _isCalled;
    },
    call() {
      _isCalled = true;
    },
  };
}
