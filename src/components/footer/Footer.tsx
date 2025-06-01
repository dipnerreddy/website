"use client";

import React, { useState } from 'react'; // Import useState
import { Card, CardContent } from "@/components/ui/card"; // Assuming these are used elsewhere or can be removed if not
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, ArrowUp, Loader2 } from "lucide-react"; // Added Loader2 for loading state

// REPLACE WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwD5yQTxVvY5K5_OmdfE8JEI3LFC4vqRrUdl3f12Ly57qzskhuySSyUAQStpgJe1SJm5Q/exec';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>(''); // 'success' or 'error'

  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.0677526301447!2d80.68181677538598!3d16.57309698418181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35e451d6937443%3A0xd72c9e17f767d087!2sRADIANT%20HIGH%20SCHOOL%2C%20NUNNA!5e0!3m2!1sen!2sin!4v1748098886846!5m2!1sen!2sin';


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const currentYear = new Date().getFullYear();

  const isValidEmail = (email: string) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission if it's part of a form
    setMessage('');
    setMessageType('');

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors', // Required for cross-origin requests to Google Apps Script
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        // The body needs to be a string, and Apps Script expects 'application/x-www-form-urlencoded' by default for e.parameter
        // BUT we modified our Apps Script to handle JSON in postData.contents
        body: JSON.stringify({ email: email }), 
      });

      // Google Apps Script often returns plain text for success/error if not explicitly set to JSON
      // So we'll parse the response from our Apps Script
      const result = await response.json();

      if (result.status === "success") {
        setMessage(result.message || 'Subscribed successfully!');
        setMessageType('success');
        setEmail(''); // Clear input on success
      } else {
        setMessage(result.message || 'Subscription failed. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">


      {/* Main Footer Content (rest of your footer code...) */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/small-logo.png" 
                  alt="Radiant High School Logo" 
                  className="h-12 w-auto"
                />
                <div>
                  <h3 className="text-lg font-bold">Radiant High School</h3>
                  <p className="text-sm text-gray-400">Where Knowledge Rises</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Committed to providing quality education and nurturing young minds 
                since 2018. Building tomorrow&apos;s leaders today.
              </p>
            </div>

  

            {/* Quick Links */}
            {/* Column 3: Map */}
        

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 mt-1 text-blue-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    Radiant High School, Nunna, Vijayawada Rural, Krishna,<br />
                    Andhra Pradesh, 521212
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-400" />
                  <a href="tel:+918317651237" className="text-gray-300 hover:text-white text-sm">+91-8317651237</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-orange-400" />
                   <a href="mailto:radianthighschoolnunna@gmail.com" className="text-gray-300 hover:text-white text-sm break-words">radianthighschoolnunna@gmail.com</a>
                </div>
              </div>
            </div>

            {/* School Hours & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">School Hours</h4>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Mon - Fri:</span>
                  <span className="text-white">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Saturday:</span>
                  <span className="text-white">9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Sunday:</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center sm:items-start h-full sm:col-span-1 md:col-span-1">
          <h3 className="text-lg font-bold mb-2 hidden sm:block">Find Us</h3>
          <div className="w-full h-[180px] sm:h-[200px] md:h-full overflow-hidden rounded-md">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Radiant School Location"
            ></iframe>
          </div>
        </div>
          </div>
        </div>
        
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Radiant High School, Nunna. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="ml-4 text-gray-400 hover:text-white"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// export default Footer; // If this is a named export, you might not need this default