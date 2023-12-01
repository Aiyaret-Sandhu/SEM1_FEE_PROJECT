// var swiper = new Swiper(".product-slider", {
//     loop: true,
//     spaceBetween: 10,

//     autoplay: {
//         loop: true,
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     speed:3000,
 
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1020: {
//         slidesPerView: 3,
//       },
//     },
// });

document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".product-slider", {
      autoplay: {
          delay: 2500,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      breakpoints: {
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1020: {
                slidesPerView: 3,
              },
            }
  });
});


// var swiper = new Swiper(".review-slider", {
//     loop: true,
//     spaceBetween: 10,

//     autoplay: {
//         loop: true,
//         delay: 7500,
//         disableOnInteraction: false,
//     },
 
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1020: {
//         slidesPerView: 3,
//       },
//     },
// });



