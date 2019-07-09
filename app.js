const images = [
  {
    "img": "https://mm.dimu.org/image/012uMX4HNm2f?dimension=1200x1200",
    "creditLine": "Blabla bla inte av Albin",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "AI": false,
  },
  {
    "img": "https://mm.dimu.org/image/012uMX4HNm2f?dimension=1200x1200",
    "creditLine": "Blabla bla inte av Albin",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "AI": true,
  },
  {
    "img": "https://mm.dimu.org/image/012uMX4HNm2f?dimension=1200x1200",
    "creditLine": "Blabla bla inte av Albin",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "AI": false,
  },
  {
    "img": "https://mm.dimu.org/image/012uMX4HNm2f?dimension=1200x1200",
    "creditLine": "Blabla bla inte av Albin",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "AI": true,
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function populateQuestions() {
  const sectionContainer = document.querySelector('#sectionContainer');
  const imagesNewOrder = shuffleArray(images);

  imagesNewOrder.forEach((question, i) => {
    const section = document.createElement('section');
    const img = document.createElement('img');
    const btnO = document.createElement('button');
    const btnOText = document.createTextNode('Orginal');
    btnO.appendChild(btnOText);
    btnO.classList.add('raa-button', 'raa-button-confirm');
    const btnAI = document.createElement('button');
    const btnAIText = document.createTextNode('AI');
    btnAI.appendChild(btnAIText);
    btnAI.classList.add('raa-button', 'raa-button-confirm');

    section.id = 'section-' + i;
    section.style.display = 'none';
    img.src = question.img;

    if (question.AI === true) {
      btnAI.dataset.answer = true;
    } else {
      btnO.dataset.answer = true;
    }
    
    section.appendChild(img);
    section.appendChild(btnO);
    section.appendChild(btnAI);

    sectionContainer.appendChild(section);
  });
}

populateQuestions();

document.querySelector('.start div button').addEventListener('click', () => {
  document.querySelector('.start').style.display = 'none';
  document.querySelector('#section-0').style.display = 'flex';
});

[...document.querySelectorAll('#sectionContainer button')].forEach(elm => {
  elm.addEventListener('click', e => {
    if (e.target.dataset.answer) {
      console.log(true);
    } else {
      console.log(false);
    }

    const section = e.target.parentNode;
    section.style.display = 'none';
    if (section.nextSibling) {
      section.nextSibling.style.display = 'flex';
    } else {
      // render results
    }
  });
});