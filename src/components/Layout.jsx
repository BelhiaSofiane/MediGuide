import React from 'react'

const Layout = ({ children }) => {
    return (
        <div
            className=""
        >
            {/* Navbar */}
            <nav
            >
                <div className="nav-bar">
                    {/* Logo */}
                    <div className="">
                        <a
                            href="https://www.linkedin.com/in/sofiane-belhia-1696b5285/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Meow
                        </a>
                    </div>

                    {/* Navigation */}
                    <div className="Navigation">
                        <div
                        >
                            Home
                        </div>
                        <div
                        >
                            Emergencies
                        </div>
                        <div
                        >
                            Advice
                        </div>
                        <div
                        >
                            ContactDocs
                        </div>
                    </div>

                    {/* Theme Toggle */}
                    <div

                    >
                        <button
                            onClick={console.log("Hello world")}
                        >
                            theme
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer
            >
                <span>© 2025 Belhia Sofiane Portfolio</span>
                <div className="">
                    <a
                        href="#"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                    >
                        Terms of Service
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Layout