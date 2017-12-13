import React, { Component } from 'react';
import './Home.css';
import {Row, Col,} from 'reactstrap'
import { Link } from 'react-router-dom';
import handImage from './hands_laptop.png'
import waves from './waves.png'
import waves2 from './waves2.png'


class Home extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {

    return (
      <div className={"container"}>
        <div className="d-flex flex-column justify-content-lg-around align-items-center homeContent">
          <Row id={"home"} className="d-flex justify-content-center">
            <Col lg={4} md={{size: 7, offset: 0}} sm={12} xs={12} className="mb-5 d-flex flex-column">
              <h4>
                Lorum Ipsum
              </h4>
              <h1 id="title">
                Keep track of your carsharing expenses
              </h1>
              <Link to={"/app"}
                    id="getStarted"
                    style={{fontSize: '25px'}}
                    className="btn btn-dark mt-3 align-self-auto">
                Get Started
              </Link>
            </Col>
            <Col lg={{size: 7, offset: 1}} md={12} sm={12} xs={12} className="">
              <img src={handImage} alt="" />
            </Col>
          </Row>
          <div>
            <Row className="d-flex justify-content-center text-center mb-3 mt-1 mt-md-2">
              <h4>Works with all major carsharing providers.</h4>
            </Row>
            <Row id="logos" className="mb-5">
              <Col xl={{size: 2, offset: 0}} lg={{size: 2, offset: 1}} md={3} xs={4}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Car2go_logo.svg/1280px-Car2go_logo.svg.png" alt=""/>
              </Col>
              <Col xl={2} lg={2} md={3} xs={4} className="d-none d-lg-block">
                <img src="https://www.schroederschoembs.com/wp-content/uploads/2017/03/Coup-Logo.png" alt=""/>
              </Col>
              <Col xl={2} lg={2} md={3} xs={4}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/DriveNow_logo.svg/2000px-DriveNow_logo.svg.png" alt=""/>
              </Col>
              <Col xl={2} lg={2} md={3} xs={4} className="d-none d-md-block">
                <img src="https://www.drive-by.de/files/theme/img/drive-by-logo-b.svg" alt=""/>
              </Col>
              <Col xl={2} lg={2} md={3} xs={4}>
                <img src="https://emmy-sharing.de/wp-content/themes/emmy-sharing/images/logo.svg" alt=""/>
              </Col>
              <Col xl={2} lg={2} md={3} xs={4} className="d-none d-xl-block">
                <img src="https://upload.wikimedia.org/wikipedia/de/3/37/Cambio_MobilitaetsService_Logo.png" alt=""/>
              </Col>
            </Row>
          </div>
        </div>

        <div id="waves-container">
          <img id="waves" src={waves} alt=""/>
          <img id="waves2" src={waves2} alt=""/>
          <img id="waves3" src={waves} alt=""/>
          <img id="waves4" src={waves2} alt=""/>
        </div>
      </div>

    );
  }
}

export default Home;
