import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import getCaretCoordinates from 'textarea-caret'

const AutocompleteRoot = styled.div({
  position: 'relative'
})

const AutocompleteRegion = styled.div({
  position: 'absolute',
  top: 0,
  left: 0
})

export default class Autocomplete extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      transform: 'translate(0,0)'
    }
    this.root = React.createRef()
  }
  onBlur = () => {
    this.setState({ display: 'none' })
  }
  onChange = (e) => {
    // check to see if we need to display the autocomplete pop-up
    const region = e.target.getBoundingClientRect()
    const root = this.root.current.getBoundingClientRect()
    const dx = region.x - root.x
    const dy = region.y - root.y

    const coords = getCaretCoordinates(e.target, e.target.selectionEnd)
    const y = coords.top + dy + coords.height
    const x = coords.left + dx
    this.setState({ transform: `translate(${x}px, ${y}px)` })
  }
  render() {
    return (
      <AutocompleteRoot
        ref={this.root}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      >
        {this.props.children}
        {this.props.showAutocomplete && (
          <AutocompleteRegion style={this.state}>
            {this.props.autocomplete}
          </AutocompleteRegion>
        )}
      </AutocompleteRoot>
    )
  }
}

Autocomplete.propTypes = {
  children: PropTypes.node,
  showAutocomplete: PropTypes.bool,
  autocomplete: PropTypes.node
}
