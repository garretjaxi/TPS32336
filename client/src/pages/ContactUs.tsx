import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Integrate with backend email service
      alert('Your message has been sent. We\'ll get back to you soon!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-foreground/70">Have questions? We'd love to hear from you.</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                <p className="text-foreground/70">
                  <a href="tel:321-939-2057" className="hover:text-amber-600 transition">
                    321-939-2057
                  </a>
                </p>
                <p className="text-sm text-foreground/60 mt-2">
                  Monday – Friday: 8AM – 2PM EST<br />
                  Saturday & Sunday: Closed
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <p className="text-foreground/70">
                  <a href="mailto:info@themeparkstays.com" className="hover:text-amber-600 transition">
                    info@themeparkstays.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
                <p className="text-foreground/70">
                  Kissimmee, Florida<br />
                  Near Walt Disney World, Universal Studios,<br />
                  LEGOLAND & SeaWorld
                </p>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold text-foreground mb-2">Response Time</h3>
                <p className="text-foreground/70">
                  We typically respond to inquiries within 24 hours during business hours. Thank you for your patience!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
