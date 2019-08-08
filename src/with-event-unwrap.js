import React from 'react'
/**
 * This higher-order function unwraps the change event on components: this makes it easier to consume
 * @param {React.Component} Component 
 */
export default function withEventUnwrap(Component) {
  return class extends React.PureComponent {
    onChange = (e) => {
      if (this.props.onChange) {
        if (typeof e === 'object') {
          this.props.onChange(e.target.value)
        } else {
          this.props.onChange(e)
        }
      }
    }

    render () {
      return (
        <Component {...this.props} onChange={this.onChange} />
      )
    }
  }
}