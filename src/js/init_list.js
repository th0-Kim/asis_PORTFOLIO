function setCardUl(data) {
  const careersArticle = document.querySelector('#list');
  const lists = data.lists;

  // console.dir(lists[0].year);

  lists.forEach((project, i) => {
    const itemContainer = document.createElement('div');
    itemContainer.className = 'list_item';

    const periodProject = project.list;
    periodProject.forEach((list, i) => {
      const itemFront = document.createElement('div');
      const itemBack = document.createElement('div');
      const topArea = document.createElement('div');
      const middleArea = document.createElement('div');
      const bottomArea = document.createElement('div');
      const thumbImage = document.createElement('img');
      const itemTitle = document.createElement('a');
      const itemLabels = document.createElement('div');
      const itemLabelSpan = document.createElement('span');
      const itemWork = document.createElement('div');
      const itemProgram = document.createElement('div');
      const itemWorkSpan = document.createElement('span');
      const itemProgramSpan = document.createElement('span');

      itemFront.className = 'item_front';
      itemBack.className = 'item_back';
    });
  });
}

/*
 * Version   : ver 0.1.2
 * File      : js/index.js
 * Author    : KIM SO YOUNG
 *
 * SUMMARY:
 * 1) LIST EVENT - listInit, listEvent
 */

const _appBody = document.body;
const _listItem = '.list_item';
const _listInfo = '.item_back';
const ACTIVE_CLASS = 'on';

let app = {
  listInit: function () {
    this.thisitem = _appBody.querySelectorAll(_listItem);
    app.init();
  },
  init: function () {
    if (window.navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
      app.moEvent();
    } else {
      app.pcEvent();
    }
  },
  moEvent: function () {
    const items = this.thisitem;
    for (const item of items) {
      item.addEventListener('click', app.clickFunc);
    }
  },
  pcEvent: function () {
    const items = this.thisitem;
    for (const item of items) {
      item.addEventListener('mouseleave', app.leaveFunc);
      item.addEventListener('mouseenter', app.enterFunc);
    }
  },
  leaveFunc: function () {
    app.reset(this);
  },
  enterFunc: function () {
    app.set(this);
  },
  clickFunc: function () {
    if (this.classList.contains(ACTIVE_CLASS)) {
      app.reset(this);
    } else {
      app.set(this);
    }
  },
  reset: function (e) {
    e.classList.remove(ACTIVE_CLASS);
    e.querySelector(_listInfo).style.height = '';
  },
  set: function (e) {
    e.classList.add(ACTIVE_CLASS);
    const itemHeight = e.clientHeight;
    e.querySelector(_listInfo).style.height = itemHeight + 'px';
  },
};

function hasJsObject(elem) {
  return elem.attributes.length > 0;
}

// 조건이 맞으면 Go!
hasJsObject(_appBody.querySelector(_listItem)) && app.listInit(_listItem);

// go to top!
const topButton = document.querySelector('.top');
if (topButton) {
  topButton.addEventListener('click', scrollTop);
}
function scrollTop() {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
}
