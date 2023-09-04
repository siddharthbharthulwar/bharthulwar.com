import React from 'react'
import { useRef } from 'react'
import data from './data.json'
import Entry from './Entry'
import Footer from './Footer'

const Writing = () => {

    const entryRef = useRef();
    const entries = data.entries

    return (
      <div>
          <h2>Writing</h2>
          <p>Coming soon.</p>
        <Footer />
      </div>
    )
}

export default Writing