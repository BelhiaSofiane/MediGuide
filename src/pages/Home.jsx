import React from 'react'
import { Brain, Clock, Shield, Star, TrendingUp, Users } from 'lucide-react'
import { Link } from "react-router-dom"

const Home = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header / Navbar */}
            <header className="border-b-gray-900 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold">
                            SymptoTrack
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                            How It Works
                        </a>
                        <a href="#security" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Security
                        </a>
                    </nav>
                    <div className="flex gap-3 justify-end">
                        <Link to={"/login"} className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                            Sign In
                        </Link>
                        <Link to={"/register"} className="bg-black inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-black/80 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="">


                {/* Hero Section */}
                <section className='container mx-auto px-4 py-16 text-center'>
                    <p className='inline-block rounded px-2.5 py-0.5 text-sm font-medium bg-gray-100 text-gray-800 mb-4'>
                        AI-Powered Health Intelligence
                    </p>
                    <div className='text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                        Take Control of Your Health with <span className='text-blue-600'>AI-Powered</span> Insights
                    </div>
                    <p className='m-4 font'>
                        SymptoTrack combines intelligent
                        symptom analysis with secure health
                        recordkeeping to help you make informed
                        decisions about your health and maintain
                        continuity of care.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center items-center gap-4 m-4'>
                        <button className='bg-black hover:bg-black/80 text-black text-white py-2 px-3 rounded-lg font-semibold cursor-pointer w-100'>Start Symptom Check</button>
                        <button className='bg-white hover:bg-gray-200 py-2 px-3 rounded-lg font-semibold cursor-pointer w-100'>View Demo</button>
                    </div>
                    <img className='rounded-lg shadow-2xl' src="../src/assets/placeholder.svg" alt="idk yet" />
                </section>
            

                {/* Features */}
                <section id='features' className='py-16 bg-gray-50'>
                    <div className='container mx-auto px-4'>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Health Management</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Everything you need to understand your symptoms, track your health, and make informed decisions.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="rounded-lg border-0 shadow-lg p-6 bg-white">
                                <div className="mb-4">
                                    <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <Brain />
                                    </svg>
                                    <h3 className="text-lg font-semibold">AI Symptom Analysis</h3>
                                    <p className="text-gray-600 mt-2">
                                        Advanced AI analyzes your symptoms to identify possible conditions and provide personalized insights.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border-0 shadow-lg p-6 bg-white">
                                <div className="mb-4">
                                    <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <Shield />
                                    </svg>
                                    <h3 className="text-lg font-semibold">Secure Health Records</h3>
                                    <p className="text-gray-600 mt-2">
                                        Your medical history is encrypted and stored securely, accessible only to you and authorized healthcare providers.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border-0 shadow-lg p-6 bg-white">
                                <div className="mb-4">
                                    <svg className="w-12 h-12 text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <TrendingUp />
                                    </svg>
                                    <h3 className="text-lg font-semibold">Health Trends</h3>
                                    <p className="text-gray-600 mt-2">
                                        Track your health patterns over time with intelligent analytics and personalized recommendations.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border-0 shadow-lg p-6 bg-white">
                                <div className="mb-4">
                                    <svg className="w-12 h-12 text-orange-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <Clock />
                                    </svg>
                                    <h3 className="text-lg font-semibold">24/7 Availability</h3>
                                    <p className="text-gray-600 mt-2">
                                        Access your health insights and symptom checker anytime, anywhere, with instant AI-powered analysis.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border-0 shadow-lg p-6 bg-white">
                                <div className="mb-4">
                                    <svg className="w-12 h-12 text-red-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <Users />
                                    </svg>
                                    <h3 className="text-lg font-semibold">Care Continuity</h3>
                                    <p className="text-gray-600 mt-2">
                                        Share your health timeline with healthcare providers for better informed consultations and treatment.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border-0 shadow-lg p-6 bg-white">
                                <div className="mb-4">
                                    <svg className="w-12 h-12 text-yellow-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <Star />
                                    </svg>
                                    <h3 className="text-lg font-semibold">Personalized Advice</h3>
                                    <p className="text-gray-600 mt-2">
                                        Receive tailored health recommendations based on your unique symptoms, history, and health goals.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SymptoTrack Works</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Simple, secure, and scientifically-backed health analysis in three easy steps.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">1</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Describe Your Symptoms</h3>
                                <p className="text-gray-600">
                                    Tell us about your symptoms using our intuitive interface. Our AI understands natural language and
                                    medical terminology.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-green-600">2</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Get AI Analysis</h3>
                                <p className="text-gray-600">
                                    Our advanced AI analyzes your symptoms against medical databases to identify possible conditions and
                                    recommendations.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-purple-600">3</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Track & Act</h3>
                                <p className="text-gray-600">
                                    Save your results, track patterns over time, and share insights with healthcare providers for better
                                    care.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Secturiy section */}
                <section id="security" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <svg className="w-16 h-16 text-blue-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <Shield />
                            </svg>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Your Health Data is Secure
                            </h2>

                            <p className="text-xl text-gray-600 mb-8">
                                We use enterprise-grade encryption and follow HIPAA compliance standards to ensure your personal health
                                information remains private and secure.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 text-left">
                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                                    <p className="text-gray-600">
                                        All data is encrypted in transit and at rest using industry-standard protocols.
                                    </p>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
                                    <p className="text-gray-600">
                                        Our platform meets all HIPAA requirements for handling protected health information.
                                    </p>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">You Control Your Data</h3>
                                    <p className="text-gray-600">
                                        You decide who can access your health information and can delete it at any time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA section */}

                <section className="py-16 bg-blue-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Take Control of Your Health?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of users who trust SymptoTrack for their health insights.
                        </p>
                        <a
                            href="/symptom-checker"
                            className="inline-block text-lg px-8 py-3 bg-white text-blue-600 font-semibold rounded-md shadow hover:bg-gray-100 transition-colors"
                        >
                            Start Your Health Journey
                        </a>
                    </div>
                </section>
            </main>


            <footer className="bg-gray-900 text-center text-sm text-gray-600 py-4">

                <div className="flex gap-3 justify-around mt-2 mb-4 flex-col sm:flex-row">
                    <div className=''>
                        <div className='flex justify-center items-center gap-2'>
                            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div className="font-bold text-white">
                                SymptoTrack
                            </div>
                        </div>
                        <p className='text-gray-600 w-33 text-center m-auto'>
                            AI-powered health insights
                            for better decision-making
                            and continuity of care.
                        </p>
                    </div>
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

export default Home
