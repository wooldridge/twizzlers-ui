import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DetailContext } from "../store/DetailContext";
import Occupations from "../components/Occupations/Occupations";
import PersonalData from "../components/PersonalData/PersonalData";
import Relationships from "../components/Relationships/Relationships";
import Section from "../components/Section/Section";
import {configDetail} from "../config/detail.js";
import { ArrowLeft } from "react-bootstrap-icons";
import styles from "./Detail.module.scss";
import _ from "lodash";

type Props = {};

const Detail: React.FC<Props> = (props) => {

  const detailContext = useContext(DetailContext);
  let { id } = useParams();

  // TODO different than displayValue?
  const getValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const displayValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const getHeading = () => {
    console.log("getHeading", configDetail.heading, detailContext.detail);
    let config = configDetail.heading;
    return (
      <div className={styles.heading}>
      <div className={styles.icon}>
        <Link to="/search"><ArrowLeft color="#5d6aaa" size={28} /></Link>
      </div>
      <div className={styles.title}>
        {displayValue(config.title, detailContext.detail)}
      </div>
      <div className={styles.thumbnail}>
        <img
            src={getValue(config.thumbnail.src, detailContext.detail)}
            alt={getValue(config.title, detailContext.detail)}
        ></img>
      </div>
    </div>
    );
  };

  return (

    <div className={styles.detail}>
      {(!_.isNil(detailContext.detail))  ? (

      <div>

        {getHeading()}

        <div className="dashboard container-fluid">

          <div className="row">
            {/* Membership... */}
          </div>

          <div className="row">
            <div className="col-lg-7">

              <Section title="Personal Info">
                <PersonalData config={configDetail.personal}/>
              </Section>

            </div>
            <div className="col-lg-5">

              <Section title="Relationships">
                <Relationships id={id ? parseInt(id) : 0} />
              </Section>

              <Section title="Occupations">
                <Occupations />
              </Section>

            </div>
          </div>
        </div>

      </div>

      ) : null}

    </div>
  );
};

export default Detail;
