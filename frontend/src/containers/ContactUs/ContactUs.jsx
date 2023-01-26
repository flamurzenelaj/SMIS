import React from "react";
import "./ContactUs.scss";
import { Typography } from "../../components";
import {
  TEXT_COLOR_VARIATION,
  TEXT_FONT_WEIGHT,
  TEXT_VARIATION,
} from "../../components/Typography/typography_enums";

function ContactUs() {
  let contactUsBackgroundImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8&w=1000&q=80";

  return (
    <>
      <div className="app__contactus">
        <header
          className="app__contactus-header"
          style={{
            backgroundImage: `url(${contactUsBackgroundImage})`,
          }}
        >
          <Typography
            variant={TEXT_VARIATION.h1}
            fontWeight={TEXT_FONT_WEIGHT.w300}
            color={TEXT_COLOR_VARIATION.white}
            className="app__contactus__header-title"
          >
            CONTACT US
          </Typography>
        </header>
      </div>
      <div className="location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11738.680074088013!2d21.153124!3d42.647155!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549e8d5d607f25%3A0xa31dd05b21bd09de!2sUBT%20College!5e0!3m2!1sen!2s!4v1674658726701!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="contact-us">
        <div className="row">
          <div className="contact-col">
            <div>
              <i className="fa fa-home"></i>
              <span>
                <h5>1000 Prishtine,Kosovo</h5>
                <p>Lagjia Kalabria</p>
              </span>
            </div>
            <div>
              <i className="fa fa-phone"></i>
              <span>
                <h5>Call Us</h5>
                <p>+383 38 541 400</p>
                <p>+383 38 541 400</p>
                <p>Saturday to Thursday, at 10Am to 6PM</p>
              </span>
            </div>
            <div>
              <i className="fa fa-envelope-o"></i>
              <span>
                <h5>Email Us</h5>
                <p>info@ubt-uni.net</p>
              </span>
            </div>
          </div>
          <div className="contact-col">
            <form action="">
              <input type="text" placeholder="Enter Your Name" required />
              <input type="email" placeholder="Enter Your Mail" required />
              <input type="text" placeholder="Enter Your Subject" required />
              <textarea rows="8" placeholder="Message" required></textarea>
              <button type="Submit" className="hero-btn red-btn">
                Send Message{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
