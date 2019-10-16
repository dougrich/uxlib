import React from 'react'
import { Input, InputUnderline, Container } from '../Text'
import withLabel from '../with-label'
import withEventUnwrap from '../with-event-unwrap'
import PropTypes from 'prop-types'

class BaseSelect extends React.PureComponent {
  renderOption = ({ value, label, disabled }, i) => {
    return (
      <option key={i} value={value} disabled={disabled}>
        {label}
      </option>
    )
  }
  render () {
    const {
      options,
      value,
      name,
      onChange,
      children
    } = this.props
    return (
      <Container>
        <Input as='select' id={name} name={name} value={value} onChange={onChange}>
          {options.map(this.renderOption)}
          {children}
        </Input>
        <InputUnderline />
      </Container>
    )
  }
}

BaseSelect.propTypes = {
  children: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.objectOf({
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
  })),
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export const Select = withEventUnwrap(BaseSelect)

export const SelectField = withLabel(Select)
