Kiwi.Plugins.SaveGame={name:"SaveGame",version:"1.0.2",minimumKiwiVersion:"1.0.0"};Kiwi.PluginManager.register(Kiwi.Plugins.SaveGame);Kiwi.Plugins.SaveGame.create=function(e){var t=new Kiwi.Plugins.SaveGame.SaveManager(e);e.saveManager=t;return e.saveManager};Kiwi.Plugins.SaveGame.SaveManager=function(e){this.game=e};Kiwi.Plugins.SaveGame.SaveManager.prototype.objType=function(){return"SaveManager"};Kiwi.Plugins.SaveGame.SaveManager.prototype.boot=function(){this.localStorage=new Kiwi.Plugins.SaveGame.LocalStorage(this.game);this.current=this.localStorage};Kiwi.Plugins.SaveGame.SaveManager.prototype.switchCurrent=function(e){if(typeof e==="undefined")return;switch(e){case Kiwi.Plugins.SaveGame.SaveManager.LOCAL_STORAGE:this.current=this.localStorage;break}};Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype,"add",{get:function(){return this.current.add.bind(this.current)},enumerable:true,configurable:true});Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype,"edit",{get:function(){return this.current.edit.bind(this.current)},enumerable:true,configurable:true});Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype,"remove",{get:function(){return this.current.remove.bind(this.current)},enumerable:true,configurable:true});Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype,"getData",{get:function(){return this.current.getData.bind(this.current)},enumerable:true,configurable:true});Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype,"save",{get:function(){return this.current.save.bind(this.current)},enumerable:true,configurable:true});Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype,"exists",{get:function(){return this.current.exists.bind(this.current)},enumerable:true,configurable:true});Kiwi.Plugins.SaveGame.SaveManager.LOCAL_STORAGE=1;Kiwi.Plugins.SaveGame.LocalStorage=function(e){this.game=e;this._data={};this._supported=Kiwi.DEVICE.localStorage;if(this.supported)this._retrieveData()};Object.defineProperty(Kiwi.Plugins.SaveGame.LocalStorage.prototype,"data",{get:function(){return this._data},enumerable:true,configurable:true});Object.defineProperty(Kiwi.Plugins.SaveGame.LocalStorage.prototype,"supported",{get:function(){return this._supported},enumerable:true,configurable:true});Kiwi.Plugins.SaveGame.LocalStorage.prototype.objType=function(){return"LocalStorage"};Kiwi.Plugins.SaveGame.LocalStorage.prototype._retrieveData=function(){if(localStorage.getItem(this.game.stage.name)!==null){var e=localStorage.getItem(this.game.stage.name);this._data=JSON.parse(e)}else{this._create()}};Kiwi.Plugins.SaveGame.LocalStorage.prototype._create=function(){try{this._data={name:this.game.stage.name};localStorage.setItem(this.game.stage.name,JSON.stringify(this._data))}catch(e){console.log("Can not use localstorage due to memory limitations.");this._supported=false}};Kiwi.Plugins.SaveGame.LocalStorage.prototype.add=function(e,t,n){if(typeof n=="undefined")n=false;if(this.supported===true){this._data[e]=t;if(n===true){return this.save()}else{return true}}return false};Kiwi.Plugins.SaveGame.LocalStorage.prototype.edit=function(e,t,n){if(typeof n=="undefined")n=false;if(this.supported===true){if(this._data[e]!==null){this._data[e]=t;if(n===true){this.save()}else{return true}}}return false};Kiwi.Plugins.SaveGame.LocalStorage.prototype.getData=function(e){if(this.supported===true){if(typeof this._data[e]!=="undefined"){return this._data[e]}}return null};Kiwi.Plugins.SaveGame.LocalStorage.prototype.exists=function(e){return this._data[e]!==undefined};Kiwi.Plugins.SaveGame.LocalStorage.prototype.remove=function(e,t){if(typeof t=="undefined")t=false;if(this.supported===true){if(this._data[e]!==null){delete this._data[e];if(t===true){this.save()}else{return true}}}};Kiwi.Plugins.SaveGame.LocalStorage.prototype.clear=function(e){if(typeof e=="undefined")e=false;if(this.supported===true){this._data={};if(e===true)this.save()}};Kiwi.Plugins.SaveGame.LocalStorage.prototype.save=function(){try{localStorage.setItem([this.game.stage.name],JSON.stringify(this._data));return true}catch(e){console.log("Localstorage is full. Could not update.");return false}};Kiwi.Plugins.SaveGame.LocalStorage.prototype.load=function(){if(this.supported===true){this._data=JSON.parse(localStorage.getItem(this.game.stage.name));return true}return false}