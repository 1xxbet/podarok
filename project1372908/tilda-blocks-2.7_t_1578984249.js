 
function t190_scrollToTop(){
    $('html, body').animate({scrollTop: 0}, 700);								
}	  
 
function t354_createCookie(name,value,days) {
  /*if (days == '' || parseInt(days) <= 0) {
    return;
  }*/    
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function t354_readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function t354_checkPosition(recid){
  var el = $('#rec'+recid).find('.t354__opener');
  if (!t354_isPopupRecVisible(el)) {
    return;
  }  
  var name = el.attr('data-cookie-name');
  var time = el.attr('data-cookie-time');
  var multiplier = el.attr('data-trigger-position');
  var position = $(window).height() * multiplier;
  var value = "t354cookie";
  var cookie = t354_readCookie(name);
  if (cookie) {
    $("#rec"+recid+" .t354").html("");
  }else if (el.length){
    var scroll = $(window).scrollTop() + position;
    var objoffset = el.offset().top;
    if (scroll >= objoffset) {
      el.trigger('click');
      $("#rec"+recid+" .t354").html("");
      t354_createCookie(name,value,time);
    }
  }
}

function t354_isPopupRecVisible(el) {
    var linkText = el.attr('href');
    var el_popup = $('.t-popup[data-tooltip-hook="'+linkText+'"]');
    var el_popupRec = el_popup.parents('.r');
    var minScreen = el_popupRec.attr('data-screen-min');
    if (minScreen && minScreen !== '') {
        minScreen = minScreen.replace('px', '');
        if (parseInt(minScreen) > $(window).width()) {
            return false;
        }
    }
    return true;
} 
function t390_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');
  
  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t390_closePopup();
    }
  });

  el.find('.t-popup__close').click(function(e){
    t390_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t390_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t390_closePopup(); }
  });
}

function t390_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t390_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t390_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }
  
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t390_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t390_showPopup(recid);
      t390_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
} 

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww=$(window).width();window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww=$(window).width();var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided — hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;if (winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];} 
 
function t400_init(recid){
  var el=$('#rec'+recid);
  
  var btn = el.find('.t400__submit');
  var hideBackText = btn.attr("data-hide-back-text");
  var showMoreText = btn.html();  
  
  el.find('.t400__submit').click(function() {
      
    if (typeof hideBackText != 'undefined' && hideBackText.length > 0 && $(this).hasClass('t400__submit_hide-back')) {
        t400_alltabs_updateContent(recid);
        $(this).removeClass('t400__submit_hide-back');
        btn.html(showMoreText);
        $('.t396').trigger('displayChanged');
        return;
    }      
      
    var rec_ids = $(this).attr('data-hidden-rec-ids').split(',');
	rec_ids.forEach(function(rec_id, i, arr) {
	  var rec_el=$('#rec'+rec_id);
	  rec_el.removeClass('t400__off');
	  rec_el.css('opacity','');
	  
	  var video = rec_el.find('.t-video-lazyload');
      if (video.length > 0) {
          if (video.parents('.t121').length > 0 || video.parents('.t223').length > 0 || video.parents('.t230').length > 0 || video.parents('.t368').length > 0) {
            t400_updateVideoLazyLoad(video);
          }
      }
	});
    $('.t544, .t477, .t532, .t764, .t418, .t774, .t480, .t686, .t598, .t599, .t570, .t554, .t650, .t351, .t353, .t341, .t385, .t226, .t404, .t412, .t552, .t279, .t384, .t229, .t456, .t268, .t334, .t121, .t517, .t545, .t518, .t744, .t778, .t604, .t774, .t694, .t230, .t609, .t688, .t670, .t592, .t504, .t740, .t762, .t827, .t829, .t498, .t539, .t422, .t347, .t801, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t728, .t738, .t836, .t615, .t822, .t726, .t798, .t700, .t577, .t605, .t223, .t813, .t132, .t734, .t799, .t433, .t368, .t-feed, .t-store, .t396, .t923, .t616, .t786').trigger('displayChanged');
    setTimeout(function(){
      $('.t351, .t353, .t341, .t410, .t385, .t738, .t829, .t223').trigger('displayChanged');
    },50);
    if(typeof hideBackText != 'undefined' && hideBackText.length > 0){
        btn.addClass('t400__submit_hide-back');
        btn.html(hideBackText);
    } else {
        el.addClass('t400__off').hide();
    }
    
    if(window.lazy=='y'){t_lazyload_update();}
  });
  t400_alltabs_updateContent(recid);
  t400_checkSize(recid);
}

function t400_alltabs_updateContent(recid){
  var el=$('#rec'+recid);
  el.find(".t400__submit").each(function (i) {
    var rec_ids = $(this).attr('data-hidden-rec-ids').split(',');
	rec_ids.forEach(function(rec_id, i, arr) {
	  var rec_el=$('#rec'+rec_id);
	  rec_el.attr('data-animationappear','off');
	  rec_el.addClass('t400__off');
	});
  });
}

function t400_checkSize(recid){
  var el=$("#rec"+recid).find(".t400__submit");
  if(el.length){
    var btnheight = el.height();
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t400__submit-overflowed");
      el.html("<span class=\"t400__text\">" + btntext + "</span>");
    }
  }
}

function t400_updateVideoLazyLoad(video) {
    setTimeout(function() {
        video.each(function() {
            var div = $(this);
            
            var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
            if (height.indexOf('vh') != -1) {
                height = '100%';
            }

            var videoId = div.attr('data-videolazy-id').trim();
            var blockId = div.attr('data-blocklazy-id') || '';
            if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
              var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_';
            } else {
              var videoTwoId = '';
            }

            if (div.attr('data-videolazy-type') == 'youtube') {
                div.find('iframe').remove();
                div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
            }
        });
    }, 300);
} 
function t418_checkSize(recid){
  var el=$("#rec"+recid);
  var sizer = el.find('.t418__height');
  var height = sizer.height();
  var width = sizer.width();
  var ratio = width/height;
  var gallerywrapper = el.find(".t418__checksize");
  var gallerywidth = gallerywrapper.width();
  gallerywrapper.css({'height':((gallerywidth/ratio)+'px')});

  var maxwidth = el.find(".t418__height").width();
  var windowwidth  = $(window).width();
  var value = windowwidth - 80;
  if (maxwidth > windowwidth) {
    el.find(".t418__item").css("max-width", value + "px");
    el.find(".t418__img").css("left", "20px");
    el.find(".t418__img").css("right", "20px");
  } else {
    el.find(".t418__item").css("max-width", "");
    el.find(".t418__img").css("left", "");
    el.find(".t418__img").css("right", "");
  }
}

function t418_init(recid){
  var el=$('#rec'+recid);
  var pos = 0;
  var t418_doResize;
  var totalSlides = el.find('.t418__item').length;
  var sliderWidth = el.find('.t418__item').width();

  $(window).resize(function() {
    if (t418_doResize) clearTimeout(t418_doResize);
    t418_doResize = setTimeout(function() {
      sliderWidth = el.find('.t418__item').width();
      el.find('.t418__slidecontainer').width(sliderWidth*totalSlides);
      console.log(sliderWidth);
    }, 200); 
  });
  
  el.find('.t418__slidecontainer').width(sliderWidth*totalSlides);
  
  el.find('.t418__next').click(function(){
    slideRight(recid);
  });

  el.find('.t418__previous').click(function(){
    slideLeft(recid);
  });

  function slideLeft(recid){
    var el=$('#rec'+recid);
    pos--;
    if(pos==-1){ pos = totalSlides-1; }
    el.find('.t418__slidecontainer').css({transform: 'translate(-' + (sliderWidth*pos) + 'px, 0)'})
    el.find('.t418__slidecontainer').css("transition-duration", ".3s");
    if(window.lazy=='y'){t_lazyload_update();}
  }

  function slideRight(recid){
    var el=$('#rec'+recid);
    pos++;
    if(pos==totalSlides){ pos = 0; }
    el.find('.t418__slidecontainer').css({transform: 'translate(-' + (sliderWidth*pos) + 'px, 0)'})
    el.find('.t418__slidecontainer').css("transition-duration", ".3s");
    if(window.lazy=='y'){t_lazyload_update();}
  }

  var swipeOptions = {
      triggerOnTouchEnd: true,
      swipeStatus: swipeStatus,
      allowPageScroll: "vertical",
      threshold: 75
  };

  el.find(".t418__slidecontainer").swipe(swipeOptions);
  el.find(".t418__slidecontainer").swipe( {
    tap:function(event, target) {
      slideRight(recid);
    }
  });

  function swipeStatus(event, phase, direction, distance) {
      if (phase == "move" && (direction == "left" || direction == "right")) {
          var duration = 0;

          if (direction == "left") {
              scrollImages((sliderWidth * pos) + distance, duration);
          } else if (direction == "right") {
              scrollImages((sliderWidth * pos) - distance, duration);
          }

      } else if (phase == "cancel") {
          scrollImages(sliderWidth * pos);
      } else if (phase == "end") {
          if (direction == "right") {
              slideLeft(recid);
          } else if (direction == "left") {
              slideRight(recid);
          }
      }
  }

  function scrollImages(distance, duration) {
      //el.find(".t418__slidecontainer").css("transition-duration", "0s");
      el.find(".t418__slidecontainer").css("transition-duration", (duration / 1000).toFixed(1) + "s");
      var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
      el.find(".t418__slidecontainer").css("transform", "translate(" + value + "px, 0)");
  }
}

                               
 
function t450_showMenu(recid){
  var el=$('#rec'+recid);
  $('body').addClass('t450__body_menushowed');
  el.find('.t450').addClass('t450__menu_show');
  el.find('.t450__overlay').addClass('t450__menu_show');
  $('.t450').bind('clickedAnchorInTooltipMenu',function(){
    t450_closeMenu();
  });
  el.find('.t450__overlay, .t450__close, a[href*=#]').click(function() {
    var url = $(this).attr('href');
    if (typeof url!='undefined' && url!='' && (url.substring(0, 7) == '#price:' || url.substring(0, 9) == '#submenu:')) { return; }
    t450_closeMenu();
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
    	$('body').removeClass('t390__body_popupshowed');
      $('.t390').removeClass('t390__popup_show');
    }
});
}

function t450_closeMenu(){
  $('body').removeClass('t450__body_menushowed');
  $('.t450').removeClass('t450__menu_show');
  $('.t450__overlay').removeClass('t450__menu_show');
}

function t450_checkSize(recid){
  var el=$('#rec'+recid).find('.t450');
  var windowheight = $(window).height() - 80;
  var contentheight = el.find(".t450__top").height() + el.find(".t450__rightside").height();
  if (contentheight > windowheight) {
    el.addClass('t450__overflowed');
    el.find(".t450__container").css('height', 'auto');
  }
}

function t450_appearMenu(recid) {
  var el=$('#rec'+recid);
  var burger=el.find(".t450__burger_container");
   burger.each(function() {
          var el=$(this);
          var appearoffset=el.attr("data-appearoffset");
          var hideoffset=el.attr("data-hideoffset");
          if(appearoffset!=""){
                  if(appearoffset.indexOf('vh') > -1){
                      appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                  }

                  appearoffset=parseInt(appearoffset, 10);

                  if ($(window).scrollTop() >= appearoffset) {
                    if(el.hasClass('t450__beforeready')){
                        el.finish(); 
                        el.removeClass("t450__beforeready");
                    }
                  }else{
                    el.stop();
                    el.addClass("t450__beforeready");
                  }
          }

          if(hideoffset!=""){
                  if(hideoffset.indexOf('vh') > -1){
                      hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)));
                  }

                  hideoffset=parseInt(hideoffset, 10);

                  if ($(window).scrollTop()+$(window).height() >= $(document).height() - hideoffset) {
                    if(!el.hasClass('t450__beforeready')){
                        el.finish();
                        el.addClass("t450__beforeready");
                    }
                  }else{
                    if (appearoffset!="") {
                        if($(window).scrollTop() >= appearoffset){
                          el.stop();
                          el.removeClass("t450__beforeready");
                        }
                    }else{
                        el.stop();
                        el.removeClass("t450__beforeready");
                    }
                  }
          }
   });
}

function t450_initMenu(recid){
  var el=$('#rec'+recid).find('.t450');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t450_closeMenu();
      t450_showMenu(recid);
      t450_checkSize(recid);
      e.preventDefault();
    });
  }
  $('#rec'+recid).find('.t450__burger_container').click(function(e){
    t450_closeMenu();
    t450_showMenu(recid);
    t450_checkSize(recid);
  });
  
  if (isMobile) {
    $('#rec'+recid).find('.t-menu__link-item').each(function() {
      var $this = $(this);
      if ($this.hasClass('t450__link-item_submenu')) {
        $this.on('click', function() {
          setTimeout(function() {
            t450_checkSize(recid);
          }, 100);
        });
      }
    });
  }
}

 
function t602_init(recid){
	var t602_lastCall,
			t602_timeoutId,
			t602_interval = 100;
	$(window).scroll( function() {
		var t602_now = new Date().getTime();
		if (t602_lastCall && t602_now < (t602_lastCall + t602_interval) ) {
				clearTimeout(t602_timeoutId);
				t602_timeoutId = setTimeout(function () {
						t602_lastCall = t602_now;
						t602_setProgressBarWidth(recid);
				}, t602_interval - (t602_now - t602_lastCall) );
		} else {
				t602_lastCall = t602_now;
				t602_setProgressBarWidth(recid);
		}
	});
}


function t602_setProgressBarWidth(recid) {
	var t602_windowScrollTop = $(window).scrollTop(),
			t602_docHeight = $(document).height(),
			t602_winHeight = $(window).height();
			t602_scrollPercent = (t602_windowScrollTop / (t602_docHeight-t602_winHeight)) * 100;
	$(".t602__indicator").css('width', t602_scrollPercent + '%');
}
 
function t604_init(recid) {  
  t604_imageHeight(recid);
  t604_arrowWidth(recid);
  t604_show(recid);
  t604_hide(recid);
  $(window).bind('resize', t_throttle(function(){
    t604_arrowWidth(recid);
  }, 200));
}

function t604_show(recid) {  
  var el=$("#rec"+recid),
      play = el.find('.t604__play');
  play.click(function(){
    if($(this).attr('data-slider-video-type')=='youtube'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    if($(this).attr('data-slider-video-type')=='vimeo'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    $(this).next().css('z-index', '3');
  });
}

function t604_hide(recid) {  
  var el=$("#rec"+recid),
      body = el.find('.t604__frame');
  el.on('updateSlider', function(){
    body.html('').css('z-index', '');
  });
}

function t604_imageHeight(recid) {  
  var el=$("#rec"+recid); 
  var image = el.find(".t604__separator");
  image.each(function() {
    var width = $(this).attr("data-slider-image-width");
    var height = $(this).attr("data-slider-image-height"); 
    var ratio = height/width;
    var padding = ratio*100;      
    $(this).css("padding-bottom",padding+"%");    
  });
}

function t604_arrowWidth(recid) {  
  var el=$("#rec"+recid),
      arrow = el.find('.t-slds__arrow_wrapper'),
      slideWidth = el.find('.t-slds__wrapper').width(),
      windowWidth = $(window).width(),
      arrowWidth = windowWidth-slideWidth;
  if(windowWidth>960){
    arrow.css('width', arrowWidth/2);
  } else {
    arrow.css('width', '');
  }
} 
function t670_init(recid) {  
  t670_imageHeight(recid);
  t670_show(recid);
  t670_hide(recid);
}

function t670_show(recid) {
  var el=$("#rec"+recid),
      play = el.find('.t670__play');
  play.click(function(){
    if($(this).attr('data-slider-video-type')=='youtube'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    if($(this).attr('data-slider-video-type')=='vimeo'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>");
    }
    $(this).next().css('z-index', '3');
  });
}

function t670_hide(recid) {  
  var el=$("#rec"+recid),
      body = el.find('.t670__frame');
  el.on('updateSlider', function(){
    body.html('').css('z-index', '');
  });
}

function t670_imageHeight(recid) {  
  var el=$("#rec"+recid); 
  var image = el.find(".t670__separator");
  image.each(function() {
    var width = $(this).attr("data-slider-image-width");
    var height = $(this).attr("data-slider-image-height"); 
    var ratio = height/width;
    var padding = ratio*100;      
    $(this).css("padding-bottom",padding+"%");    
  });
} 
function t678_onSuccess(t678_form){
	var t678_inputsWrapper = t678_form.find('.t-form__inputsbox');
    var t678_inputsHeight = t678_inputsWrapper.height();
    var t678_inputsOffset = t678_inputsWrapper.offset().top;
    var t678_inputsBottom = t678_inputsHeight + t678_inputsOffset;
	var t678_targetOffset = t678_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t678_target = t678_targetOffset - 200;
    }	else {
        var t678_target = t678_targetOffset - 100;
    }

    if (t678_targetOffset > $(window).scrollTop() || ($(document).height() - t678_inputsBottom) < ($(window).height() - 100)) {
        t678_inputsWrapper.addClass('t678__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t678_target}, 400);
        setTimeout(function(){t678_inputsWrapper.addClass('t678__inputsbox_hidden');}, 400);
    }

	var successurl = t678_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}

 
function t702_onSuccess(t702_form){
	var t702_inputsWrapper = t702_form.find('.t-form__inputsbox');
    var t702_inputsHeight = t702_inputsWrapper.height();
    var t702_inputsOffset = t702_inputsWrapper.offset().top;
    var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
	var t702_targetOffset = t702_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t702_target = t702_targetOffset - 200;
    }	else {
        var t702_target = t702_targetOffset - 100;
    }

    if (t702_targetOffset > $(window).scrollTop() || ($(document).height() - t702_inputsBottom) < ($(window).height() - 100)) {
        t702_inputsWrapper.addClass('t702__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t702_target}, 400);
        setTimeout(function(){t702_inputsWrapper.addClass('t702__inputsbox_hidden');}, 400);
    }

	var successurl = t702_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t702_lockScroll(){
  var body = $("body");
	if (!body.hasClass('t-body_scroll-locked')) {
		var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		body.addClass('t-body_scroll-locked');
		body.css("top","-"+bodyScrollTop+"px");
    body.attr("data-popup-scrolltop",bodyScrollTop);
	}
}

function t702_unlockScroll(){
  var body = $("body");
	if (body.hasClass('t-body_scroll-locked')) {
    var bodyScrollTop = $("body").attr("data-popup-scrolltop");
		body.removeClass('t-body_scroll-locked');
		body.css("top","");
    body.removeAttr("data-popup-scrolltop")
		window.scrollTo(0, bodyScrollTop);
	}
}


function t702_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  el.find('.t-range').trigger('popupOpened');
  if(window.lazy=='y'){t_lazyload_update();}
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed t702__body_popupshowed');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    setTimeout(function() {
      t702_lockScroll();
    }, 500);
  }
  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }  
    if (e.target == this) { t702_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t702_closePopup();
  });

  el.find('a[href*="#"]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t702_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t702_closePopup(); }
  });
}

function t702_closePopup(){
  $('body').removeClass('t-body_popupshowed t702__body_popupshowed');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    t702_unlockScroll();
  }  
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t702_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t702_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }

    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t702_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t702_showPopup(recid);
      t702_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
          var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
          
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }

    });
  }
}
 
function t806__init(recid) {
  tvote__init(recid);
  var testWrap = $('#rec' + recid);
  var testContainer = testWrap.find('.t806');
  var rightAnswersCount;
  var testAnswers = testWrap.find('.t806__answers');
  var testBlock = testWrap.find('.t806__test');
  var testResultWrap = testWrap.find('.t806__result-wrap');
  var shareVK = testWrap.find('.t806__social-btn-vk');
  var shareFB = testWrap.find('.t806__social-btn-fb');
  var shareTwitter = testWrap.find('.t806__social-btn-twitter');
  var rightTestAnswers = [];
  var testImgSrc = [];
  var startTitle = testWrap.find('.t806__start-title').text();
  var startText = testWrap.find('.t806__start-text').text();
  var siteLocation = window.location.href;

  testBlock.addClass('t806__counter');
  testBlock.attr('data-count', 0);

  testResultWrap.each(function(i) {
    if ($(testResultWrap[i]).find('img').attr('src') !== '') {
      testImgSrc.push($(testResultWrap[i]).find('img').attr('src'));
    }
  });

  if (testImgSrc.length == 1) {
    testResultWrap.each(function(i) {
      $(testResultWrap[i]).find('img').attr('src', testImgSrc[0]);
      $(testResultWrap[i]).find('.t806__result-desc').removeClass('t806__result-desc_withoutimg');
      $(testResultWrap[i]).find('.t806__result-count, .t806__result-variant').css('color', '#ffffff');
    });
  }

  testAnswers.each(function() {
    rightTestAnswers.push($(this).attr('data-right-answer'));

    $(this).removeAttr('data-right-answer');
  });

  t806__changeRadio(recid, rightTestAnswers);
  t806__changeTestInput(recid);
  t806__startClickBtn(recid);
  t806__checkClickBtn(recid, rightTestAnswers);
  t806__nextClickBtn(recid);
  t806__resultClickBtn(recid);
  t806__restartClickBtn(recid, rightTestAnswers);

  shareVK.click(function() {t806_shareVK(recid, startTitle, siteLocation)});
  shareFB.click(function() {t806_shareFB(recid, startTitle, startText, siteLocation)});
  shareTwitter.click(function() {t806_shareTwitter(recid, startTitle, siteLocation)});

  t806__clearFormOnBackClick(testWrap);
}


function t806_scrollToTop(testBlock) {
  var topCoordinate = testBlock.offset().top;
  $('html, body').animate({
    scrollTop: topCoordinate
  }, 0);
}


function t806__clearFormOnBackClick(testWrap) {
  window.addEventListener('pagehide', function() {
    testWrap.find('.t806__input').prop('checked' , false);
  });
}


function t806__startClickBtn(test) {
  var testWrap = $('#rec' + test);
  var questionFirst = 1;
  var testBtnStart = testWrap.find('.t806__start-btn');

  testBtnStart.on('click', function (e) {
    var testStart = $(this).parents('.t806__start');

    testStart.hide();
    testStart.next().show();
    t806__showNumber(test, questionFirst);

    t806_fixcontentheight(test);
    t806_scrollToTop(testWrap);

    if (typeof $(".t-records").attr("data-tilda-mode")=="undefined") {
        if(window.lazy=='y'){t_lazyload_update();}
    }

    e.preventDefault();
  });
}


function t806__changeRadio(test, rightansw) {
  var testBlock = $('#rec' + test);
  var testInput = testBlock.find('.t806__input[type="radio"]');
  var lastQuestion = testBlock.find('.t806__question').last();

  lastQuestion.addClass('t806__lastquestion');

  testInput.change(function () {
    var rightAnswersCount = testBlock.find('.t806__counter').attr('data-count');
    var testItem = $(this).parents('#rec' + test + ' .t806__question');
    var testAnswers = $(this).parents('#rec' + test + ' .t806__answers');
    var answerVote = $(this).parents('#rec' + test + ' .t806__answers').find('.t806__answer .t-vote__btn-res');
    var currentRightAnswer = rightansw[testItem.attr('data-question-num') - 1];

    if ($(this).attr('type') === 'radio') {
      var checkedRadio = $(this).val();

      testAnswers.addClass('t806__answers_answered');

      if (testItem.hasClass('t806__lastquestion')) {
        testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_result').addClass('t806__btn_show');
      } else {
        testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_next').addClass('t806__btn_show');
      }

      testItem.find('.t806__input').attr('disabled', true);

      if (+checkedRadio === +currentRightAnswer) {
        rightAnswersCount++;
        testBlock.find('.t806__counter').attr('data-count', rightAnswersCount);
      }

      if (+testItem.find('.t806__input:checked').val() !== +currentRightAnswer) {
        testItem.find('.t806__input:checked').parents('.t806__answer').addClass('t806__answer_wrong');
      }
      testItem.find('.t806__input:checked').parent().siblings('.t806__details').show();

      testItem.find('.t806__input[value="' + currentRightAnswer + '"]').parents('.t806__answer').addClass('t806__answer_correct');

      answerVote.addClass('t806__answer-vote_show');

      testItem.find('.t806__input:checked').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');
      testItem.find('.t806__input[type="radio"]').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');
    }

    t806_fixcontentheight(test);
  });
}


function t806__changeTestInput(test) {
  var testBlock = $('#rec' + test);
  var testInput = testBlock.find('.t806__input[type="checkbox"]');
  var lastQuestion = testBlock.find('.t806__question').last();
  var checkedAnswerCheck = [];

  testBlock.find('.t806__answers').attr('data-test-checked', '');

  lastQuestion.addClass('t806__lastquestion');

  testInput.change(function () {
    var testAnswers = $(this).parents('#rec' + test + ' .t806__answers');

    if ($(this).attr('type') === 'checkbox') {
      testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_check').addClass('t806__btn_show');
    }

    if ($(this).attr('type') === 'checkbox' && $(this).is(':checked') && checkedAnswerCheck.indexOf($(this).val()) === -1) {
      checkedAnswerCheck.push($(this).val());
    }

    if ($(this).attr('type') === 'checkbox' && !$(this).is(":checked")) {
      checkedAnswerCheck.splice(checkedAnswerCheck.indexOf($(this).val()), 1);
    }

    testAnswers.attr('data-test-checked', checkedAnswerCheck.join(','));

    t806_fixcontentheight(test);
  });

  return checkedAnswerCheck;
}


function t806__checkClickBtn(test, rightansw) {
  var rightChecked = false;
  var testBlock = $('#rec' + test);
  var testBtnCheck = testBlock.find('.t806__btn_check');
  var testInput = testBlock.find('.t806__input');
  var checkedAnswersTruth = [];

  testBtnCheck.on('click', function (e) {
    var rightAnswersCount = testBlock.find('.t806__counter').attr('data-count');
    var testItem = $(this).parents('#rec' + test + ' .t806__question');
    var testAnswers = $(this).parents('#rec' + test + ' .t806__question').find('.t806__answers');
    var answerVote = $(this).parents('.t806__btn-wrapper').siblings('#rec' + test + ' .t806__answers').find('.t806__answer .t-vote__btn-res');
    var checkboxAnswersArr = [];
    var checkboxAnswers = rightansw[testItem.attr('data-question-num') - 1].split(',');
    var checkedAnswers = testAnswers.attr('data-test-checked').split(',');

    for (var i = 0; i < checkboxAnswers.length; i++) {
      checkboxAnswersArr.push(checkboxAnswers[i]);
    }

    testItem.find(testInput).attr('disabled', true);

    answerVote.addClass('t806__answer-vote_show');

    checkedAnswers.forEach(function (item, i) {
      var checkedCheckboxSort = checkedAnswers.sort();
      var checkboxAnswersArrSort = checkboxAnswersArr.sort();

      if (+checkedCheckboxSort[i] === +checkboxAnswersArrSort[i] && checkedCheckboxSort.length === checkboxAnswersArrSort.length) {
        checkedAnswersTruth.push(1);
      } else {
        checkedAnswersTruth.push(0);
      }
    });

    var rightChecked = checkedAnswersTruth.every(function(item) {
      return item == 1;
    });

    if (testItem.find(testInput).attr('type') === 'checkbox') {
      checkboxAnswersArr.forEach(function (item) {
        testItem.find('.t806__input[value="' + +item + '"]').parents('.t806__answer').addClass('t806__answer_correct');
      });

      checkedAnswers.forEach(function (item) {
        if (checkboxAnswersArr.indexOf(item) === -1) {
          testItem.find('.t806__input[value="' + +item + '"]:checked').parents('.t806__answer').addClass('t806__answer_wrong');
          testItem.find('.t806__input[value="' + +item + '"]').parent().siblings().show();
        }
      });
    }

    testItem.find('.t806__input:checked').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');

    if (rightChecked) {
      rightAnswersCount++;
      testBlock.find('.t806__counter').attr('data-count', rightAnswersCount);
    }

    checkedAnswersTruth = [];

    $(this).removeClass('t806__btn_show');

    if (testItem.hasClass('t806__lastquestion')) {
      $(this).parents('.t806__question').find('.t806__btn_result').addClass('t806__btn_show');
    } else {
      $(this).parents('.t806__question').find('.t806__btn_next').addClass('t806__btn_show');
    }

    testAnswers.addClass('t806__answers_answered');

    t806_fixcontentheight(test);

    if (typeof $(".t-records").attr("data-tilda-mode")=="undefined") {
        if(window.lazy=='y'){t_lazyload_update();}
    }

    testItem.find('.t806__input:checked').parent().siblings('.t806__details').show();
    t806__changeTestInput(test);

    e.preventDefault();
  });
}


function t806__nextClickBtn(test) {
  var testBlock = $('#rec' + test);
  var testBtnNext = testBlock.find('.t806__btn_next');
  var questionNumber;

  testBtnNext.on('click', function (e) {
    var parentTop = $(this).parents('#rec' + test + ' .t806').offset().top;
    var testItem = $(this).parents('#rec' + test + ' .t806__question');
    questionNumber = testItem.next().attr('data-question-num');

    testItem.hide();
    testItem.next().show();
    t806__showNumber(test, questionNumber);

    t806_fixcontentheight(test);
    t806_scrollToTop(testBlock);

    if (typeof $(".t-records").attr("data-tilda-mode")=="undefined") {
        if(window.lazy=='y'){t_lazyload_update();}
    }

    e.preventDefault();
  });
}


function t806__resultClickBtn(test) {
  var testBtnResult = $('#rec' + test + ' .t806__btn_result');
  var testBlock = $('#rec' + test);

  testBtnResult.on('click', function (e) {
    var parentTop = $(this).parents('#rec' + test + ' .t806__test').offset().top;
    var testItem = $(this).parents('#rec' + test + ' .t806__question');

    testItem.hide();
    t806_scrollToTop(testBlock);
    t806__showResult(test);

    t806_fixcontentheight(test);

    if (typeof $(".t-records").attr("data-tilda-mode")=="undefined") {
        if(window.lazy=='y'){t_lazyload_update();}
    }

    e.preventDefault();
  });
}


function t806__restartClickBtn(test, rightansw) {
  var testBlock = $('#rec' + test);
  var testContainer = testBlock.find('.t806');
  var testRestart = testBlock.find('.t806__btn_restart');
  var testItemAll = testBlock.find('.t806__question');

  testRestart.on('click', function (e) {
    testBlock.find('.t806__start').show();
    testBlock.find('.t806__result').hide();
    testBlock.find('.t806__btn_next').removeClass('t806__btn_show');
    testBlock.find('.t806__btn_result').removeClass('t806__btn_show');
    testBlock.find('.t806__btn_check').removeClass('t806__btn_show');
    testBlock.find('.t806__details').hide();
    testBlock.find('.t806__answers').removeClass('t806__answers_answered');
    testBlock.find('.t806__answers').attr('data-test-checked', '');
    testBlock.find('.t806__answer').removeClass('t806__answer_correct');
    testBlock.find('.t806__answer').removeClass('t806__answer_wrong');
    testBlock.find('.t806__input').parents('.t806__answer').removeClass('t806__answer_withoutopacity');
    testBlock.find('.t806__input').prop('checked' , false);
    testBlock.find('.t806__input').removeAttr('disabled');
    testBlock.find('.t806__answer .t-vote__btn-res').removeClass('t806__answer-vote_show');
    $('#rec' + test + ' .t806__counter').attr('data-count', 0);
    testBlock.find('.t806__number').text(1 + '/' + testItemAll.length);

    t806_fixcontentheight(test);

    if (testContainer.hasClass('t806__test-reload')) {
      document.location.reload(true);
    }

    e.preventDefault();
  });
}


function t806__showResult(test) {
  var testBlock = $('#rec' + test);
  var testContainer = testBlock.find('.t806');
  var fullResult = testBlock.find('.t806__result');
  var startImg = testBlock.find('.t806__start-img img');
  var fullResultLength = fullResult.length;
  var allResult;
  var resultLength = testBlock.find('.t806__result').length;
  var rightAnswersCount = $('#rec' + test).find('.t806__counter').attr('data-count');
  var testItemAll = $('#rec' + test + ' .t806__question');
  var resultCount = $('#rec' + test + ' .t806__result .t806__result-count');
  var resultPercent = rightAnswersCount != 0 ? rightAnswersCount / testItemAll.length * 100 : 0;

  resultCount.text(rightAnswersCount + '/' + testItemAll.length);

  if (resultPercent <= 100 * 1/fullResultLength) {
    testBlock.find('.t806__result_1').show();
  }

  for (var i = 0; i < fullResultLength; i++) {
    if (resultPercent > 100 * (i+1)/fullResultLength && resultPercent <= 100 * (i+2)/fullResultLength) {
      testBlock.find('.t806__result_' + (i + 2)).show();
    }
  }

  if (resultPercent > 100 * (fullResultLength - 1)/fullResultLength) {
    testBlock.find('.t806__result_' + fullResultLength).show();
  }

  var resultData = [];

  fullResult.each(function(i) {
    if ($(fullResult[i]).css('display') == 'block') {
      resultData[0] = $(fullResult[i]).find('.t806__result-variant').text()
      resultData[1] = $(fullResult[i]).find('.t806__result-count').text();

      resultData[2] = '';

      if (testContainer.hasClass('t806__test-reload')) {
        if ($(fullResult[i]).find('.t806__result-wrap img').length != 0) {
          if (typeof window.lazy !== 'undefined') {
           resultData[2] = $(fullResult[i]).find('.t806__result-wrap img').attr('data-original');
         } else {
           resultData[2] = $(fullResult[i]).find('.t806__result-wrap img').attr('src');
         }
        }

        if ($(fullResult[i]).find('.t806__result-wrap img').length == 0 && startImg.length != 0){
          if (typeof window.lazy !== 'undefined') {
           resultData[2] = startImg.attr('data-original');
         } else {
           resultData[2] = startImg.attr('src');
         }
        }
      }

      if (!testContainer.hasClass('t806__test-reload')) {
        if ($(fullResult[i]).find('.t806__result-wrap img').length != 0) {
          resultData[2] = $(fullResult[i]).find('.t806__result-wrap img').attr('src');
        }

        if ($(fullResult[i]).find('.t806__result-wrap img').length == 0 && startImg.length != 0){
          resultData[2] = startImg.attr('src');
        }
      }

      resultData[3] = $(fullResult[i]).attr('data-quiz-result-number');
    }
  });

  return resultData;
}


function t806__showNumber(test, number) {
  var testItemNumber = $('#rec' + test + ' .t806__number');
  var testItemAll = $('#rec' + test + ' .t806__question');
  testItemNumber.html('<span>' + number + '</span>' + '<span>/</span>' + '<span>' + testItemAll.length + '</span>');
}


function t806_fixcontentheight(id) {
    /* correct cover height if content more when cover height */
  var el = $("#rec" + id);
  var hcover=el.find(".t-cover").height();
  var hcontent=el.find("div[data-hook-content]").outerHeight();
  if(hcontent>300 && hcover<hcontent){
     var hcontent=hcontent+120;
     if(hcontent>1000){hcontent+=100;}
     el.find(".t-cover").height(hcontent);
     el.find(".t-cover__filter").height(hcontent);
     el.find(".t-cover__carrier").height(hcontent);
     el.find(".t-cover__wrapper").height(hcontent);
     if($isMobile == false){
       setTimeout(function() {
         var divvideo=el.find(".t-cover__carrier");
         if(divvideo.find('iframe').length>0){
            setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
         }
       }, 2000);
    }
  }
}


function t806_changeShareFBUrl(siteLocation, searchUrl) {
  var url = siteLocation.split('?')[0] + '?';
  var searchParametrs = decodeURIComponent(searchUrl.substring(1));
  var params = searchParametrs.split('&');

  params.forEach(function(item) {
    if (item.indexOf('fb_action_ids') == -1 && item.indexOf('fb_action_types')  == -1 && item.indexOf('result') == -1) {
      url = url + item + '&';
    }
  });

  url = url.substring(0, url.length - 1);
  return url;
}


function t806_shareVK(recid, ptitle, purl) {
  var dataForShare = t806__showResult(recid);
  var text = dataForShare[0];
  var count = dataForShare[1];
  var slash = dataForShare[2].indexOf('/') == 0 ? '' : '/';
  var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
  var img = dataForShare[2].indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
  var resultNumber = dataForShare[3];
  var idUrl = recid + resultNumber + 'vk';
  
  var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
      urlValueImg += '&result=' + count;
      if (dataForShare[2].length > 0) {
        urlValueImg += '&url=' + img;
      }
      urlValueImg += '&id=' + idUrl;
      urlValueImg += '&social=vk' + '&name=' + ptitle;
      
  var value = $.ajax({
    url: urlValueImg,
    type: 'GET',
    async: false,
    data: {
      format: 'json'
    },
    error: function() {
      console.log('Error');
    },
    complete: function(data) {
      var urlImg = data.responseJSON.url;
      var shareUrl = window.location.href.indexOf('#') != -1 ? purl.split('#')[0] : purl;
      url = 'http://vkontakte.ru/share.php?url=' + shareUrl + '&title=' + ptitle + '&description=' + ptitle + '&image=' + urlImg + '&noparse=true';
      t806__openPopup(url);
    }
  });
}


function t806_shareFB(recid, ptitle, pdescr, purl) {
  var dataForShare = t806__showResult(recid);
  var text = dataForShare[0];
  var count = dataForShare[1];
  var slash = dataForShare[2].indexOf('/') == 0 ? '' : '/';
  var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
  var img = dataForShare[2].indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
  var resultNumber = dataForShare[3];
  var idUrl = recid + resultNumber + 'fb';
  var param = count.substring(0, count.indexOf('/')) + count.substring(count.indexOf('/') + 1);
  
  var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
      urlValueImg += '&result=' + count;
      if (dataForShare[2].length > 0) {
          urlValueImg += '&url=' + img;
      }
      urlValueImg += '&id=' + idUrl;
      urlValueImg += '&social=fb' + '&name=' + ptitle;
      
  var value = $.ajax({
    url: urlValueImg,
    type: 'GET',
    async: false,
    data: {
      format: 'json'
    },
    error: function() {
      console.log('Error');
    },
    complete: function(data) {
      var urlImg = data.responseJSON.url;
      var searchUrl = window.location.search;
      purl = searchUrl !== '' ? t806_changeShareFBUrl(purl, searchUrl) + '?result=' + param : purl + '?result=' + param;

      FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
        object: {
            'og:url': purl,
            'og:title': ptitle,
            'og:description': pdescr,
            'og:image': urlImg,
            'og:image:type': 'image/jpeg',
            'og:image:width': '1200',
            'og:image:height': '630'
          }
        })
      });
    }
  });
}


function t806_shareTwitter(recid, ptitle, purl) {
  var dataForShare = t806__showResult(recid);
  var testWrap = $('#rec' + recid);
  var testContainer = testWrap.find('.t806');
  var text = dataForShare[0];
  var count = dataForShare[1];
  var img = dataForShare[2];

  var resultCount = count.substring(0, count.indexOf('/'));
  var allCount = count.substring(count.indexOf('/') + 1)

  var result;

  if (testContainer.hasClass('t806__ru')) {
    result = 'Мой результат: ' + resultCount + ' из ' + allCount + '. ' + text;
  }
  if (testContainer.hasClass('t806__en')) {
    result = 'My result: ' + resultCount + ' out of ' + allCount + '. ' + text;
  }
  
  purl = purl.replace(/&/g, '%26');

  url = 'https://twitter.com/share?url=' + purl + '&text=' + result;
  url = encodeURI(url);

  t806__openPopup(url);
}


function t806__openPopup(url) {
  window.open(url,'','toolbar=0,status=0,width=626,height=436');
}
 
function t830_init(recid){
  var rec = $('#rec' + recid);
  var allrecords = $("#allrecords");
  var el = rec.find('.t830');
  var panel = rec.find('.t830__panel');
  var overlay = rec.find('.t830m__overlay');
  var menu = rec.find('.t830m');
  var submenu = rec.find('.t830m__submenu');
  var burger = rec.find('.t830__side .t830__burger');
  var menuItem = rec.find('.t830m__list-title a');
  var submenuItem = rec.find('.t830m__submenu-item a');

  if ($(window).width() > 1259) {
    $('.t-body').prepend(rec);
    allrecords.addClass('t830__allrecords');
    $('.t-tildalabel').addClass('t830__t-tildalabel');
  }

  t830_initMenu(rec, menu, burger);
  t830_removePadding(rec, allrecords);
  t830_calcCol(rec, menu, allrecords);
  t830_menuHighlight();
  t830_submenuHighlight();
  t830_openSubmenu(rec);
  t830_hoverShowMenu(rec, menu, panel, overlay, burger);

  $(window).resize(function() {
    t830_calcCol(rec, menu, allrecords);
    t830_removePadding(rec, allrecords);

    if (menu.hasClass('t830m_close') && $(window).width() > 1499) {
      overlay.removeClass('t830m__menu_show');
    }
  });

  if (submenu.hasClass('t830m__submenu_close')) {
    t830_toggleMenu(rec, submenu);
  }

  if ($(window).width() > 1259) {
    t830_scrollSideMenu(rec);
  }

  menuItem.click(function() {
    if (window.location.hash.length != 0) {
      menuItem.removeClass('t-active');
      $(this).addClass('t-active');
    }
  });

  submenuItem.click(function() {
    if (window.location.hash.length != 0) {
      submenuItem.removeClass('t-active');
      $(this).addClass('t-active');
    }
  });

  t830_checkAnchorLinks(recid);

}


function t830_calcCol(rec, menu, allrecords) {
  if ($(window).width() > 1259 && !menu.hasClass('t830m_open')) {
    allrecords.addClass('t830__allrecords_padd');
    $('.t-tildalabel').addClass('t830__t-tildalabel_padd');
  }

  if ($(window).width() > 1259 && menu.hasClass('t830m_open')) {
    allrecords.addClass('t830__allrecords_padd-small');
    $('.t-tildalabel').addClass('t830__t-tildalabel_padd-small');
  }
}


function t830_toggleMenu(rec, submenu) {
  var listTitle = rec.find('.t830m__list-title_toggle');
  var submenu;
  var textTitle;

  listTitle.click(function() {
    submenu = $(this).next();
    textTitle = $(this).find('.t830m__list-title-text');
    submenu.slideToggle('slow');

    textTitle.toggleClass('t830m__list-title-text_opacity');
    textTitle.toggleClass('t-menu__link-item');
  });
}


function t830_openSubmenu(rec) {
  var submenuItem = rec.find('.t830m__submenu-item a.t-active');
  submenuItem.parents('.t830m__submenu').css('display', 'block');
}


function t830_hoverShowMenu(rec, menu, panel, overlay, burger) {
  if ($(window).width() > 1259 && panel.hasClass('t830__panel_hover')) {
    panel.mouseenter(function(e) {
      menu.addClass('t830m__menu_show');
      burger.addClass('t830__burger_open');
      overlay.addClass('t830m__overlay_hover');
    });

    menu.mouseleave(function() {
      menu.removeClass('t830m__menu_show');
      burger.removeClass('t830__burger_open');
    });

    overlay.mouseenter(function() {
      menu.removeClass('t830m__menu_show');
      burger.removeClass('t830__burger_open');
      overlay.removeClass('t830m__overlay_hover');
    })

    menu.find('a').on('click', function() {
      menu.removeClass('t830m__menu_show');
      burger.removeClass('t830__burger_open');
    });

    burger.click(function() {
      if (burger.hasClass('t830__burger_open')) {
        t830_closeMenu(rec, menu);
        burger.removeClass('t830__burger_open');
      } else {
        menu.addClass('t830m__menu_show');
        burger.addClass('t830__burger_open');
        overlay.addClass('t830m__overlay_hover');
      }
    });
  }
}


function t830_showMenu(rec, menu, burger) {
  var panel = rec.find('.t830__panel');

  $('body').addClass('t830__body_menushowed');
  rec.find('.t830m').addClass('t830m__menu_show');
  rec.find('.t830m__overlay').addClass('t830m__menu_show');

  rec.find('.t830m__overlay, .t830m__close, a[href*=#]').click(function(){
    if ($(this).is('.tooltipstered, .t794__tm-link')) { return; }
    t830_closeMenu(rec, menu);
    burger.removeClass('t830__burger_open');
  });

  panel.addClass('t830__panel_close');

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      if ($('.t-site-search-popup__background').length === 0) {
        $('body').removeClass('t830__body_menushowed');
        $('.t830m').removeClass('t830m__menu_show');
        burger.removeClass('t830__burger_open');
        $('.t830m__overlay').removeClass('t830m__menu_show');
      }
    }
  });
}


function t830_closeMenu(rec, menu) {
  var panel = rec.find('.t830__panel');

  if (menu.hasClass('t830m_open') && $(window).width() < 1500) {
    panel.removeClass('t830__panel_close');
  }

  $('body').removeClass('t830__body_menushowed');
  $('.t830m').removeClass('t830m__menu_show');
  $('.t830m__overlay').removeClass('t830m__menu_show');
}


function t830_initMenu(rec, menu, burger) {
  var obj = rec.find('.t830__menu__content');
  var panel = rec.find('.t830__panel');
  var menu = rec.find('.t830m');

  if (panel.hasClass('t830__panel_click') || (panel.hasClass('t830__panel_hover') && $(window).width() <= 1259)) {
    obj.click(function(e) {
      if (menu.hasClass('t830m__menu_show')) {
        burger.removeClass('t830__burger_open');
        t830_closeMenu(rec, menu);
      } else {
        burger.addClass('t830__burger_open');
        t830_showMenu(rec, menu, burger);
      }

      e.preventDefault();
    });
  }

  $('.t830').bind('clickedAnchorInTooltipMenu',function(){
    t830_closeMenu(rec, menu);
  });
}


function t830_menuHighlight() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  if (url.substr(url.length - 1) == '/') { url = url.slice(0,-1); }
  if (pathname.substr(pathname.length - 1) == "/") { pathname = pathname.slice(0,-1); }
  if (pathname.charAt(0) == '/') { pathname = pathname.slice(1); }
  if (pathname == '') { pathname = '/'; }
  $(".t830m__list-title a[href='" + url + "']").addClass('t-active');
  $(".t830m__list-title a[href='" + url + "/']").addClass('t-active');
  $(".t830m__list-title a[href='" + pathname + "']").addClass('t-active');
  $(".t830m__list-title a[href='/" + pathname + "']").addClass('t-active');
  $(".t830m__list-title a[href='" + pathname + "/']").addClass('t-active');
  $(".t830m__list-title a[href='/" + pathname + "/']").addClass('t-active');
}


function t830_submenuHighlight() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  if (url.substr(url.length - 1) == '/') { url = url.slice(0,-1); }
  if (pathname.substr(pathname.length - 1) == '/') { pathname = pathname.slice(0,-1); }
  if (pathname.charAt(0) == '/') { pathname = pathname.slice(1); }
  if (pathname == '') { pathname = "/"; }
  $(".t830m__submenu-item a[href='" + url + "']").addClass('t-active');
  $(".t830m__submenu-item a[href='" + url + "/']").addClass('t-active');
  $(".t830m__submenu-item a[href='" + pathname + "']").addClass('t-active');
  $(".t830m__submenu-item a[href='/" + pathname + "']").addClass('t-active');
  $(".t830m__submenu-item a[href='" + pathname + "/']").addClass('t-active');
  $(".t830m__submenu-item a[href='/" + pathname + "/']").addClass('t-active');
}


function t830_scrollSideMenu(rec) {
  var container = rec.find('.t830m__container');

  container.on('scroll wheel DOMMouseScroll mousewheel', function(e) {
    var searchResultContainer = rec.find('.t-site-search-dm');

    if (searchResultContainer.length == 0 ) {
      t830_stopScroll(this, e);
    }
  });
}


function t830_stopScroll(block, eventScroll) {
  var $this = $(block);
  var scrollTop = block.scrollTop;
  var scrollHeight = block.scrollHeight;
  var height = $this.height();
  var delta = (eventScroll.type == 'DOMMouseScroll' ? eventScroll.originalEvent.detail * -40 : eventScroll.originalEvent.wheelDelta);
  var up = delta > 0;

  var prevent = function() {
    eventScroll.stopPropagation();
    eventScroll.preventDefault();
    eventScroll.returnValue = false;
    return false;
  }
  if (!up && -delta > scrollHeight - height - scrollTop) {
    $this.scrollTop(scrollHeight);
    return prevent();
  } else if (up && delta > scrollTop) {
    $this.scrollTop(0);
    return prevent();
  }
}


function t830_removePadding(rec, allrecords) {
  if (rec.css('display') == 'none') {
    allrecords.css('padding-left', 0);
    $('.t-tildalabel').css('padding-left', 0);
  }
}


function t830_checkAnchorLinks(recid) {
  if ($(window).width() >= 960) {
    var submenuNavLinks = $("#rec" + recid + " .t830m__list a:not(.tooltipstered)[href*='#']");

    if (submenuNavLinks.length > 0) {
      setTimeout(function() {
        t830_catchScroll(submenuNavLinks, recid);
      }, 500);
    }
  }
}


function t830_catchScroll(navLinks, recid) {
  var rec = $('#rec' + recid);
  var clickedSectionId = null;
  var sections = new Array();
  var sectionIdTonavigationLink = [];
  var interval = 100;
  var lastCall;
  var timeoutId;
  var navLinks = $(navLinks.get().reverse());

  navLinks.each(function() {
    var cursection = t830_getSectionByHref($(this));
    if (typeof cursection.attr('id') != 'undefined') {
      sections.push(cursection);
    }
    sectionIdTonavigationLink[cursection.attr('id')] = $(this);
  });
  t830_updateSectionsOffsets(sections);

  sections.sort(function(a, b) {
    return b.attr('data-offset-top') - a.attr('data-offset-top');
  });

  $(window).bind('resize', t_throttle(function() {t830_updateSectionsOffsets(sections);}, 200));
  $('.t830').bind('displayChanged',function() {t830_updateSectionsOffsets(sections);});
  setInterval(function() {t830_updateSectionsOffsets(sections);}, 5000);
  t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);

  navLinks.click(function() {
    var clickedSection = t830_getSectionByHref($(this));
    if (!$(this).hasClass('tooltipstered') && typeof clickedSection.attr('id') != 'undefined') {
      navLinks.removeClass('t-active');
      $(this).addClass('t-active');
      clickedSectionId = t830_getSectionByHref($(this)).attr("id");
    }
  });

  $(window).scroll(function() {
    var now = new Date().getTime();
    if (lastCall && now < (lastCall + interval)) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        lastCall = now;
        clickedSectionId = t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
      }, interval - (now - lastCall));
    } else {
      lastCall = now;
      clickedSectionId = t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
    }
  });
}


function t830_getSectionByHref(curlink) {
  var curLinkValue = curlink.attr('href').replace(/\s+/g, '');
  if (curLinkValue[0]=='/') { curLinkValue = curLinkValue.substring(1); }
  if (curlink.is('[href*="#rec"]')) {
    return $(".r[id='" + curLinkValue.substring(1) + "']");
  } else {
    return $(".r[data-record-type='215']").has("a[name='" + curLinkValue.substring(1) + "']");
  }
}


function t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId) {
  var scrollPosition = $(window).scrollTop();
  var valueToReturn = clickedSectionId;
  if (sections.length != 0 && clickedSectionId == null && sections[sections.length-1].attr('data-offset-top') > (scrollPosition + 300)){
    navLinks.removeClass('t-active');
    return null;
  }

  $(sections).each(function(e) {
    var curSection = $(this);
    var sectionTop = curSection.attr('data-offset-top');
    var id = curSection.attr('id');
    var navLink = sectionIdTonavigationLink[id];

    if (((scrollPosition + 300) >= sectionTop) || (sections[0].attr("id") == id && scrollPosition >= $(document).height() - $(window).height())) {
      if (clickedSectionId == null && !navLink.hasClass('t-active')) {
        navLinks.removeClass('t-active');
        navLink.addClass('t-active');
        valueToReturn = null;
      } else {
        if (clickedSectionId != null && id == clickedSectionId) {
          valueToReturn = null;
        }
      }
      return false;
    }
  });

  return valueToReturn;
}


function t830_updateSectionsOffsets(sections) {
  $(sections).each(function() {
    var curSection = $(this);
    curSection.attr('data-offset-top', curSection.offset().top);
  });
}
