window.Webflow ||= [];

const writers = [
  {
    photo:
      'https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/6732067f6cffc16cce4f048d_Kelly_M.webp',
    name: 'Kelly M.',
    degree: 'Master of Business Administration',
    information: ['No AI usage detected', '99% original content'],
    rating: '4.9',
  },
  {
    photo:
      'https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/6732067edfb3a2baaff29528_Mary_J.webp',
    name: 'Mary J.',
    degree: 'Bachelor of Science in Nursing',
    information: ['No AI usage detected', '99% original content'],
    rating: '5.0',
  },
  {
    photo:
      'https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/6732067e79a22c13b8f2c32c_Floyce_M.webp',
    name: 'Floyce M.',
    degree: 'Bachelor of Science in Psychology',
    information: ['No AI usage detected', '99% original content'],
    rating: '5.0',
  },
  {
    photo:
      'https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/6732067ec0514bb1b0ee12cd_Paul_S.webp',
    name: 'Paul S.',
    degree: 'Master of Business Administration',
    information: ['No AI usage detected', '99% original content'],
    rating: '5.0',
  },
  {
    photo:
      'https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/673206818a585061d6c8cbc4_Noah_W.webp',
    name: 'Noah W.',
    degree: 'Bachelor of Arts in History',
    information: ['No AI usage detected', '99% original content'],
    rating: '5.0',
  },
];

let currentIndex = 0;
let textIndex = 0;
const totalProfiles = writers.length;

const targetContainer = document.querySelector('.rw-hero__animation');

if (targetContainer) {
  const styles = `
    .experts-carousel {
      line-height: 20px;
      min-height: 202px;
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 10px;
      padding-bottom: 80px;
      position: relative;
      overflow: hidden;
      width: 100%;
      z-index: 8;
    }

    @media (min-width: 568px) {
      .experts-carousel {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (min-width: 768px) {
      .experts-carousel {
        grid-template-columns: 270px 1fr;
        gap: 20px;
        padding-bottom: 0;
        min-height: 340px;
        height: 400px;
      }
    }

    .experts-carousel__verified-icon {
      position: relative;
      height: 16px;
      width: 16px;
      margin-left: 6px;
    }

    .experts-carousel__verified-img {
      margin-left: 6px;
      width: 16px;
      height: 16px;
    }

    @media (min-width: 768px) {
      .experts-carousel__verified-img {
        width: 35px;
        height: 35px;
      }
    }

    .experts-carousel__profiles-section {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 202px;
      width: 100%;
      min-width: 168px;
      max-width: 100%;
      align-items: center;
      overflow: hidden;
    }

    @media (min-width: 768px) {
      .experts-carousel__profiles-section {
        max-width: 270px;
      }
    }

    .experts-carousel__writer-profile {
      position: absolute;
      height: 100%;
      width: 100%;
      transition: opacity 1s ease-in-out;
      opacity: 0;
    }

    @media (min-width: 768px) {
      .experts-carousel__writer-profile {
        height: 340px;
      }
    }

    .experts-carousel__writer-profile--active {
      opacity: 1;
    }

    .experts-carousel__profile-image {
      height: 100%;
      width: 100%;
      border-radius: 20px;
      object-fit: cover;
    }

    .experts-carousel__profile-name {
      font-size: 16px;
      font-weight: 500;
      position: absolute;
      bottom: 8px;
      left: 16px;
      display: flex;
      align-items: center;
      color: white;
    }

    @media (min-width: 768px) {
      .experts-carousel__profile-name {
        font-size: 20px;
        bottom: 20px;
        left: 22px;
      }
    }

    .experts-carousel__details-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }

    @media (min-width: 768px) {
      .experts-carousel__details-section {
        width: auto;
        gap: 21px;
      }
    }

    .experts-carousel__degree-block,
    .experts-carousel__information-block,
    .experts-carousel__rating-block {
      font-size: 14px;
      border-radius: 20px;
      opacity: 0;
    }

    @media (min-width: 768px) {
      .experts-carousel__degree-block {
        width: min-content;
        min-width: 193px;
        font-size: 16px;
        transform: translateY(150px);
      }

      .experts-carousel__information-block {
        width: min-content;
        min-width: 193px;
        font-size: 16px;
        transform: translateY(100px);
      }

      .experts-carousel__rating-block {
        height: 78px;
        width: min-content;
        min-width: 193px;
        font-size: 20px;
      }
    }

    .experts-carousel__degree-block--visible,
    .experts-carousel__information-block--visible {
      opacity: 1;
      transform: translateY(0);
    }

    .experts-carousel__rating-block--visible {
      opacity: 1;
    }

    .experts-carousel__degree-block {
      background-color: #F5F6FD;
      transition: all 0.7s ease-in-out;
      padding: 16px;
      min-height: 135px;
      height: 100%;
    }

    .experts-carousel__rating-block {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 16px;
      height: 64px;
      background-color: #F5F6FD;
      transition: all 0.6s ease-in-out;
    }

    .experts-carousel__information-block {
      transition: all 0.3s ease-in-out;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      background-color: #FBF4EB;
      padding: 14px;
      position: absolute;
      bottom: 0;
      left: 0;
      gap: 19px;
    }

    @media (min-width: 768px) {
      .experts-carousel__information-block {
        transition: all 0.5s ease-in-out;
        position: static;
        flex-direction: column;
        padding: 20px;
      }

      .experts-carousel__degree-block {
        min-height: auto;
        height: auto;
        padding: 20px;
      }

      .experts-carousel__rating-block {
        height: 70px;
        padding: 20px;
      }
    }

    .experts-carousel__degree-text {
      margin-bottom: 19px;
      color: #4A4A4A;
    }

    .experts-carousel__verified-status {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .experts-carousel__check-icon {
      height: 20px;
      width: 20px;
    }

    .experts-carousel__verified-text {
      color: #4863D1;
    }

    .experts-carousel__info-item {
      display: grid;
      grid-template-columns: 20px 1fr;
      gap: 5px;
    }

    .experts-carousel__info-check-icon {
      height: 20px;
      width: 20px;
    }

    .experts-carousel__info-text {
      max-width: 130px;
      color: #4A4A4A;
    }

    @media (min-width: 768px) {
      .experts-carousel__info-text {
        max-width: none;
      }
    }

    .experts-carousel__rating-text {
      color: #4A4A4A;
      margin-right: 8px;
    }

    @media (min-width: 768px) {
      .experts-carousel__rating-text {
        font-size: 20px;
      }
    }

    .experts-carousel__stars-image {
      height: 24px;
      width: 85px;
    }

    @media (min-width: 768px) {
      .experts-carousel__stars-image {
        width: 116px;
      }
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  const carouselHTML = `
    <div class="experts-carousel">
      <div class="experts-carousel__profiles-section"></div>
      <div class="experts-carousel__details-section">
        <div class="experts-carousel__degree-block">
          <p class="experts-carousel__degree-text"></p>
          <div class="experts-carousel__verified-status">
            <img src="https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/673378d2fe3c1baaf205a6d4_check2.svg" alt="Check icon" class="experts-carousel__check-icon">
            <span class="experts-carousel__verified-text">Verified</span>
          </div>
        </div>
        <div class="experts-carousel__information-block"></div>
        <div class="experts-carousel__rating-block">
          <span class="experts-carousel__rating-text"></span>
          <img src="https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/6733773d2662a0765fb5a942_Stars.svg" alt="stars" class="experts-carousel__stars-image">
        </div>
      </div>
    </div>
  `;

  // Вставляємо карусель без створення додаткового <div>
  targetContainer.insertAdjacentHTML('beforeend', carouselHTML);

  const carouselElement = targetContainer.querySelector('.experts-carousel');
  const profilesSection = carouselElement.querySelector('.experts-carousel__profiles-section');
  const degreeText = carouselElement.querySelector('.experts-carousel__degree-text');
  const informationBlock = carouselElement.querySelector('.experts-carousel__information-block');
  const ratingText = carouselElement.querySelector('.experts-carousel__rating-text');

  function createProfiles() {
    writers.forEach((expert, index) => {
      const profileDiv = document.createElement('div');
      profileDiv.classList.add('experts-carousel__writer-profile');
      if (index === 0) profileDiv.classList.add('experts-carousel__writer-profile--active');

      const img = document.createElement('img');
      img.src = expert.photo;
      img.alt = expert.name;
      img.classList.add('experts-carousel__profile-image');

      const nameSpan = document.createElement('span');
      nameSpan.classList.add('experts-carousel__profile-name');
      nameSpan.textContent = expert.name;

      const verifiedImg = document.createElement('img');
      verifiedImg.src =
        'https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/673377f062923f494578f19d_check.svg';
      verifiedImg.alt = 'verified icon';
      verifiedImg.classList.add('experts-carousel__verified-img');

      nameSpan.appendChild(verifiedImg);
      profileDiv.appendChild(img);
      profileDiv.appendChild(nameSpan);
      profilesSection.appendChild(profileDiv);
    });
  }

  function updateProfiles(newIndex) {
    const profileDivs = carouselElement.querySelectorAll('.experts-carousel__writer-profile');
    profileDivs.forEach((div, index) => {
      if (index === newIndex) {
        div.classList.add('experts-carousel__writer-profile--active');
      } else {
        div.classList.remove('experts-carousel__writer-profile--active');
      }
    });
  }

  function updateDetails() {
    const writer = writers[textIndex];
    degreeText.textContent = writer.degree;

    informationBlock.innerHTML = '';
    writer.information.forEach((info) => {
      const infoItem = document.createElement('div');
      infoItem.classList.add('experts-carousel__info-item');

      const checkIcon = document.createElement('img');
      checkIcon.src =
        'https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/673378d2fe3c1baaf205a6d4_check2.svg';
      checkIcon.alt = 'Check icon';
      checkIcon.classList.add('experts-carousel__info-check-icon');

      const infoText = document.createElement('span');
      infoText.classList.add('experts-carousel__info-text');
      infoText.textContent = info;

      infoItem.appendChild(checkIcon);
      infoItem.appendChild(infoText);
      informationBlock.appendChild(infoItem);
    });

    ratingText.textContent = parseFloat(writer.rating).toFixed(1);
  }

  function showDetails() {
    const degreeBlock = carouselElement.querySelector('.experts-carousel__degree-block');
    const informationBlockElement = carouselElement.querySelector(
      '.experts-carousel__information-block'
    );
    const ratingBlock = carouselElement.querySelector('.experts-carousel__rating-block');

    degreeBlock.classList.add('experts-carousel__degree-block--visible');
    informationBlockElement.classList.add('experts-carousel__information-block--visible');
    ratingBlock.classList.add('experts-carousel__rating-block--visible');
  }

  function hideDetails() {
    const degreeBlock = carouselElement.querySelector('.experts-carousel__degree-block');
    const informationBlockElement = carouselElement.querySelector(
      '.experts-carousel__information-block'
    );
    const ratingBlock = carouselElement.querySelector('.experts-carousel__rating-block');

    degreeBlock.classList.remove('experts-carousel__degree-block--visible');
    informationBlockElement.classList.remove('experts-carousel__information-block--visible');
    ratingBlock.classList.remove('experts-carousel__rating-block--visible');
  }

  function initializeCarousel() {
    createProfiles();
    updateDetails();
    showDetails();

    setInterval(() => {
      hideDetails();

      currentIndex = (currentIndex + 1) % totalProfiles;
      textIndex = (textIndex + 1) % totalProfiles;

      updateProfiles(currentIndex);

      setTimeout(() => {
        updateDetails();
        showDetails();
      }, 600);
    }, 5000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
  });
} else {
  console.error('Елемент з класом "rw-hero__animation" не знайдено на сторінці.');
}
