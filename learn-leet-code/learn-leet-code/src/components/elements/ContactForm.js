import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import Button from '../elements/Button';

import emailjs from '@emailjs/browser';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      isSubmitting: false,
      stateMessage: null,
      formSubmitted: false
    };
  }

  sendEmail = (e) => {

    e.persist();
    e.preventDefault();
    this.setState({ isSubmitting: true });
    console.log(e)
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        this.form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          this.setState({ stateMessage: 'Message sent!', isSubmitting: false, formSubmitted: true  });
          setTimeout(() => {
            this.setState({ stateMessage: null });
          }, 5000); // hide message after 5 seconds
        },
        (error) => {
          this.setState({ stateMessage: 'Something went wrong, please try again later', isSubmitting: false });
          setTimeout(() => {
            this.setState({ stateMessage: null });
          }, 5000); // hide message after 5 seconds
        }
      );
  }

  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      split,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'cta section center-content-mobile',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'cta-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider',
      split && 'cta-split'
    );

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div
            className={innerClasses}
          >
            <div className="cta-slogan">
              <h3 className="m-0">
                We are beta testing. Join the waitlist to try it out.
              </h3>
            </div>
            <div className="cta-action">
            {this.state.formSubmitted ? (
              <div>
                <p>Submitted!</p> 
                <p>We will get in touch with you soon</p>
              </div>
              ) :
              (<form ref={this.form} onSubmit={this.sendEmail}>
                <div className="mb-12">
                  <Input
                    type="text"
                    label=""
                    placeholder="name"
                    name="user_name"
                    labelHidden />
                </div>
                <div className="mb-12">
                  <Input
                    type="email"
                    label=""
                    placeholder="email"
                    name="user_email"
                    labelHidden />
                </div>
                <div className="mb-12">
                  <Input
                    type="textarea"
                    label=""
                    placeholder="Optional, tell us what you hope to gain from signing up for LearnLeetCode"
                    name="message"
                    labelHidden />
                </div>
                <Button color="primary" wide>Send</Button>
              </form>)}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ContactForm.propTypes = propTypes;
ContactForm.defaultProps = defaultProps;

export default ContactForm;