import React from 'react'
import {Lingon, Bar} from '../App'

export const Input = ({onEnter}) => (
  <div>
    <Lingon>INPUT</Lingon>
    <div id='namer'>
      <div id='namer-input'>
        <input type='email' name='namername' placeholder='Type your email or phonenumber' onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onEnter(e.target.value)
          }
        }}/>
      </div>
    </div>
    <Bar/>
  </div>
)





