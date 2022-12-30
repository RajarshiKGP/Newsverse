import React, { Component } from 'react'
import Loading from './images/loading.gif'

export class Load extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Loading} alt="" srcset="" />
      </div>
    )
  }
}

export default Load