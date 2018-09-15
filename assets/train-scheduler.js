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

    //Train time conversions
    var freq = parseInt(fbFrequency);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    //Push back first time one year to ensure it happens before the current time
    var dConverted = moment(childSnapshot.val().firstTrain, 'HH:mm').subtract(1, 'years');
    console.log("Date Converted: "+ dConverted);
    var trainTime = moment(dConverted).format('HH:mm');
    console.log("TRAIN TIME : " + trainTime);

    //Difference between the two times
    var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var tDifference = moment().diff(moment(tConverted), 'minutes');
    console.log("Difference in time: " + tDifference);

    //Calculate the remainder
    var tRemainder = tDifference % freq; 
    console.log("Time Remaining: " + tRemainder);

    //Minutes until the next train arrives
    var minsAway = freq - tRemainder;
    console.log("Minutes until the next train: " + minsAway);
    //Next Train
    var nextTrain = moment().add(minsAway, 'minutes');
    var nextArrival = moment(nextTrain).format('hh:mm A');


	// Append train info to table on page
	$("#trainTable").append("<tr><td>" + fbName + "</td><td>" + fbLine + "</td><td>"+ fbDestination + "</td><td>" + freq + " mins" + "</td><td>" + nextArrival + "</td><td>"+ minsAway + "</td><td>");

	
});






