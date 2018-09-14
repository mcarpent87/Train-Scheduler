// Initialize Firebase
var config = {
    apiKey: "AIzaSyDIf-hK-gomZJD7er8ONaSrmwABaFxCbCU",
    authDomain: "wow-this-is-firebase.firebaseapp.com",
    databaseURL: "https://wow-this-is-firebase.firebaseio.com",
    projectId: "wow-this-is-firebase",
    storageBucket: "wow-this-is-firebase.appspot.com",
    messagingSenderId: "886258825482"
};
  
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
// var database = ...
var trainData = firebase.database().ref();

//Show user current time
$("#currentTime").append(moment().format("hh:mm A"));

//Add trains
$("#addTrainBtn").on("click", function() {
    event.preventDefault();

    //Grab users input
    var trainName = $("#trainNameInput").val().trim();
    var line = $("#lineInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    //Hold train data
    var newTrain = { 
        name: trainName,
        line: line,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    //Push train data to the database
    trainData.push(newTrain);

    //Clear text input boxes
    $("#trainNameInput").val("");
    $("#lineInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
//Prevent the page from refreshing
    return false;
});

trainData.on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //Assign firebase variables to the snapshots
    var fbName = childSnapshot.val().name;
    var fbLine = childSnapshot.val().line;
    var fbDestination = childSnapshot.val().destination;
    var fbTrainTimeInput = childSnapshot.val().firstTrain;
    var fbFrequency = childSnapshot.val().frequency;

    var diffTime = moment().diff(moment.unix(fbTrainTimeInput), "minutes");
	var timeRemainder = moment().diff(moment.unix(fbTrainTimeInput), "minutes") % fbFrequency ;
	var minutes = fbFrequency - timeRemainder;

	var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
	// Test for correct times and info
	console.log(minutes);
	console.log(nextTrainArrival);
	console.log(moment().format("hh:mm A"));
	console.log(nextTrainArrival);
	console.log(moment().format("X"));

	// Append train info to table on page
	$("#trainTable").append("<tr><td>" + fbName + "</td><td>" + fbLine + "</td><td>"+ fbDestination + "</td><td>" + fbFrequency + " mins" + "</td><td>" + fbTrainTimeInput + "</td><td>" + minutes + "</td></tr>");

	
});






