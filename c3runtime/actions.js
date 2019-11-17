"use strict";

{
	C3.Plugins.Rex_NGIO_Authentication.Acts =
	{
		Login(){
			var self = this;
			var onLoggedIn = function () {
				self.onLoggedIn();
			};
			var onLoginFailed = function () {
				//self.runtime.trigger(cr.plugins_.Rex_NGIO_Authentication.prototype.cnds.OnLoginError, self);
				this.Trigger(C3.Plugins.Rex_NGIO_Authentication.Cnds.OnLoginError);
			};
			var onLoginCancelled = function () {
				//self.runtime.trigger(cr.plugins_.Rex_NGIO_Authentication.prototype.cnds.OnLoginCancel, self);
				this.Trigger(C3.Plugins.Rex_NGIO_Authentication.Cnds.OnLoginCancel);
			};

			var onGetSession = function () {
				self.ngio["requestLogin"](onLoggedIn, onLoginFailed, onLoginCancelled);
			};

			this.ngio["getSessionLoader"]()["getValidSession"](onGetSession);
		},
		
		LoggingOut() {
			var self = this;
			var onLoggedOut = function () {
				self.onLoggedOut();
			}
			var onGetSession = function () {
				self.ngio["logOut"](onLoggedOut);
			};

			this.ngio["getSessionLoader"]()["getValidSession"](onGetSession);
		}
	};
}