import React, {Component} from 'react';
import PropTypes from 'prop-types';

import css from './Page.module.scss'

class Page extends Component {
  componentDidMount() {
  }

  render() {
    const {
      children,
      imageUrl,
      active,
      beforePreviousPage,
      previousPage,
      nextPage,
      afterNextPage,
      left,
      animPrev,
      animNext,
      animPrevPrevPage,
      blockTransitions,
      transitionEnd,
    } = this.props;

    return (
      <div
        onTransitionEnd={transitionEnd}
        className={
          css.Wrapper +
          ` ${blockTransitions ? css.BlockTransitions : ''}` +
          ` ${animPrevPrevPage ? css.AnimPrevPrevPage : ''}` +
          ` ${animNext ? css.AnimNext : ''}` +
          ` ${animPrev ? css.AnimPrev : ''}` +
          ` ${active ? css.Active : ''}` +
          ` ${left ? css.Left : ''}` +
          ` ${beforePreviousPage ? css.beforePrevPage : ''}` +
          ` ${previousPage ? css.prevPage : ''}` +
          ` ${nextPage ? css.nextPage : ''}` +
          ` ${afterNextPage ? css.afterNextPage : ''}`
        }
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        { children }
      </div>
    );
  }
}

Page.propTypes = {

};

export default Page;
