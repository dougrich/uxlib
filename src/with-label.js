import React from 'react'
import styled from '@emotion/styled'

export const Row = styled.div(props => ({
  margin: 0,
  marginBottom: '1.5em',
  opacity: props.disabled ? 0.5 : 1,
  pointerEvents: props.disabled ? 'none' : null
}))

export const Label = styled.label({
  color: '#444',
  display: 'block',
  marginRight: '1em',
  fontSize: '1em',
  lineHeight: '1.5em',
  padding: '0.5em 0em',
  textTransform: 'uppercase',
  letterSpacing: '0.1em'
})

export default function withLabel (Component) {
  return class extends React.PureComponent {
    render () {
      const {
        label,
        disabled,
        name,
        ...rest
      } = this.props
      return (
        <Row disabled={disabled}>
          <Label htmlFor={name}>{label}</Label>
          <Component {...rest} disabled={disabled} name={name} />
        </Row>
      )
    }
  }
}