"use strict";

{
	const C3=self.C3;
	C3.Plugins.Rex_NGIO_Authentication.Cnds =
	{
		OnLoginSuccess()
		{
			return true;
		},
		
		OnLoginError(){
			return true;
		},
		
		OnLoginCancel(){
			return true;
		},
		
		OnLoggedOut(){
			return true;
		},
		
		IsLogin() {
			return this.isLogin;
		}
	};
}