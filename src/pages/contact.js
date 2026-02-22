import React, { useRef, useState } from 'react';
import '../css/contact.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 1200;
const MAX_NAME_LENGTH = 80;
const BOT_MIN_FILL_MS = 2500;
const SUBMIT_COOLDOWN_MS = 8000;

const normalizeFormValues = (data) => ({
  ...data,
  name: data.name.trim(),
  email: data.email.trim(),
  comment: data.comment.trim(),
});

const validateForm = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Name is required.';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (data.name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be less than ${MAX_NAME_LENGTH} characters.`;
  }

  if (!data.email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.comment) {
    errors.comment = 'Message is required.';
  } else if (data.comment.length < MIN_MESSAGE_LENGTH) {
    errors.comment = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  } else if (data.comment.length > MAX_MESSAGE_LENGTH) {
    errors.comment = `Message must be less than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  return errors;
};

export function ContactForm(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    company: '',
  });
  const [touchedFields, setTouchedFields] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartedAtRef = useRef(Date.now());
  const lastSubmitAtRef = useRef(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextData = { ...formData, [name]: value };
    setFormData(nextData);

    if (formStatus) setFormStatus('');
    if (formError) setFormError('');

    if (touchedFields[name]) {
      const errors = validateForm(normalizeFormValues(nextData));
      setFieldErrors((prev) => ({ ...prev, [name]: errors[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const errors = validateForm(normalizeFormValues(formData));
    setFieldErrors((prev) => ({ ...prev, [name]: errors[name] || '' }));
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
    setTouchedFields({
      name: true,
      email: true,
      comment: true,
    });

    const normalizedData = normalizeFormValues(formData);
    const validationErrors = validateForm(normalizedData);
    setFieldErrors(validationErrors);
    setFormData((prev) => ({
      ...prev,
      name: normalizedData.name,
      email: normalizedData.email,
      comment: normalizedData.comment,
    }));

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Honeypot: bots often fill hidden fields.
    if (formData.company) {
      setFormStatus('Message sent successfully.');
      return;
    }

    const now = Date.now();
    if (now - formStartedAtRef.current < BOT_MIN_FILL_MS) {
      setFormStatus('Message sent successfully.');
      return;
    }

    if (now - lastSubmitAtRef.current < SUBMIT_COOLDOWN_MS) {
      setFormError('Please wait a few seconds before sending another message.');
      return;
    }

    setIsSubmitting(true);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const receiverEmail =
      process.env.REACT_APP_CONTACT_RECEIVER_EMAIL || 'hassan.usmani.career@gmail.com';
    const hasEmailJsConfig = Boolean(serviceId && templateId && publicKey);
    const sentAt = new Date().toISOString();

    try {
      let response;
      let primaryProviderError = null;

      if (hasEmailJsConfig) {
        try {
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
                from_name: normalizedData.name,
                from_email: normalizedData.email,
                to_email: receiverEmail,
                message: normalizedData.comment,
                sent_at: sentAt,
                source: window.location.href,
              },
            }),
          });

          if (!response.ok) {
            let providerMessage = '';
            try {
              const errorPayload = await response.json();
              providerMessage = errorPayload?.message || '';
            } catch {
              providerMessage = '';
            }

            throw new Error(providerMessage || 'Primary email provider failed.');
          }
        } catch (error) {
          primaryProviderError = error;
        }
      }

      if (!hasEmailJsConfig || primaryProviderError) {
        response = await createTimedFetch(`https://formsubmit.co/ajax/${receiverEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: normalizedData.name,
            email: normalizedData.email,
            message: `${normalizedData.comment}\n\nSent at: ${sentAt}\nFrom page: ${window.location.href}`,
            _subject: `Portfolio Contact: ${normalizedData.name}`,
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

      lastSubmitAtRef.current = Date.now();
      setFormStatus('Message sent successfully.');
      setFormData({
        name: '',
        email: '',
        comment: '',
        company: '',
      });
      setTouchedFields({});
      setFieldErrors({});
      formStartedAtRef.current = Date.now();
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
        <p className="section-subtitle">How can you contact me?</p>
        <h6 className="section-title mb-5">Contact Me</h6>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="contact-form contact-form-modern col-md-10 col-lg-8 m-auto"
        >
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label className="contact-label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className={`form-control ${touchedFields.name && fieldErrors.name ? 'is-invalid' : ''}`}
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={MAX_NAME_LENGTH}
                aria-invalid={Boolean(touchedFields.name && fieldErrors.name)}
                aria-describedby={touchedFields.name && fieldErrors.name ? 'name-error' : undefined}
                required
              />
              {touchedFields.name && fieldErrors.name && (
                <p id="name-error" className="contact-field-error">{fieldErrors.name}</p>
              )}
            </div>
            <div className="form-group col-sm-6">
              <label className="contact-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={`form-control ${touchedFields.email && fieldErrors.email ? 'is-invalid' : ''}`}
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touchedFields.email && fieldErrors.email)}
                aria-describedby={touchedFields.email && fieldErrors.email ? 'email-error' : undefined}
                required
              />
              {touchedFields.email && fieldErrors.email && (
                <p id="email-error" className="contact-field-error">{fieldErrors.email}</p>
              )}
            </div>
            <div className="form-group col-sm-12">
              <label className="contact-label" htmlFor="comment">Message</label>
              <textarea
                name="comment"
                id="comment"
                rows="6"
                className={`form-control ${touchedFields.comment && fieldErrors.comment ? 'is-invalid' : ''}`}
                placeholder="Write Something"
                value={formData.comment}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={MAX_MESSAGE_LENGTH}
                aria-invalid={Boolean(touchedFields.comment && fieldErrors.comment)}
                aria-describedby={
                  touchedFields.comment && fieldErrors.comment ? 'comment-error' : 'message-help'
                }
                required
              ></textarea>
              <p id="message-help" className="contact-helper-text">
                Minimum {MIN_MESSAGE_LENGTH} characters, maximum {MAX_MESSAGE_LENGTH}.
              </p>
              {touchedFields.comment && fieldErrors.comment && (
                <p id="comment-error" className="contact-field-error">{fieldErrors.comment}</p>
              )}
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
            <div className="form-group col-sm-12 mb-0" aria-live="polite">
              {formStatus && <p className="contact-success-message">{formStatus}</p>}
              {formError && <p className="contact-error-message" role="alert">{formError}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
