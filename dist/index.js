"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.js
  window.Webflow ||= [];
  var writers = [
    {
      photo: "https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/674827f1a33984463be8d3a6_Annette_M.webp",
      name: "Annette M.",
      degree: "Master of Business Administration",
      information: ["No AI usage detected", "99% original content"],
      rating: "5.0"
    },
    {
      photo: "https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/67482851529737f176c516b2_Marie_G.webp",
      name: "Marie G.",
      degree: "Master of Healthcare and Nursing",
      information: ["No AI usage detected", "99% original content"],
      rating: "4.9"
    },
    {
      photo: "https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/674828c8fba593c46557c263_Karen_G.webp",
      name: "Karen G.",
      degree: "Bachelor of English",
      information: ["No AI usage detected", "99% original content"],
      rating: "5.0"
    },
    {
      photo: "https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/67482930f17cea61a25508b9_Paul_T.webp",
      name: "Paul T.",
      degree: "Master of Nursing",
      information: ["No AI usage detected", "99% original content"],
      rating: "5.0"
    },
    {
      photo: "https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/673206818a585061d6c8cbc4_Noah_W.webp",
      name: "Noah W.",
      degree: "Master of Business and management",
      information: ["No AI usage detected", "99% original content"],
      rating: "5.0"
    }
  ];
  var currentIndex = 0;
  var textIndex = 0;
  var totalProfiles = writers.length;
  var targetContainer = document.querySelector(".rw-hero__animation");
  if (targetContainer) {
    let createProfiles = function() {
      writers.forEach((expert, index) => {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("experts-carousel__writer-profile");
        if (index === 0)
          profileDiv.classList.add("experts-carousel__writer-profile--active");
        const img = document.createElement("img");
        img.src = expert.photo;
        img.alt = expert.name;
        img.classList.add("experts-carousel__profile-image");
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("experts-carousel__profile-name");
        nameSpan.textContent = expert.name;
        const verifiedImg = document.createElement("img");
        verifiedImg.src = "https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/673377f062923f494578f19d_check.svg";
        verifiedImg.alt = "verified icon";
        verifiedImg.classList.add("experts-carousel__verified-img");
        nameSpan.appendChild(verifiedImg);
        profileDiv.appendChild(img);
        profileDiv.appendChild(nameSpan);
        profilesSection.appendChild(profileDiv);
      });
    }, updateProfiles = function(newIndex) {
      const profileDivs = carouselElement.querySelectorAll(".experts-carousel__writer-profile");
      profileDivs.forEach((div, index) => {
        if (index === newIndex) {
          div.classList.add("experts-carousel__writer-profile--active");
        } else {
          div.classList.remove("experts-carousel__writer-profile--active");
        }
      });
    }, updateDetails = function() {
      const writer = writers[textIndex];
      degreeText.textContent = writer.degree;
      informationBlock.innerHTML = "";
      writer.information.forEach((info) => {
        const infoItem = document.createElement("div");
        infoItem.classList.add("experts-carousel__info-item");
        const checkIcon = document.createElement("img");
        checkIcon.src = "https://cdn.prod.website-files.com/5e5d4354e4bb2065e7524459/673378d2fe3c1baaf205a6d4_check2.svg";
        checkIcon.alt = "Check icon";
        checkIcon.classList.add("experts-carousel__info-check-icon");
        const infoText = document.createElement("span");
        infoText.classList.add("experts-carousel__info-text");
        infoText.textContent = info;
        infoItem.appendChild(checkIcon);
        infoItem.appendChild(infoText);
        informationBlock.appendChild(infoItem);
      });
      ratingText.textContent = parseFloat(writer.rating).toFixed(1);
    }, showDetails = function() {
      const degreeBlock = carouselElement.querySelector(".experts-carousel__degree-block");
      const informationBlockElement = carouselElement.querySelector(
        ".experts-carousel__information-block"
      );
      const ratingBlock = carouselElement.querySelector(".experts-carousel__rating-block");
      degreeBlock.classList.add("experts-carousel__degree-block--visible");
      informationBlockElement.classList.add("experts-carousel__information-block--visible");
      ratingBlock.classList.add("experts-carousel__rating-block--visible");
    }, hideDetails = function() {
      const degreeBlock = carouselElement.querySelector(".experts-carousel__degree-block");
      const informationBlockElement = carouselElement.querySelector(
        ".experts-carousel__information-block"
      );
      const ratingBlock = carouselElement.querySelector(".experts-carousel__rating-block");
      degreeBlock.classList.remove("experts-carousel__degree-block--visible");
      informationBlockElement.classList.remove("experts-carousel__information-block--visible");
      ratingBlock.classList.remove("experts-carousel__rating-block--visible");
    }, initializeCarousel = function() {
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
      }, 5e3);
    };
    createProfiles2 = createProfiles, updateProfiles2 = updateProfiles, updateDetails2 = updateDetails, showDetails2 = showDetails, hideDetails2 = hideDetails, initializeCarousel2 = initializeCarousel;
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
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding-bottom: 0;
        min-height: 320px;
        max-width: 538px;
      }
    }

    @media (min-width: 991px) {
      .experts-carousel {
        grid-template-columns: 270px 1fr;
      }
    }


    .experts-carousel__verified-icon {
      position: relative;
      height: 16px;
      width: 16px;
      margin-left: 6px;
    }

    .experts-carousel__verified-img {
      margin-left: 5px;
      width: 16px;
      height: 16px;
    }

    @media (min-width: 768px) {
      .experts-carousel__verified-img {
        width: 35px;
        height: 35px;
        margin-left: 10px;
      }
    }

    .experts-carousel__profiles-section {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 180px;
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
      overflow: hidden;
      border-radius: 20px;
    }

    @media (min-width: 768px) {
      .experts-carousel__writer-profile {
        height: 320px;
      }
    }

    .experts-carousel__writer-profile--active {
      opacity: 1;
    }
    
    .experts-carousel__writer-profile::after {
      content: '';
      position: absolute;
      z-index: 1; 
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      background: linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 0.65) 50%, rgba(26, 26, 26, 0.9) 100%);
      border-radius: 20px;
    }
    @media (min-width: 768px) {
      .experts-carousel__writer-profile::after {
        height: 140px;
      }
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
      bottom: 15px;
      left: 15px;
      display: flex;
      align-items: center;
      color: white;
      z-index: 2; 
    }

    @media (min-width: 768px) {
      .experts-carousel__profile-name {
        font-size: 20px;
        bottom: 20px;
        left: 20px;
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
      justify-content: center;
        width: auto;
        gap: 15px;
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
        font-size: 16px;
        transform: translateY(150px);
      }
      .experts-carousel__information-block {
        font-size: 16px;
        transform: translateY(100px);
      }
      .experts-carousel__rating-block {
        height: 78px;
        font-size: 20px;
      }
    }

    @media (min-width: 991px) {
      .experts-carousel__degree-block {
        width: min-content;
        min-width: 215px;
      }
      .experts-carousel__information-block {
        width: min-content;
        max-width: 248px;
      }
      .experts-carousel__rating-block {
        width: min-content;
        min-width: 193px;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0.49);
      transition: all 0.7s ease-in-out;
      padding: 15px;
      min-height: 120px;
    }

    .experts-carousel__rating-block {
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      height: 46px;
      background-color: rgba(255, 255, 255, 0.49);
      transition: all 0.6s ease-in-out;
    }
    @media (min-width: 768px) {
      .experts-carousel__rating-block {
        gap: 10px;
        height: 64px;
      }
    }

    .experts-carousel__information-block {
      transition: all 0.3s ease-in-out;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      background-color: #F3E7FF;
      padding: 15px;
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
        gap: 19px;
      }

      .experts-carousel__rating-block {
        padding: 20px;
      }
    }

    .experts-carousel__degree-text {
      color: #4A4A4A;
    }

    .experts-carousel__verified-status {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    @media (min-width: 768px) {
      .experts-carousel__verified-status {
        gap: 10px;
      }
    }

    .experts-carousel__check-icon, 
    .experts-carousel__info-check-icon {
      height: 16px;
      width: 16px;
    }


    @media (min-width: 768px) {
     .experts-carousel__check-icon,
     .experts-carousel__info-check-icon {
        height: 20px !important;
        width: 20px !important;
        margin-top: 0px;
      }
    }


    .experts-carousel__verified-text {
      color: #4863D1;
    }

    .experts-carousel__info-item {
      display: grid;
      grid-template-columns: 20px 1fr;
      gap: 5px;
    }

    @media (min-width: 768px) {
      .experts-carousel__info-item {
        gap: 10px;
      }
    }

    .experts-carousel__info-check-icon {
      height: 16px;
      width: 16px;
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
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
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
    targetContainer.insertAdjacentHTML("beforeend", carouselHTML);
    const carouselElement = targetContainer.querySelector(".experts-carousel");
    const profilesSection = carouselElement.querySelector(".experts-carousel__profiles-section");
    const degreeText = carouselElement.querySelector(".experts-carousel__degree-text");
    const informationBlock = carouselElement.querySelector(".experts-carousel__information-block");
    const ratingText = carouselElement.querySelector(".experts-carousel__rating-text");
    document.addEventListener("DOMContentLoaded", () => {
      initializeCarousel();
    });
  } else {
    console.error('\u0415\u043B\u0435\u043C\u0435\u043D\u0442 \u0437 \u043A\u043B\u0430\u0441\u043E\u043C "rw-hero__animation" \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0430 \u0441\u0442\u043E\u0440\u0456\u043D\u0446\u0456.');
  }
  var createProfiles2;
  var updateProfiles2;
  var updateDetails2;
  var showDetails2;
  var hideDetails2;
  var initializeCarousel2;
})();
//# sourceMappingURL=index.js.map
