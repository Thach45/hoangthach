AOS.init();
tailwind.config = {
    darkMode: 'class', 
    theme: {
      extend: {},
    },
  };
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.skill');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    console.log(slides);

    function updateSlider() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    setInterval(function() {
        currentIndex = (currentIndex < slides.length + 10) ? currentIndex + 1 : 0;
        updateSlider();
    }, 500);
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex <= slides.length) ? currentIndex + 1 : 0;
        updateSlider();
    });

    updateSlider(); // Initialize the slider
});


let stars = document.querySelector('.stars');
let plant = document.querySelector('.plants');
let mountain = document.querySelector('.mountains');
window.addEventListener('scroll', function() {
        let value = window.scrollY;
        stars.style.left = value * 0.5 + 'px';
        plant.style.top = value * -1 + 'px';
       
})


const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Check for saved theme preference or use the system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
document.documentElement.classList.add('dark');
} else {
document.documentElement.classList.remove('dark');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
document.documentElement.classList.toggle('dark');

// Save the theme preference
if (document.documentElement.classList.contains('dark')) {
    localStorage.theme = 'dark';
} else {
    localStorage.theme = 'light';
}
});



// Lắng nghe sự kiện load của trang
window.addEventListener("load", function () {
    // Ẩn preloader
    document.getElementById("preloader").style.display = "none";
    // Hiển thị nội dung chính
    document.getElementById("content").style.display = "block";
});


//Vi-En
const inputChangeLangue = document.querySelector('.change-langue');
inputChangeLangue.addEventListener('click', () => {
    const projectVN = document.querySelectorAll('.vn');
    const projectEN = document.querySelectorAll('.en');
    const NavEn = {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        aboutMe: 'Hello, I am <span class="gradient-text" style="font-size: 28px;">Hoàng Thạch</span>',
        viewProjects: 'View my projects',
        aboutDescription: 'Hello! I am Nguyễn Hoàng Thạch, 20 years old, currently a second-year student at HCMUTE majoring in Information Technology. I love Backend Web programming and AI. This is where I share the projects I have done, glad you stopped by!'
    };

    const NavVN = {
        home: 'Trang chủ',
        about: 'Giới thiệu',
        skills: 'Kỹ năng',
        projects: 'Dự án',
        contact: 'Liên hệ',
        aboutMe: 'Xin chào, tôi là <span class="gradient-text" style="font-size: 28px;">Hoàng Thạch</span>',
        viewProjects: 'Xem dự án của tôi',
        aboutDescription: 'Xin chào! Mình là Nguyễn Hoàng Thạch, 20 tuổi, hiện đang là sinh viên năm 2 tại HCMUTE chuyên ngành Công nghệ Thông tin. Mình yêu thích lập trình Backend Web và AI. Đây là nơi mình chia sẻ các dự án đã thực hiện, rất vui nếu bạn ghé qua!.'
    };
    
    if (inputChangeLangue.checked) {
        document.querySelector('.home').innerHTML = NavEn.home;
        document.querySelector('.about').innerHTML = NavEn.about;
        document.querySelector('.skills').innerHTML = NavEn.skills;
        document.querySelector('.project').innerHTML = NavEn.projects;
        document.querySelector('.contact').innerHTML = NavEn.contact;
        document.querySelector('.about-me').innerHTML = NavEn.aboutMe;
        document.querySelector('.view-projects').innerHTML = NavEn.viewProjects;
        document.querySelector('.about-description').innerHTML = NavEn.aboutDescription;
        projectEN.forEach((project) => {
            project.style.display = 'block';
        });
        projectVN.forEach((project) => {
            project.style.display = 'none';
        });
    } else {
        document.querySelector('.home').innerHTML = NavVN.home;
        document.querySelector('.about').innerHTML = NavVN.about;
        document.querySelector('.skills').innerHTML = NavVN.skills;
        document.querySelector('.project').innerHTML = NavVN.projects;
        document.querySelector('.contact').innerHTML = NavVN.contact;
        document.querySelector('.about-me').innerHTML = NavVN.aboutMe;
        document.querySelector('.view-projects').innerHTML = NavVN.viewProjects;
        document.querySelector('.about-description').innerHTML = NavVN.aboutDescription;
        projectVN.forEach((project) => {
            project.style.display = 'block';
        });
        projectEN.forEach((project) => {
            project.style.display = 'none';
        });
    }
})

