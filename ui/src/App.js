import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import styled, {injectGlobal} from 'styled-components'
import {Input} from './components/input'
import {LingonPoints} from './components/lingon'
import {BounceLoader} from 'react-spinners'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,900');

  html {
    font-family: 'Roboto', sans-serif;
  }

  body {
    margin: 0px;
    @media only screen
    and (max-width: 550px) {
      margin: 32px;
    }
  }

  #namer {
    position: relative;
  }

  #namer input {
    font-weight: 300;
    border: 0;
    border-bottom: 2px solid #DEDDDD;
    width: -webkit-fill-available;
    font-size: 20px;
    line-height: 35px;
    padding: 0px 0px 10px 0px;


    @media only screen
    and (max-width: 550px) {
      color: #b5b5b5;
      font-size: 1em;
      font-weight: 400;
    }
  }

  #namer input:focus {
    outline: 0;
    color: #DEDDDD;
  }

  #namer input::placeholder {
    color: #DEDDDD;
    font-style: italic;
  }
`

export const Light = styled.div`
  font-weight: 300;
  color: #DEDDDD;
  font-size: 20px;

  @media only screen
  and (max-width: 550px) {
    color: #b5b5b5;
    font-size: 1.2em;
    font-weight: 400;
  }
`

export const Points = styled.div`
  font-weight: 400;
  color: #FF5A75;
  font-size: 144px;
  line-height: 0.8;
  margin-bottom: 32px;
  margin-top: 26px;

  margin-left: -6px;

  @media only screen
  and (max-width: 550px) {
    font-size: 6em;
  }
`

export const Lingon = styled.div`
  font-weight: 900;
  color: #DEDDDD;
  text-transform: uppercase;
  font-size: 144px;
  line-height: 0.8;
  margin-bottom: 26px;

  margin-left: -6px;

  @media only screen
  and (max-width: 550px) {
    font-size: 6em;
  }
`

export const Bar = styled.div`
  height: 42px;
  width: 100%;
  background-color: #DEDDDD;
  margin-top: 16px;
`

const StyledContent = styled.div`
  margin-top: 124px;
  margin-left: 124px;
  width: fit-content;

  @media (max-width: 700px) {
    margin-top: 50px;
    margin-left: 50px;
  }

  @media (max-width: 550px) {
    margin-top: initial;
    margin-left: initial;
    width: initial;
  }
`

const StyledError = styled.div`
  margin-bottom: 16px;
  color: #FF5A75;
`

const enhance = compose(
  withState('result', 'setResult', ''),
  withState('inputed', 'setInputed', ''),
  withState('error', 'setError', ''),
  withState('isLoading', 'setIsLoading', false),
  withHandlers({
    loadPoints: ({setError, setResult, setInputed, setIsLoading}) => async (input) => {
      setIsLoading(true)
      setError('')
      const response = await fetch(`https://lingonapi.lingonsaft.com?input=${input.toLowerCase()}`)
      setIsLoading(false)
      if (response.status === 400) {
        return setError('Invalid input')

      } else if (response.status === 200) {
        setError('')
        const result = await response.json()
        setResult(result.lingon)
        return setInputed(input)

      } else if (response.status === 404) {
        return setError('Inputed have no stored lingon :(')

      }

      return setError('Unexpected error occured :(')
    },
  })
)

const StatelessApp = ({result, inputed, error, loadPoints, isLoading}) =>
  <StyledContent>
    {isLoading &&
      <BounceLoader
        color={'#FF5A75'}
        loading={isLoading}
      />
    }
    {error && <StyledError>{error}</StyledError>}
    {!isLoading && (result
      ? <LingonPoints points={result} inputed={inputed}/>
      : <Input onEnter={(value) => {
        loadPoints(value)
      }}/>)
    }

  </StyledContent>

export default enhance(StatelessApp)
