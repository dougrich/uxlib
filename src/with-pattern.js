import withValidation from './with-validation'

export default function withPattern (Component) {
  return withValidation(
    Component,
    function (v) {
      const {
        pattern,
        validationMessage,
        onChange
      } = this.props
      if (new RegExp(pattern).test(v)) {
        onChange(v)
        this.setState({
          current: v,
          error: null
        })
        return
      }

      this.setState({
        current: v,
        error: validationMessage
      })
    },
    function () {
      return this.props.pattern != null
    }
  )
}