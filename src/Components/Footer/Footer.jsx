import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-slate-900 text-white py-12 px-4'>
      <div className='container mx-auto'>
        {/* Four Columns Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* FreshCart Column */}
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold mb-3'>FreshCart</h2>
            <p className='text-sm text-gray-300 leading-relaxed'>
              Your trusted source for fresh, organic groceries delivered fast.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold mb-3'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/' className='text-gray-300 hover:text-white transition-colors'>
                  Home
                </a>
              </li>
              <li>
                <a href='/products' className='text-gray-300 hover:text-white transition-colors'>
                  Products
                </a>
              </li>
              <li>
                <a href='/about' className='text-gray-300 hover:text-white transition-colors'>
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold mb-3'>Support</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/contact' className='text-gray-300 hover:text-white transition-colors'>
                  Contact
                </a>
              </li>
              <li>
                <a href='/faq' className='text-gray-300 hover:text-white transition-colors'>
                  FAQ
                </a>
              </li>
              <li>
                <a href='/privacy' className='text-gray-300 hover:text-white transition-colors'>
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold mb-3'>Follow Us</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Facebook
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Instagram
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <hr className='border-gray-700 my-6' />

        {/* Copyright Section */}
        <div className='text-center text-gray-300 text-2xl'>
          <p>© 2025 — Designed & Developed by Magdy Nasser</p>
          <a
            href="https://www.linkedin.com/in/magdy-nasser-b0b17b345/"
            target="_blank"
            rel="noopener noreferrer"
              aria-label="LinkedIn Profile">
  <i className="fa-brands fa-linkedin"></i>
</a>
 <a
    href="https://www.instagram.com/magdy_nasser11/?igsh=bnJrdGZkaTZ3YmZh"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="text-[#E4405F] text-2xl hover:scale-110 transition">
    <i className="fa-brands fa-instagram"></i>
  </a>
  <a
    href="https://www.facebook.com/magdy.nasser.11?mibextid=wwXIfr&rdid=cTmuwm8XgkNwoa6I&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DetBQwjMN%2F%3Fmibextid%3DwwXIfr"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="text-[#1877F2] text-2xl hover:scale-110 transition"
  >
    <i className="fa-brands fa-facebook"></i>
  </a>

        </div>
      </div>
    </footer>
  )
}
