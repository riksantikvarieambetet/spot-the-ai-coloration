const images = [
  {
    "img": "https://mm.dimu.org/image/012uMX4HNm2f?dimension=1200x1200",
    "creditLine": "Fanny Oldenburg åt Nordiskamuseet 2004.",
    "url": "#",
    "license": "CC-BY-NC-ND",
    "licenseURL": "http://creativecommons.org/licenses/by-nc-nd/4.0/deed.en",
    "AI": false,
  },
  {
    "img": "http://mm.dimu.org/image/032s8YzUvfzU?dimension=1200x1200",
    "creditLine": "Gustaf Wernersson Cronquist 1928.",
    "url": "#",
    "license": "Public Domian",
    "licenseURL": "http://creativecommons.org/publicdomain/mark/1.0/deed.en",
    "AI": true,
  },
  {
    "img": "http://collections.smvk.se/carlotta-em/web/image/zoom/2725736/0249.i.0174.jpg",
    "creditLine": "Didrik Bilt 1902.",
    "url": "#",
    "license": "Public Domian",
    "licenseURL": "http://creativecommons.org/publicdomain/mark/1.0/",
    "AI": false,
  },
  {
    "img": "http://collections.smvk.se/carlotta-em/web/image/zoom/3758281/0937.0191.jpg",
    "creditLine": "John Törnqvist tidigt 1900-tal.",
    "url": "#",
    "license": "Public Domian",
    "licenseURL": "http://creativecommons.org/publicdomain/mark/1.0/",
    "AI": true,
  },
];

function populateQuestions() {
  const sectionContainer = document.querySelector('#sectionContainer');

  images.forEach((question, i) => {
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

function renderImagesResult() {
  const imagesResultContainer = document.querySelector('#imagesResult');

  existingAnswers.forEach(a => {
    const container = document.createElement('div');

    const img = document.createElement('img');
    img.src = a.img.img;

    const imgA = document.createElement('a');
    const imgATextNode = document.createTextNode(a.img.creditLine);
    imgA.href = a.url;
    imgA.appendChild(imgATextNode);

    const licenseA = document.createElement('a');
    const licenseATextNode = document.createTextNode(a.img.license);
    licenseA.href = a.img.licenseURL;
    licenseA.appendChild(licenseATextNode);

    let pText = '';
    if (a.img.AI) {
      pText = 'Denna bild är kolorerad med AI. ';
    } else {
      pText = 'Denna bild är inte kolorerad med AI. ';
    }

    if (a.correct) {
      pText += 'Du svarade rätt.';
    } else {
      pText += 'Du svarade fel.';
    }

    const p = document.createElement('p');
    const pTextNode = document.createTextNode(pText);
    p.appendChild(pTextNode);

    container.appendChild(img);
    container.appendChild(imgA);
    container.appendChild(licenseA);
    container.appendChild(p);
    imagesResultContainer.appendChild(container);
  });
}

populateQuestions();

document.querySelector('.start div button').addEventListener('click', () => {
  document.querySelector('.start').style.display = 'none';
  document.querySelector('#section-0').style.display = 'flex';
});

let existingAnswers = [];
[...document.querySelectorAll('#sectionContainer button')].forEach(elm => {
  elm.addEventListener('click', e => {
    const section = e.target.parentNode;
    section.style.display = 'none';

    const sectionId = section.id.substring(8);
    let imageAnswerHolder = {};
    imageAnswerHolder.img = images[sectionId];

    if (e.target.dataset.answer) {
      imageAnswerHolder.correct = true;
    } else {
      imageAnswerHolder.correct = false;
    }

    existingAnswers.push(imageAnswerHolder);

    if (section.nextSibling) {
      section.nextSibling.style.display = 'flex';
    } else {
      // render results
      const correctAnswersCount = existingAnswers.filter(a => a.correct).length;
      const incorrectAnswersCount = existingAnswers.length - correctAnswersCount;

      document.querySelector('#pCorrect').innerText = ((correctAnswersCount / existingAnswers.length) * 100).toFixed(0);

      document.querySelector('.final').style.display = 'flex';
      const data = {
        datasets: [{
          data: [correctAnswersCount, incorrectAnswersCount],
          backgroundColor: ['#c94a18'],
        }],
        labels: [
          'Rätt',
          'Fel',
        ]
      };
      new Chart('doughnut', {
        type: 'doughnut',
        data: data,
      });

      renderImagesResult();
    }
  });
});