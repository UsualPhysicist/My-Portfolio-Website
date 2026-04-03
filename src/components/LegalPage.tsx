import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

export default function LegalPage({ type, onBack }: LegalPageProps) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-brand-bg text-brand-primary pt-32 pb-20 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">{title}</h1>

        <div className="prose prose-invert max-w-none space-y-12 text-brand-secondary">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">1. Information Collection</h2>
                <p className="leading-relaxed">
                  We collect information that you voluntarily provide to us when you subscribe to our newsletter or contact us through the website. This information typically includes your name and email address. We do not collect any sensitive personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">2. Use of Information</h2>
                <p className="leading-relaxed">
                  The information we collect is used solely for the following purposes:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>To respond to your inquiries and provide customer support.</li>
                  <li>To send you our newsletter and updates if you have opted in.</li>
                  <li>To improve the functionality and user experience of our website.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">3. Data Security</h2>
                <p className="leading-relaxed">
                  We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">4. Third-Party Sharing</h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">1. Intellectual Property Rights</h2>
                <p className="leading-relaxed">
                  All content on this website, including but not limited to designs, graphics, logos, images, and text, is the exclusive property of Aditya Dhawan and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content without express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">2. User Conduct</h2>
                <p className="leading-relaxed">
                  By using this website, you agree not to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Use the website for any unlawful purpose.</li>
                  <li>Attempt to gain unauthorized access to any part of the website.</li>
                  <li>Interfere with the proper working of the website.</li>
                  <li>Use any automated means to access the website for any purpose.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">3. Disclaimer of Liability</h2>
                <p className="leading-relaxed">
                  This website and its content are provided on an "as is" basis. Aditya Dhawan makes no warranties, expressed or implied, regarding the accuracy or completeness of the content. We shall not be liable for any damages arising from the use of this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-primary mb-4">4. Changes to Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.
                </p>
              </section>
            </>
          )}

          <section className="pt-8 border-t border-brand-primary/10">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">Contact Information</h2>
            <p className="leading-relaxed">
              If you have any questions regarding our {title}, please contact us at:
            </p>
            <p className="mt-2 font-medium text-brand-accent">addydhawan27@gmail.com</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
