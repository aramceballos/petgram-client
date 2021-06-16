import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../components/Header'

describe('<Header />', () => {
  test('Render Header component', () => {
    const header = shallow(<Header />)
    expect(header.length).toEqual(1)
  })
})
