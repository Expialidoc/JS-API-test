/** Request sounds from urls and play**/
/** deal with response from our sound API. */
////////////////////////////////////////////////////////////////////////////
function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
    this.allinOne = new Array();
  }
  
  BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
  
    var loader = this;
  
    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }
  
    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }
  
    request.send();
  }
  
  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  }
///////////////////////////////////////////////////////////////////////////////////

    var context = new AudioContext();
    var bufferLoader;
    let url1 = ['https://freesound.org/data/previews/382/382422_7119516-lq.mp3', 'https://freesound.org/data/previews/508/508804_1690102-lq.mp3','https://freesound.org/data/previews/175/175567_2042115-lq.mp3'];
    let url2 =['https://freesound.org/data/previews/117/117692_646701-lq.mp3', 'https://freesound.org/data/previews/117/117682_646701-lq.mp3', 'https://freesound.org/data/previews/40/40424_417293-lq.mp3'];
    let urls = [url1, url2];
    let mySounds;

    const loadSound = function(allinOne){
  //      const allinOne = [];
        for(let i =0;i<urls.length;i++){
            
    bufferLoader = new BufferLoader(
        context, urls[i], concatBuffer
        );
                                                          console.log(mySounds);
      bufferLoader.load();
            
        }
        allinOne.push(mySounds);                                 console.log(allinOne);
    };
                                                  
      function concatBuffer(bufferList) {
            // bufferList[] is an array containig our audiobuffer list
            
            var buflengh = bufferList.length;
            var channels = [];
            var totalDuration = 0;
        
            for(var a=0; a<buflengh; a++){
                channels.push(bufferList[a].numberOfChannels);// Store all number of channels to choose the lowest one after
                totalDuration += bufferList[a].duration;// Get the total duration of the new buffer when every buffer will be added/concatenated
            }
        
            var numberOfChannels = channels.reduce(function(a, b) { return Math.min(a, b); });;// The lowest value contained in the array channels
            mySounds = context.createBuffer(numberOfChannels, context.sampleRate * totalDuration, context.sampleRate);// Create new buffer
        
            for (var b=0; b<numberOfChannels; b++) {
                var channel = mySounds.getChannelData(b);
                var dataIndex = 0;
        
                for(var c = 0; c < buflengh; c++) {
                    channel.set(bufferList[c].getChannelData(b), dataIndex);
                    dataIndex+=bufferList[c].length;// Next position where we should store the next buffer values
                }
            }
         //     play(tmp);
            console.log(mySounds)
            return mySounds;
      };
        
                                                                
      const play = function(loadSound, allinOne){
        let source = [];
         for(let i =0;i<allinOne.length;i++){     
        source[i] = context.createBufferSource();
                                                                console.log(allinOne[i]);
          source[i].buffer = allinOne[i];
          
          source[i].connect(context.destination);
          
          source[i].start(0);
         };  
         
      }  
                  
          $(".load").on("click", loadSound);
          $(".play").on("click", () => {
            play(loadSound, allinOne);  // Is "loadSound" acts as a "this" keyword????
          });

  

  






    //     const audioCtx = new AudioContext();
    //     let buffer = [];
    
    // const load = () => {
    //   const request = new XMLHttpRequest();
    //   request.open("GET", 'https://freesound.org/people/medialint/sounds/11850/'); //resp.data[0]);
    //   request.responseType = "arraybuffer";
    //   request.onload = function() {
        
    //     let undecodedAudio = request.response;
    //     audioCtx.decodeAudioData(undecodedAudio, (data) => buffer = data);
    //   };
    //   console.log(request); 
    //   request.send();
    // };
    
    // const play = () => {
    //   const source = audioCtx.createBufferSource();
    //   source.buffer = buffer;
    //   source.connect(audioCtx.destination);
    //   source.start();
    // };
    
    // $("#load").on("click", load);
    // $("#play").on("click", play);
        
    // }