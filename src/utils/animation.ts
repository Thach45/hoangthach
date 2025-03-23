// Smooth scroll to element
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Get scroll percentage
export const getScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (winScroll / height) * 100;
};

// Parallax effect calculation
export const getParallaxOffset = (scrollY: number, depth: number) => {
  return scrollY * depth;
};

// Typewriter effect
export const typewriterEffect = (element: HTMLElement, text: string, speed: number = 100) => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

// Intersection Observer utility
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Add parallax movement to element
export const addParallaxMovement = (
  element: HTMLElement,
  event: MouseEvent,
  strength: number = 0.1
) => {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  
  const xPos = (clientX / innerWidth - 0.5) * strength;
  const yPos = (clientY / innerHeight - 0.5) * strength;

  element.style.transform = `translate(${xPos}px, ${yPos}px)`;
};

// Create particle effect
export const createParticleEffect = (x: number, y: number, count: number = 5) => {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const angle = (Math.random() * 360 * Math.PI) / 180;
    const velocity = Math.random() * 100 + 50;
    const xDistance = Math.cos(angle) * velocity;
    const yDistance = Math.sin(angle) * velocity;

    particle.style.setProperty('--x', `${xDistance}px`);
    particle.style.setProperty('--y', `${yDistance}px`);
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
};

// Handle smooth transitions
export const handleTransition = (
  element: HTMLElement,
  properties: { [key: string]: string },
  duration: number = 300
) => {
  element.style.transition = `all ${duration}ms ease-in-out`;
  Object.entries(properties).forEach(([property, value]) => {
    element.style[property as any] = value;
  });
};