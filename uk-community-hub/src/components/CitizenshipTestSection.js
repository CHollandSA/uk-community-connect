import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "./Citizenship.css";
import "./App.css";
import "./Hero.css";

function CitizenshipTestSection() {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Information</Popover.Header>
      <Popover.Body>
        Throughout this site you will see info icons like me. Click them to
        learn more about the section you are on{" "}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="citizenship">
      <div>
        <div className="div-heading">
          <h2>Citizenship Section</h2>{" "}
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <img
              src="./images/info-circle-line-icon.png"
              alt="Info"
              className="info-icon"
            />
          </OverlayTrigger>
        </div>
        <section>
          <h4>
            <u>Applying for Citizenship in the UK</u>
          </h4>
          <p>
            Applying for citizenship in the UK can be a daunting process, but
            it's entirely possible to do it yourself by following the steps
            outlined on the{" "}
            <a
              href="https://www.gov.uk/browse/citizenship/citizenship"
              target="_blank"
              rel="noopener noreferrer"
            >
              official government website
            </a>
            . Many companies offer to handle the application for you, but they
            often charge exorbitant fees.
          </p>
          <p>
            Additionally, it's important to note that applying for citizenship
            comes with its own expenses. You can find the requirements and fees
            on the{" "}
            <a
              href="https://www.gov.uk/british-citizenship"
              target="_blank"
              rel="noopener noreferrer"
            >
              official government website
            </a>
            .
          </p>
          <p>
            It's crucial to keep records of your home residence in the UK, as
            you'll need this to prove your residency at different points in your
            journey to becoming a citizen.
          </p>
          <p>
            After submitting your application for citizenship, you'll need to go
            through an external company for document submission and biometrics.
            It's important to note that the prices for early dates can be high,
            sometimes reaching around £500. However, by selecting a date a few
            weeks out from the current date, you can reduce the cost to around
            £80.
          </p>
          <img
            src="./images/UK-IMG3.jpg"
            alt="Placeholder"
            className="img-fluid"
          />
        </section>
        <section>
          <h4>
            <u>Citizenship Test</u>
          </h4>
          <p>
            As part of the citizenship process, individuals are required to pass
            a citizenship test. This test requires a good knowledge of the
            history of the UK, which may take some time to study for. It's
            advisable to give yourself ample time to prepare. Fortunately, there
            are resources available online to help with studying. One such
            resource is{" "}
            <a
              href="https://lifeintheuktestweb.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Life in the UK Test Web
            </a>
            , which provides all the necessary materials for free.
          </p>
          <p>
            When booking your test, it's essential to check regularly for
            availability as testing centers may update their schedules
            periodically. Despite the challenges, studying for the citizenship
            test can be a rewarding experience. Not only does it provide
            valuable knowledge about the UK, but it also contributes to your
            integration into the country's society.
          </p>
          <img
            src="./images/UK-IMG7.jpg"
            alt="Placeholder"
            className="img-fluid"
          />
        </section>
        <section>
          <h4>
            <u>Learning English</u>
          </h4>
          <p>
            For those wanting to learn English, there are several resources
            available online. Websites like{" "}
            <a
              href="https://www.bbc.co.uk/learningenglish/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BBC Learning English
            </a>{" "}
            and{" "}
            <a
              href="https://www.esolcourses.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ESOL Courses
            </a>{" "}
            offer comprehensive lessons and materials for learners.
          </p>
          <p>
            Additionally, volunteers on our website offer English lessons from
            time to time. Be sure to check the available sessions for
            opportunities to improve your English skills.
          </p>
          <img
            src="./images/UK-IMG6.jpg"
            alt="Placeholder"
            className="img-fluid"
          />
        </section>
        <section>
          <h4>
            <u>Local Activities and Events</u>
          </h4>
          <p>
            While navigating the citizenship process, it's also important to
            engage with the local community. Exploring activities and events in
            your area can provide valuable opportunities to connect with others
            and feel more integrated into society. You can find information
            about local events and activities on websites like{" "}
            <a
              href="https://discovernorthernireland.com/whats-on"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discover Northern Ireland
            </a>{" "}
            and{" "}
            <a
              href="https://visitbelfast.com/whats-on/when/today/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Belfast
            </a>
            .
          </p>
          <p>
            Trying a new activity or joining a club or society can also be a
            great way to meet people and immerse yourself in the local culture
            and community.{" "}
            <a
              href="https://www.meetup.com/cities/gb/bt4_2ff/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meetup
            </a>{" "}
            offer a range of different activities that you can join.
          </p>
          <img
            src="./images/UK-IMG5.jpg"
            alt="Placeholder"
            className="img-fluid"
          />
        </section>
        <section>
          <h4>
            <u>Range of Activities</u>
          </h4>
          <p>
            In addition to the resources provided on this website, there's a
            wide range of activities available to newcomers in the United
            Kingdom. From cultural events to sports clubs, and hobby groups to
            volunteering opportunities, there's something for everyone.
          </p>
          <p>
            Engaging in these activities not only aids in language acquisition
            and cultural integration but also fosters a sense of belonging
            within the community. Whether you're interested in exploring
            historical landmarks, attending music festivals, or participating in
            local charity initiatives, there are numerous avenues to enrich your
            experience and connect with others.
          </p>
          <p>
            Websites such as Meetup, Discover Northern Ireland, and Visit
            Belfast provide comprehensive listings of events and activities
            happening in various regions across the UK. Additionally, community
            centers, libraries, and local councils often organize programs and
            workshops tailored to newcomers, offering valuable opportunities for
            socialization and skill development.
          </p>
          <p>
            Embracing these activities not only enhances your journey towards
            citizenship but also enriches your overall experience as you settle
            into your new home in the United Kingdom.
          </p>
          <img
            src="./images/UK-IMG4.jpg"
            alt="Placeholder"
            className="img-fluid"
          />
        </section>
      </div>
    </div>
  );
}

export default CitizenshipTestSection;
