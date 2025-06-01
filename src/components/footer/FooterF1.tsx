// src/components/footer/FooterF1.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FooterF1 = () => {
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.0677526301447!2d80.68181677538598!3d16.57309698418181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35e451d6937443%3A0xd72c9e17f767d087!2sRADIANT%20HIGH%20SCHOOL%2C%20NUNNA!5e0!3m2!1sen!2sin!4v1748098886846!5m2!1sen!2sin';

  return (
    <div className="w-full min-h-[250px] bg-[#E6F0FA] text-black p-6 md:p-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 h-full">
        
        {/* This is your "main one" container, keep its responsive classes if needed */}
<div className="hidden md:flex flex-col items-start space-y-4 md:items-start"> {/* Added space-y-4, kept items-start */}

  {/* This div will now group the logo and the new school name/tagline, mimicking the ideal's top part */}
  <div className="flex items-center space-x-3">
    {/* Your existing Link and Image for the logo */}
    <Link href="/" className=""> {/* Removed mb-4 as parent space-y-4 will handle it */}
      <Image
        src="/small-logo.png"             // Your existing logo
        alt="Radiant Footer Logo"        // Your existing alt
        width={48}                       // Provide a base width (h-12 is 48px)
        height={48}                      // Provide a base height (adjust if not square)
        className="h-12 w-auto object-contain" // Style from ideal
      />
    </Link>
    {/* New div for School Name and Tagline, styled like the ideal */}
    <div>
      <h2 className="text-lg font-bold">Radiant High School</h2> {/* Text from ideal, or make it dynamic */}
      <p className="text-sm text-gray-900">Where Knowledge Rises</p> {/* Text from ideal, or make it dynamic */}
    </div>
  </div>

  {/* Your existing paragraph, now styled like the ideal's description */}
  <p className="text-gray-700 text-sm text-justify leading-relaxed md:text-left"> {/* Style from ideal, kept md:text-left for consistency if desired */}
    Committed to providing quality education and nurturing young minds since 2018. Building tomorrow&apos;s leaders today. {/* Your existing text */}
  </p>

</div>

        {/* Column 2: Address */}
        <div className="flex flex-col justify-center items-center text-center sm:items-start sm:text-left sm:col-span-1 md:col-span-1">
          <h2 className="text-lg font-bold mb-1">Our Address</h2>
          <h3 className="text-lg font-bold mb-2">Radiant High School</h3>
          <address className="not-italic text-sm leading-relaxed font-semibold">
            Jagga Reddy Street, Nunna<br />
            Vijayawada, Andhra Pradesh<br />
            Krishna District, 521212<br />
            <a href="tel:+918317651237" className="hover:underline font-bold">
              P: +91-8317651237
            </a><br />
            <a href="mailto:radianthighschoolnunna@gmail.com" className="hover:underline font-bold">
              E: radianthighschoolnunna@gmail.com
            </a>
          </address>
        </div>

        {/* Column 3: Map */}
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
  );
};

export default FooterF1;
