import React from 'react'
import styled from '@emotion/styled'

export const FieldDescription = styled.div({
  position: 'absolute',
  fontSize: '0.8em',
  top: '105%',
  right: '0.2em'
})

export default function withValidation (Component, onChange, applies) {
  return class extends React.PureComponent {
    constructor (props, context) {
      super(props, context)
      this.state = { current: null }
      this.onChange = onChange.bind(this)
      this.applies = applies.bind(this)
    }

    startEdit = () => {
      this.setState({
        current: this.props.value.toString()
      })
    }

    doneEdit = () => {
      this.setState({
        current: null,
        error: null
      })
    }
    render () {
      const {
        current,
        error
      } = this.state
      let forced = {}
      if (this.applies()) {
        let value = this.props.value
        if (current != null) value = current
        forced = {
          onFocus: this.startEdit,
          onBlur: this.doneEdit,
          onChange: this.onChange,
          value
        }
      }
      return (
        <Component
          {...this.props}
          {...forced}
        >
          {error && (
            <FieldDescription>
              {error}
            </FieldDescription>
          )}
          {this.props.children}
        </Component>
      )
    }
  }
}