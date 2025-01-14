"use strict";

{
	const C3=self.C3;
	C3.Plugins.Rex_NGIO_Authentication.Exps =
	{
		UserName() {
			var user = this.ngio["user"];
			var val = (user) ? user["name"] : "";
			return(val || "");
		},
		
		UserID() {
			var user = this.ngio["user"];
			var val = (user) ? user["id"] : "";
			return(val || 0);
		},

		UserIconURL(sizeIdx) {
			if (typeof (sizeIdx) === "string")
				sizeIdx = sizeIdx.toLowerCase();

			switch (sizeIdx) {
				case 0:
				case "s":
				case "small":
					sizeIdx = "small";
					break;

				case 1:
				case "m":
				case "medium":
					sizeIdx = "medium";
					break;

				case 2:
				case "l":
				case "large":
					sizeIdx = "large";
					break;

				default:
					sizeIdx = "large";
					break;
			}

			var user = this.ngio["user"];
			var val = (user) ? user["icons"][sizeIdx] : "";
			return(val || "");
		}
	};
}