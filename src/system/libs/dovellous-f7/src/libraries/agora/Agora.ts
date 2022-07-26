import RtcEngine from 'react-native-agora';

import {K, ModuleBaseClasses} from "../app/helpers";

import { VoiceCallConfig, VoiceCall } from "./apps/voice/VoiceCall";
import { VideoCallConfig, VideoCall } from "./apps/video/VideoCall";
import { InstantMessagingConfig, InstantMessaging } from "./apps/instant-messaging/InstantMessaging";
import { LiveStreamingConfig, LiveStreaming } from "./apps/live-streaming/LiveStreaming";
import { WhiteBoardConfig, WhiteBoard } from "./apps/white-board/WhiteBoard";

interface AgoraInterface {
  videoCall: VideoCallConfig,
  voiceCall: VoiceCallConfig,
  instantMessaging:InstantMessagingConfig,
  liveStreaming:LiveStreamingConfig,
  whiteBoard: WhiteBoardConfig
}

class AgoraConfig implements AgoraInterface{
  appId: any;
  primaryCertificate: any;
  channels: any;
  tokens: any;
  videoCall: VideoCallConfig;
  voiceCall: VoiceCallConfig;
  instantMessaging:InstantMessagingConfig;
  liveStreaming:LiveStreamingConfig;
  whiteBoard: WhiteBoardConfig;
  static events: any;

  constructor(
    appId: any,
    primaryCertificate: any,
    channels: any,
    tokens: any,
    videoCall: VideoCallConfig,
    voiceCall: VoiceCallConfig,
    instantMessaging:InstantMessagingConfig,
    liveStreaming:LiveStreamingConfig,
    whiteBoard: WhiteBoardConfig
  ) {
    this.appId = appId;
    this.primaryCertificate = primaryCertificate;
    this.channels = channels;
    this.tokens = tokens;
    this.videoCall = videoCall;
    this.voiceCall = voiceCall;
    this.instantMessaging = instantMessaging;
    this.liveStreaming = liveStreaming;    
    this.whiteBoard = whiteBoard;
  }

}

const AgoraLibrary = ModuleBaseClasses.Class.extend({

  init: function(
    events: any, 
    F7: any,
    appId: any,
    primaryCertificate: any,
    channels: any,
    tokens: any,
    videoCall: VideoCallConfig | AgoraConfig,
    voiceCall: VoiceCallConfig,
    instantMessaging:InstantMessagingConfig,
    liveStreaming:LiveStreamingConfig,
    whiteBoard: WhiteBoardConfig 
  ) {

		let self = this;

    let options: AgoraConfig;

    if (videoCall instanceof AgoraConfig) {
      options = videoCall;
    } else {
      options = new AgoraConfig(appId, primaryCertificate, channels, tokens, voiceCall, videoCall, instantMessaging, liveStreaming, whiteBoard);
    }

		this.events = events;

		this.modules.params = self;

		this.modules.initModules(this, F7, options);

	},
	modules: (function() {
		let parent = {

			isLoaded: false,

			params: AgoraConfig,

      F7: "",

			RTC_ENGINE: RtcEngine,
			APP_ID: "",
			PRIMARY_CERTIFICATE: "",
			CHANNELS: [],
			DEFAULT_CHANNEL: "",
			TOKENS: [],
			DEFAULT_TOKEN: "",

			initModules: async (app: any, F7: any, options: { appId: string; primaryCertificate: string; agora: { channels: never[]; }; channels: { default: string; }; tokens: never[]; voiceCall: any; videoCall: any; instantMessaging: any; liveStreaming: any; whiteBoard: any; }) => {

        parent.F7 = F7;

				parent.RTC_ENGINE = RtcEngine;

				parent.APP_ID = options.appId;
				parent.PRIMARY_CERTIFICATE = options.primaryCertificate;
				parent.CHANNELS = options.agora.channels;
				parent.DEFAULT_CHANNEL = options.channels["default"];
				parent.TOKENS = options.tokens;
				parent.DEFAULT_TOKEN = options.tokens["default"];

				parent.RTC_ENGINE.create(options.appId);

        await parent.generateDefaultToken();

        await parent.generateDefaultChannel();

				await parent.voiceCall.init(app, options.voiceCall);

				await parent.videoCall.init(app, options.videoCall);

				await parent.instantMessaging.init(app, options.instantMessaging);

				await parent.liveStreaming.init(app, options.liveStreaming);

				await parent.whiteBoard.init(app, options.whiteBoard);

        parent.params.events[K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED]({
          agoraApp: app,
          agoraModule: parent
        });
					
			},

			generateDefaultToken: async ()=>{

        let _token;

        //call ajax and retrieve token

        parent.DEFAULT_TOKEN = _token;

			},

			generateDefaultChannel: async ()=>{

        let _channel;

        //call ajax and retrieve channel

        parent.DEFAULT_CHANNEL = _channel;

			},

			voiceCall: {

				isReady: false,

        lib: {},

				params: {
					moduleName: "VoiceCall",
				},

				init: async (app: any, options: { moduleName: string; }) => { 
					
					parent.voiceCall.params = options;

          parent.voiceCall.lib = new VoiceCall(parent.params.events, parent.F7, options);
          parent.voiceCall.isReady = true;
          
					parent.params.events[K.Events.Modules.Agora.VoiceCall.ON_APP_INIT]([
						app,
						options
					]);

          return parent.voiceCall;

				},
			},
			
			videoCall: {

				isReady: false,

        lib: {},

				params: {
					moduleName: "VideoCall",
				},

				init: async (app: any, options: { moduleName: string; }) => { 
					
					parent.videoCall.params = options;

          parent.videoCall.lib = new VideoCall(parent.params.events, parent.F7, options);
          parent.videoCall.isReady = true;
          
					parent.params.events[K.Events.Modules.Agora.VideoCall.ON_APP_INIT]([
						app,
						options
					]);

          return parent.videoCall;

				},
			},
			
			instantMessaging: {

				isReady: false,

        lib: {},

				params: {
					moduleName: "InstantMessaging",
				},

				init: async (app: any, options: { moduleName: string; }) => { 
					
					parent.instantMessaging.params = options;

          parent.instantMessaging.lib = new InstantMessaging(parent.params.events, parent.F7, options);
          parent.instantMessaging.isReady = true;
          
					parent.params.events[K.Events.Modules.Agora.InstantMessaging.ON_APP_INIT]([
						app,
						options
					]);

          return parent.instantMessaging;

				},
			},
			
			liveStreaming: {

				isReady: false,

        lib: {},

				params: {
					moduleName: "LiveStreaming",
				},

				init: async (app: any, options: { moduleName: string; }) => { 
					
					parent.liveStreaming.params = options;

          parent.liveStreaming.lib = new LiveStreaming(parent.params.events, parent.F7, options);
          parent.liveStreaming.isReady = true;
          
					parent.params.events[K.Events.Modules.Agora.LiveStreaming.ON_APP_INIT]([
						app,
						options
					]);

          return parent.liveStreaming;

				},
			},
			
			whiteBoard: {
				
				isReady: false,

        lib: {},

				params: {
					moduleName: "WhiteBoard",
				},

				init: async (app: any, options: { moduleName: string; }) => { 
					
					parent.whiteBoard.params = options;

          parent.whiteBoard.lib = new WhiteBoard(parent.params.events, parent.F7, options);
          parent.whiteBoard.isReady = true;
          
					parent.params.events[K.Events.Modules.Agora.WhiteBoard.ON_APP_INIT]([
						app,
						options
					]);

          return parent.whiteBoard;

				},
        
			},
			
		};
		return parent;
	})(),
});

// Agora Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Agora);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const agoraLibEvent: ModuleBaseClasses.DovellousLibraryEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Agora.AgoraLibEvent.NAME);

const Agora = (F7: any, options: AgoraConfig) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new AgoraLibrary(agoraLibEvent, F7, options);

};

export {Agora, AgoraConfig};