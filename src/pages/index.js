import React from 'react'
import PropTypes from 'prop-types'
import { Link, navigate, graphql } from 'gatsby'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { chunk, drop, filter, includes, indexOf, isEqual, orderBy, remove, reverse } from 'lodash'

import Slider from '../components/slider/slider'

import p3 from '../img/p3.jpg'
import p1 from '../img/p1.jpg'
import p5 from '../img/p5.jpg'
import p6 from '../img/p6.jpg'

import '../components/all.sass'

const images = [p5, p1, p3, p6];

function formatNumber(number) {
  if (number < 10) return `0${number}`
  return number
}

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`

const SlidePrimary = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s ease-out;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s ease-out;
  }

  &::after {
    content: 'see more';
    color: #fff;
    position: absolute;
    padding: 16px 32px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #fff;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  &:hover {
    transform: scale(1.05);

    &::before {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &::after {
      opacity: 1;
    }
  }
`

const SlideSecondary = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  transition: all 0.3s ease-out;
`

const Numbers = styled.div`
  position: absolute;
  font-family: Amiko, serif;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Pagination = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style: none;
  bottom: 0;
  width: 100%;
`

const NumberSecondary = styled.li`
  position: relative;
  cursor: pointer;
  font-size: 16px;
  line-height: 16px;
  padding: 8px 0;
`
const NumberPrimary = styled.p`
  position: relative;
  cursor: pointer;
  font-size: 32px;
  line-height: 32px;
  padding: 44px 0; 
`

const PostNumber = styled.div`
  position: absolute;
  font-size: 180px;
  line-height: 180px;
  color: #ddd;
`

const Line = styled.div`
  height: 120px;
  width: 1px;
  margin-top: 36px;
  border-left: 1px solid black;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Arrows = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 120px;
  bottom: 48px;
`

const Arrow = styled.button`
  font-family: Amiri, sans-serif;
  font-size: 32px;
  margin: 16px;
  border: none;
  background-color: none;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`

const Text = styled.div`
  position: relative;
`

export default class IndexPage extends React.Component {
  constructor(props) {
    super()
    this.state = {
      slide: 0,
      currentIndex: 0,
      direction: 0,
      width: 0,
      height: 0
    }
  }
  
  componentDidMount() {
    this.handleWindowSizeChange();
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  
  handleNumberClick = index => {
    this.setState(state => ({ slide: index, direction: 1 }))
  }

  handleSliderChange = index => {
    this.setState({ currentIndex: index });
  }
  
  orderPosts = (posts, currentPost) => {
    const newPosts = posts.slice().reverse();

    const index = indexOf(newPosts, currentPost);
    const p1 = newPosts.slice(0, index);
    const p2 = newPosts.slice(index);
    const orderedPosts = drop(p2).concat(p1);
    
    return orderedPosts
  }

  next = () => {
    this.setState(state => ({ slide: state.slide + 1, direction: 1 }));
  }

  prev = () => {
    this.setState(state => ({ slide: state.slide - 1, direction: -1 }));
  }

  render() {
    const { data, location } = this.props
    const { currentIndex, direction, slide, height, width } = this.state
    const { edges: posts } = data.allMarkdownRemark
    const currentPost = posts[currentIndex]

    const orderedPosts = this.orderPosts(posts, currentPost);
    
    const pageSize = height;

    const sliderPrimaryStyle = {
      position: 'absolute',
      width: pageSize * 0.8,
      height: pageSize,
      left: '120px',
    }

    const sliderSecondaryStyle = {
      position: 'absolute',
      width: (pageSize - 120) * 0.8,
      height: pageSize - 120,
      top: '0',
      right: (pageSize - 120) * 0.8 * -1 + 180,
    }

    const numbersStyle = {
      width: 120,
      height: pageSize,
      left: 0,
    }

    const contentStyle = {
      width: width - (pageSize * 0.8 + 300),
      height: pageSize,
      left: pageSize * 0.8 + 120,
    }
    
    const arrowsStyle = {
      left: width - 180,
      top: height - 120,
    }

    const postNumberStyle = {
      position: 'absolute',
      width: pageSize * 0.6,
      left: 90,
      top: height / 4 + 130,
    }

    const textStyle = {
      width: '80%',
      left: '10%',
      top: height / 4 + 180,
    }

    return (
      <Container>
        <Slider
          style={sliderPrimaryStyle}
          value={slide}
          onChange={this.handleSliderChange}
        >
          {posts.map(({ node: post }, index) => (
            <SlidePrimary
              className="content"
              key={post.id}
              onClick={() => navigate(post.fields.slug)}
              role="link"
              style={{ backgroundImage: `url(${images[index]})` }}
            >
              <p className="slide-content">{post.frontmatter.title}</p>
              {index}
            </SlidePrimary>
          ))}
        </Slider>
        <Slider
          style={sliderSecondaryStyle}
          animationTime={600}
          delay={500}
          value={slide}
          offset={1}
        >
          {posts.map(({ node: post }, index) => (
            <SlideSecondary
              key={post.id}
              style={{ backgroundImage: `url(${images[index]})` }}
            />
          ))}
        </Slider>
        <Numbers style={numbersStyle}>
          <Pagination>
            {
              orderedPosts
                .map((post) => (
                  <NumberSecondary onClick={() => this.handleNumberClick(indexOf(posts, post))}>
                    <TransitionGroup
                      component="span"
                      className={
                        direction > 0
                          ? 'number-secondary-backward'
                          : 'number-secondary-forward'
                      }
                    >
                      <CSSTransition
                        classNames={
                          direction > 0
                            ? 'number-secondary-backward'
                            : 'number-secondary-forward'
                        }
                        key={currentPost.node.id}
                        timeout={{ enter: 400, exit: 400 }}
                      >
                        <span>
                          {formatNumber(indexOf(posts, post) + 1)}
                        </span>
                      </CSSTransition>
                    </TransitionGroup>
                  </NumberSecondary>
                ))
            }
            <Line />
            <NumberPrimary>
              <TransitionGroup
                component="span"
                className={
                  direction > 0
                    ? 'number-primary-backward'
                    : 'number-primary-forward'
                }
              >
                <CSSTransition
                  classNames={
                    direction > 0
                      ? 'number-primary-backward'
                      : 'number-primary-forward'
                  }
                  key={currentPost.node.id}
                  timeout={{ enter: 400, exit: 400 }}
                >
                  <span>
                    { formatNumber(currentIndex + 1) }
                  </span>
                </CSSTransition>
              </TransitionGroup>
            </NumberPrimary>
          </Pagination>
        </Numbers>
        <Content style={contentStyle}>
          <PostNumber style={postNumberStyle}>
            { formatNumber(currentIndex + 1) }
          </PostNumber>
          <Text style={textStyle}>
            <TransitionGroup
              component="div"
              className={
                direction > 0 ? 'description-backward' : 'description-forward'
              }
            >
              <CSSTransition
                classNames={
                  direction > 0
                    ? 'description-backward'
                    : 'description-forward'
                }
                key={currentPost.node.id}
                timeout={{ enter: 1000, exit: 1000 }}
              >
                <p>{currentPost.node.frontmatter.description}</p>
              </CSSTransition>
            </TransitionGroup>
          </Text>
        </Content>
        <Arrows style={arrowsStyle}>
          <Arrow onClick={this.next}>&#60;</Arrow>
          <Arrow onClick={this.prev}>&#62;</Arrow>
        </Arrows>
      </Container>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
