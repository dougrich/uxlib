import React from 'react'
import Range from './horizontal'
import Toggle from './toggle'
import withBounds from '../with-bounds'
import withLabel, { Row, Label } from '../with-label'
import { Input, InputUnderline, InputAddon, Container } from '../Text'
import withEventUnwrap from '../with-event-unwrap'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

export {
  Toggle,
  Range
}

export const ToggleField = withLabel(Toggle)

const RangeFieldLabelContainer = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '0.5em'
})

const TextMeasure = styled.span({
  opacity: 0
})

const RangeFieldLabel = withBounds(withEventUnwrap(({
  label,
  addon,
  value,
  children,
  ...rest
}) => (
  <RangeFieldLabelContainer>
    <Label htmlFor={rest.name}>{label}</Label>
    <Container>
      <Input
        type='number'
        value={value}
        {...rest}
        id={rest.name}
      />
      <InputUnderline />
      <InputAddon>
        <TextMeasure>{value}</TextMeasure> {addon}
      </InputAddon>
      {children}
    </Container>
  </RangeFieldLabelContainer>
)))

export class RangeField extends React.PureComponent {
  render () {
    const {
      disabled
    } = this.props
    return (
      <Row disabled={disabled}>
        <RangeFieldLabel
          {...this.props}
        />
        <Range {...this.props} />
      </Row>
    )
  }
}

RangeField.propTypes = {
  ...Range.propTypes,
  disabled: PropTypes.bool
}
