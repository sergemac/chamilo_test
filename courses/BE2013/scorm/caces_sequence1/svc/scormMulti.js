
	
scServices.dataUtil = {
	serialiseObjJs : function(pObj){
		var vBuf="";
		if(pObj) for (var vKey in pObj){
			var vLbl = (pObj instanceof Array) ? "" : "\'" + vKey + "\':";
			var vObj = pObj[vKey];
			if(vObj != null) {
				if(vObj instanceof Array){
					vBuf+= (vBuf!="" ? "," : "") + vLbl + "[" + this.serialiseObjJs(vObj) + "]";
				} else if(typeof vObj == "object" || vObj instanceof Object){
					vBuf+= (vBuf!="" ? "," : "") + vLbl + "{" + this.serialiseObjJs(vObj) + "}";
				} else if(typeof vObj == "number"){
					vBuf+= (vBuf!="" ? "," : "") + vLbl + vObj;
				} else {
					vBuf+= (vBuf!="" ? "," : "") + vLbl+"\'" + vObj.toString().replace(/[\t\n\r\\'"]/g, this.escapeJs) + "\'";
				}
			}
		}
		return vBuf;
	},
	deserialiseObjJs : function(pString){
		if(!pString) return {};
		var vVal;
		eval("vVal={"+pString+"}");
		return vVal;
	},
	escapeJs : function(pChar){
		switch(pChar) {
			case '\t' : return "\\t";
			case '\n' : return "\\n";
			case '\r' : return "\\r";
			case '\'' : return "\\\'";
			case '\"' : return "\\\"";
			case '\\' : return "\\\\";
		} 
		return "";
	}
}
scServices.scorm12 = scServices.scorm2k4 = scOnLoads[scOnLoads.length] = scOnUnloads[scOnUnloads.length] = {
xFindAPI : function (pWin, pName) {
	var vWin = pWin;
	var vDeep = 0;
	//on cherche l'API dans la hierarchie de la fenêtre en cours
	while(vWin[pName]==null && vWin.parent!=null && vWin.parent!=vWin) {
		if (vDeep++ > 20) break; //on limite la profondeur de l'exploration
		vWin = vWin.parent;
	}
	//On examine si nécessaire la fenêtre qui a ouvert celle en cours
	if (vWin[pName]==null && pWin.opener!=null && typeof(pWin.opener)!="undefined" ) {
		vWin = pWin.opener;
		vDeep=0;
		while(vWin[pName] == null && vWin.parent != null && vWin.parent != vWin) {
			if (vDeep++ > 20) return null;
			vWin = vWin.parent;
		}
	}
	return vWin[pName];
},
isScorm12Active : function() { return this._12Api != null; },
getScorm12API : function() { return this._12Api; },
_12Api : null,
isScorm2k4Active : function() { return this._2k4Api != null; },
getScorm2k4API : function() { return this._2k4Api; },
_2k4Api : null,
xInitScorm2k4 : function(){
	try {
		this._2k4Api = this.xFindAPI(window, "API_1484_11");
		if(this._2k4Api) {
			this.checkError = function(pAlertUser){
				var vErrCode = this._2k4Api.GetLastError();
				if(vErrCode != "0") {
					var vMess = "SCORM 2004 error "+ vErrCode + " : " + this._2k4Api.GetErrorString(vErrCode) + "\n" + this._2k4Api.GetDiagnostic(vErrCode);
					if(pAlertUser) alert(vMess);
					if(window.console && window.console.log) window.console.log(vMess);
					return vMess;
				}
				return null;
			}
			//Init...
			if(this._2k4Api.Initialize("") != "true") {
				this.checkError(true);
				this._2k4Api = null;
				return false;
			}
			return true;
		}
	}catch(e){
		alert("Initialize SCORM 2004 failed." + ((e.description) ? e.description : e));
		this._2k4Api = null;
	}
	return false;
},
xInitScorm12 : function(){
	try {
		this._12Api = this.xFindAPI(window, "API");
		if(this._12Api) {
			this.checkError = function(pAlertUser){
				var vErrCode = this._12Api.LMSGetLastError();
				if(vErrCode != "0") {
					var vMess = "SCORM 1.2 error "+ vErrCode + " : " + this._12Api.LMSGetErrorString(vErrCode) + "\n" + this._12Api.LMSGetDiagnostic(vErrCode);
					if(pAlertUser) alert(vMess);
					if(window.console && window.console.log) window.console.log(vMess);
					return vMess;
				}
				return null;
			}
			//Init...
			if(this._12Api.LMSInitialize("") != "true") {
				this.checkError(true);
				this._12Api = null;
				return false;
			}
			return true;
		}
	}catch(e){
		alert("Initialize SCORM 1.2 failed." + ((e.description) ? e.description : e));
		this._12Api = null;
	}
	return false;
},

onLoad: function(){
 if(this.xInitScorm2k4()) return;
 this.xInitScorm12();

},
loadSortKey: "0scorm",
onUnload: function(){
	if(this._2k4Api) {
		this._2k4Api.Commit("");
		this._2k4Api.Terminate("");
		this._2k4Api = null;
	}
	if(this._12Api) {
		this._12Api.LMSCommit("");
		this._12Api.LMSFinish("");
		this._12Api = null;
	}

},
unloadSortKey: "4scorm"

};

scServices.suspendDataStorage = scOnLoads[scOnLoads.length] = scOnUnloads[scOnUnloads.length] = {

getVal: function(pFields) {
	var vCur = this._Fields;
	for(var i=0, imax=pFields.length; i < imax; i++) {
		var vF = vCur[pFields[i]];
		if(vF == null) return null;
		vCur = vF;
	}
	return vCur;
},

setVal : function (pFields, pVal) {
	var vCur = this._Fields;
	var imax = pFields.length-1;
	for(var i=0; i<imax; i++) {
		var vF = vCur[pFields[i]];
		if(vF == null) vCur = vCur[pFields[i]] = {}; else vCur = vF;
	}
	if( ! (pFields[imax] in vCur) || vCur[pFields[imax]] != pVal) {
		vCur[pFields[imax]] = pVal;
		this._Dirty = true;
		return true;
	}
	return false;
},


removeVal : function (pFields) {
	var vCur = this._Fields;
	var imax = pFields.length-1;
	for(var i=0; i<imax; i++) {
		var vF = vCur[pFields[i]];
		if(vF == null) return false;
		vCur = vF;
	}
	if(vCur[pFields[imax]]) {
		this._Dirty = true;
		return delete vCur[pFields[imax]];
	}
	return false;
},

commit : function() {
	if( ! this._Dirty) return;
	if(scServices.scorm2k4 && scServices.scorm2k4.isScorm2k4Active()) {
		var vApi = scServices.scorm2k4.getScorm2k4API();
		vApi.SetValue("cmi.suspend_data", scServices.dataUtil.serialiseObjJs(this._Fields));
		vApi.Commit("");
	} else if(scServices.scorm12 && scServices.scorm12.isScorm12Active()) {
		var vApi = scServices.scorm12.getScorm12API();
		vApi.LMSSetValue("cmi.suspend_data", scServices.dataUtil.serialiseObjJs(this._Fields));
		vApi.LMSCommit("");
	} else if(scServices.storage && scServices.storage.isStorageActive()) {
		scServices.storage.getStorage().setItem(scServices.storage.getRootKey()+"suspend_data", scServices.dataUtil.serialiseObjJs(this._Fields));
	}
	this._Dirty = false;
},

_Fields: {},
_Dirty: false,
onLoad: function(){
	var vApi;
	if(scServices.scorm2k4 && scServices.scorm2k4.isScorm2k4Active()) {
		vApi = scServices.scorm2k4.getScorm2k4API();
		try {
			this._Fields = scServices.dataUtil.deserialiseObjJs(vApi.GetValue("cmi.suspend_data"));
			scServices.scorm2k4.checkError();
		} catch(e){
			this._Fields = {};
			alert("SCORM 2004 : Echec à la récupération des précédentes données enregistrées.");
		}
	} else if(scServices.scorm12 && scServices.scorm12.isScorm12Active()) {
		vApi = scServices.scorm12.getScorm12API();
		try {
			this._Fields = scServices.dataUtil.deserialiseObjJs(vApi.LMSGetValue("cmi.suspend_data"));
			scServices.scorm12.checkError();
		} catch(e){
			this._Fields = {};
			alert("SCORM 1.2 : Echec à la récupération des précédentes données enregistrées.");
		}
	} else if(scServices.storage && scServices.storage.isStorageActive()) {
		vApi = scServices.storage.getStorage();
		var vItem = scServices.storage.getItem(scServices.storage.getRootKey()+"suspend_data");
		if(vItem) this._Fields = scServices.dataUtil.deserialiseObjJs(vItem);
	}
	
	if(vApi) this._ThreadCommit = window.setInterval("scServices.suspendDataStorage.commit();", 60000);
},
loadSortKey: "1suspendDataStorage",
onUnload: function(){
	try{window.clearInterval(this._ThreadCommit);}catch(e){};
	this.commit();
},
unloadSortKey: "3suspendDataStorage"
};

scServices.exitModeStorage = scOnLoads[scOnLoads.length] = scOnUnloads[scOnUnloads.length] = {

	setSessionTime : function(pTimeInMs) {
		this._SessionTime = pTimeInMs;
	},

	setTotalTime : function(pTimeInMs) {
		this._TotalTime = pTimeInMs;
	},
	

	parseTime : function(pTimeValue){
		if(scServices.scorm2k4 && scServices.scorm2k4.isScorm2k4Active()) {
			var vTimeMs = 0;
			var vTimeValue=pTimeValue.toUpperCase();
			var vY = new RegExp("P([0-9]*)Y").exec(vTimeValue);
			if(vY) vTimeMs+=parseInt(vY[1])*31557600000;
			var vM = new RegExp("P[^T]*?([0-9]*)M").exec(vTimeValue);
			if(vM) vTimeMs+=parseInt(vM[1])*2629800000;
			var vD = new RegExp("P[^T]*?([0-9]*)D").exec(vTimeValue);
			if(vD) vTimeMs+=parseInt(vD[1])*86400000;
			var vH = new RegExp("P.*T.*?([0-9]*)H").exec(vTimeValue);
			if(vH) vTimeMs+=parseInt(vH[1])*3600000;
			var vMin = new RegExp("P.*T.*?([0-9]*)M").exec(vTimeValue);
			if(vMin) vTimeMs+=parseInt(vMin[1])*60000;
			var vS = new RegExp("P.*T.*?([0-9\.]*)S").exec(vTimeValue);
			if(vS) vTimeMs+=Math.floor(parseFloat(vS[1])*1000);
			return vTimeMs;
		}else if(scServices.scorm12 && scServices.scorm12.isScorm12Active()) {
			var vTimeMs = 0;
			var vH = new RegExp("([0-9]*):[0-9]*:[0-9\.]*").exec(pTimeValue);
			if(vH) vTimeMs+=parseInt(vH[1])*3600000;
			var vM = new RegExp("[0-9]*:([0-9]*):[0-9\.]*").exec(pTimeValue);
			if(vM) vTimeMs+=parseInt(vM[1])*60000;
			var vS = new RegExp("[0-9]*:[0-9]*:([0-9\.]*)").exec(pTimeValue);
			if(vS) vTimeMs+=Math.floor(parseFloat(vS[1])*1000);
			return vTimeMs;
		}else return pTimeValue;	
	},

	

	serializeMsTime : function(pTimeValueMs){
		//@return : time sous la forme P[yY][mM][dD][T[hH][mM][s[.s]S]]
		if(scServices.scorm2k4 && scServices.scorm2k4.isScorm2k4Active()) {
			var vH = pTimeValueMs > 3600000 ? Math.floor(pTimeValueMs / 3600000) : 0;
			var vM = Math.floor(pTimeValueMs / 60000) % 60;
			var vS = Math.floor(pTimeValueMs / 1000) % 60;
			var vTime = "PT";
			if(vH>0) vTime = vTime + vH + "H";
			if(vM>0) vTime = vTime + vM + "M";
			if(vS>0 || vTime == "PT") vTime = vTime + vS + "S";
			return vTime;
		//@return : time sous la forme HHHH:MM:SS.SS
		}else if(scServices.scorm12 && scServices.scorm12.isScorm12Active()) {
			var vH = pTimeValueMs > 3600000 ? Math.floor(pTimeValueMs / 3600000) : 0;
			var vM = Math.floor(pTimeValueMs / 60000) % 60;
			var vS = Math.floor(pTimeValueMs / 1000) % 60;
			var vMs = Math.round(Math.floor(pTimeValueMs % 1000)/10);
			return (vH<10 ? "0"+vH : vH) + ":" + (vM<10 ? "0"+vM : vM) + ":" + (vS<10 ? "0"+vS : vS) + "." + (vMs<10 ? "0"+vMs : vMs);
		}else return pTimeValueMs;
	},

	

	terminate : function(pExitMode){
		this._done = true;
		if(scServices.scorm2k4 && scServices.scorm2k4.isScorm2k4Active()) {
			vApi = scServices.scorm2k4.getScorm2k4API();



			var vCurrentSessionTime = ("_SessionTime" in this) ? this._SessionTime : (new Date().getTime() - this._timeStart);

			vApi.SetValue("cmi.session_time", scServices.exitModeStorage.serializeMsTime(vCurrentSessionTime));

			vApi.SetValue("cmi.exit", pExitMode || "");

			vApi.Commit("");
		} else if(scServices.scorm12 && scServices.scorm12.isScorm12Active()) {
			vApi = scServices.scorm12.getScorm12API();

			var vCurrentSessionTime = ("_SessionTime" in this) ? this._SessionTime : (new Date().getTime() - this._timeStart);

			vApi.LMSSetValue("cmi.core.session_time", scServices.exitModeStorage.serializeMsTime(vCurrentSessionTime));

			if( ! pExitMode) pExitMode = "";
			if(pExitMode == "time-out") pExitMode = "timeout";
			vApi.LMSSetValue("cmi.core.exit", pExitMode);

			vApi.LMSCommit("");
		}
	},
	_timeStart : 0,
	_done : false,
	onLoad: function(){
		this._timeStart = new Date().getTime();
	},
	loadSortKey: "1exitModeStorage",
	onUnload: function(){
		if(! this._done) this.terminate();
	},
	unloadSortKey: "3exitModeStorage"
};

scServices.assmntMgr = scOnLoads[scOnLoads.length] = scOnUnloads[scOnUnloads.length] = {
	setResponse: function(pId, pSession, pField, pValue){
		this.xSetResponse(pId, pSession, pField, pValue);
		if(this._listeners) this.xFireEvent({fId:pId, fSession:pSession, fField:pField, fValue:pValue}, "handleAssmntResponse");
		return pValue;
	},
	resetResponses: function(pId, pSession){
		this.xResetResponses(pId, pSession);
		if(this._listeners) this.xFireEvent({fId:pId, fSession:pSession}, "handleAssmntResponse");
	},
	setPts: function(pId, pSession, pMin, pScore, pMax){
		this.xSetPts(pId, pSession, pMin, pScore, pMax);
		if(this._listeners) this.xFireEvent({fId:pId, fSession:pSession, fMin:pMin, fScore:pScore, fMax:pMax}, "handleAssmntPts");
	},
	getCompletionStatus: function(pId, pSession){
		return this.xGetCompletionStatus(pId, pSession) || "notAttempt";
	},
	setCompletionStatus: function(pId, pSession, pStatus){
		switch(pStatus) {
			case "attempt" : 
			case "complete" : 
			case "notAttempt" : 
				break;
			default :
				pStatus = "notAttempt";
		}
		this.xSetCompletionStatus(pId, pSession, pStatus);
		if(this._listeners) this.xFireEvent({fId:pId, fSession:pSession, fStatus:pStatus}, "handleAssmntStatus");
		return pStatus;
	},
	setHintsShown: function(pId, pSession, pHintsShown){
		this.xSetHintsShown(pId, pSession, pHintsShown);
		if(this._listeners) this.xFireEvent({fId:pId, fSession:pSession, fHintsShown:pHintsShown}, "handleAssmntHints");
		return pHintsShown;
	},
	
	_listeners : null,
	addEventListener : function (pListerner){
		this._listeners = {l:pListerner, next:this._listeners};
	},
	removeEventListener : function (pListerner){
		var vListener = this._listeners;
		var vPrev = null;
		while(vListener) {
			if(vListener.l === pListerner) {
				if(vPrev) vPrev.next = vListener.next; else this._listeners = vListener.next;
			}
			vPrev = vListener;
			vListener = vListener.next;
		}
	},
	xFireEvent : function (pEvent, pMethod){
		var vListener = this._listeners;
		while(vListener) {
			try{vListener.l[pMethod].call(vListener.l, pEvent)}catch(e){}
			vListener = vListener.next;
		}
	},
	xConnect2k4 : function(){
		this._api = scServices.scorm2k4.getScorm2k4API();
		var vCount = this._api.GetValue("cmi.interactions._count");
		this._interactionsMap = {};
		for(var i = 0; i < vCount; i++) this._interactionsMap[this._api.GetValue("cmi.interactions."+i+".id")] = {idx:i};
		this.xGetStruct = function(pId, pSession, pStruct){
			pSession = pSession ? pSession+"X" : "#"; /* X:protection bug parsers JS (ex: si pSession=eval sur firefox)*/
			var vInterac = this._interactionsMap[pId];
			if(vInterac) {
				if( ! ("session" in vInterac)) try{eval("vInterac.session={"+this._api.GetValue("cmi.interactions."+this._interactionsMap[pId].idx+".learner_response")+"}")}catch(e){vInterac.session={};};
				var vSess = vInterac.session[pSession];
				if(vSess) return vSess[pStruct];
			}
			return null;
		};
		this.xSetStruct = function(pId, pSession, pStruct, pValue){
			pSession = pSession ? pSession+"X" : "#";
			var vInterac = this._interactionsMap[pId];
			if(!vInterac) {
				vInterac = {};
				vInterac.session = {};
				this._interactionsMap[pId] = vInterac;
			} else if( ! ("session" in vInterac)) try{eval("vInterac.session={"+this._api.GetValue("cmi.interactions."+this._interactionsMap[pId].idx+".learner_response")+"}")}catch(e){vInterac.session={};};
			vInterac.updated = true;
			if(! (pSession in vInterac.session))vInterac.session[pSession] = {};
			vInterac.session[pSession][pStruct] = pValue;
		};
		this.xSynch = function(){
			for(var vId in this._interactionsMap) {
				var vInterac = this._interactionsMap[vId];
				if(vInterac.updated) {
					try {
					if(! ("idx" in vInterac)) {
						vInterac.idx = this._api.GetValue("cmi.interactions._count");
						this._api.SetValue("cmi.interactions."+vInterac.idx+".id", vId);
						this._api.SetValue("cmi.interactions."+vInterac.idx+".type", "other");
					}
					this._api.SetValue("cmi.interactions."+vInterac.idx+".learner_response", scServices.dataUtil.serialiseObjJs(vInterac.session));
					}catch(e){}
					vInterac.updated = false;
				}
			}
		};
		this.commit = function(){ this.xSynch(); this._api.Commit(""); };
		this.getResponse = function(pId, pSession, pField){var vStruct = this.xGetStruct(pId, pSession, "r"); return vStruct ? vStruct[pField] : null;};
		this.xSetResponse = function(pId, pSession, pField, pValue){var vStruct = this.xGetStruct(pId, pSession, "r") || {}; vStruct[pField] = pValue; this.xSetStruct(pId, pSession, "r", vStruct);};
		this.xResetResponses = function(pId, pSession){this.xSetStruct(pId, pSession, "r", {});};
		this.getMinPts = function(pId, pSession){return this.xGetStruct(pId, pSession, "i");};
		this.getScorePts = function(pId, pSession){return this.xGetStruct(pId, pSession, "s");};
		this.getMaxPts = function(pId, pSession){return this.xGetStruct(pId, pSession, "a");};
		this.xSetPts = function(pId, pSession, pMin, pScore, pMax){this.xSetStruct(pId, pSession, "i", pMin); this.xSetStruct(pId, pSession, "s", pScore); this.xSetStruct(pId, pSession, "a", pMax);};
		this.xGetCompletionStatus = function(pId, pSession){return this.xGetStruct(pId, pSession, "st");};
		this.xSetCompletionStatus = function(pId, pSession, pStatus){this.xSetStruct(pId, pSession, "st", pStatus);};
		this.getHintsShown = function(pId, pSession){return this.xGetStruct(pId, pSession, "h");};
		this.xSetHintsShown = function(pId, pSession, pHintsShown){this.xSetStruct(pId, pSession, "h", pHintsShown);};
	},
	xConnect12 : function(){
		this.commit = function(){scServices.suspendDataStorage.commit();};
		this.xSynch = function(){};
		this.getResponse = function(pId, pSession, pField){return scServices.suspendDataStorage.getVal(["assmnt", pSession ? pSession+"X" : "#", pId, "r", pField]);};
		this.xSetResponse = function(pId, pSession, pField, pValue){scServices.suspendDataStorage.setVal(["assmnt", pSession ? pSession+"X" : "#", pId, "r", pField], pValue);};
		this.xResetResponses = function(pId, pSession){scServices.suspendDataStorage.removeVal(["assmnt", pSession ? pSession+"X" : "#", pId, "r"]);};
		this.getMinPts = function(pId, pSession){return scServices.suspendDataStorage.getVal(["assmnt", pSession ? pSession+"X" : "#", pId, "i"]);};
		this.getScorePts = function(pId, pSession){return scServices.suspendDataStorage.getVal(["assmnt", pSession ? pSession+"X" : "#", pId, "s"]);};
		this.getMaxPts = function(pId, pSession){return scServices.suspendDataStorage.getVal(["assmnt", pSession ? pSession+"X" : "#", pId, "a"]);};
		this.xSetPts = function(pId, pSession, pMin, pScore, pMax){scServices.suspendDataStorage.setVal(["assmnt", pSession ? pSession+"X" : "#", pId, "i"], pMin); scServices.suspendDataStorage.setVal(["assmnt", pSession ? pSession+"X" : "#", pId, "s"], pScore); scServices.suspendDataStorage.setVal(["assmnt", pSession ? pSession+"X" : "#", pId, "a"], pMax); };
		this.xGetCompletionStatus = function(pId, pSession){return scServices.suspendDataStorage.getVal(["assmnt", pSession ? pSession+"X" : "#", pId, "st"]);};
		this.xSetCompletionStatus = function(pId, pSession, pStatus){scServices.suspendDataStorage.setVal(["assmnt", pSession ? pSession+"X" : "#", pId, "st"], pStatus);};
		this.getHintsShown = function(pId, pSession){return scServices.suspendDataStorage.getVal(["assmnt", pSession ? pSession+"X" : "#", pId, "h"]);};
		this.xSetHintsShown = function(pId, pSession, pHintsShown){scServices.suspendDataStorage.setVal(["assmnt", pSession ? pSession+"X" : "#", pId, "h"], pHintsShown);};
	},
	xConnectNone : function(){
		this.commit = function(){};
		this.xSynch = function(){};
		this.getResponse = function(pId, pSession, pField){return this.data.resp[pSession+"."+pId+"."+pField];};
		this.xSetResponse = function(pId, pSession, pField, pValue){this.data.resp[pSession+"."+pId+"."+pField] = pValue;};
		this.xResetResponses = function(pId, pSession){var vRegexp = new RegExp("^"+pSession+"\\."+pId+".*"); for(var vK in this.data.resp) if(vRegexp.test(vK)) delete this.data.resp[vK]};
		this.getMinPts = function(pId, pSession){return this.data.minPts[pSession+"."+pId];};
		this.getScorePts = function(pId, pSession){return this.data.scorePts[pSession+"."+pId];};
		this.getMaxPts = function(pId, pSession){return this.data.maxPts[pSession+"."+pId];};
		this.xSetPts = function(pId, pSession, pMin, pScore, pMax){this.data.minPts[pSession+"."+pId] = pMin; this.data.scorePts[pSession+"."+pId] = pScore; this.data.maxPts[pSession+"."+pId] = pMax;};
		this.xGetCompletionStatus = function(pId, pSession){return this.data.status[pSession+"."+pId];};
		this.xSetCompletionStatus = function(pId, pSession, pStatus){this.data.status[pSession+"."+pId] = pStatus;};
		this.getHintsShown = function(pId, pSession){return this.data.hints[pSession+"."+pId];};
		this.xSetHintsShown = function(pId, pSession, pHintsShown){this.data.hints[pSession+"."+pId] = pHintsShown;};
		this.data = {resp:{},scorePts:{},minPts:{},maxPts:{},status:{},hints:{}};
	},
	xConnectStorage : function(){
		this.xConnectNone();
		this.reloadData = function(){try{this.data={resp:{},scorePts:{},minPts:{},maxPts:{},status:{},hints:{}};var vItem=scServices.storage.getItem(scServices.storage.getRootKey()+"assmnt");if(vItem) eval("this.data={"+vItem+"};");} catch(e){}};
		this.commit = function(){scServices.storage.getStorage().setItem(scServices.storage.getRootKey()+"assmnt", scServices.dataUtil.serialiseObjJs(this.data))};	
		this.reloadData();
	},
	/* interne */
	onLoad: function(){
		if(scServices.scorm2k4 && scServices.scorm2k4.isScorm2k4Active()) this.xConnect2k4();
		else if(scServices.scorm12 && scServices.scorm12.isScorm12Active() && scServices.suspendDataStorage) this.xConnect12();
		else if(scServices.storage && scServices.storage.isStorageActive()) this.xConnectStorage();
		else this.xConnectNone();
	},
	loadSortKey: "2assmntMgr",
	onUnload: function(){
		this.xSynch();
	},
	unloadSortKey: "2assmntMgr"
};
