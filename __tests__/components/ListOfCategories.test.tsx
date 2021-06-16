import React from 'react'
import { shallow } from 'enzyme'
import ListOfCategories from '../../components/ListOfCategories'

describe('<ListOfCategories />', () => {
  test('should render correctly with no data', () => {
    const props = {
      categories: [],
      loading: false,
    }
    const component = shallow(<ListOfCategories {...props} />)
    expect(component).toMatchSnapshot()
  })

  test('should render correctly with data', () => {
    const props = {
      categories: [
        {
          id: 5,
          category: 'test_category',
          image_url: 'https://i.imgur.com/dJa0Hpl.jpg',
        },
        {
          id: 13,
          category: 'another_test',
          image_url: 'https://i.imgur.com/dJa0Hpl.jpg',
        },
      ],
      loading: false,
    }
    const component = shallow(<ListOfCategories {...props} />)
    expect(component).toMatchSnapshot()
  })
})
