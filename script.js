/* =====================================================
   BIRTHDAY WEBSITE
   ===================================================== */


/* =====================================================
   DATA ULANG TAHUN
   ===================================================== */

// GANTI NAMA DI SINI
const birthdayName = "Maura";

// GANTI PESAN DI SINI
const birthdayMessage = `
Selamat ulang tahun, ${birthdayName}! 🎂✨

Semoga di usia yang baru ini kamu selalu diberikan
kebahagiaan, kesehatan, dan banyak hal baik.

Semoga semua impian dan harapanmu perlahan
menjadi kenyataan.

Teruslah menjadi pribadi yang hebat dan jangan
berhenti mengejar hal-hal yang kamu impikan.

Nikmati hari spesialmu! 
`;


/* =====================================================
   ELEMENT
   ===================================================== */

const opening = document.getElementById("opening");
const cakeSection = document.getElementById("cakeSection");
const candleSection = document.getElementById("candleSection");
const birthdaySection = document.getElementById("birthdaySection");
const finalSection = document.getElementById("finalSection");

const startButton = document.getElementById("startButton");

const ingredients =
    document.querySelectorAll(".ingredient");

const cake =
    document.getElementById("cake");

const finishCakeButton =
    document.getElementById("finishCakeButton");

const blowButton =
    document.getElementById("blowButton");

const candles =
    document.querySelectorAll(".big-candle");

const candleStatus =
    document.getElementById("candleStatus");

const birthdayNameElement =
    document.getElementById("birthdayName");

const typingMessage =
    document.getElementById("typingMessage");

const celebrateButton =
    document.getElementById("celebrateButton");

const restartButton =
    document.getElementById("restartButton");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const confettiContainer =
    document.getElementById("confetti-container");


/* =====================================================
   INITIAL DATA
   ===================================================== */

let usedIngredients = [];

let litCandles = 0;


/* =====================================================
   FUNCTION
   PINDAH SCREEN
   ===================================================== */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });

    screen.classList.add("active");
}


/* =====================================================
   START
   ===================================================== */

startButton.addEventListener("click", () => {

    showScreen(cakeSection);

    /*
       Browser biasanya memblokir autoplay.
       Musik mulai setelah user melakukan klik.
    */

    birthdayMusic.play().catch(() => {
        console.log("Musik belum bisa diputar.");
    });

});


/* =====================================================
   INGREDIENTS
   ===================================================== */

ingredients.forEach(button => {

    button.addEventListener("click", () => {

        const ingredient =
            button.dataset.ingredient;


        // Jangan bisa diklik dua kali
        if (usedIngredients.includes(ingredient)) {
            return;
        }


        // Tambahkan bahan
        usedIngredients.push(ingredient);

        button.classList.add("used");


        // Animasi bahan menuju kue
        button.animate(
            [
                {
                    transform: "scale(1)"
                },
                {
                    transform:
                        "scale(1.3) translateY(-20px)"
                },
                {
                    transform: "scale(0.9)"
                }
            ],
            {
                duration: 500
            }
        );


        /*
           Kalau sudah semua bahan
        */

        if (usedIngredients.length === 5) {

            cake.classList.add("show");

            finishCakeButton.classList.remove("hidden");

            document.getElementById(
                "cakeInstruction"
            ).textContent =
                "Kuenya sudah jadi! 🎂";

        }

    });

});


/* =====================================================
   FINISH CAKE
   ===================================================== */

finishCakeButton.addEventListener("click", () => {

    showScreen(candleSection);

});


/* =====================================================
   CANDLES
   ===================================================== */

candles.forEach(candle => {

    candle.addEventListener("click", () => {

        if (candle.classList.contains("lit")) {
            return;
        }


        candle.classList.add("lit");

        litCandles++;


        candleStatus.textContent =
            `${litCandles} / 3 lilin menyala`;


        if (litCandles === 3) {

            candleStatus.textContent =
                "Semua lilin sudah menyala! 🔥";

            blowButton.classList.remove("hidden");

        }

    });

});


/* =====================================================
   BLOW CANDLES
   ===================================================== */

blowButton.addEventListener("click", () => {

    candles.forEach(candle => {

        candle.classList.remove("lit");

    });


    blowButton.classList.add("hidden");


    /*
       Sedikit delay agar animasi terasa
    */

    setTimeout(() => {

        showBirthday();

    }, 1000);

});


/* =====================================================
   SHOW BIRTHDAY
   ===================================================== */

function showBirthday() {

    showScreen(birthdaySection);


    birthdayNameElement.textContent =
        birthdayName;


    typingMessage.textContent = "";


    typeMessage();

}


/* =====================================================
   TYPING EFFECT
   ===================================================== */

function typeMessage() {

    let index = 0;


    function type() {

        if (index < birthdayMessage.length) {

            typingMessage.textContent +=
                birthdayMessage.charAt(index);

            index++;

            setTimeout(type, 35);

        }

    }


    type();

}


/* =====================================================
   CELEBRATE
   ===================================================== */

celebrateButton.addEventListener("click", () => {

    createConfetti(150);

    /*
       Button dibuat sedikit mengecil
    */

    celebrateButton.textContent =
        "🎉 Perayaan Dimulai! 🎉";


    setTimeout(() => {

        showScreen(finalSection);

    }, 4500);

});


/* =====================================================
   CONFETTI
   ===================================================== */

function createConfetti(amount) {

    for (let i = 0; i < amount; i++) {

        const confetti =
            document.createElement("div");


        confetti.classList.add("confetti");


        /*
           Posisi random
        */

        confetti.style.left =
            Math.random() * 100 + "%";


        /*
           Ukuran random
        */

        const size =
            Math.random() * 8 + 5;

        confetti.style.width =
            size + "px";

        confetti.style.height =
            size * 1.5 + "px";


        /*
           Warna random
        */

        const colors = [
            "#ff4f9a",
            "#ffd84f",
            "#5ca9ff",
            "#a45cff",
            "#55df9c",
            "#ffffff"
        ];

        confetti.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        /*
           Kecepatan random
        */

        confetti.style.animationDuration =
            Math.random() * 2 + 2 + "s";


        confetti.style.animationDelay =
            Math.random() * 0.5 + "s";


        confettiContainer.appendChild(confetti);


        /*
           Hapus setelah animasi
        */

        setTimeout(() => {

            confetti.remove();

        }, 5000);

    }

}


/* =====================================================
   RESTART
   ===================================================== */

restartButton.addEventListener("click", () => {

    /*
       Reset bahan
    */

    usedIngredients = [];


    ingredients.forEach(button => {

        button.classList.remove("used");

    });


    /*
       Reset cake
    */

    cake.classList.remove("show");

    finishCakeButton.classList.add("hidden");


    /*
       Reset candles
    */

    litCandles = 0;

    candles.forEach(candle => {

        candle.classList.remove("lit");

    });


    candleStatus.textContent =
        "0 / 3 lilin menyala";


    blowButton.classList.add("hidden");


    /*
       Reset instruction
    */

    document.getElementById(
        "cakeInstruction"
    ).textContent =
        "Klik bahan-bahan di bawah untuk membuat kue.";


    /*
       Kembali ke awal
    */

    showScreen(opening);

});