import React from "react";
import "./Home.scss";
import { images } from "../../constants";
import Chatbot from "../../components/Chatbot/Chatbot";

const Home = () => {
 

  return (
    <>

      <div className="header">
        <div className="text-box">
          <h1>UBT – Higher Education Institution</h1>
          <p>
            “Study without desire spoils the memory, and it retains nothing that
            it takes in.”
            <br />
            “A university is just a group of buildings gathered around a
            library.” “But we're a university!
          </p>
          <a href="/login" className="hero-btn">
            Visit us to know more
          </a>
        </div>
      </div>

      <div className="campus">
        <h1>Our Global Campus</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, esse
          earum quod cum magni ullam ipsum quis laudantium distinctio amet a vel
          quos impedit
        </p>

        <div className="row">
          <div className="campus-col">
            <img alt="img" src={images.london} />
            <div className="layer">
              <h3>PRISHTINA</h3>
            </div>
          </div>
          <div className="campus-col">
            <img alt="img" src={images.newyork} />
            <div className="layer">
              <h3>PEJA</h3>
            </div>
          </div>
          <div className="campus-col">
            <img alt="img" src={images.washington} />
            <div className="layer">
              <h3>PRIZREN</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="facilities">
        <h1>Our Departments</h1>
        <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="row">
          <div className="facilities-col">
            <img alt="img" src={images.computerscience} />
            <h3>Computer Science</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              facilis magnam repellat! Obcaecati, quis libero quisquam
              dignissimos aspernatur molestiae perferendis nisi soluta est,
              temporibus ipsa a laboriosam explicabo veniam aperiam.
            </p>
          </div>
          <div className="facilities-col">
            <img alt="img" src={images.infermiery} />
            <h3>Medical Science</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              facilis magnam repellat! Obcaecati, quis libero quisquam
              dignissimos aspernatur molestiae perferendis nisi soluta est,
              temporibus ipsa a laboriosam explicabo veniam aperiam.
            </p>
          </div>
          <div className="facilities-col">
            <img alt="img" src={images.datascience} />
            <h3>Data Science</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              facilis magnam repellat! Obcaecati, quis libero quisquam
              dignissimos aspernatur molestiae perferendis nisi soluta est,
              temporibus ipsa a laboriosam explicabo veniam aperiam.
            </p>
          </div>
        </div>
      </div>

      <div className="testimonial">
        <h1>What Our Student Says</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
          debitis quia aliquam in nemo hic ullam incidunt.
        </p>
        <div className="row">
          <div className="testimonial-col">
            <img alt="img" src={images.user1} />
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                perferendis dolorum suscipit ex adipisci consectetur, rem quos
                ab, eaque quia obcaecati aperiam totam blanditiis hic pariatur
                vero quisquam dignissimos laudantium?
              </p>
              <h3>Eva Marie</h3>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
          </div>
          <div className="testimonial-col">
            <img alt="img" src={images.user2} />
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                perferendis dolorum suscipit ex adipisci consectetur, rem quos
                ab, eaque quia obcaecati aperiam totam blanditiis hic pariatur
                vero quisquam dignissimos laudantium?
              </p>
              <h3>Showrav Mitra</h3>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="cta">
        <h1>Thank you so much for visiting our website.</h1>
        <a href="/contact-us" className="hero-btn">
          Contact Us
        </a>
      </div>

      <Chatbot />

    </>
  );
};

export default Home;
