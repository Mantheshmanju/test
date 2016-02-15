'use strict';
angular.module('alwaysHiredApp')
  .controller('CustomVideoTestCtrl',
        ["$sce", function ($sce) {
            this.API = null;
            this.onPlayerReady = function (API) {
                this.API = API;
            };
            // Console
            this.onConsoleCuePoint = function onConsoleCuePoint(currentTime, timeLapse, params) {
                var percent = (currentTime - timeLapse.start) * 100 / (timeLapse.end - timeLapse.start);
                console.log("time2: " + currentTime + " -> (start/end/percent) " + timeLapse.start + "/" + timeLapse.end + "/" + percent + "% = " + params.message + "\n");
            };
            var self = this;
            this.config = {
                loop: false,
                preload: "auto",
                controls: false,
                playsInline: false,
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: [
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                ],
                tracks: [
                    {
                        src: "assets/subs/pale-blue-dot.vtt",
                        kind: "captions",
                        srclang: "en",
                        label: "English",
                        default: "default"
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
                cuePoints: {
                    console: [
                        {
                            timeLapse: {
                                start: 5,
                                end: 50
                            },
                            onEnter: self.onConsoleCuePoint.bind(self),
                            onLeave: console.log("here2"),
                            onUpdate: console.log("here3"),
                            onComplete: console.log("here4"),
                            params: {
                                message: "hello dude!"
                            }
                        }
                    ]
                },
                plugins: {
                    controls: {
                        autoHide: true,
                        autoHideTime: 5000
                    }
                }
            };
        }]
    );
