import React from 'react'
import { Brain } from 'lucide-react'

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <header className="border-b-gray-900 bg-white/80 backdrop-blur-sm">
                <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold">
                            SymptoTrack
                        </div>
                    </div>
                    <div className="flex gap-3 text-gray-600">
                        <a className="hover:text-blue-500" href="">
                            Features
                        </a>
                        <a className="hover:text-blue-500" href="">
                            How it works
                        </a>
                        <a className="hover:text-blue-500" href="">
                            Security
                        </a>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button className="cursor-pointer hover:bg-black/10 rounded py-2 px-4 font-semibold">
                            Sign In
                        </button>
                        <button className="bg-black hover:bg-black/80 text-black text-white py-2 px-3 rounded-lg font-semibold cursor-pointer">
                            Get Started
                        </button>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-4">

                {children}
            </main>

            <footer className="bg-gray-900 text-center text-sm text-gray-600 py-4">

                <div className="flex gap-3 justify-around mt-2 mb-4">
                    <div>
                        <h1 className='font-bold text-white'>Product</h1>
                        <ul className='text-gray-600'>
                            <li>
                                <a className="hover:text-white" href="">
                                    Symptom Checker
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-white" href="">
                                    Health Dashboard
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-white" href="">
                                    Medical History
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold text-white'>Company</h3>
                        <ul className='flex flex-col justify-left'>
                            <li>
                                <a className="hover:text-white" href="">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-white" href="">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-white" href="">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold text-white'>Support</h3>
                        <ul>
                            <li>
                                <a className="hover:text-white" href="">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-white" href="">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-white" href="">
                                    FeedBack
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='p-4'>
                    &copy; 2025 SymptoTrack. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Layout
