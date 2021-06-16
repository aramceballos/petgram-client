import React from 'react'
import { shallow } from 'enzyme'
import ListOfPhotoCards from '../../components/ListOfPhotoCards'

describe('<ListOfPhotoCards />', () => {
  test('should render correctly with no data', () => {
    const props = {
      posts: [],
      loading: false,
    }
    const component = shallow(<ListOfPhotoCards {...props} />)
    expect(component).toMatchSnapshot()
  })

  test('should render correctly with data', () => {
    const props = {
      posts: [
        {
          id: 5,
          user_id: 3,
          category_id: 50,
          post_date: '2021-05-25 05:38:27.151523',
          image_url:
            'https://res.cloudinary.com/midudev/image/upload/w_300/q_80/v1560262103/dogs.png',
          description: 'testing description',
          name: 'testing name',
          username: 'testing.username',
          email: 'test@test.com',
          likes: [
            {
              id: 2,
              post_id: 23,
              user_id: 45,
            },
            {
              id: 456,
              post_id: 6854,
              user_id: 4876,
            },
          ],
        },
        {
          id: 4879,
          user_id: 489,
          category_id: 489,
          post_date: '2021-05-25 05:38:27.151523',
          image_url:
            'https://res.cloudinary.com/midudev/image/upload/w_300/q_80/v1560262103/dogs.png',
          description: 'another description',
          name: 'another name',
          username: 'another.username',
          email: 'test@test.com',
          likes: [
            {
              id: 2,
              post_id: 23,
              user_id: 45,
            },
            {
              id: 456,
              post_id: 6854,
              user_id: 4876,
            },
          ],
        },
      ],
      loading: false,
    }
    const component = shallow(<ListOfPhotoCards {...props} />)
    expect(component).toMatchSnapshot()
  })
})
