function createElement(tag, attrs, ...children) {
  // 返回虚拟节点
  return {
    tag, // 标签名
    attrs, // 标签的属性
    children // 标签的子节点
  }
}

function setAttribute(dom, name, value) {
  // 如果属性名是className，则改回class
  if(name='className') name='class';

  // 如果属性名是onXXX，则是一个事件监听方法
  if(/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[ name ] = value || '';
  } else if(name === 'style') {
    if(!value || typeof value === 'string') {
      dom.style.cssText = value || ''; // 行间样式
    } else if(value && typeof value === 'object'){
      for (let styleName in value) {
        dom.style[styleName] = typeof value[styleName] === 'number' ? value[styleName] + 'px' : value[styleName];
      }
    }
    // 普通属性则直接更新属性
  }else {
    if(name in dom) {
      dom[name] = value || '';
    }
    if (value) {
      dom.setAttribute(name, value)
    } else {
      dom.removeAtrribute(name);
    }
  }
}


// render的作用就是将虚拟Dom渲染为真实的Dom节点。
function render(vnode, container) {
  // 如果vnode是字符串那么被渲染为文本节点
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }
  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      setAttribute(dom, key, value); // 设置属性
    })
  }

  // 递归渲染children节点
  vnode.children.forEach(child => render(child, dom));

  return container.appendChild(dom); // 将渲染结果挂载到真正的DOM上
}

const React = {
  createElement
}

const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = ''; // 每次调用都要清楚之前挂载的内容
    return render(vnode, container)
  }
}

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);