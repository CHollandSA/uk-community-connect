import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

export default function Extra() {
  // Popover content for explaining the purpose of the section
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Extra Support</Popover.Header>
      <Popover.Body>
        Throughtout this site you will see info icons like me. Click them to
        learn more about the section you are on{" "}
      </Popover.Body>
    </Popover>
  );

  return (
    <section className="hero">
      {/*Heading and popover for the extra support section */}
      <div className="div-heading">
        <h2>Extra Support</h2>{" "}
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <img
            src="./images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      {/*Main text explaining the purpose of the section */}
      <p className="hero--text">
        Thanks for visiting the "UK Community Connect" project! The purpose of
        this website is to aid newcomers to the UK as they navigate their
        journey of settling into a new country. Everyone is welcome to make the
        UK their home, and we hope the links provided here may be of some
        benefit to you on your journey.
        <br />
        If you have any recommendations or suggestions for improvement, don't
        hesitate to contact the admin. Additionally, if you'd like to contribute
        by volunteering to help out in any way, your assistance would be greatly
        appreciated!
      </p>
      {/*List of helpful links and organizations for immigrants and asylum seekers*/}
      <p>
        If you're an immigrant, refugee, or asylum seeker in the UK, there are
        several resources available to support you during your transition and
        settlement. Here are some helpful links and organizations:
      </p>
      <ul>
        {/*Each item in list contains a link and description */}
        <li>
          <a
            href="https://www.voicesinexile.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voices in Exile
          </a>
          : Provides support for refugees and asylum seekers. Visit their
          website for more information.
        </li>
        <li>
          Polish Community in Northern Ireland: Join the{" "}
          <a
            href="https://www.facebook.com/groups/428095227323101/discussion/preview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Polish Community in Northern Ireland
          </a>{" "}
          Facebook group to connect with fellow Polish immigrants.
        </li>
        <li>
          Nigerians in London: Join the{" "}
          <a
            href="https://www.facebook.com/groups/NaijaLondoners/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Naija Londoners
          </a>{" "}
          Facebook group to connect with the Nigerian community in London.
        </li>
        <li>
          Online Support Groups: There are many different online groups that you
          can join to help integrate into the UK. Seek out communities that
          share your culture or interests to find support and guidance.
        </li>
        <li>
          <a
            href="https://www.citizensadvice.org.uk/immigration/get-help/get-immigration-advice/#:~:text=If%20you%20need%20help%20with,to%20the%20EU%20Settlement%20Scheme"
            target="_blank"
            rel="noopener noreferrer"
          >
            Citizens Advice
          </a>
          : Contact your nearest Citizens Advice for free and confidential
          advice on immigration problems, including assistance with applying to
          the EU Settlement Scheme.
        </li>
        <li>
          <a
            href="https://www.migranthelpuk.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Migrant Help UK
          </a>
          : Provides independent advice and guidance to assist people seeking
          asylum in the UK.
        </li>
        <li>
          <a
            href="https://www.turn2us.org.uk/get-support/information-for-your-situation/a-migrant"
            target="_blank"
            rel="noopener noreferrer"
          >
            Turn2us - Migrant Legal Help
          </a>
          : A charity providing legal advice, support, and campaigning for
          justice in immigration, nationality, and refugee law and policy.
        </li>
      </ul>
      <p>
        These resources aim to provide support, advice, and guidance to
        immigrants and asylum seekers navigating life in the UK. Remember,
        you're not alone, and help is available when you need it.
      </p>
    </section>
  );
}
