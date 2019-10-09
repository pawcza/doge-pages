import React, {Component} from 'react';

import Page from '../components/Page'
import Corner from '../components/Corner'

import css from './PagesContainer.module.scss'

class PagesContainer extends Component {
  state = {
    activeIndex: 0,
    blockTransitions: true,
    animNext: false,
    animPrev: false
  };

  componentDidMount() {
    this.fetchDummyImages();
  }

  handleCornerClick = (left, top, right, bottom) => {
    console.log('clicked corner', left, top, right, bottom)
  };

  swapPage = dir => {
    let activeIndex = this.state.activeIndex;
    this.setState({blockTransitions: false});
    if (dir === 'next' && activeIndex <= this.state.images.length) {
      ++activeIndex;
      this.setState({animNext: true})
    } else if (dir === 'prev' && activeIndex > 0) {
      --activeIndex;
      this.setState({animPrev: true})
    }

  };

  handleTransitionEnd = e => {
    this.setState(prevState => {
      if (prevState.animNext || prevState.animPrev) {
        return {
          blockTransitions: true,
          activeIndex: prevState.animNext ? prevState.activeIndex + 2 : prevState.activeIndex - 2,
          animNext: false,
          animPrev: false
        }
      }
    });
  };

  fetchDummyImages() {
    fetch('https://picsum.photos/v2/list')
      .then(response => response.json())
      .then(data => {
        this.setState({
          images: data
        })
      })
  }

  render() {
    return (
      <>
        <div className={css.Header}>Flip book demo</div>
        <div
          className={css.Wrapper + ` ${this.state.animPrev ? css.AnimPrev : ''}`}
          style={{clipPath: this.state.clipPath}}
        >
          <div
            className={css.PagesShadowLeft}
            style={{transform: `scaleX(${this.state.images ? this.state.activeIndex / this.state.images.length : 0})`}}
          />
          <div
            className={css.PagesShadowRight}
            style={{transform: `scaleX(${this.state.images ? (this.state.images.length - this.state.activeIndex) / this.state.images.length : 0})`}}
          />
          <Corner
            click={this.handleCornerClick}
            left={0}
            top={0}
          />
          <Corner
            click={this.handleCornerClick}
            left={0}
            bottom={0}
          />
          <Corner
            click={this.handleCornerClick}
            right={0}
            top={0}
          />
          <Corner
            click={this.handleCornerClick}
            right={0}
            bottom={0}
          />
          {this.state.images && this.state.images.map((image, index) => (
            <Page
              blockTransitions={this.state.blockTransitions}
              transitionEnd={e => this.handleTransitionEnd(e)}
              imageUrl={image.download_url}
              key={index}
              animPrevPrevPage={this.state.animPrev && this.state.activeIndex - 1 === index}
              animNext={this.state.animNext && this.state.activeIndex + 1 === index}
              animPrev={this.state.animPrev && this.state.activeIndex === index}
              left={this.state.activeIndex === index}
              active={this.state.activeIndex === index || this.state.activeIndex + 1 === index}
              beforePreviousPage={this.state.activeIndex - 2 === index}
              previousPage={this.state.activeIndex - 1 === index}
              nextPage={this.state.activeIndex + 2 === index}
              afterNextPage={this.state.activeIndex + 3 === index}
            >
              <p>{image.author}</p>
            </Page>
          ))}
        </div>
        <div className={css.ButtonWrapper}>
          <span
            onClick={() => this.swapPage('prev')}
            className={css.Button + ` ${!this.state.blockTransitions || this.state.activeIndex === 0 ? css.SpanBlocked : ''}`}
          >
          Prev
          </span>
          <span
            onClick={() => this.swapPage('next')}
            className={css.Button + ` ${!this.state.blockTransitions || this.state.activeIndex === 30 ? css.SpanBlocked : ''}`}
          >
          Next
          </span>
        </div>
        <span className={css.PageStatus}>
           {this.state.activeIndex} / {this.state.images && this.state.images.length}
        </span>
      </>
    );
  }
}

export default PagesContainer;
