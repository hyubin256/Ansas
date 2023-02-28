// Animation on scroll
AOS.init({
  duration: 15000,
  once: true,
});

var event_dates = {
  '2023-03-05': [
    {
      title: 'abc',
      description: 'lorem is pum',
      image: 'https://via.placeholder.com/300x200',
      time: '19:00:00',
      website_link: 'google.com'
    },
    {
      title: 'abc',
      description: 'lorem is pum',
      image: 'https://via.placeholder.com/300x200',
      time: '17:00:00',
      website_link: 'google.com'
    }
  ],
  '2023-02-26': [
    {
      title: 'abc',
      description: 'lorem is pum',
      image: 'https://via.placeholder.com/300x200',
      time: '19:00:00',
      website_link: 'google.com'
    },
  ]
};
var linkImage = {
    philippe: './images/Ansas_homepage_calendar_1.png',
    tanjan: './images/Ansas_homepage_calendar_2.png'}


//   Count workers
  function getCurrentDay(){
    const currentDay = new Date();
    return {
        date: currentDay.getDate(),
        month: currentDay.getMonth()+1
    }
  }
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      try{
        obj.innerHTML = Math.floor(progress * (end - start) + start);
      }catch{

      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const obj = document.getElementById("value");
  var isShowAmountWorkder = false;

//On load
  jQuery(window).on('load', function(){
    var isShowMenuMobile=false;
    var widthScreen = window.screen.width;
    var headerHeightPC = jQuery('#page-header').height();
    let topDistanceOfAmountWorkers = 0
    jQuery(window).on('scroll',function(){
      try{
        topDistanceOfAmountWorkers = jQuery('#amount-workers').getBoundingClientRect().y || null;
      }catch{

      }
      const objAmount = document.getElementById("amount-workers");
      if(topDistanceOfAmountWorkers < 400 && isShowAmountWorkder == false){
        isShowAmountWorkder = true;
        animateValue(objAmount, 0, 101, 500);

      }
      let screenScrolled = jQuery(window).scrollTop();
      // console.log(screenScrolled);
      if(screenScrolled>=60 && widthScreen>=768){
        jQuery('#page-body').css({
          'paddingTop': `${headerHeightPC}px`,
        })
        jQuery('#page-header').addClass('fixed')
      }
      if(screenScrolled<60 && widthScreen>=768){
        jQuery('#page-body').css({
          'paddingTop': `${0}px`,
        })
        jQuery('#page-header').removeClass('fixed')
      }
      let mainStatue = jQuery('#main-statue');
      let animateTopVal = 'inherit';
      if(document.documentElement.scrollTop <= mainStatue.height()){
        animateTopVal = -(document.documentElement.scrollTop / 5) + 'px';
      }
      mainStatue.css('top',animateTopVal);
    });

    jQuery('.header-icon-action').on('click',function(){
      if(!isShowMenuMobile){
         jQuery(this).addClass('show-action');
         jQuery('#page-menu--mobile').addClass('show-action')
        }
      else {
        jQuery(this).removeClass('show-action');
        jQuery('#page-menu--mobile').removeClass('show-action preload')
      }
      isShowMenuMobile = !isShowMenuMobile;
    })

    if(widthScreen >=768){
      let contentStepTwo = jQuery('.estimation-upload-steps.step-two.desktop').html();
      jQuery('.estimation-upload-steps.step-two.mobile').append(contentStepTwo);
    }
    if(widthScreen<768){
    }

    jQuery('.homepage__calendar .each-type').on('mouseenter',function(){
        const nameOfTypeCalendar = jQuery(this).attr('name');
        jQuery('.images-type-calendar').each(function(index){
          if(jQuery(this).attr('name') == nameOfTypeCalendar){
            jQuery(this).addClass('active')
          }
          else{
            jQuery(this).removeClass('active')
          }
        })
    })

    jQuery('.appear-custom-animation').each(function(index, value){
      const arrayContent = jQuery(this).html().trim().split('');
      jQuery(this).empty();
      let newContentSplit = '';
      arrayContent.forEach((e,i)=>{
        if(i==0) newContentSplit += "<span data-aos='fade-up' data-aos-duration='100'>"+e+"</span>";
        else newContentSplit += `<span data-aos='fade-up' data-aos-duration='1000' data-aos-delay='${i*100+150}'>`+e+'</span>';
      });
      jQuery(this).prepend(newContentSplit);
    });

    var itemsContentIntroduce = jQuery('.content-introduce-items');
    var lengthContentIntroduce = itemsContentIntroduce.length;
    console.log('do dai introduce item',lengthContentIntroduce)
    var currentContentIntroduce = 0;
    jQuery('.homepage__head-introduce .next-button').on('click', function(){
        currentContentIntroduce+=1;
        if( currentContentIntroduce >= (lengthContentIntroduce) ) currentContentIntroduce = 0;
        itemsContentIntroduce.each(function(index){
            if(index != currentContentIntroduce){
                jQuery(this).removeClass('active');
                if (jQuery(this).hasClass('first')) {
                  jQuery(this).removeClass('active first preload');
                }
                else {
                  jQuery(this).removeClass('active');
                }
            }
            if(index == currentContentIntroduce){
                jQuery(this).addClass('active').removeClass('preload');
            }
        });
    })
    //Calendar
    var showEventCalendar = false;
    if(jQuery('#all-year-options')){
      let startYearOption = 2000;
      let endYearOption = 2050;
      let arrayYearOption = ``;
      for(i = startYearOption; i <= endYearOption; i++){
        arrayYearOption+=`<li class="year-option-item" valueyear="${i}">${i}</li>`
      }
      jQuery('#all-year-options').append(arrayYearOption);
    }
    jQuery('.calendar-event .year-option-item').on('click',function(){
      const valueOfYear = jQuery(this).attr('valueyear')*1;
      currentMonth = { value: currentMonth.value };
      currentYear = { value: valueOfYear };
      generateCalendar(currentMonth.value, currentYear.value);
      jQuery('#all-year-options').removeClass('show-option')
    })
    jQuery('.calendar-event .year-selection').on('click',function(){
      if(!jQuery('#all-year-options').hasClass('show-option')){
        jQuery('#all-year-options').addClass('show-option')
      }
      else jQuery('#all-year-options').removeClass('show-option')
    })
})

//Build calendar page
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
var month_names = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juni',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
let month_picker = jQuery('#month-event-showing');

const generateCalendar = (month, year) => {
  let calendar_days = jQuery('.calendar-event .date-number');
  calendar_days.html('');
  let calendar_header_year = jQuery('#year-event-showing');
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  month_picker.html(month_names[month]);
  calendar_header_year.html(year);
  let first_day = new Date(year, month);
  let order_first_day = first_day.getDay();
  order_first_day = order_first_day == 0 ? 7 : order_first_day;
  let days = "";
  for (let i = 1; i <= days_of_month[month] + order_first_day - 1; i++) {
      if (i >= order_first_day && i< (days_of_month[month]+ order_first_day)) {
        if(month<10) stringDay = (i - order_first_day + 1) <10 ? `${year}-0${month+1}-0${i - order_first_day + 1}` : `${year}-0${month+1}-${i - order_first_day + 1}`;
        else if(month>=10) stringDay = (i - order_first_day + 1) ? `${year}-${month+1}-0${i - order_first_day + 1}` : `${year}-${month+1}-${i - order_first_day + 1}`;

        let contentEventDay = event_dates[stringDay];
        if(contentEventDay){
          let eventNotification = '<ul class="event-notification">';
          let eventList = '<ul class="list-event">';
          contentEventDay.forEach((e,index)=>{
            eventNotification += `
              <li class="event-notification-item">
                <h3 class="name">${e.title}</h3>
                <p class="job-position">${e.description}</p>
              </li>
            `;
            eventList += `
            <li class="event-item">
              <img src="${e.image}" alt="" class="image-event">
              <div class="bottom">
                  <div class="info-side">
                      <div class="left">
                          <h3 class="name">${e.title}</h3>
                          <p class="job-position">${e.description}</p>
                      </div>
                      <div class="right">
                          <p class="date">${month_names[month]}. ${i+1}</p>
                          <p class="hour">${e.time}</p>
                      </div>
                  </div>
                  <a href="${e.website_link}" class="link-event">
                      voir le site <i class="fa-solid fa-caret-right"></i>
                  </a>
              </div>
            </li>
            `
          });
          eventNotification += `</ul>`;
          eventList += `</ul>`;
          days += `
            <li class='date-number-item has-event ${i%7==0 ? 'show-left-side' : ''}' date-event='${stringDay}'>
            <span>${i - order_first_day + 1}</span>`
            + eventNotification
            + eventList
            +`</li>`
        }
        else{
          days += `
             <li class='date-number-item'>
               <span>${i - order_first_day + 1}</span>
             </li>
            `
        };
      }
      else{
        days += `
          <li class='date-number-item'>
            <span></span>
          </li>
          `
      }
    }
  calendar_days.empty();
  calendar_days.html(days)
};

var currentDate = `2023-03-05`;
var currentMonth = { value: currentDate.split("-")[1]*1-1 };
var currentYear = { value: currentDate.split("-")[0]*1 };
generateCalendar(currentMonth.value, currentYear.value);

jQuery('.month-control.right').on('click',function(){
    let valueMonth =  currentMonth.value + 1;
    let valueYear = currentYear.value;
    valueMonth = (currentMonth.value + 1) > 11 ? 0 : valueMonth;
    valueYear = (currentMonth.value  + 1) > 11 ? valueYear + 1 : valueYear;
    currentMonth = { value: valueMonth };
    currentYear = { value: valueYear };
    generateCalendar(currentMonth.value, currentYear.value);
})
jQuery('.month-control.left').on('click',function(){
    let valueMonth =  currentMonth.value - 1;
    let valueYear = currentYear.value;
    valueMonth = (currentMonth.value - 1) < 0 ? 11 : valueMonth;
    valueYear = (currentMonth.value - 1) < 0 ? valueYear - 1 : valueYear;
    currentMonth = { value: valueMonth};
    currentYear = { value: valueYear };
    generateCalendar(currentMonth.value, currentYear.value);
})

jQuery(document).on('click','.date-number-item',function(){
  if(jQuery(this).attr('date-event') && window.screen.width<=768){
    // let dateString = jQuery(this).attr('date-event');
    let dateArray = jQuery(this).attr('date-event').split('-');
    console.log(dateArray)
    let contentEvent = jQuery(this).children('.list-event').html();
    console.log(contentEvent)
    jQuery('.event-side-mobile .wrapper').html(contentEvent);
    jQuery('.event-side-mobile').addClass('show-event-mobile');
    jQuery('.event-side-mobile .date-shown').html(`
      ${month_names[dateArray[1]-1]} ${dateArray[2]}
    `)
  }
  else{
    jQuery('.event-side-mobile').removeClass('show-event-mobile');
    jQuery('.event-side-mobile .wrapper').html('contentEvent');
  }
})