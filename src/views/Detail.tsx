import React from "react";
import { Link, useParams } from "react-router-dom";
import Occupations from "../components/Occupations/Occupations";
import PersonalData from "../components/PersonalData/PersonalData";
import Section from "../components/Section/Section";
import styles from "./Detail.module.scss";

type Props = {};

const Detail: React.FC<Props> = (props) => {

  let { id } = useParams();

  return (

    <div className={styles.detail}>

      <h3>Person #{id}</h3>
      <p><Link to="/search">Back to results</Link></p>

      <div className="dashboard container-fluid">

        <div className="row">

          {/* Membership... */}

        </div>

        <div className="row">

          <div className="col-lg">

            <Section title="Personal Info">
              <PersonalData />
            </Section>

          </div>

          <div className="col-lg">

            <Section title="Occupations">
              <Occupations />
            </Section>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Detail;
