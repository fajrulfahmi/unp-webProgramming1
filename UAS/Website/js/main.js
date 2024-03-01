var firebaseConfig = {
    apiKey: "AIzaSyCe0X-3HTFcK9Vu6fS3Mtn4RPPVsRk9Vkg",
    authDomain: "test-465fb.firebaseapp.com",
    databaseURL:
        "https://test-465fb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-465fb",
    storageBucket: "test-465fb.appspot.com",
    messagingSenderId: "67740797186",
    appId: "1:67740797186:web:ce2a3e1d6e2299d0381a1b",
    measurementId: "G-TBM6YXY3NY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
        console.log("You let me use your mic!");
    })
    .catch(function (err) {
        console.log("No mic for you!");
    });

function runSpeechRecognition() {
    var output = document.getElementById("output");
    var action = document.getElementById("action");

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function () {
        action.innerHTML = "<small>Silakan berbicara...</small>";
    };

    recognition.onspeechend = function () {
        action.innerHTML = "<small>Selesai...</small>";
        recognition.stop();
    };

    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        var firebaseRef = firebase.database().ref().child("LED/Merah");
        var firebaseRef2 = firebase.database().ref().child("LED/Kuning");
        var firebaseRef3 = firebase.database().ref().child("LED/Hijau");

        if (transcript.toLowerCase() == "nyalakan lampu merah") {
            firebaseRef.set("1");
        } else if (transcript.toLowerCase() == "matikan lampu merah") {
            firebaseRef.set("0");
        }

        if (transcript.toLowerCase() == "nyalakan lampu kuning") {
            firebaseRef2.set("1");
        } else if (transcript.toLowerCase() == "matikan lampu kuning") {
            firebaseRef2.set("0");
        }

        if (transcript.toLowerCase() == "nyalakan lampu hijau") {
            firebaseRef3.set(1);
        } else if (transcript.toLowerCase() == "matikan lampu hijau") {
            firebaseRef3.set(0);
        }

        if (transcript.toLowerCase() == "nyalakan semua lampu") {
            firebaseRef.set("1");
            firebaseRef2.set("1");
            firebaseRef3.set(1);
        } else if (transcript.toLowerCase() == "matikan semua lampu") {
            firebaseRef.set("0");
            firebaseRef2.set("0");
            firebaseRef3.set(0);
        }

        document.getElementById("output").value = transcript;
        output.innerHTML = transcript;
    };

    // start recognition
    recognition.lang = "id-ID";
    recognition.start();
}

$(document).ready(function () {
    var ledMerah;
    var ledKuning;
    var ledHijau;

    firebase
        .database()
        .ref("LED/")
        .on("value", function (snap) {
            ledMerah = snap.val().Merah;
            ledKuning = snap.val().Kuning;
            ledHijau = snap.val().Hijau;
            if (ledMerah == "1") {
                document.getElementById("unact").style.display = "none";
                document.getElementById("act").style.display = "block";
            } else {
                document.getElementById("unact").style.display = "block";
                document.getElementById("act").style.display = "none";
            }

            if (ledKuning == "1") {
                document.getElementById("unact1").style.display = "none";
                document.getElementById("act1").style.display = "block";
            } else {
                document.getElementById("unact1").style.display = "block";
                document.getElementById("act1").style.display = "none";
            }

            if (ledHijau == 1) {
                document.getElementById("unact2").style.display = "none";
                document.getElementById("act2").style.display = "block";
            } else {
                document.getElementById("unact2").style.display = "block";
                document.getElementById("act2").style.display = "none";
            }
        });

    $(".toggle-btn").click(function () {
        var firebaseRef = firebase.database().ref().child("LED/Merah");
        if (ledMerah == "1") {
            firebaseRef.set("0");
            ledMerah = "0";
        } else {
            firebaseRef.set("1");
            ledMerah = "1";
        }
    });

    $(".toggle-btn1").click(function () {
        var firebaseRef = firebase.database().ref().child("LED/Kuning");
        if (ledKuning == "1") {
            firebaseRef.set("0");
            ledKuning = "0";
        } else {
            firebaseRef.set("1");
            ledKuning = "1";
        }
    });

    $(".toggle-btn2").click(function () {
        var firebaseRef = firebase.database().ref().child("LED/Hijau");
        if (ledHijau == 1) {
            firebaseRef.set(0);
            ledHijau = 0;
        } else {
            firebaseRef.set(1);
            ledHijau = 1;
        }
    });
});
