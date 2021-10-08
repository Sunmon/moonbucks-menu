const $menuForm = document.querySelector('#espresso-menu-form');
$menuForm.addEventListener('submit', e => handleSubmit(e));

const createItemFragment = name => {
  const $fragment = document.createElement('fragment');
  $fragment.innerHTML = `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
    </li>`;

  return $fragment;
};

const handleSubmit = e => {
  e.preventDefault();
  const $input = e.target[0];
  const $menuList = document.querySelector('#espresso-menu-list');
  if (!isValid($input)) {
    alert('값을 입력해주세요');
    return;
  }
  appendMenu($input.value, $menuList);
  clearInput($input);
};

const appendMenu = (menu, $menuList) => {
  const $menuItem = createItemFragment(menu);
  $menuItem.querySelector('.menu-edit-button').addEventListener('click', e => {
    const $menuName = e.target.parentNode.querySelector('.menu-name');
    const text = window.prompt('메뉴명을 수정하세요', $menuName.textContent);
    if (!text.trim()) {
      alert('값을 입력해주세요');
      return;
    }
    $menuName.textContent = text;
  });

  $menuList.insertAdjacentElement('beforeend', $menuItem);
};

const clearInput = $input => {
  $input.value = '';
};

const isValid = $input => {
  return $input.value.trim() !== '';
};
