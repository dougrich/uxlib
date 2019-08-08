import React from 'react'
import { FieldDescription } from './with-validation'

/**
 * This higher-order function adds a max length check and a child warning when the user approaches the max length
 * Note: this expects the value to be a flat string, not an event object
 * @param {React.Component} Component 
 */
export default function withMaxLength (Component) {
  return class extends React.PureComponent {
    onChange = (v) => {
      const result = v.slice(0, this.props.maxLength)
      this.props.onChange(result)
    }
    renderMaxLength () {
      const {
        value,
        maxLength
      } = this.props
      const length = (value || '').length
      const left = maxLength - length
      if (left > maxLength / 2) return null
      // fade in as we move through 1/8 of the max length
      const leftPercent = left / maxLength
      const opacity = Math.min(1, -8 * (leftPercent - 0.5))
      return (
        <FieldDescription style={{
          opacity
        }}>
          {left} characters left
        </FieldDescription>
      )
    }
    render () {
      const {
        onChange,
        children,
        maxLength,
        ...rest
      } = this.props
      const hasMaxLength = maxLength != null
      return (
        <Component {...rest} maxLength={maxLength} onChange={hasMaxLength ? this.onChange : onChange}>
          {hasMaxLength && this.renderMaxLength()}
          {children}
        </Component>
      )
    }
  }
}