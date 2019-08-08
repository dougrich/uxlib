import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import withEventUnwrap from '../with-event-unwrap'
import withMaxLength from '../with-max-length'
import withLabel from '../with-label'
import withBounds from '../with-bounds'

const TextInputPositioning = {
  padding: '0.5em',
  textAlign: 'left',
  width: '100%',
  fontSize: '1em',
  lineHeight: '1.5em',
  boxSizing: 'border-box',
  maxHeight: '10em'
}

export const Input = styled.input([
  TextInputPositioning,
  {
    display: 'block',
    background: 'transparent',
    border: 0,
    marginRight: 0,
    position: 'relative',
    outlineOffset: '0px',
    '&:focus': {
      outline: '2px dashed #D00'
    },
    'textarea&': {
      height: '10em'
    }
  }
])

export const InputAddon = styled.div(({ theme }) => [
  TextInputPositioning,
  {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: theme.focused ? 0 : 0.5,
    pointerEvents: 'none',
    whiteSpace: 'nowrap'
  }
])

export const InputUnderline = styled.div({
  position: 'absolute',
  bottom: -2,
  left: 0,
  right: 0,
  height: 2,
  backgroundColor: '#333',
  pointerEvents: 'none',
  transform: 'scale(0.5, 1)',
  transformOrigin: 'bottom left',
  transition: '200ms transform',
  'input:hover+&,input:focus+&,textarea:hover+&,textarea:focus+&,select:hover+&,select:focus+&': {
    transform: 'scale(1,1)',
    backgroundColor: '#D00'
  }
})

export const AreaLines = styled.div({
  position: 'absolute',
  left: -2,
  bottom: -2,
  top: 0,
  right: 0,
  width: 'auto',
  height: 'auto',
  borderColor: '#333',
  borderTop: '0!important',
  borderRight: '0!important',
  borderWidth: '4px',
  borderStyle: 'solid',
  pointerEvents: 'none',
  transform: 'scale(0.5, 0.5)',
  transformOrigin: 'bottom left',
  transition: '200ms transform, 200ms border-width',
  'input:hover+&,input:focus+&,textarea:hover+&,textarea:focus+&': {
    transform: 'scale(1,1)',
    borderWidth: '2px',
    borderColor: '#D00'
  }
})

export const Container = styled.div({
  position: 'relative',
  width: '100%'
})

const TextInputBase = class extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props
    return (
      <Container>
        <Input {...rest} id={rest.name} />
        <InputUnderline />
        {children}
      </Container>
    )
  }
}

TextInputBase.propTypes = {
  children: PropTypes.node
}

export const TextInput = withBounds(withMaxLength(withEventUnwrap(TextInputBase)))

export const TextInputField = withLabel(TextInput)

const TextAreaBase = class extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props
    return (
      <Container>
        <Input as='textarea' {...rest} id={rest.name} />
        <AreaLines />
        {children}
      </Container>
    )
  }
}

TextAreaBase.propTypes = {
  children: PropTypes.element
}

export const TextArea = withMaxLength(withEventUnwrap(TextAreaBase))

export const TextAreaField = withLabel(TextArea)
