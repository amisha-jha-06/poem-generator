'use client'

import React, { useState, FormEvent } from 'react'

// Word options with their corresponding poems - Female/Other
const wordPoemsFemale: Record<string, string> = {
  smile: `Your smile arrives before the sun,
warming corners of my day.
I keep searching for excuses
just to see it again.`,

  eyes: `Your eyes are promises disguised as light,
gentle, daring, infinite.
I keep finding my future
whenever they meet mine.`,

  lips: `They promise more than words could try,
resting close to every sigh.
Each small smile becomes a sign
that what is yours is soon to be mine.`,

  hair: `Your hair leaves perfume when you pass by,
a moving trail of warm-toned sighs.
I slow my step, then match your pace—
some magic shouldn't rush its grace.`,

  hands: `They trace tomorrow, warm and sure,
make uncertain things feel pure.
I stop pretending I'm so grand—
the world makes sense inside your hand.`,

  kindness: `Your kindness keeps the night from cold,
wraps the dark in gentle gold.
I don't rush fate, I let it be—
good things arrive when you're with me.`,

  loving: `Your loving feels like second skin,
I wear it light, I breathe it in.
No fireworks, no need to prove—
just hearts that know exactly what to do.`,

  caring: `Your caring feels like steady ground,
soft applause without the sound.
I don't look back, I don't compare—
I know exactly who you are.`,

  patience: `Your patience moves the world aside,
lets my scattered heart decide.
You don't demand, you don't explain—
you hold the calm while I complain.`,

  supportive: `Your support shows up before I ask,
lightens up my heaviest task.
I try to hide, you see right through—
and build a ladder just to you.`,
}

// Word options with their corresponding poems - Male
const wordPoemsMale: Record<string, string> = {
  smile: `Your smile shows up like borrowed light,
breaking through my longest night.
I find a thousand reasons why
I hope it's there when you walk by.`,

  eyes: `Your eyes hold storms and softer skies,
midnight truths and quiet tries.
I lose my way, then somehow know—
they're where I always want to go.`,

  lips: `They tilt the world with something sly,
half a dare, half soft goodbye.
I hear my name, I miss my cue—
every plan dissolves in you.`,

  hair: `Your hair frames your face in effortless grace,
the kind of charm that time can't erase.
I look, I pause, I want to stay—
and let the world just fade away.`,

  hands: `Your hands hold calm the way they should,
steady, warm, impossibly good.
I lean a little, just to stand
inside the circle of your hand.`,

  kindness: `Your kindness shows in little things,
the way your quiet presence clings.
I don't ask why, I just believe—
you give more than I could receive.`,

  loving: `Your loving stays when days get loud,
anchors me soft inside the crowd.
No fireworks needed, no grand display—
just hearts that know exactly the way.`,

  caring: `Your care finds the cracks I hide,
stands beside me, not behind.
I don't say much, I don't prepare—
I just breathe easier when you're there.`,

  patience: `Your patience lets my chaos land,
never rushes what I am.
I talk in circles, you just smile—
and wait with me a little while.`,

  supportive: `Your support feels like steady ground,
rooted deep, without a sound.
I reach too far, I lose my view—
and somehow still I'm held by you.`,
}

const wordOptions = [
  { value: 'smile', label: 'Smile' },
  { value: 'eyes', label: 'Eyes' },
  { value: 'lips', label: 'Lips' },
  { value: 'hair', label: 'Hair' },
  { value: 'hands', label: 'Hands' },
  { value: 'kindness', label: 'Kindness' },
  { value: 'loving', label: 'Loving' },
  { value: 'caring', label: 'Caring' },
  { value: 'patience', label: 'Patience' },
  { value: 'supportive', label: 'Supportive' },
]

export default function Home() {
  const [error, setError] = useState('')
  const [poem, setPoem] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [phone, setPhone] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState<{
    email: string
    customerName: string
    partnerName: string
    gender: string
    selectedWord: string
  } | null>(null)

  const formatGender = (gender: string): string => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'Male'
      case 'female':
        return 'Female'
      case 'neutral':
      default:
        return 'Others'
    }
  }

  const sendPoemData = async (poemData: {
    email: string
    phone: string
    customerName: string
    partnerName: string
    gender: string
    selectedWord: string
    poem: string
  }): Promise<boolean> => {
    try {
      const formattedGender = formatGender(poemData.gender)
      const payload = {
        email: poemData.email,
        phone: poemData.phone,
        eventData: {
          poem: poemData.poem,
          selected_word: poemData.selectedWord,
          partner_name: poemData.partnerName,
          customer_name: poemData.customerName,
          Gender: formattedGender
        },
        eventName: 'poem_generated'
      }

      console.log('Sending API request to:', 'https://utils.palmonas.com/api/poem/generate')
      console.log('Payload:', payload)

      const response = await fetch('https://utils.palmonas.com/api/poem/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      console.log('API Response status:', response.status)
      console.log('API Response:', response)

      if (!response.ok) {
        console.error('Failed to send poem data:', response.statusText)
        return false
      }
      return true
    } catch (error) {
      console.error('Error sending poem data:', error)
      return false
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = (formData.get('customerName') as string)?.trim() || ''
    const partner = (formData.get('partnerName') as string)?.trim() || ''
    const gender = (formData.get('gender') as string) || ''
    const email = (formData.get('email') as string)?.trim() || ''
    const phoneValue = (formData.get('phone') as string)?.trim() || ''
    const selectedWord = (formData.get('word') as string) || ''

    if (!name || !partner || !gender || !email || !phoneValue || !selectedWord) {
      setError('Please fill all required fields.')
      setShowResult(false)
      return
    }

    setError('')
    setPhone(phoneValue)

    const sign =
      gender === 'male'
        ? `With love,\n${name}`
        : gender === 'female'
        ? `Always yours,\n${name}`
        : `${name}`

    // Get the poem for the selected word based on gender
    const wordPoems = gender === 'male' ? wordPoemsFemale : wordPoemsMale
    const wordPoem = wordPoems[selectedWord] || ''
    
    // Format the final poem with partner name and signature
    const generatedPoem = `${partner.toUpperCase()}\n\n${wordPoem}\n\n— ${sign}`

    setPoem(generatedPoem)
    setShowResult(true)
    setIsGenerated(true)

    // Store form data for WhatsApp button
    setFormData({
      email,
      customerName: name,
      partnerName: partner,
      gender,
      selectedWord
    })

    // Scroll to result
    setTimeout(() => {
      const resultBox = document.getElementById('resultBox')
      if (resultBox) {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleReset = () => {
    setError('')
    setPoem('')
    setShowResult(false)
    setIsGenerated(false)
    setPhone('')
    setSuccessMessage('')
    setFormData(null)
    const form = document.getElementById('poemForm') as HTMLFormElement
    if (form) {
      form.reset()
    }
  }

  const handleWhatsApp = async () => {
    console.log('handleWhatsApp called')
    console.log('formData:', formData)
    console.log('poem:', poem)
    
    if (!formData || !poem) {
      console.error('Form data or poem not available')
      return
    }

    // Clear previous messages
    setSuccessMessage('')
    setError('')

    // Send poem data to API - convert newlines to <br> tags
    const poemWithBreaks = poem.replace(/\n/g, '<br>')
    const success = await sendPoemData({
      email: formData.email,
      phone: phone,
      customerName: formData.customerName,
      partnerName: formData.partnerName,
      gender: formData.gender,
      selectedWord: formData.selectedWord,
      poem: poemWithBreaks
    })

    if (success) {
      setSuccessMessage('Poem sent successfully! You will receive it on WhatsApp/Email with additional reward points. 🎉')
      // Redirect to palmonas.com after 5 seconds
      setTimeout(() => {
        window.location.href = 'https://palmonas.com'
      }, 5000)
    } else {
      setError('Failed to send poem. Please try again.')
    }
  }

  return (
    <div className="page">
      {/* Floating background hearts */}
      <div className="floating-heart floating-heart-1">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--heart-maroon)"
          />
        </svg>
      </div>
      <div className="floating-heart floating-heart-2">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--heart-dark)"
          />
        </svg>
      </div>
      <div className="floating-heart floating-heart-3">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--heart-maroon)"
          />
        </svg>
      </div>
      <div className="floating-heart floating-heart-4">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--heart-dark)"
          />
        </svg>
      </div>
      <div className="floating-heart floating-heart-5">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--accent)"
          />
        </svg>
      </div>
      <div className="floating-heart floating-heart-6">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--heart-maroon)"
          />
        </svg>
      </div>

      <div className="wrap">
        <div className="hero">
          <div className="content">
            <div className="page-header">
              <div className="header-top">say it with</div>
              <div className="header-bottom">PALMONAS</div>
            </div>
            <form id="poemForm" onSubmit={handleSubmit} noValidate>
              <div className="grid">
                <div>
                  <label htmlFor="customerName">Your Name*</label>
                  <input id="customerName" name="customerName" required />
                </div>

                <div>
                  <label htmlFor="partnerName">Partner's Name*</label>
                  <input id="partnerName" name="partnerName" required />
                </div>

                <div>
                  <label>Your Gender*</label>
                  <div className="radio-group">
                    <label>
                      <input type="radio" name="gender" value="male" required /> Male
                    </label>
                    <label>
                      <input type="radio" name="gender" value="female" /> Female
                    </label>
                    <label>
                      <input type="radio" name="gender" value="neutral" /> Prefer not to say
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="email">Email*</label>
                  <input id="email" name="email" type="email" required />
                </div>

                <div>
                  <label htmlFor="phone">Phone*</label>
                  <input id="phone" name="phone" required />
                </div>

                <div>
                  <label htmlFor="word">One thing you love about your partner*</label>
                  <select id="word" name="word" required>
                    <option value="">Choose a word...</option>
                    {wordOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && <div className="error show">{error}</div>}

              <div className="row-actions">
                <button
                  className="btn secondary"
                  id="generateBtn"
                  type="submit"
                  disabled={isGenerated}
                >
                  {isGenerated ? 'Poem Generated ✓' : 'Generate Poem'}
                </button>
                <button className="btn primary" type="button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              <div className={`result ${showResult ? 'show' : ''}`} id="resultBox">
                <pre id="poemOutput">{poem}</pre>

                <button
                  type="button"
                  className="whatsapp-cta"
                  id="whatsappBtn"
                  onClick={handleWhatsApp}
                >
                  Get this on WhatsApp/Email with additional reward points 💬✨
                </button>

                {successMessage && <div className="success show">{successMessage}</div>}
              </div>
            </form>

            <footer className="page-footer">
              <p>
                © {new Date().getFullYear()} <a href="https://palmonas.com" target="_blank" rel="noopener noreferrer">PALMONAS</a>. All rights reserved.
              </p>
            </footer>
          </div>
        </div>

        {/* Decorative hearts */}
        <svg className="hearts-left" viewBox="0 0 180 120" aria-hidden="true">
          <path
            d="M45 30c-10-18-38-10-34 12 4 20 34 36 34 36s30-16 34-36c4-22-24-30-34-12z"
            fill="var(--heart-maroon)"
            opacity=".85"
          />
          <path
            d="M92 62c-7-12-26-7-23 8 3 13 23 23 23 23s20-10 23-23c3-15-16-20-23-8z"
            fill="var(--accent)"
            opacity=".65"
          />
        </svg>

        <svg className="hearts-right" viewBox="0 0 220 150" aria-hidden="true">
          <path
            d="M150 40c-14-26-54-14-48 18 6 28 48 52 48 52s42-24 48-52c6-32-34-44-48-18z"
            fill="var(--heart-dark)"
            opacity=".9"
          />
          <path
            d="M60 70c-8-14-30-8-27 10 3 16 27 28 27 28s24-12 27-28c3-18-19-24-27-10z"
            fill="var(--heart-maroon)"
            opacity=".65"
          />
        </svg>
      </div>
    </div>
  )
}
