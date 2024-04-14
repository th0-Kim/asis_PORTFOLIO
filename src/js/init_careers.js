import myData from './data/myData.js';
const allData = [myData];

document.addEventListener('DOMContentLoaded', init);

function init() {
  allData.forEach((data, i) => {
    setCareersUl(data);
    // setCardUl(data);
  });
}

function setCareersUl(data) {
  const careersArticle = document.querySelector('#career');
  const lists = data.lists;

  // console.dir(lists[0].year);

  lists.forEach((project, i) => {
    const ulContainer = document.createElement('div');
    const ulArea = document.createElement('ul');
    const ulAreaTitle = document.createElement('h3');
    careersArticle.appendChild(ulContainer);
    ulContainer.appendChild(ulAreaTitle);
    ulContainer.appendChild(ulArea);

    ulContainer.className = 'career_list_row';
    ulAreaTitle.className = 'career_year';
    ulAreaTitle.textContent = project.year; //년도별 프로젝트 구분

    const periodProject = project.list;
    periodProject.forEach((list, i) => {
      const ulAreaList = document.createElement('li'); //career_list 자식 li 생성
      const ulAreaFlex = document.createElement('div'); //career_list 기간 생성
      const ulAreaPeriod = document.createElement('strong'); //career_list 기간 생성
      const ulAreaProject = document.createElement('p'); //career_list 프로젝트명 생성
      const ulAreaTextName = document.createElement('span'); //career_list 프로젝트명 생성
      const ulAreaTexKind = document.createElement('span'); //career_list 유형 생성
      //const ulAreaTextRate = document.createElement('span'); //career_list 참여율 생성
      const ulAreaContent = document.createElement('div'); //career_list 기여 내용 생성

      ulContainer.appendChild(ulArea); //문서에 생성한 ul 추가
      ulArea.appendChild(ulAreaList); //career_list > li 추가
      ulAreaList.appendChild(ulAreaFlex); //career_list > li > div 추가
      ulAreaFlex.appendChild(ulAreaPeriod); //career_list > li > strong 추가
      ulAreaFlex.appendChild(ulAreaProject); //career_list > li > p 추가
      ulAreaProject.appendChild(ulAreaTextName); //career_list > li > p > span 추가
      ulAreaProject.appendChild(ulAreaTexKind); //career_list > li > p > span 추가
      //ulAreaProject.appendChild(ulAreaTextRate); //career_list > li > p > span 추가

      ulArea.className = 'career_list'; //생성한 ul에 career_list 클래스 부여
      ulAreaFlex.className = 'flex'; //생성한 div에 flex 클래스 부여
      ulAreaPeriod.className = 'li_title'; //생성한 strong에 li_title 클래스 부여
      ulAreaProject.className = 'li_text'; //생성한 p에 li_text 클래스 부여
      ulAreaTextName.className = 'name'; //생성한 span에 name 클래스 부여
      ulAreaTexKind.className = 'kind'; //생성한 span에 kind 클래스 부여
      //ulAreaTextRate.className = 'rate'; //생성한 span에 rate 클래스 부여

      ulAreaPeriod.textContent = list.period;
      ulAreaTextName.textContent = list.project;
      ulAreaTexKind.textContent = list.kind;

      if (list.content !== '') {
        ulAreaList.appendChild(ulAreaContent); //career_list > li > div
        ulAreaContent.className = 'li_content'; //생성한 div에 li_content 클래스 부여
        ulAreaContent.textContent = list.content;
      }
      //ulAreaTextRate.textContent = '참여율 : ' + list.rate + '%';
    });
  });
}
