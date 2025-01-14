"use strict";

{
	const C3=self.C3;
	C3.Plugins.Rex_NGIO_Authentication.Instance = class Rex_NGIO_Authentication_Instance extends C3.SDKInstanceBase
	{
		constructor(inst, properties)
		{
			super(inst);
			
			// Initialise object properties
			this.ngio=null;

			if (properties)		// note properties may be null in some cases
			{						
				this.ngio = new self["Newgrounds"]["io"]["core"](properties[0], properties[1]);
				self.ngioInstance = this.ngio;
				this.ngio["debug"] = (properties[2] === 1);
			}

			console.log(this);
			this.isLogin = false;

			this.LoginPooling();
		}
		
		Release()
		{
			super.Release();
		}
		
		SaveToJson()
		{
			return {
				// data to be saved for savegames
			};
		}
		
		LoadFromJson(o)
		{
			// load state for savegames
		}
		
		onLoggedIn() {
			this.isLogin = true;
			//this.runtime.trigger(cr.plugins_.Rex_NGIO_Authentication.prototype.cnds.OnLoginSuccess, this);
			this.Trigger(C3.Plugins.Rex_NGIO_Authentication.Cnds.OnLoginSuccess);
		}
		
		onLoggedOut(){
			this.isLogin = false;
			this.ngio["getSessionLoader"]()["closePassport"]();
			//this.runtime.trigger(cr.plugins_.Rex_NGIO_Authentication.prototype.cnds.OnLoggedOut, this);
			this.Trigger(C3.Plugins.Rex_NGIO_Authentication.Cnds.OnLoggedOut);
		}
		
		LoginPooling() {
			var self = this;
			var onGetSession = function (session) {
				var isLogin = session && !session["expired"] && session["user"];

				if (!self.isLogin && isLogin)
					self.onLoggedIn();
				else if (self.isLogin && !isLogin)
					self.onLoggedOut();

				self.isLogin = isLogin;

				// pooling next 3 seconds
				setTimeout(function () {
					self.LoginPooling();
				}, 3000);
			}
			this.ngio["getSessionLoader"]()["getValidSession"](onGetSession);
		}
		
		GetNGIO() {
			//return this.ngio;
			return self.ngioInstance;
		};
	};
}