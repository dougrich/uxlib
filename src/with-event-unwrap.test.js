import withEventUnwrap from './with-event-unwrap'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import styled from '@emotion/styled';

configure({ adapter: new Adapter() })

describe('withEventUnwrap', () => {
  it('unwraps events', () => {
    const base = styled.input({})
    const Wrapped = withEventUnwrap(base)
    let wasCalled = false
    const onChange = (v) => {
      expect(v).toStrictEqual('1234')
      wasCalled = true
    }
    const rendered = shallow(<Wrapped onChange={onChange} />)
    rendered.find(base).simulate('change', { target: { value: '1234' }})
    expect(wasCalled).toBeTruthy()
  })
})
