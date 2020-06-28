import React from './react'
import ReactDOM from './react-dom'


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  onClick(){
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div onClick={ () => this.onClick() }>
        <h1>number: {this.state.count}</h1>
        <button>add</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter/>,
  document.getElementById('root')
)