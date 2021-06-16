import React from 'react'
import { shallow } from 'enzyme'
import PhotoCard from '../../components/PhotoCard'

describe('<PhotoCard />', () => {
  test('should render correctly with no data', () => {
    const props = {
      id: 0,
      user_id: 0,
      category_id: 0,
      post_date: '',
      image_url: '',
      description: '',
      name: '',
      username: '',
      email: '',
      likes: [
        {
          id: 0,
          post_id: 0,
          user_id: 0,
        },
        {
          id: 0,
          post_id: 0,
          user_id: 0,
        },
      ],
    }
    const component = shallow(<PhotoCard {...props} />)
    expect(component).toMatchSnapshot()
  })
})
