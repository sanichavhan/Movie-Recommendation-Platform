import gsap from 'gsap';

// Movie Card Animations
export const animateMovieCard = (element) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    }
  );
};

// Stagger animation for multiple elements
export const animateMovieCards = (elements) => {
  if (!elements || elements.length === 0) return;
  
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1
    }
  );
};

// Movie Row Slide Animation
export const animateMovieRow = (element) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -50
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power2.out'
    }
  );
};

// Page Transition Animation
export const animatePage = (element) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }
  );
};

// Search/Input Focus Animation
export const animateSearchInput = (element) => {
  if (!element) return;
  
  gsap.to(element, {
    duration: 0.3,
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
    ease: 'power2.out'
  });
};

// Search/Input Blur Animation
export const animateSearchInputBlur = (element) => {
  if (!element) return;
  
  gsap.to(element, {
    duration: 0.3,
    boxShadow: 'none',
    ease: 'power2.out'
  });
};

// Movie Card Hover Animation
export const animateMovieCardHover = (element, enter = true) => {
  if (!element) return;
  
  gsap.to(element, {
    duration: 0.3,
    y: enter ? -10 : 0,
    boxShadow: enter ? '0 10px 40px rgba(255, 107, 107, 0.4)' : '0 5px 15px rgba(0,0,0,0.3)',
    scale: enter ? 1.05 : 1,
    ease: 'power2.out'
  });
};

// Sliding Text Animation
export const animateSlidingText = (element) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -100
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out'
    }
  );
};

// Loader Spin Animation (already CSS-based, but can enhance with GSAP)
export const animateLoader = (element) => {
  if (!element) return;
  
  gsap.to(element, {
    rotation: 360,
    duration: 2,
    repeat: -1,
    ease: 'linear'
  });
};

// Title Animation
export const animateTitle = (element) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: -30,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.5)'
    }
  );
};

// Genre Tag Animations
export const animateGenreTags = (elements) => {
  if (!elements || elements.length === 0) return;
  
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      scale: 0.8
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.5)',
      stagger: 0.05
    }
  );
};

// Banner Animation
export const animateBanner = (element) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 1.05
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    }
  );
};

// Filter Button Animation
export const animateFilterButton = (element, active = false) => {
  if (!element) return;
  
  gsap.to(element, {
    duration: 0.3,
    scale: active ? 1.1 : 1,
    borderColor: active ? '#ff6b6b' : 'rgba(255, 107, 107, 0.3)',
    backgroundColor: active ? 'rgba(255, 107, 107, 0.2)' : 'transparent',
    ease: 'power2.out'
  });
};

// Fade In Animation
export const fadeIn = (element, duration = 0.5) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration, ease: 'power2.out' }
  );
};

// Fade Out Animation
export const fadeOut = (element, duration = 0.5) => {
  if (!element) return;
  
  gsap.to(element, { opacity: 0, duration, ease: 'power2.in' });
};

// Bounce Animation
export const bounce = (element) => {
  if (!element) return;
  
  gsap.to(element, {
    y: -10,
    duration: 0.5,
    ease: 'back.out(1.5)',
    yoyo: true,
    repeat: 1
  });
};
