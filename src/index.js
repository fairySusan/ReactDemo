import React from './react'
import ReactDOM from './react-dom'


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 0
    }
  }
 // 测试异步setState
  onClick(){
    for (let i=0; i< 100; i++) {
      this.setState({
        count:this.state.count + 1
      })
      console.log(this.state.count);
    }
    console.log('0000'); //先输出 ‘000’,再渲染视图。异步setState不会阻塞后面代码的执行，从而提高代码运行效率
  }

  // 测试diff算法
  onDiffClick() {
    this.setState({
      count2:this.state.count2 + 1
    })
  }

  render() {
    return (
      <div>
        <div onClick={ () => this.onClick() }>
          <h1>number: {this.state.count}</h1>
          <button>add</button>
        </div>
        <div onClick={ () => this.onDiffClick() }>
          <h1>number: {this.state.count2}</h1>
          <button>add</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter/>,
  document.getElementById('root')
)