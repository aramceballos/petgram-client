import React from 'react'
import { shallow } from 'enzyme'
import Category from '../../components/Category'

describe('<Category />', () => {
  test('should render correctly with no data', () => {
    const props = {
      id: 0,
      category: '',
      image_url: '',
    }
    const component = shallow(<Category {...props} />)
    expect(component).toMatchSnapshot()
  })

  test('should render correctly with data', () => {
    const props = {
      id: 5,
      category: 'test_category',
      image_url: 'https://i.imgur.com/dJa0Hpl.jpg',
    }
    const component = shallow(<Category {...props} />)
    expect(component).toMatchSnapshot()
  })
})
