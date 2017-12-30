import React from 'react'
import {Light, Points, Lingon, Bar} from '../App'

export const LingonPoints = ({points, inputed}) => (
  <div>
    <Light>You have</Light>
    <Points>{points}</Points>
    <Lingon>Lingon</Lingon>
    <Light>{inputed}</Light>
    <Bar/>
  </div>
)

