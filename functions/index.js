//import firebase functions modules
const functions = require('firebase-functions');
//import admin module
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Listens for new messages added to messages/:pushId
exports.pushNotificationNamaz = functions.database.ref('/mosquentiming/{mosqId}').onWrite( (change,context) => {

    console.log('Push notification event triggered');

    const mosq_id = context.params.mosqId;
    //  Grab the current value of what was written to the Realtime Database.
	var valueObjectb = change.before.val();
    var valueObjecta = change.after.val();
    console.log("mosqId is: "+mosq_id);
	var msg="";
    if(valueObjectb.prayerTimmings.fajartime != valueObjecta.prayerTimmings.fajartime)
	{
			msg+="Fajar time changed form ";
			msg+=valueObjectb.prayerTimmings.fajartime;
			msg+=" to ";
			msg+=valueObjecta.prayerTimmings.fajartime;
			msg+="\n";
	}
	if(valueObjectb.prayerTimmings.zohartime != valueObjecta.prayerTimmings.zohartime)
	{
			msg+="Zohar time changed form ";
			msg+=valueObjectb.prayerTimmings.zohartime;
			msg+=" to ";
			msg+=valueObjecta.prayerTimmings.zohartime;
			msg+="\n";
	}
	if(valueObjectb.prayerTimmings.asartime != valueObjecta.prayerTimmings.asartime)
	{
			msg+="Asar time changed form ";
			msg+=valueObjectb.prayerTimmings.asartime;
			msg+=" to ";
			msg+=valueObjecta.prayerTimmings.asartime;
			msg+="\n";
	}
	if(valueObjectb.prayerTimmings.maghribtime != valueObjecta.prayerTimmings.maghribtime)
	{
			msg+="Maghrib time changed form ";
			msg+=valueObjectb.prayerTimmings.maghribtime;
			msg+=" to ";
			msg+=valueObjecta.prayerTimmings.maghribtime;
			msg+="\n";
	}
	if(valueObjectb.prayerTimmings.ishatime != valueObjecta.prayerTimmings.ishatime)
	{
			msg+="Isha time changed form ";
			msg+=valueObjectb.prayerTimmings.ishatime;
			msg+=" to ";
			msg+=valueObjecta.prayerTimmings.ishatime;
			msg+="\n";
	}
	if(valueObjectb.prayerTimmings.jumatime != valueObjecta.prayerTimmings.jumatime)
	{
			msg+="Juma time changed form ";
			msg+=valueObjectb.prayerTimmings.jumatime;
			msg+=" to ";
			msg+=valueObjecta.prayerTimmings.jumatime;
			msg+="\n";
	}
     // Create a notification
    const payload = {
            notification: {
                title:valueObjecta.mosque.name,
                body: msg,
				click_action: "namaztimechangged"
            },
            data:   {
                message: "this is notification",
            }
    };
    
    //Create an options object that contains the time to live for the notification and the priority
    const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
    };

	var topic = "";
	topic+="mosqueTiming";
	topic+=mosq_id;
	console.log("topic is: "+topic);
    return admin.messaging().sendToTopic(topic, payload, options);

});

exports.pushNotificationNikkah = functions.database.ref('/NikkahAppointment/{mosqId}/{userphone}').onWrite( (change,context) => {

    console.log('Push notification event triggered');

    const mosq_id = context.params.mosqId;
	var user_phone = context.params.userphone;
    //  Grab the current value of what was written to the Realtime Database.
	user_phone = user_phone.substring(1, user_phone.length);
    var valueObjecta = change.after.val();
    console.log("mosqId is: "+mosq_id);
	var msg="";
	
	if(valueObjecta.status == "Accepted")
	{
			msg += "Nikkah Appointent for ";
			msg += valueObjecta.name;
			msg += " is accepted.";
	}
	if(valueObjecta.status == "Rejected")
	{
			msg += "Nikkah Appointent for ";
			msg += valueObjecta.name;
			msg += " rejected.";
	}
	
     // Create a notification
    const payload = {
            notification: {
                title:"Nikkah Appointent",
                body: msg,
            },
            data:   {
                message: "this is notification",
            }
    };
    
    //Create an options object that contains the time to live for the notification and the priority
    const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
    };

	var topic = "";
	topic+="Nikkah";
	topic+=mosq_id;
	topic+=user_phone;
	console.log("topic is: "+topic);
	if(msg == ""){
		return null;
	}
	else{
		return admin.messaging().sendToTopic(topic, payload, options);
	}
});

exports.pushNotificationIttekaaf = functions.database.ref('/IttekaafAppointment/{mosqId}/{userphone}').onWrite( (change,context) => {

    console.log('Push notification event triggered');

    const mosq_id = context.params.mosqId;
	var user_phone = context.params.userphone;
    //  Grab the current value of what was written to the Realtime Database.
	user_phone = user_phone.substring(1, user_phone.length);
    var valueObjecta = change.after.val();
    console.log("mosqId is: "+mosq_id);
	var msg="";
	
	if(valueObjecta.status == "Accepted")
	{
			msg += "Ittekaaf Application for ";
			msg += valueObjecta.name;
			msg += " is accepted.";
	}
	if(valueObjecta.status == "Rejected")
	{
			msg += "Ittekaaf Appointent for ";
			msg += valueObjecta.name;
			msg += " rejected.";
	}
	
     // Create a notification
    const payload = {
            notification: {
                title:"Ittekaaf Application",
                body: msg,
            },
            data:   {
                message: "this is notification",
            }
    };
    
    //Create an options object that contains the time to live for the notification and the priority
    const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
    };

	var topic = "";
	topic+="Ittekaaf";
	topic+=mosq_id;
	topic+=user_phone;
	console.log("topic is: "+topic);
	if(msg == ""){
		return null;
	}
	else{
		return admin.messaging().sendToTopic(topic, payload, options);
	}
});
