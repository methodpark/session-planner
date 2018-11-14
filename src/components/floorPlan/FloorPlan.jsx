import React from 'react';
import ReactSwipe from 'react-swipe';
import roomEG from './BuildingMap_EG_pdt.png';
import room1OG from './BuildingMap_1OG_pdt.png';
import room2OG from './BuildingMap_2OG_pdt.png';

import './FloorPlan.less';

export default class RoomPlan extends React.Component {
  render() {
    return (
      <ReactSwipe swipeOptions={{ continuous: true }}>
        <div>
          <img width="100%" height="100%" src={roomEG} className="roomImage" alt="room plan" />
        </div>
        <div>
          <img width="100%" height="100%" src={room1OG} className="roomImage" alt="room plan" />
        </div>
        <div>
          <img width="100%" height="100%" src={room2OG} className="roomImage" alt="room plan" />
        </div>
      </ReactSwipe>
    )
  }
}
