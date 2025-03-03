"use client";

import { useUser } from "@clerk/nextjs"; 
import { Button } from "@/components/ui/button";
import {
  Code2,
  MessageSquare,
  Search,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-200">
    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-700">{description}</p>
  </div>
);

const LandingPage = () => {
  const { isSignedIn, isLoaded } = useUser(); 
  const router = useRouter(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isLoaded) {
    return null;
  }

  const handleGetStartedClick = () => {
    if (isSignedIn) {
      router.push('/dev-discuss');
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Where Developers <span className="text-indigo-600">Solve Problems</span> Together
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-lg">
                DevDiscuss is a community-driven platform where developers can ask questions, share knowledge, and get AI-powered solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleGetStartedClick}><ArrowRight className="ml-2 h-5 w-5" /> Join the Community</Button>
          
                {/* <Link href="/questions" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                  Browse Questions
                </Link> */}
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-100 rounded-full opacity-70"></div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
                  <div className="bg-slate-800 text-white p-4 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-sm font-mono">DevDiscuss Question</div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">How to implement debounce in React?</h3>
                      <p className="text-slate-700 text-sm">I'm trying to optimize search input performance by implementing debounce. What's the best approach in a React functional component?</p>
                    </div>
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                            <Zap className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm font-semibold text-indigo-600">AI Assistant</span>
                            <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded-full">Fastest Solution</span>
                          </div>
                          <p className="text-sm text-slate-700 mt-1">
                            You can use the useCallback hook with a custom debounce function or leverage libraries like lodash:
                          </p>
                          <pre className="mt-2 p-3 bg-slate-100 rounded-md text-xs overflow-x-auto">
                            <code className="text-slate-800">
{`import { useState, useEffect, useCallback } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  
  // Update debounced value after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);  
    return () => clearTimeout(timer);
  }, [searchTerm]);
  ------------------------------------
}`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Developers Choose DevDiscuss
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Our platform combines the best of community knowledge with cutting-edge AI to help you solve problems faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6" />}
              title="Community Answers"
              description="Get solutions from experienced developers who've faced similar challenges and solved them successfully."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="AI-Powered Solutions"
              description="Receive instant, accurate answers generated by our advanced AI that understands code context and best practices."
            />
            <FeatureCard 
              icon={<Code2 className="w-6 h-6" />}
              title="Code Snippets"
              description="Find and share working code examples with syntax highlighting and the ability to copy with a single click."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6" />}
              title="Vibrant Community"
              description="Join thousands of developers who collaborate, learn, and grow together in a supportive environment."
            />
            <FeatureCard 
              icon={<Search className="w-6 h-6" />}
              title="Smart Search"
              description="Find relevant answers quickly with our intelligent search that understands technical concepts and relationships."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-600 text-white rounded-xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to solve problems faster?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join our community of developers and start getting answers to your toughest coding questions today.
            </p>
            <button 
              onClick={handleGetStartedClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
