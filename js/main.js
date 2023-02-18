// Animation on scroll
AOS.init({
  duration: 15000,
  once: true,
});

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
    var currentContentIntroduce = 0;
    jQuery('.homepage__head-introduce .next-button').on('click', function(){
        currentContentIntroduce+=1;
        if(currentContentIntroduce>=(lengthContentIntroduce-1))currentContentIntroduce = 0;
        itemsContentIntroduce.each(function(index){
            jQuery(this).removeClass('preload')
            if(index != currentContentIntroduce){
                jQuery(this).removeClass('active first');
            }
            if(index == currentContentIntroduce){
                jQuery(this).addClass('active');
            }
        });
    })
  })