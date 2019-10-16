import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { TextInputField, TextAreaField, ToggleField, RangeField, Autocomplete, Select } from '@dougrich/uxlib'

const Section = styled.section({
  padding: '2em 1em'
})

function withValue (Component) {
  const c = class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: props.value
      }
      this.onChange = value => this.setState({ value })
    }
    render() {
      const { value } = this.state
      return (
        <Component {...this.props} value={value} onChange={this.onChange} />
      )
    }
  }
  c.propTypes = {
    value: PropTypes.any
  }

  return c
}

const ValueTextInputField = withValue(TextInputField)
const ValueToggleField = withValue(ToggleField)
const ValueRangeField = withValue(RangeField)
const ValueTextAreaField = withValue(TextAreaField)

const ValueAutocomplete = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      showAutocomplete: false
    }
  }

  onChange = value => {
    const lastwhitespace = value.lastIndexOf(/[\s^]/gi)
    const lasttag = value.indexOf('@', lastwhitespace)
    const showAutocomplete = lasttag >= 0
    this.setState({ value, showAutocomplete })
  }

  render() {
    return (
      <Autocomplete showAutocomplete={this.state.showAutocomplete} autocomplete='pop up!'>
        <TextAreaField onChange={this.onChange} label='Autocomplete starts with an @' />
      </Autocomplete>
    )
  }
}

const ValueSelect = withValue(class extends React.Component {
  render() {
    return (
      <Select {...this.props} options={[
        {
          value: '',
          label: 'Cool!'
        },
        {
          value: 'extreme',
          label: 'Next gen!'
        }
      ]} />
    )
  }
})

export default class App extends Component {
  render () {
    return (
      <div>
        <Section>
          <h2>Text</h2>
          <ValueTextInputField
            value='Simple editable interface'
            label='Simple'
          />
          <ValueTextInputField
            disabled
            value='Unable to edit'
            label='Disabled'
          />
          <ValueTextInputField
            maxLength={20}
            value=''
            label='Maximum Length'
          />
          <ValueTextInputField
            max={20}
            min={4}
            step={2}
            type='number'
            value={6}
            label='Numbered'
          />
          <ValueTextAreaField label='Text Area' />
        </Section>
        <Section>
          <h2>Toggle</h2>
          <ValueToggleField
            label='Simple'
            value={true}
          />
          <ValueToggleField
            label='Disabled'
            disabled
            value={true}
          />
        </Section>
        <Section>
          <h2>Range</h2>
          <ValueRangeField
            label='range'
            max={1400}
            min={70}
            step={5}
            value={600}
            addon='pixels'
          />
          <ValueRangeField
            label='disabled'
            disabled
            max={1400}
            min={70}
            step={5}
            value={600}
            addon='pixels'
          />
        </Section>
        <Section>
          <h2>Autocomplete</h2>
          <ValueAutocomplete />
        </Section>
        <Section>
          <h2>Select</h2>
          <ValueSelect value='' />
        </Section>
      </div>
    )
  }
}
