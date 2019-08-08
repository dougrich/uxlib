import withMaxLength from './with-max-length'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import styled from '@emotion/styled';

configure({ adapter: new Adapter() })

describe('withMaxLength', () => {
  it('trims values that are too long', () => {
    const base = styled.input({})
    const Wrapped = withMaxLength(base)
    let wasCalled = false
    const onChange = (v) => {
      expect(v).toStrictEqual('123456789')
      wasCalled = true
    }
    const rendered = shallow(<Wrapped maxLength={9} onChange={onChange} />)
    rendered.find(base).simulate('change', '123456789123456789')
    expect(wasCalled).toBeTruthy()
  })
  it('is a noop when no max length is based', () => {
    const base = styled.input({})
    const Wrapped = withMaxLength(base)
    let wasCalled = false
    const onChange = (v) => {
      expect(v).toStrictEqual('123456789123456789')
      wasCalled = true
    }
    const rendered = shallow(<Wrapped onChange={onChange} />)
    rendered.find(base).simulate('change', '123456789123456789')
    expect(wasCalled).toBeTruthy()
  })
})
