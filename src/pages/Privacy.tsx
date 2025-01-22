import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Information Collection</h2>
            <p className="text-gray-600">
              We collect information that you voluntarily provide when contacting us through our website, 
              including your name and email address.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Use of Information</h2>
            <p className="text-gray-600">
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Send periodic emails (if you opt-in)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Cookies</h2>
            <p className="text-gray-600">
              We use cookies to understand and save your preferences for future visits and compile 
              aggregate data about site traffic and site interaction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Third-Party Disclosure</h2>
            <p className="text-gray-600">
              We do not sell, trade, or otherwise transfer your personally identifiable information to 
              outside parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:johnorladnsudoy49@gmail.com" className="text-indigo-600 hover:text-indigo-800">
                your.email@example.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 