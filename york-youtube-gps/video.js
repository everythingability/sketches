//https://www.jqueryscript.net/other/Youtubebackground-js-A-Wrapper-For-The-Youtube-API.html
/*

*/

function playDefault(){

  playingDefault = true
  player = $('#video').YTPlayer({
    fitToBackground: true,
    videoId: defaultVideoId,
    repeat: 1,
    mute:false,

    playerVars: {
      modestbranding: 0,
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      branding: 0,
      rel: 0,
      autohide: 0,
    }

  });
    //$('canvas').fadeIn();
  //setupDrag() //reset the blob,
}
