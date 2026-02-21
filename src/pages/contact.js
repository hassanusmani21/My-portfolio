import React, { useState } from 'react';
import '../css/contact.css';

export function ContactForm(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    company: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createTimedFetch = async (url, options, timeoutMs = 12000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus('');
    setFormError('');
    setIsSubmitting(true);

    // Honeypot: bots often fill hidden fields.
    if (formData.company) {
      setIsSubmitting(false);
      setFormStatus('Message sent successfully.');
      return;
    }

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const receiverEmail =
      process.env.REACT_APP_CONTACT_RECEIVER_EMAIL || 'hassan.usmani.career@gmail.com';
    const hasEmailJsConfig = Boolean(serviceId && templateId && publicKey);
    const sentAt = new Date().toISOString();

    try {
      let response;

      if (hasEmailJsConfig) {
        response = await createTimedFetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              to_email: receiverEmail,
              message: formData.comment,
              sent_at: sentAt,
              source: window.location.href,
            },
          }),
        });
      } else {
        response = await createTimedFetch(`https://formsubmit.co/ajax/${receiverEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: `${formData.comment}\n\nSent at: ${sentAt}\nFrom page: ${window.location.href}`,
            _subject: `Portfolio Contact: ${formData.name}`,
            _captcha: 'false',
          }),
        });
      }

      if (!response.ok) {
        let providerMessage = '';
        try {
          const errorPayload = await response.json();
          providerMessage = errorPayload?.message || '';
        } catch {
          providerMessage = '';
        }

        throw new Error(providerMessage || 'Failed to send message');
      }

      setFormStatus('Message sent successfully.');
      setFormData({
        name: '',
        email: '',
        comment: '',
        company: '',
      });
    } catch (error) {
      if (error?.name === 'AbortError') {
        setFormError('Request timed out. Please try again.');
      } else if (error?.message) {
        setFormError(error.message);
      } else {
        setFormError('Failed to send message. Please try again in a moment.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container text-center">
        <p className="section-subtitle">How can you communicate?</p>
        <h6 className="section-title mb-5">Contact Me</h6>
        <form onSubmit={handleSubmit} className="contact-form contact-form-modern col-md-10 col-lg-8 m-auto">
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label className="contact-label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-sm-6">
              <label className="contact-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-sm-12">
              <label className="contact-label" htmlFor="comment">Message</label>
              <textarea
                name="comment"
                id="comment"
                rows="6"
                className="form-control"
                placeholder="Write Something"
                value={formData.comment}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              autoComplete="off"
              tabIndex="-1"
              aria-hidden="true"
              className="contact-honeypot"
            />
            <div className="form-group col-sm-12 mt-3">
              <button type="submit" className="btn contact-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {formStatus && (
              <div className="form-group col-sm-12 mb-0">
                <p className="contact-success-message">{formStatus}</p>
              </div>
            )}
            {formError && (
              <div className="form-group col-sm-12 mb-0">
                <p className="contact-error-message">{formError}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
