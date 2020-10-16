export function writeToClipboard(element) {
  return new Promise((resolve, reject) => {
    try {
      let value = '';
      if (typeof element === 'string') {
        value = element;
      } else if (typeof element === 'number') {
        value = String(element);
      } else if (element instanceof HTMLElement) {
        value = element.textContent;
      } else if (element instanceof HTMLInputElement) {
        value = element.value;
      } else {
        value = String(element);
      }
      resolve(navigator.clipboard.writeText(value.trim()));
    } catch (e) {
      reject(e);
    }
  });
}
