import withValidation from './with-validation'

export default function withBounds (Component) {
  return withValidation(
    Component,
    function (v) {
      const {
        min,
        max,
        onChange
      } = this.props
      v = v.replace('-', '').replace('.', '')
      if (/^[1-9][0-9]*$/gi.test(v)) {
        const number = parseInt(v)
        if (number >= min && number <= max) {
          onChange(number)
          this.setState({
            current: v,
            error: null
          })
          return
        }
      }

      this.setState({
        current: v,
        error: 'Must be between ' + min + ' and ' + max
      })
    },
    function () {
      const { min, max } = this.props
      return min != null && max != null
    }
  )
}