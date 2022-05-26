export function createElement(tag, props, childrens) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => element[key] = props[key]);

  if (childrens && childrens.length > 0) {
      childrens.forEach(child => {
          if (typeof child === 'string') {
              child = document.createTextNode(child);
          }

          element.append(child);
      });
  }

  return element;
}