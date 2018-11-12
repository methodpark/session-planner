import { slide as Menu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu';

import './Menu.less';

export const slide = reduxBurgerMenu(Menu);