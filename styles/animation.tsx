import { css, keyframes } from 'styled-components'

const fadeInKeyframes = keyframes`
from {
  filter: blur(5px);
  opacity: 0;
};
to {
  filter: blur(0);
  opacity: 1;
}
`

const appearListKeyframes = keyframes`
  from {
    top: -150px
  };
  to {
    top: -20px
  }
`

const bounceKeyFrames = keyframes`
  0% {
    transform: scale(0.2);
    opacity: 0
  }
  20%{
    transform: scale(1.1);
    opacity: 1
  }
  30%{
    transform: scale(1);
    opacity: 1
  }
  40%{
    transform: scale(1.05);
    opacity: 1
  }
  50%{
    transform: scale(1);
    opacity: 1
  }
  75%{
    transform: scale(1);
    opacity: 1
  }
  100%{
    transform: scale(0);
    opacity: 0
  }
`

export const fadeIn = ({ time = '1s', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${fadeInKeyframes} ${type};
  `

export const appearList = ({ time = '1s', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${appearListKeyframes} ${type};
  `

export const bounce = ({
  time = '1.2s',
  type = 'cubic-bezier(0.03, 0.48, 0.76, 1.56)',
} = {}) => css`
  animation: ${time} ${bounceKeyFrames} ${type};
`
