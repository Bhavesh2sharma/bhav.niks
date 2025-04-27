function dates() {
    var x = new Date("May 1 2018 15:30:00");
    var y = new Date();
    let seconds = Math.abs(x - y)/1000;

    var day = seconds / (24 * 3600);

    hh = seconds % (24 * 3600);
    var hour = hh / 3600;
  
    hh %= 3600;
    var minutes = hh / 60 ;
  
    hh %= 60;
    var rseconds = hh;

    document.getElementById('days').innerHTML = parseInt(day);
    document.getElementById('hours').innerHTML = parseInt(hour);
    document.getElementById('minutes').innerHTML = parseInt(minutes);
    document.getElementById('seconds').innerHTML = parseInt(rseconds);
}

setInterval(dates, 1000);

function cardSelected(selectedCard) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card === selectedCard) {
            card.classList.remove('fade-out');
            card.classList.add('show');
        } else {
            card.classList.add('fade-out'); 
            card.classList.remove('show');
        }
    });
}
// JavaScript for enhanced beta image effects
document.addEventListener('DOMContentLoaded', function() {
    // Make sure the image has the required structure
    const betaElements = document.querySelectorAll('.beta');
    
    betaElements.forEach(beta => {
      // Add the necessary child elements if they don't exist
      if (!beta.querySelector('.beta-corners')) {
        const corners = document.createElement('div');
        corners.className = 'beta-corners';
        beta.appendChild(corners);
      }
      
      if (!beta.querySelector('.beta-parallax')) {
        const parallax = document.createElement('div');
        parallax.className = 'beta-parallax';
        beta.appendChild(parallax);
      }
      
      if (!beta.querySelector('.beta-shine')) {
        const shine = document.createElement('div');
        shine.className = 'beta-shine';
        beta.appendChild(shine);
      }
      
      // Parallax effect
      const parallax = beta.querySelector('.beta-parallax');
      
      beta.addEventListener('mousemove', function(e) {
        const rect = beta.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) - 0.5;
        const yPercent = (y / rect.height) - 0.5;
        
        parallax.style.transform = `translate(${-5 + xPercent * -10}%, ${-5 + yPercent * -10}%)`;
        
        // Dynamic glow effect - update the radial gradient position
        beta.style.setProperty('--mouse-x', `${x}px`);
        beta.style.setProperty('--mouse-y', `${y}px`);
        
        // If we're using the ::before pseudo-element for the glow
        // We can't directly manipulate it with JS, so we use CSS variables
        beta.style.setProperty('--glow-position', `radial-gradient(circle at ${x}px ${y}px, transparent 60%, rgba(255, 255, 255, 0.15) 100%)`);
      });
      
      // Reset on mouse leave
      beta.addEventListener('mouseleave', function() {
        parallax.style.transform = 'translate(-5%, -5%)';
        
        // Reset the glow position
        beta.style.setProperty('--glow-position', 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(255, 255, 255, 0.15) 100%)');
      });
      
      // Random shine effect timing
      function randomShine() {
        const shine = beta.querySelector('.beta-shine');
        shine.style.animation = 'none';
        setTimeout(() => {
          shine.style.animation = `shine ${Math.random() * 3 + 3}s ease-in-out ${Math.random() * 2 + 2}s`;
        }, 10);
        
        // Set next random shine after current one finishes
        setTimeout(randomShine, (Math.random() * 3 + 5) * 1000);
      }
      
      // Start random shine with initial delay
      setTimeout(randomShine, Math.random() * 3000);
    });
  });
  // Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  const imgContainer = document.querySelector('.container-cotton-img');
  const romanticTexts = document.querySelectorAll('.container-cotton p');
  
  // 1. Image Load Animation Trigger
  function triggerAnimations() {
      // Make image container appear with animation
      imgContainer.classList.add('loaded');
      
      // Create multiple sparkles for romantic effect
      createSparkles(5);
      
      // Animate each text element with staggered delays
      animateTextElements();
      
      // Add periodic "heartbeat" effect every 15 seconds
      setInterval(() => {
          temporaryHeartbeat();
      }, 15000);
  }
  
  // 2. Sparkle Creation Function
  function createSparkles(count) {
      const colors = [
          'rgba(255, 182, 193, 0.8)',  // Light pink
          'rgba(255, 255, 255, 0.9)',  // White
          'rgba(255, 215, 0, 0.7)',    // Gold
          'rgba(173, 216, 230, 0.6)'   // Light blue
      ];
      
      for (let i = 0; i < count; i++) {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          
          // Random properties for each sparkle
          const size = Math.random() * 6 + 3;
          const duration = Math.random() * 4 + 3;
          const delay = Math.random() * 5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          // Position randomly within container
          const posX = Math.random() * 80 + 10;
          const posY = Math.random() * 80 + 10;
          
          // Apply dynamic styles
          sparkle.style.cssText = `
              width: ${size}px;
              height: ${size}px;
              top: ${posY}%;
              left: ${posX}%;
              background: radial-gradient(circle, #fff 30%, ${color} 100%);
              animation-delay: ${delay}s;
              animation-duration: ${duration}s;
          `;
          
          imgContainer.appendChild(sparkle);
      }
  }
  
  // 3. Text Animation Sequence
  function animateTextElements() {
      romanticTexts.forEach((text, index) => {
          // Stagger the animation delays
          const delay = index * 0.3 + 0.5;
          
          text.style.animationDelay = `${delay}s`;
          text.style.opacity = '0'; // Start hidden
          
          // Trigger the animation
          setTimeout(() => {
              text.classList.add('animated');
          }, delay * 1000);
      });
  }
  
  // 4. Special Heartbeat Effect
  function temporaryHeartbeat() {
      if (!imgContainer.classList.contains('hover-effect')) {
          imgContainer.classList.add('hover-effect');
          
          // Remove after animation completes
          setTimeout(() => {
              imgContainer.classList.remove('hover-effect');
          }, 1200);
      }
  }
  
  // 5. Interactive Hover Effects
  imgContainer.addEventListener('mouseenter', function() {
      this.classList.add('hover-effect');
      
      // Enhance sparkles on hover
      const sparkles = this.querySelectorAll('.sparkle');
      sparkles.forEach(sparkle => {
          sparkle.style.animationDuration = '2s';
          sparkle.style.filter = 'blur(1px) brightness(1.5)';
      });
  });
  
  imgContainer.addEventListener('mouseleave', function() {
      this.classList.remove('hover-effect');
      
      // Reset sparkles
      const sparkles = this.querySelectorAll('.sparkle');
      sparkles.forEach(sparkle => {
          sparkle.style.animationDuration = '';
          sparkle.style.filter = '';
      });
  });
  
  // 6. Check if image is loaded before triggering
  const img = imgContainer.querySelector('img');
  if (img.complete) {
      triggerAnimations();
  } else {
      img.addEventListener('load', triggerAnimations);
  }
  
  // 7. Window Resize Adjustment
  window.addEventListener('resize', function() {
      // Reposition sparkles on resize
      const sparkles = imgContainer.querySelectorAll('.sparkle');
      sparkles.forEach(sparkle => {
          const posX = Math.random() * 80 + 10;
          const posY = Math.random() * 80 + 10;
          sparkle.style.left = `${posX}%`;
          sparkle.style.top = `${posY}%`;
      });
  });
});
// Romantic Image Animation Engine
function activateRomanticImage() {
  const imageContainer = document.querySelector('.container-cotton-img2');
  
  // 1. Initialize with floating animation
  imageContainer.classList.add('loaded');
  
  // 2. Create floating hearts/petals system
  function createFloatingHearts() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    // Random properties
    const size = Math.random() * 20 + 10;
    const startX = Math.random() * 100;
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.7 + 0.3;
    
    // Heart styles
    heart.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
      z-index: 10;
    `;
    
    // Heart SVG (pure CSS)
    heart.innerHTML = `
      <svg viewBox="0 0 100 100" style="width:100%;height:100%">
        <path fill="rgba(255,105,180,${opacity})" 
              d="M50,30 Q60,0 70,20 Q100,30 50,70 Q0,30 30,20 Q40,0 50,30"/>
      </svg>
    `;
    
    imageContainer.appendChild(heart);
    
    // Auto-remove after animation
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }
  
  // 3. Create interactive burst effect
  function createBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'heart-burst';
    
    burst.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      pointer-events: none;
      z-index: 15;
    `;
    
    // Create mini hearts in burst
    for (let i = 0; i < 8; i++) {
      const miniHeart = document.createElement('div');
      miniHeart.className = 'mini-heart';
      miniHeart.style.cssText = `
        position: absolute;
        width: 12px;
        height: 12px;
        background: rgba(255,105,180,0.8);
        clip-path: path('M5,2 Q6,0 7,2 Q10,3 5,7 Q0,3 3,2 Q4,0 5,2');
        animation: burst-${i} 1s ease-out forwards;
      `;
      
      // Dynamic burst directions
      document.styleSheets[0].insertRule(`
        @keyframes burst-${i} {
          to {
            transform: 
              translate(${Math.cos(i * 0.78) * 60}px, 
              ${Math.sin(i * 0.78) * 60}px);
            opacity: 0;
          }
        }
      `, 0);
      
      burst.appendChild(miniHeart);
    }
    
    imageContainer.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
  }
  
  // 4. Event listeners
  imageContainer.addEventListener('click', (e) => {
    const rect = imageContainer.getBoundingClientRect();
    createBurst(e.clientX - rect.left, e.clientY - rect.top);
  });
  
  // 5. Start effects
  setInterval(createFloatingHearts, 800);
  
  // Initial hearts
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHearts, i * 300);
  }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', activateRomanticImage);