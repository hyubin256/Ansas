// Animation on scroll
AOS.init();

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
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const obj = document.getElementById("value");
  var isShowAmountWorkder = false;

//   animateValue(obj, 0, 101, 2000);
  jQuery(window).on('load', function(){
    jQuery(window).on('scroll',function(){
        const topDistanceOfAmountWorkers = document.querySelector('#amount-workers').getBoundingClientRect().y;
        const objAmount = document.getElementById("amount-workers")
        if(topDistanceOfAmountWorkers < 200 && isShowAmountWorkder == false){
            isShowAmountWorkder = true;
            animateValue(objAmount, 0, 101, 1500);
            console.log(1)
        }
    })
    const nowDay=getCurrentDay();
    jQuery('#current-date-showing').html(nowDay.date);
    jQuery('#current-month-showing').html(nowDay.month);
    jQuery('.homepage__calendar .each-type').on('mouseenter',function(){
        const nameOfTypeCalendar = jQuery(this).attr('name');

        // jQuery('#images-type-calendar').css('animation','fade-in-smooth 0.5s linear');
        jQuery('.images-type-calendar').each(function(index){
          if(jQuery(this).attr('name') == nameOfTypeCalendar){
            jQuery(this).addClass('active')
          }
          else{
            jQuery(this).removeClass('active')
          }
        })
    })

    var itemsContentIntroduce = jQuery('.content-introduce-items');
    var lengthContentIntroduce = itemsContentIntroduce.length;
    var currentContentIntroduce = 0;
    jQuery('.homepage__head-introduce .next-button').on('click', function(){
        currentContentIntroduce+=1;
        if(currentContentIntroduce>=(lengthContentIntroduce-1))currentContentIntroduce = 0;
        itemsContentIntroduce.each(function(index){
            jQuery(this).removeClass('first-times')
            if(index != currentContentIntroduce){
                jQuery(this).removeClass('active first');
            }
            if(index == currentContentIntroduce){
                jQuery(this).addClass('active');
            }
        });
        // currentItemIntroduce.removeClass('first');
        // currentContentIntroduce+=1;
        // itemsContentIntroduce[currentContentIntroduce].addClass('active');

    })
  })