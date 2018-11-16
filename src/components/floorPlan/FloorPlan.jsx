import React from 'react';
import ReactSwipe from 'react-swipe';
import roomEG from './BuildingMap_EG_pdt.png';
import room1OG from './BuildingMap_1OG_pdt.png';
import room2OG from './BuildingMap_2OG_pdt.png';

import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/lib/fa';
import classnames from 'classnames'
import Header from '../shared/Header';

import './FloorPlan.less';

export default class RoomPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0, totalImages: 0 };

    this.swipeComponent = null;
    this.setSwipeComponentRef = (ref) => {
      this.swipeComponent = ref;

      if (ref !== null){
        this.setState({
          ...this.state,
          currentImage: ref.getPos(),
          totalImages: ref.getNumSlides()
        });
      }
    };
  }

  prevImage() {
    if (this.swipeComponent !== null)
      this.swipeComponent.prev();
  }

  nextImage() {
    if (this.swipeComponent !== null)
      this.swipeComponent.next();
  }

  gotoImage(index) {
    if (this.swipeComponent !== null)
      this.swipeComponent.slide(index, 300);
  }

  transitionEnd() {
    if (this.swipeComponent !== null)
      this.setState({currentImage: this.swipeComponent.getPos(), totalImages: this.swipeComponent.getNumSlides()})
  }

  renderControls() {
    const prevButton = () => (<button onClick={() => { this.prevImage(); return false;}} aria-label="Previous plan">
      <FaArrowCircleLeft />
    </button>);
    const nextButton = () => (<button onClick={() => { this.nextImage(); return false; }} aria-label="Next plan">
      <FaArrowCircleRight />
    </button>);
    const bulletPoints = () => {
      return [...Array(this.state.totalImages)].map((_, index) => (
        <button
          key={index}
          aria-label={ 'Goto plan number ' + (index + 1) }
          onClick={() => {this.gotoImage(index); return false;} }
          className={ classnames({current: index === this.state.currentImage}) }>
          &bull;
        </button>)
      );
    }

    return (<div className="slide-controls">
      {prevButton()}
      {bulletPoints()}
      {nextButton()}
    </div>);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="floor-plan-carousel-container">
          <div className="carousel">
            <ReactSwipe ref={this.setSwipeComponentRef} swipeOptions={{ continuous: true, transitionEnd: () => this.transitionEnd() }}>
              <div>
                <img src={roomEG} className="roomImage" alt="room plan" />
              </div>
              <div>
                <img src={room1OG} className="roomImage" alt="room plan" />
              </div>
              <div>
                <img src={room2OG} className="roomImage" alt="room plan" />
              </div>
            </ReactSwipe>
            {this.renderControls()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
