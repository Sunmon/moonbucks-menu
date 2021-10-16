import MenuForm from './component/MenuForm.js';
import MenuHeader from './component/MenuHeader.js';
import MenuList from './component/MenuList.js';
import Navigator from './component/Navigator.js';
import { $ } from './lib/utils.js';

const menuItems = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
};

export default function App($target) {
  this.$ = $($target);
  this.state = {
    categoryName: 'espresso',
    menuItems: menuItems.espresso,
  };

  this.init = () => {
    this.navigator = new Navigator(this.$('nav'), { onClick: setCategoryName });
    this.menuHeader = new MenuHeader(this.$('div.heading'));
    this.menuForm = new MenuForm(this.$('#espresso-menu-form'), {
      onSubmit: addMenu,
    });
    this.menuList = new MenuList(this.$('#espresso-menu-list'), {
      onEdit: editMenu,
      onRemove: removeMenu,
    });
  };

  this.setState = state => {
    this.state = state;
    this.menuHeader.setState(state);
    this.menuList.setState(state);
    menuItems[state.categoryName] = state.menuItems;
  };

  const setCategoryName = name => {
    const state = {
      categoryName: name,
      menuItems: menuItems[name],
    };
    this.setState(state);
  };

  const addMenu = menuName => {
    const menuItems = [...this.state.menuItems, menuName];
    this.setState({ ...this.state, menuItems });
  };

  const editMenu = (menuName, newName) => {
    const menuItems = this.state.menuItems.map(el =>
      el === menuName ? newName : el,
    );
    this.setState({ ...this.state, menuItems });
  };

  const removeMenu = menuName => {
    const menuItems = this.state.menuItems.filter(el => el !== menuName);
    this.setState({ ...this.state, menuItems });
  };
}