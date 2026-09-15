const bookingUrl = 'https://booking.mangomint.com/182366';

// =========================================================
// MOBILE NAVIGATION
// =========================================================

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}


// =========================================================
// SCROLL REVEALS
// =========================================================

const reveals = document.querySelectorAll('.reveal');

if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}


// =========================================================
// RELIEF FINDER
// =========================================================

const reliefContent = {
  neck: {
    title: 'Neck + shoulder tension',
    copy:
      'A customized therapeutic session can focus on the neck, shoulders and upper back while still treating the body as a connected whole.',
    tags: ['Therapeutic massage', 'Targeted work', '60–90 min']
  },

  back: {
    title: 'Back tension + overuse',
    copy:
      'Start with focused therapeutic work that can adapt to soreness, training, travel, desk posture or the kind of tightness that simply will not leave on its own.',
    tags: ['Deep tissue direction', 'Cupping when appropriate', '75–90 min']
  },

  hips: {
    title: 'Hips + lower-body mobility',
    copy:
      'A session can spend intentional time through the hips, glutes and connected areas while keeping the work balanced and comfortable.',
    tags: ['Mobility focus', 'Sports recovery', '75–90 min']
  },

  legs: {
    title: 'Mountain legs + recovery',
    copy:
      'Great after ski days, hiking, running or long stretches on your feet. Your therapist can emphasize the legs without turning the rest of the body into an afterthought.',
    tags: ['Recovery', 'Targeted work', '60–90 min']
  },

  reset: {
    title: 'Stress + nervous-system reset',
    copy:
      'When the goal is less about one sore spot and more about finally exhaling, choose a slower, restorative direction built around comfort and downshifting.',
    tags: ['Relaxation', 'Craniosacral direction', '60–90 min']
  },

  full: {
    title: 'Full-body reset',
    copy:
      'Not sure where to start? Book the time that feels right and let the session be shaped around the whole picture after a quick conversation with your therapist.',
    tags: ['Fully customized', 'Whole-body care', '60–120 min']
  }
};

const reliefButtons = document.querySelectorAll('[data-relief]');
const reliefTitle = document.querySelector('#relief-title');
const reliefCopy = document.querySelector('#relief-copy');
const reliefTags = document.querySelector('#relief-tags');

function setRelief(key) {
  const item = reliefContent[key];

  if (!item || !reliefTitle || !reliefCopy || !reliefTags) {
    return;
  }

  reliefButtons.forEach((button) => {
    button.classList.toggle(
      'active',
      button.dataset.relief === key
    );
  });

  reliefTitle.textContent = item.title;
  reliefCopy.textContent = item.copy;

  reliefTags.innerHTML = item.tags
    .map((tag) => `<span>${tag}</span>`)
    .join('');
}

reliefButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setRelief(button.dataset.relief);
  });
});


// =========================================================
// MEMBER + JOIN DIALOGS
// =========================================================

const memberModal = document.querySelector('#member-modal');
const joinModal = document.querySelector('#join-modal');

const modalTriggers =
  document.querySelectorAll('[data-open-member]');

const joinTriggers =
  document.querySelectorAll('[data-open-join]');

const toast = document.querySelector('#toast');


function showModal(modal) {
  if (!modal) return;

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }

  document.body.classList.add('modal-open');
}


function closeModal(modal) {
  if (!modal) return;

  if (typeof modal.close === 'function') {
    modal.close();
  } else {
    modal.removeAttribute('open');
  }

  document.body.classList.remove('modal-open');
}


function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}


modalTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    showModal(memberModal);
  });
});


joinTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    showModal(joinModal);
  });
});


document
  .querySelectorAll('[data-close-modal]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      closeModal(button.closest('dialog'));
    });
  });


document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();

    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!inside) {
      closeModal(dialog);
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
  });
});


document
  .querySelector('#login-form')
  ?.addEventListener('submit', (event) => {
    event.preventDefault();

    closeModal(memberModal);

    showToast(
      'Member portal prototype — ready to connect to the final platform.'
    );

    event.currentTarget.reset();
  });


document
  .querySelector('#join-form')
  ?.addEventListener('submit', (event) => {
    event.preventDefault();

    closeModal(joinModal);

    showToast(
      'Membership interest captured in the prototype — no data was sent.'
    );

    event.currentTarget.reset();
  });


// =========================================================
// FOOTER YEAR
// =========================================================

const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}


// =========================================================
// TINY EASTER EGG
// =========================================================

document
  .querySelector('.footer-brand img')
  ?.addEventListener('dblclick', () => {
    showToast('Deep roots, bright days. 🌿');
  });
/* =========================================================
   DEEP ROOTS — SITEWIDE LIGHT MOMENTS
========================================================= */

if (
  !window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches &&
  window.matchMedia(
    '(min-width: 821px)'
  ).matches
) {

  const sparkleMap = [

    /* HERO */
    {
      selector: '.hero',

      sparkles: [
        {
          x: 6,
          y: 24,
          size: 8,
          opacity: .80,
          drift: 18
        },

        {
          x: 94,
          y: 31,
          size: 5,
          opacity: .57,
          drift: 12
        },

        {
          x: 84,
          y: 82,
          size: 7,
          opacity: .68,
          drift: 16
        }
      ]
    },


    /* LOCAL ROOTS */
    {
      selector: '.locals',

      glow: {
        x: 73,
        y: 22
      },

      sparkles: [
        {
          x: 7,
          y: 22,
          size: 10,
          opacity: .92,
          drift: 24
        },

        {
          x: 16,
          y: 70,
          size: 5,
          opacity: .62,
          drift: 14
        },

        {
          x: 88,
          y: 28,
          size: 8,
          opacity: .82,
          drift: 20
        }
      ]
    },


    /* RELIEF FINDER */
    {
      selector: '.relief',

      sparkles: [
        {
          x: 90,
          y: 18,
          size: 7,
          opacity: .74,
          drift: 16
        },

        {
          x: 8,
          y: 66,
          size: 5,
          opacity: .55,
          drift: 12
        },

        {
          x: 67,
          y: 82,
          size: 4,
          opacity: .46,
          drift: 10
        }
      ]
    },


    /* SERVICES */
    {
      selector: '.services',

      sparkles: [
        {
          x: 5,
          y: 26,
          size: 6,
          opacity: .65,
          drift: 14
        },

        {
          x: 95,
          y: 54,
          size: 9,
          opacity: .78,
          drift: 21
        },

        {
          x: 55,
          y: 90,
          size: 4,
          opacity: .48,
          drift: 10
        }
      ]
    },


    /* REVIEWS */
    {
      selector: '.reviews',

      glow: {
        x: 82,
        y: 14
      },

      sparkles: [
        {
          x: 91,
          y: 19,
          size: 8,
          opacity: .78,
          drift: 18
        },

        {
          x: 7,
          y: 72,
          size: 5,
          opacity: .59,
          drift: 13
        },

        {
          x: 61,
          y: 84,
          size: 6,
          opacity: .64,
          drift: 15
        }
      ]
    },


    /* SOCIAL / STUDIO */
    {
      selector: '.studio',

      glow: {
        x: 8,
        y: 52
      },

      sparkles: [
        {
          x: 7,
          y: 42,
          size: 9,
          opacity: .82,
          drift: 19
        },

        {
          x: 89,
          y: 18,
          size: 5,
          opacity: .57,
          drift: 12
        },

        {
          x: 95,
          y: 75,
          size: 7,
          opacity: .72,
          drift: 17
        }
      ]
    },


    /* VISIT */
    {
      selector: '.visit',

      sparkles: [
        {
          x: 93,
          y: 22,
          size: 8,
          opacity: .75,
          drift: 18
        },

        {
          x: 6,
          y: 64,
          size: 5,
          opacity: .55,
          drift: 12
        },

        {
          x: 72,
          y: 88,
          size: 4,
          opacity: .47,
          drift: 10
        }
      ]
    },


    /* FINAL CTA */
    {
      selector: '.final-cta',

      glow: {
        x: 74,
        y: 45
      },

      sparkles: [
        {
          x: 13,
          y: 26,
          size: 7,
          opacity: .72,
          drift: 15
        },

        {
          x: 85,
          y: 61,
          size: 10,
          opacity: .92,
          drift: 23
        },

        {
          x: 67,
          y: 18,
          size: 5,
          opacity: .60,
          drift: 12
        }
      ]
    },


    /* =====================================================
       ABOUT PAGE
    ===================================================== */

    {
      selector: '.about-hero',

      sparkles: [
        {
          x: 91,
          y: 20,
          size: 8,
          opacity: .78,
          drift: 18
        },

        {
          x: 10,
          y: 74,
          size: 5,
          opacity: .56,
          drift: 12
        }
      ]
    },


    {
      selector: '.about-story',

      glow: {
        x: 12,
        y: 25
      },

      sparkles: [
        {
          x: 7,
          y: 27,
          size: 9,
          opacity: .82,
          drift: 20
        },

        {
          x: 93,
          y: 67,
          size: 6,
          opacity: .66,
          drift: 14
        }
      ]
    },


    {
      selector: '.team',

      sparkles: [
        {
          x: 94,
          y: 17,
          size: 6,
          opacity: .64,
          drift: 14
        },

        {
          x: 5,
          y: 65,
          size: 8,
          opacity: .76,
          drift: 19
        },

        {
          x: 74,
          y: 91,
          size: 4,
          opacity: .48,
          drift: 10
        }
      ]
    },


    {
      selector: '.about-amenities',

      sparkles: [
        {
          x: 87,
          y: 28,
          size: 8,
          opacity: .74,
          drift: 17
        },

        {
          x: 12,
          y: 76,
          size: 5,
          opacity: .55,
          drift: 11
        }
      ]
    }

  ];


  const sparkleSections = [];


  /* =====================================================
     CREATE THE LIGHTS
  ===================================================== */

  sparkleMap.forEach(
    (config, sectionIndex) => {

      const section =
        document.querySelector(
          config.selector
        );


      /*
       * The About-page selectors won't exist
       * on the homepage and vice versa.
       * That's completely fine.
       */
      if (!section) return;


      const sparkles = [];


      /* -----------------------------------------
         Optional background glow
      ----------------------------------------- */

      let glow = null;

      if (config.glow) {

        glow =
          document.createElement(
            'div'
          );


        glow.className =
          'section-light-glow';


        glow.setAttribute(
          'aria-hidden',
          'true'
        );


        glow.style.left =
          `${config.glow.x}%`;


        glow.style.top =
          `${config.glow.y}%`;


        section.appendChild(glow);
      }


      /* -----------------------------------------
         Sparkles
      ----------------------------------------- */

      config.sparkles.forEach(
        (
          settings,
          sparkleIndex
        ) => {

          const sparkle =
            document.createElement(
              'span'
            );


          sparkle.className =
            settings.size <= 5
              ? 'site-sparkle sparkle-soft'
              : 'site-sparkle';


          sparkle.setAttribute(
            'aria-hidden',
            'true'
          );


          sparkle.style.left =
            `${settings.x}%`;


          sparkle.style.top =
            `${settings.y}%`;


          sparkle.style.setProperty(
            '--sparkle-size',
            `${settings.size}px`
          );


          sparkle.style.setProperty(
            '--sparkle-opacity',
            settings.opacity
          );


          /*
           * Different speeds and delays keep
           * everything from blinking together.
           */

          const speed =
  3.4 +
  (
    (
      sectionIndex +
      sparkleIndex
    ) % 4
  ) * .75;


          const delay =
            -(
              (
                sectionIndex * .83 +
                sparkleIndex * 1.17
              ) % 4
            );


          sparkle.style.setProperty(
            '--sparkle-speed',
            `${speed}s`
          );


          sparkle.style.setProperty(
            '--sparkle-delay',
            `${delay}s`
          );


          section.appendChild(
            sparkle
          );


          sparkles.push({
            element: sparkle,
            settings,
            index:
              sectionIndex * 3 +
              sparkleIndex
          });
        }
      );


      sparkleSections.push({
        section,
        sparkles,
        glow,
        index: sectionIndex
      });
    }
  );


  /* =====================================================
     SHOW / HIDE AS EACH SECTION ENTERS VIEW
  ===================================================== */

  const sparkleObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            const group =
              sparkleSections.find(
                (item) =>
                  item.section ===
                  entry.target
              );


            if (!group) return;


            group.sparkles.forEach(
              ({ element }) => {

                element.classList.toggle(
                  'sparkle-visible',
                  entry.isIntersecting
                );
              }
            );
          }
        );
      },

      {
        root: null,

        /*
         * Sparkles begin shortly before the
         * center of the section reaches view.
         */
        rootMargin:
          '10% 0px 10% 0px',

        threshold: .08
      }
    );


  sparkleSections.forEach(
    ({ section }) => {

      sparkleObserver.observe(
        section
      );
    }
  );


  /* =====================================================
     GENTLE SCROLL DRIFT
  ===================================================== */

  function updateSparkleDrift() {

    const viewportHeight =
      window.innerHeight;


    sparkleSections.forEach(
      ({
        section,
        sparkles,
        glow,
        index
      }) => {

        const rect =
          section.getBoundingClientRect();


        /*
         * 0 → entering
         * .5 → middle
         * 1 → leaving
         */

        const progress =
          Math.max(
            0,
            Math.min(
              1,
              (
                viewportHeight -
                rect.top
              ) /
              (
                viewportHeight +
                rect.height
              )
            )
          );


        /* background light movement */

        if (glow) {

          const glowY =
            (
              progress -
              .5
            ) * 58;


          const glowX =
            Math.sin(
              progress *
              Math.PI +
              index
            ) * 18;


          glow.style.setProperty(
            '--glow-y',
            `${glowY}px`
          );


          glow.style.setProperty(
            '--glow-x',
            `${glowX}px`
          );
        }


        /* sparkle drift */

        sparkles.forEach(
          ({
            element,
            settings,
            index:
              sparkleIndex
          }) => {

            const moveY =
              (
                progress -
                .5
              ) *
              settings.drift;


            const moveX =
              Math.sin(
                progress * 5 +
                sparkleIndex
              ) *
              settings.drift *
              .18;


            element.style.setProperty(
              '--sparkle-y',
              `${moveY}px`
            );


            element.style.setProperty(
              '--sparkle-x',
              `${moveX}px`
            );
          }
        );
      }
    );
  }


  let sparkleTicking = false;


  function requestSparkleUpdate() {

    if (sparkleTicking) {
      return;
    }


    sparkleTicking = true;


    requestAnimationFrame(() => {

      updateSparkleDrift();

      sparkleTicking = false;
    });
  }


  window.addEventListener(
    'scroll',
    requestSparkleUpdate,
    {
      passive: true
    }
  );


  window.addEventListener(
    'resize',
    requestSparkleUpdate
  );


  updateSparkleDrift();
}