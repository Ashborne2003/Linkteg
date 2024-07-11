// Preloader
function preloader() {
    var loader = document.getElementById("preloader");

    window.addEventListener("load", function () {
        loader.style.display = "none";
    });
}

preloader();

// Preloader Type Animation

// function preloaderType() {
//     var typed = new Typed(".type-text", {
//         strings: [,],
//         typespeed: 10,
//         backspeed: 10,
//         backdelay: 10,
//         loop: false
//     });
// }

// preloaderType();

// function startLoader() {
//     let counterElement = document.querySelector(".counter");
//     let currentValue = 0;

//     function updateCounter() {
//         if (currentValue === 100) {
//             return;
//         }

//         currentValue += Math.floor(Math.random() * 10) + 1;

//         if (currentValue > 100) {
//             currentValue = 100;
//         }

//         counterElement.textContent = currentValue;

//         let delay = Math.floor(Math.random() * 200) + 50;
//         setTimeout(updateCounter, delay);
//     }

//     updateCounter();
// }

// startLoader();

// gsap.to(".counter", 0.25, {
//     delay: 3.5,
//     opacity: 0,
// });

// gsap.to(".bar", 1.5, {
//     delay: 3.5,
//     height: 0,
//     stagger: {
//         amount: 0.5,
//     },
//     ease: "power4.inOut",
// });

// gsap.from("h1", 1.5, {
//     delay: 4,
//     y: 700,
//     stagger: {
//         amount: 0.5,
//     },
//     ease: "power4.inOut",
// });

// gsap.from("hero", 2, {
//     delay: 4.5,
//     y: 400,
//     ease: "power4.inOut",
// });



// Chat Bot
function chatBot() {

    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; // Variable to store user's message
    const API_KEY = "sk-proj-ocK3KJhbrBpvMBTl6kK5T3BlbkFJORS3JPeMOvV6Hzy8hN5w"; // Paste your API key here
    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        // Create a chat <li> element with passed message and className
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><i class="fa-solid fa-robot robot"></i></span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi; // return chat <li> element
    }

    const generateResponse = (chatElement) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = chatElement.querySelector("p");

        // Define the properties and message for the API request
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            })
        }

        // Send POST request to API, get response and set the reponse as paragraph text
        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
            messageElement.textContent = data.choices[0].message.content.trim();
        }).catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Hello !";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return;

        // Clear the input textarea and set its height to default
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
}

chatBot();

// side bar start  
function openNav() {
    "use strict";
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.left = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function closeNav() {
    "use strict";
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.left = "-320px";
    } else {
        console.error("Error: Side panel element not found!");
    }
}


function toggleCollapse(elementId) {
    var element = document.getElementById(elementId);
    var button = document.querySelector('.collapse_btn a');

    // Toggle the 'show' class
    element.classList.toggle('show');

    // Toggle aria-expanded attribute
    var isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
}

// search-bar
function open_search_bar() {
    "use strict";
    const sidepanel = document.getElementById("search-bar");
    if (sidepanel) {
        sidepanel.style.height = "100vh";
        sidepanel.style.borderRadius = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function close_search_bar() {
    "use strict";
    const sidepanel = document.getElementById("search-bar");
    if (sidepanel) {
        sidepanel.style.height = "0";
        sidepanel.style.borderTopLeftRadius = "100%";
        sidepanel.style.borderTopRightRadius = "100%";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

// right-sidebar
function open_right_side() {
    "use strict";
    const sidepanel = document.getElementById("right_side");
    if (sidepanel) {
        sidepanel.style.right = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function close_right_sade() {
    "use strict";
    const sidepanel = document.getElementById("right_side");
    if (sidepanel) {
        sidepanel.style.right = "-355px";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    const scrollToTopBtn = document.documentElement || document.body;
    scrollToTopBtn.scrollIntoView({
        behavior: "smooth"
    });
}

// portfolio gallary tab
function open_img(evt, cityName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content and mark the corresponding tab link as active
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// button back to top 
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    const scrollToTopBtn = document.documentElement || document.body;
    scrollToTopBtn.scrollIntoView({
        behavior: "smooth"
    });
}

// faq section
document.addEventListener("DOMContentLoaded", function () {
    let accordionButtons = document.querySelectorAll('.accordion-button');
    let acoimg = document.querySelectorAll('.accordion-button img');

    accordionButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            let collapse = this.parentElement.nextElementSibling;

            // Close all other accordion items
            accordionButtons.forEach(function (otherButton, otherIndex) {
                if (otherButton !== button) {
                    var otherCollapse = otherButton.parentElement.nextElementSibling;
                    otherCollapse.style.maxHeight = null;
                    // Reset the image source and rotation for other accordion items
                    acoimg[otherIndex].src = 'Images/icon/plus.png';
                    acoimg[otherIndex].style.transform = 'rotate(0deg)';
                    otherButton.style.backgroundColor = '#fff';
                }
            });

            // Toggle the clicked accordion item
            if (collapse.style.maxHeight) {
                collapse.style.maxHeight = null;
                // Reset the image source, rotation, and background color when collapsing
                acoimg[index].src = 'Images/icon/plus.png';
                acoimg[index].style.transform = 'rotate(90deg)';
                button.style.backgroundColor = '';
            } else {
                collapse.style.maxHeight = collapse.scrollHeight + "px";
                // Change the image source, set rotation, and background color when expanding
                acoimg[index].src = 'Images/icon/menus.png';
                acoimg[index].style.transform = 'rotate(180deg)';
                button.style.backgroundColor = '#c1b0d5';
            }
        });
    });
});

// footer validation start
function footerValidation() {
    const fom = document.getElementById('footer-form');
    const footerMessage = document.getElementById('footer-message');

    fom.addEventListener('submit', (event) => {
        event.preventDefault();
        footerMessage.innerHTML = '~ Form submitted success fully!';
        footerMessage.style.display = 'flex';
        fom.reset();
        setTimeout(() => {
            footerMessage.style.display = 'none';
        }, 3000);
    });
}

footerValidation();

// responsive Logoipsum Slider
function clientSlider() {
    $('.sliderlogo').slick({
        arrows: false,
        dots: false,
        infinite: false,
        autoplay: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        ]
    });
}

clientSlider();


// responsive team Slider
function teamSlider() {
    $('.team-slider').slick({
        arrows: false,
        dots: true,
        infinite: false,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        ]
    });
}
teamSlider();

