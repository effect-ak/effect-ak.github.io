import React from 'react'

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-4 no-print mt-20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3">
        <span>© 2025 Created by Aleksandr Kondaurov</span>
        <div className="flex gap-2 justify-center">
          <a 
            target="_blank"
            href="https://www.linkedin.com/in/alexander-kondaurov/"
            rel="noopener noreferrer" 
            className="fa-brands fa-lg fa-linkedin text-blue-500"
          ></a>
          <a 
            target="_blank"
            href="https://github.com/effect-ak/effect-ak.github.io"
            rel="noopener noreferrer" 
            className="fa-brands fa-lg fa-github"
          ></a> 
        </div>
      </div>
    </footer>
  )
}
