import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import App from './views/App.jsx'

class Root extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <App />
  }
}

// ========================================

ReactDOM.render(<Root />, document.getElementById('root'))
