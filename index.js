// Animation au scroll
const observateur = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.6s ease both'
        observateur.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 },
)

document
  .querySelectorAll('.pratique-carte, .culture-item, .etape, .temoignage')
  .forEach((el) => {
    el.style.opacity = '0'
    observateur.observe(el)
  })

// Newsletter
document
  .querySelector('.newsletter-form button')
  .addEventListener('click', function () {
    const input = document.querySelector('.newsletter-form input')
    if (input.value.includes('@')) {
      this.textContent = '✓ Inscription confirmée !'
      this.style.background = '#4a8c2a'
      input.value = ''
      input.placeholder = 'Merci de nous rejoindre !'
    } else {
      input.placeholder = 'Entrez un email valide'
      input.style.borderColor = 'rgba(255,100,100,0.6)'
    }
  })

// Club formulaire
function afficherFormulaire() {
  const form = document.getElementById('clubFormulaire')
  form.classList.add('visible')
  form.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function soumettre() {
  const champs = [
    { id: 'prenom', label: 'Prénom' },
    { id: 'nom', label: 'Nom' },
    { id: 'email', label: 'Email' },
    { id: 'activite', label: 'Activité' },
  ]
  let ok = true

  // Clear previous errors
  document
    .querySelectorAll('.champ.erreur')
    .forEach((c) => c.classList.remove('erreur'))
  document.querySelectorAll('.erreur-msg').forEach((e) => e.remove())

  champs.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (!el) return
    const parent = el.closest('.champ')
    if (!el.value.trim()) {
      ok = false
      parent.classList.add('erreur')
      const msg = document.createElement('span')
      msg.className = 'erreur-msg'
      msg.textContent = 'Ce champ est requis'
      parent.appendChild(msg)
    }
  })

  // Email validation
  const email = document.getElementById('email')
  if (email && email.value && !email.value.includes('@')) {
    ok = false
    const parent = email.closest('.champ')
    parent.classList.add('erreur')
    const msg = document.createElement('span')
    msg.className = 'erreur-msg'
    msg.textContent = 'Email invalide'
    parent.appendChild(msg)
  }

  if (!document.getElementById('cgu').checked) {
    ok = false
    alert("Veuillez accepter les conditions d'utilisation pour continuer.")
  }

  if (ok) {
    document.querySelector('.form-grille').style.display = 'none'
    document.querySelector('.form-actions').style.display = 'none'
    document.getElementById('confirmation').classList.add('visible')
  }
}

const hamburger = document.getElementById('hamburger')
const navMobile = document.getElementById('navMobile')

hamburger.addEventListener('click', () => {
  const ouvert = navMobile.classList.toggle('ouvert')
  hamburger.classList.toggle('ouvert', ouvert)
  document.body.style.overflow = ouvert ? 'hidden' : ''
})

document.querySelectorAll('.nav-mobile-lien').forEach((lien) => {
  lien.addEventListener('click', () => {
    navMobile.classList.remove('ouvert')
    hamburger.classList.remove('ouvert')
    document.body.style.overflow = ''
  })
})
