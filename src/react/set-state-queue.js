import { renderComponent } from '../react-dom/diff'

const setStateQueue =  [];
const renderQueue = [];

function defer(fn) {
  return Promise.resolve().then(fn)
}

// 当调用setState的时候，不是第一时间去更新state和视图，而是把更新State和更新视图的操作push进一个队列
// 这里的实现跟浏览器的事件循环机制一样
export function enqueueSetState(stateChange, component) {
  // 当setStateQueue的length === 0 说明是刚初始化或者刚清过一次队列，此时再开始一次新的事件循环
  if (setStateQueue.length === 0) {
    defer(flush);
  }
  setStateQueue.push({
    stateChange,
    component
  });

  // 为了防止相同的组件实例push进去， 过滤操作
  if (!renderQueue.some(item => item === component)) {
    renderQueue.push(component);
  }
}

function flush() {
  let item, component;
  while(item = setStateQueue.shift()) {
    const {stateChange, component} = item;
    // 如果stateChange是一个方法
    if ( typeof stateChange === 'function') {
      Object.assign(component.state, stateChange(component.prevState, component.props))
    } else {
      // 如果stateChange是一个对象
      Object.assign(component.state, stateChange);
    }
  }

  // 渲染组件不能在遍历队列时进行，因为同一个组件可能会多次添加到队列中，
  // 我们需要另一个队列保存所有组件，不同之处是，这个队列内不会有重复的组件。 
  // 最终 同一个组件实例只render了一次， 效率提升就在这里
  while(component = renderQueue.shift()) {
    renderComponent(component);
  }
}