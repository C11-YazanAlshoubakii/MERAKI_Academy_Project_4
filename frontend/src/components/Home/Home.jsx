import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Pagination from 'react-bootstrap/Pagination';
import Comments from './Comments';
import Orders from './Orders';
import Slider from './Slider/Slider';
import './style.css';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Bannar from '../Home/bannar.png';

const Home = () => {
  const navigator = useNavigate();
  const {
    token,
    setUserId,
    isLoggedIn,
    userId,
    services,
    setServices,
    title,
    setTitle,
    originalServices,
    setOriginalServices,
  } = useContext(UserData);

  const [showComments, setShowComments] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [service, setService] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paginationCounter, setPaginationCounter] = useState(0);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseCanvas = () => setShowOffCanvas(false);
  const handleShowCanvas = () => setShowOffCanvas(true);

  const handelCloseComments = () => {
    setShowComments(false);
  };

  const handelShowComments = () => {
    setShowComments(true);
  };

  const handelCloseOrders = () => {
    setShowOrders(false);
  };

  const handelShowOrders = () => {
    setShowOrders(true);
  };

  const handelCloseConfirmOrder = () => {
    setShowConfirmOrder(false);
    setSuccess(false);
  };

  const handelShowConfirmOrder = () => {
    setShowConfirmOrder(true);
  };

  const addOrder = (serviceId) => {
    const newOrder = {
      userId,
      serviceId,
    };
    axios
      .post('http://127.0.0.1:5000/orders/', newOrder, {
        headers: { authorization: token },
      })
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getServices = () => {
    axios
      .get('http://localhost:5000/services/', {
        headers: { authorization: token },
      })
      .then((res) => {
        setUserId(res.data.userId);
        setOriginalServices(res.data.services);
        setPaginationCounter(0);
        paginationHandler(0, res.data.services);
      })
      .catch(() => {
        navigator('/login');
      });
  };

  const paginationHandler = (counter, servicesList = originalServices) => {
    setServices(servicesList.slice(counter, counter + 9));
  };

  const filterServicesByPrice = () => {
    const filteredByPrice = originalServices.filter((item) => item.price <= 10);
    setServices(filteredByPrice);
  };

  const filterServicesByEstimatedTime = () => {
    const filteredByEstimatedTime = originalServices.filter(
      (item) => item.estimatedTime <= 3
    );
    setServices(filteredByEstimatedTime);
  };

  const getSerivcesByTitle = () => {
    if (title === '') {
      getServices();
      return;
    }

    const filteredByTitle = originalServices.filter((item) =>
      item.serviceTitle.toLowerCase().includes(title.toLowerCase())
    );
    setServices(filteredByTitle);
  };

  useEffect(() => {
    isLoggedIn ? getServices() : navigator('/login');
  }, [isLoggedIn]);

  useEffect(() => {
    getSerivcesByTitle();
  }, [title]);

  useEffect(() => {
    paginationHandler(paginationCounter);
  }, [paginationCounter]);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Slider />
        <h1 className="home-title">Our Services</h1>
        <div
          className="controller"
          style={{
            position: 'sticky',
            left: '20px',
            top: '0px',
            width: '5rem',
            height: '5rem',
          }}
        >
          <Button
            className="button"
            variant=""
            style={{
              marginBottom: '20px',
            }}
            onClick={handelShowOrders}
            title="My Orders"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              width="100"
              height="100"
              viewBox="0 0 598.11121 535.11426"
            >
              <path
                d="M304.29593,302.51687a4.59436,4.59436,0,0,0-3.18166,5.65638l76.71619,273.97819a4.59431,4.59431,0,0,0,5.65637,3.1816l282.81481-79.19052a4.59437,4.59437,0,0,0,3.18162-5.65631L592.76707,226.508a4.59434,4.59434,0,0,0-5.65633-3.18168Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M387.04091,572.39573l269.50474-75.46358L583.55634,236.26384,314.0516,311.72742Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#fff"
              />
              <path
                d="M349.68366,346.53414c-1.79809.50348-2.53942,3.49029-1.65249,6.6578s3.07152,5.335,4.86961,4.83156L475.8179,323.60568c1.79808-.50348,2.53941-3.4903,1.65248-6.6578s-3.07151-5.335-4.8696-4.83156Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M359.58247,381.886c-1.79808.50348-2.53941,3.49029-1.65248,6.6578s3.07151,5.335,4.8696,4.83156l122.91712-34.41782c1.79809-.50348,2.53942-3.49029,1.65249-6.6578s-3.07152-5.335-4.86961-4.83156Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M369.36719,416.83036c-1.79809.50348-2.53942,3.49026-1.65249,6.6578s3.07152,5.335,4.86961,4.83156L495.50143,393.9019c1.79808-.50348,2.53942-3.49027,1.65248-6.6578s-3.07151-5.335-4.8696-4.83156Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M379.266,452.18218c-1.79809.50348-2.53943,3.49027-1.65249,6.6578s3.07151,5.335,4.8696,4.83156l122.91712-34.41782c1.79809-.50348,2.53943-3.49026,1.65249-6.6578s-3.07152-5.335-4.86961-4.83156Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M534.9799,295.05735a5.96564,5.96564,0,1,0,3.21712,11.48936l22.97873-6.43423a5.96564,5.96564,0,0,0-3.21712-11.48937Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M544.68685,329.724a5.96564,5.96564,0,1,0,3.21712,11.48936l22.97872-6.43423a5.96564,5.96564,0,0,0-3.21712-11.48937Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M554.39379,364.39058a5.96563,5.96563,0,1,0,3.21711,11.48936l22.97873-6.43423a5.96564,5.96564,0,0,0-3.21712-11.48937Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M564.10073,399.05721a5.96564,5.96564,0,0,0,3.21712,11.48936l22.97873-6.43424a5.96564,5.96564,0,0,0-3.21712-11.48936Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#e6e6e6"
              />
              <path
                d="M573.37484,459.14634a7.60151,7.60151,0,1,0,4.0993,14.63992l29.27976-8.19858a7.6015,7.6015,0,0,0-4.09929-14.63992h0Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#5795fd"
              />
              <rect
                x="382.94479"
                y="459.87697"
                width="225"
                height="2"
                transform="translate(-406.86374 -31.78243) rotate(-15.64269)"
                fill="#e6e6e6"
              />
              <polygon
                points="520.202 506.072 502.825 510.273 478.352 445.247 503.999 439.047 520.202 506.072"
                fill="#a0616a"
              />
              <path
                d="M773.78964,717.55713l-.11768-.48584a22.23326,22.23326,0,0,1,16.36792-26.80518l33.99854-8.21924,5.33618,22.07276Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#2f2e41"
              />
              <polygon
                points="443.276 517.91 425.399 517.909 416.894 448.953 443.279 448.954 443.276 517.91"
                fill="#a0616a"
              />
              <path
                d="M748.55062,717.45361l-57.18628-.00244v-.5a22.20823,22.20823,0,0,1,22.20826-22.20752h.001l34.978.00147Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#2f2e41"
              />
              <path
                d="M717.824,673.43319,700.46594,466.56191l71.856-13.245.28375-.05127,21.03174,13.5199-7.32031,76.13381,33.70434,118.69857-29.10218,7.65853L757.16116,559.19046,749.4357,525.714l-3.9592,43.50036L748.41573,676.492Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#2f2e41"
              />
              <path
                d="M698.24051,471.25415l-.19011-.24067,24.83039-186.9574.0324-.24493.1748-.17516c.366-.366,9.06584-8.96295,18.01419-8.96295,1.29375,0,2.52377-.03276,3.70359-.06266,6.84753-.178,12.25677-.32041,18.68527,6.10916,6.54991,6.54919,27.91987,30.46463,27.91987,63.21913,0,31.70356,2.88689,130.22765,2.91609,131.21879l.04094,1.39129-1.167-.759c-.288-.18513-29.03062-18.487-53.13652-1.47389-7.53321,5.31739-14.30064,7.18147-20.08725,7.18147C706.50924,481.49732,698.3555,471.40083,698.24051,471.25415Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#5795fd"
              />
              <circle
                cx="737.30161"
                cy="227.82042"
                r="35.81548"
                transform="translate(-319.86766 199.12975) rotate(-28.66321)"
                fill="#a0616a"
              />
              <path
                d="M682.47425,511.43267a14.66358,14.66358,0,0,0,.85079-22.46873l20.33939-47.976L677.033,445.88934,661.8012,490.69675a14.743,14.743,0,0,0,20.673,20.73592Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#a0616a"
              />
              <path
                d="M662.82375,474.11363l6.54955-13.82749a2.693,2.693,0,0,1-.96728-1.00253c-6.11913-10.60487,30.84271-98.6722,33.30632-104.51364-.3756-3.17705-4.25577-36.84436-1.41871-48.19259,3.33974-13.359,10.19724-19.58491,22.92964-20.81814,14.04146-1.31867,17.82978,17.74932,17.86609,17.943l.01282,49.02-16.11487,56.42786-36.7518,74.97321Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#5795fd"
              />
              <path
                d="M741.88113,241.31379c-4.29338.55862-7.532-3.83417-9.03411-7.89482s-2.64661-8.78808-6.37942-10.98156c-5.09979-2.99674-11.62474.60754-17.45662-.38118-6.586-1.11657-10.86811-8.09643-11.20372-14.768s2.31935-13.08815,4.92436-19.23924l.90945,7.64441a15.15938,15.15938,0,0,1,6.62453-13.25057l-1.17219,11.217c.735-6.28405,7.50492-11.15334,13.69633-9.85109l-.1846,6.6835c7.60682-.90452,15.28012-1.81032,22.90947-1.12121s15.312,3.103,21.09438,8.1275c8.64957,7.51589,11.80857,19.89169,10.748,31.30129s-5.77042,22.12808-10.67915,32.48221c-1.23506,2.60513-2.9433,5.54483-5.80719,5.87668-2.57323.29818-4.92778-1.85286-5.72771-4.31671s-.4096-5.14055.06946-7.68631c.72371-3.84576,1.636-7.77663.95558-11.63028s-3.45273-7.66178-7.33739-8.13406-7.85964,3.9681-5.992,7.4069Z"
                transform="translate(-300.94439 -182.44287)"
                fill="#2f2e41"
              />
              <polygon
                points="597.729 535.092 339.991 535.092 339.991 532.986 598.111 532.986 597.729 535.092"
                fill="#3f3d56"
              />
            </svg>
            <p>My Orders</p>
          </Button>
          <Button
            variant=""
            className="button"
            onClick={handleShowCanvas}
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              width="100"
              height="100"
              viewBox="0 0 578.0013 621.92557"
            >
              <path
                d="M677.64241,491.89724l-249.84894,64.339a33.03735,33.03735,0,0,1-40.18683-23.728L312.04574,239.081a33.03734,33.03734,0,0,1,23.728-40.18683l232.44363-59.85691L627.712,165.67105l73.65843,286.03936A33.03734,33.03734,0,0,1,677.64241,491.89724Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                d="M338.14273,208.094a23.52653,23.52653,0,0,0-16.89723,28.61789l75.5609,293.42725a23.52654,23.52654,0,0,0,28.6179,16.89723l249.84894-64.339a23.52654,23.52654,0,0,0,16.89723-28.61789l-72.51713-281.6073-52.285-23.40643Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#fff"
              />
              <path
                d="M627.07719,167.18472l-38.66749,9.95733a10.99077,10.99077,0,0,1-13.38436-7.9027L567.671,140.68008a.68692.68692,0,0,1,.944-.7991l58.56966,26.01073A.68692.68692,0,0,1,627.07719,167.18472Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                d="M606.73438,417.76533,492.98165,447.058a5.49538,5.49538,0,0,1-2.74083-10.64353L603.99355,407.1218a5.49538,5.49538,0,1,1,2.74083,10.64353Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <path
                d="M633.31182,430.07333l-135.705,34.9456A5.49538,5.49538,0,0,1,494.866,454.3754l135.705-34.94561a5.49539,5.49539,0,0,1,2.74084,10.64354Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <circle
                id="a597741b-ffcf-4aba-98b0-6652ef5d57c9"
                data-name="Ellipse 44"
                cx="135.55495"
                cy="323.87767"
                r="19.42315"
                fill="#e6e6e6"
              />
              <path
                d="M594.63919,366.93361,443.56425,405.8227A17.01917,17.01917,0,0,1,422.863,393.59731l-31.6597-122.9905a17.01916,17.01916,0,0,1,12.22538-20.7012l151.075-38.88909a17.01916,17.01916,0,0,1,20.7012,12.22539l31.65971,122.9905A17.01917,17.01917,0,0,1,594.63919,366.93361Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#fff"
              />
              <path
                d="M594.63919,366.93361,443.56425,405.8227A17.01917,17.01917,0,0,1,422.863,393.59731l-31.6597-122.9905a17.01916,17.01916,0,0,1,12.22538-20.7012l151.075-38.88909a17.01916,17.01916,0,0,1,20.7012,12.22539l31.65971,122.9905A17.01917,17.01917,0,0,1,594.63919,366.93361ZM403.9273,251.84246a15.017,15.017,0,0,0-10.7871,18.26578l31.6597,122.9905a15.017,15.017,0,0,0,18.26577,10.7871l151.075-38.88908a15.017,15.017,0,0,0,10.7871-18.26578L573.268,223.74048a15.017,15.017,0,0,0-18.26578-10.7871Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#e6e6e6"
              />
              <path
                id="b056fd3f-f1a0-44f0-b006-deff0bee637d-736"
                data-name="Path 411"
                d="M546.83934,252.37075l-76.24555,19.62681a2.73087,2.73087,0,0,1-3.30848-1.71854,2.63064,2.63064,0,0,1,1.85283-3.33925l77.61329-19.97889c3.13521,1.58858,2.31023,4.83781.087,5.41011Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                id="f1ea6668-a825-428d-96fe-a2c4e1b5a672-737"
                data-name="Path 412"
                d="M550.282,265.74474l-76.24555,19.62681A2.73089,2.73089,0,0,1,470.728,283.653a2.63065,2.63065,0,0,1,1.85284-3.33925l77.61329-19.97889c3.13521,1.58858,2.31022,4.83781.087,5.41011Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                id="ee9aa382-a9c9-40d0-8ed3-22ec2dd616d6-738"
                data-name="Path 413"
                d="M459.51412,297.22917l-23.2694,5.98992a2.962,2.962,0,0,1-3.60325-2.12795l-7.06858-27.45979a2.962,2.962,0,0,1,2.12794-3.60325l23.2694-5.98991a2.963,2.963,0,0,1,3.60325,2.12795l7.06859,27.45982a2.962,2.962,0,0,1-2.12795,3.60324Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#e6e6e6"
              />
              <path
                id="be954d2b-d8b8-4d26-80a0-a319e99a4b10-739"
                data-name="Path 414"
                d="M557.10914,293.18514,440.74446,323.13925a2.73087,2.73087,0,0,1-3.30847-1.71854,2.63062,2.63062,0,0,1,1.85284-3.33925L557.02218,287.775c3.13521,1.58859,2.31022,4.83781.087,5.41012Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                id="baaae9e4-1b4d-40c2-8a9d-f2abb078b489-740"
                data-name="Path 415"
                d="M560.55283,306.563,444.18814,336.51715a2.73086,2.73086,0,0,1-3.30846-1.71854,2.63061,2.63061,0,0,1,1.85283-3.33926l117.73335-30.30643c3.13521,1.58858,2.31022,4.83781.087,5.41011Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                id="a91bf4c9-37f6-4391-92ed-1882bd0ce21c-741"
                data-name="Path 416"
                d="M563.99426,319.93218,447.62957,349.8863a2.73086,2.73086,0,0,1-3.30846-1.71854,2.63061,2.63061,0,0,1,1.85283-3.33926l117.73335-30.30643c3.13521,1.58858,2.31023,4.83781.087,5.41011Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                id="efb98e07-468b-4c85-9a64-ee4cc5493d6f-742"
                data-name="Path 417"
                d="M567.43768,333.30908,451.073,363.2632a2.73087,2.73087,0,0,1-3.30847-1.71854,2.63063,2.63063,0,0,1,1.85284-3.33926L567.35072,327.899c3.13521,1.58858,2.31022,4.83781.087,5.41011Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                id="aeb1db98-32e5-40b8-ab89-fdad6a3263dc-743"
                data-name="Path 418"
                d="M570.87937,346.67924,454.51469,376.63336a2.73088,2.73088,0,0,1-3.30847-1.71855,2.63062,2.63062,0,0,1,1.85284-3.33925l117.73335-30.30643c3.13521,1.58858,2.31022,4.83781.087,5.41011Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#f2f2f2"
              />
              <path
                id="be265de5-288f-49a7-867d-c42e7cdbf4db-744"
                data-name="Path 395"
                d="M447.98728,469.72335a2.01449,2.01449,0,0,1-1.27407-.08782l-.02505-.01034L441.3969,467.382a2.02852,2.02852,0,1,1,1.58747-3.73356l3.42865,1.45835,4.49293-10.56929a2.02766,2.02766,0,0,1,2.65942-1.07259l.00068.00028-.027.06912.02812-.06941a2.03011,2.03011,0,0,1,1.0723,2.66008l-5.28586,12.42716a2.02886,2.02886,0,0,1-1.36522,1.16845Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#fff"
              />
              <path
                d="M773.47457,603.71475h-258a33.03734,33.03734,0,0,1-33-33v-303a33.03734,33.03734,0,0,1,33-33H755.50142l50.97315,40.62891V570.71475A33.03734,33.03734,0,0,1,773.47457,603.71475Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#e6e6e6"
              />
              <path
                d="M515.47446,244.21475a23.52654,23.52654,0,0,0-23.5,23.5v303a23.52653,23.52653,0,0,0,23.5,23.5h258a23.52653,23.52653,0,0,0,23.5-23.5V279.92032l-44.79614-35.70557Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#fff"
              />
              <path
                d="M723.29356,332.319H605.82977a5.49538,5.49538,0,0,1,0-10.99076H723.29356a5.49538,5.49538,0,1,1,0,10.99076Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#5795fd"
              />
              <path
                d="M745.962,350.86594H605.82977a5.49539,5.49539,0,0,1,0-10.99077H745.962a5.49539,5.49539,0,1,1,0,10.99077Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#5795fd"
              />
              <path
                d="M723.29425,404.44277h-117.46a5.495,5.495,0,1,0,0,10.99h117.46a5.495,5.495,0,0,0,0-10.99Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <path
                d="M745.96417,422.99281H605.83429a5.495,5.495,0,1,0,0,10.99H745.96417a5.495,5.495,0,0,0,0-10.99Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <path
                d="M723.29356,498.55433H605.82977a5.49538,5.49538,0,0,1,0-10.99076H723.29356a5.49538,5.49538,0,1,1,0,10.99076Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <path
                d="M745.962,517.10125H605.82977a5.49539,5.49539,0,0,1,0-10.99077H745.962a5.49539,5.49539,0,1,1,0,10.99077Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <circle
                id="abdb8e2f-a218-463c-85f4-c869fef49971"
                data-name="Ellipse 44"
                cx="245.91553"
                cy="197.05988"
                r="19.42315"
                fill="#5795fd"
              />
              <path
                id="ba7dbbd6-0052-44b1-a552-47a8298b8d3e-745"
                data-name="Path 395"
                d="M554.99015,343.50645a2.0144,2.0144,0,0,1-1.21191-.40277l-.02168-.01626-4.5647-3.49185a2.02852,2.02852,0,1,1,2.46838-3.21972l2.95665,2.26729,6.98671-9.11494a2.02767,2.02767,0,0,1,2.84288-.3755l.00058.00044-.04336.06021.04454-.06021a2.03011,2.03011,0,0,1,.37507,2.84345l-8.2179,10.71637a2.02892,2.02892,0,0,1-1.61348.79109Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#fff"
              />
              <path
                d="M578.33429,419.21278a19.42256,19.42256,0,0,1-19.41992,19.43,4.17626,4.17626,0,0,1-.5-.02,19.422,19.422,0,1,1,19.91992-19.41Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <circle
                id="e4a71040-498e-4958-ad41-c2d79154b8f7"
                data-name="Ellipse 44"
                cx="245.91553"
                cy="363.29519"
                r="19.42315"
                fill="#ccc"
              />
              <path
                d="M805.48234,276.65121h-39.929a10.99077,10.99077,0,0,1-10.99076-10.99077v-29.491a.68692.68692,0,0,1,1.11347-.53844l50.23281,39.79483A.68692.68692,0,0,1,805.48234,276.65121Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
              <path
                d="M578.33429,419.21278a19.42256,19.42256,0,0,1-19.41992,19.43,4.17626,4.17626,0,0,1-.5-.02,42.05076,42.05076,0,0,1,3.77-38.56A19.43323,19.43323,0,0,1,578.33429,419.21278Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#5795fd"
              />
              <path
                d="M600.33429,409.94277a5.50988,5.50988,0,0,1,5.5-5.5h29.27a41.57257,41.57257,0,0,1,3.60986,10.99H605.83429A5.50129,5.50129,0,0,1,600.33429,409.94277Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#5795fd"
              />
              <path
                d="M639.39435,422.99281a41.92449,41.92449,0,0,1-1.46,10.99h-32.1001a5.495,5.495,0,1,1,0-10.99Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#5795fd"
              />
              <path
                d="M711.816,490.77021a6.00013,6.00013,0,0,1-8.24672,1.9979l-70.0049-42.70029a6,6,0,0,1,6.24883-10.24462l70.00489,42.70029A6.00014,6.00014,0,0,1,711.816,490.77021Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#3f3d56"
              />
              <path
                d="M641.8111,448.06992a48,48,0,1,1-15.98318-65.97376A48.05436,48.05436,0,0,1,641.8111,448.06992Zm-71.71233-43.74176a36,36,0,1,0,49.48033-11.98738A36.04071,36.04071,0,0,0,570.09877,404.32816Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#3f3d56"
              />
              <circle
                cx="484.60301"
                cy="267.17256"
                r="24.56103"
                fill="#a0616a"
              />
              <path
                d="M794.015,543.90119a11.002,11.002,0,0,1,8.32251-14.15136,10.46752,10.46752,0,0,1,1.45923-.17969l25.87158-41.52344L806.036,465.57991a9.43208,9.43208,0,1,1,13.1206-13.55274L851.786,484.201l.06567.08008a8.54468,8.54468,0,0,1-.59448,10.18457l-36.25,42.873a10.301,10.301,0,0,1,.27,1.0459,11.0026,11.0026,0,0,1-9.875,13.11621q-.46839.041-.93213.041A11.0367,11.0367,0,0,1,794.015,543.90119Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#a0616a"
              />
              <polygon
                points="444.151 609.001 431.891 609 426.059 561.712 444.153 561.713 444.151 609.001"
                fill="#a0616a"
              />
              <path
                d="M758.2767,759.92208l-39.53051-.00146v-.5a15.38605,15.38605,0,0,1,15.38647-15.38623h.001l24.1438.001Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#2f2e41"
              />
              <polygon
                points="566.007 592.05 555.473 598.322 526.268 560.676 541.815 551.419 566.007 592.05"
                fill="#a0616a"
              />
              <path
                d="M885.77238,739.69878l-33.96586,20.2233-.25581-.4296a15.386,15.386,0,0,1,5.34836-21.09206l.00084-.0005,20.74515-12.35158Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#2f2e41"
              />
              <path
                d="M735.512,727.21272c-8.21289-96.70606-13.09863-186.54492,16.92408-223.19336l.23217-.28418,50.52564,20.21094.08325.18066c.17041.37109,16.97388,37.333,13.0542,62.19434L828.794,643.64924l40.63574,68.041A4.50136,4.50136,0,0,1,867.379,718.118l-17.65918,7.76953a4.52142,4.52142,0,0,1-5.64844-1.76562l-44.2041-72.08008-24.96778-55.28613a1.50028,1.50028,0,0,0-2.85888.459L758.20052,727.31135a4.4918,4.4918,0,0,1-4.47461,4.02441H739.99764A4.53045,4.53045,0,0,1,735.512,727.21272Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#2f2e41"
              />
              <path
                d="M752.60628,504.786l-.24072-.11523-.0376-.26465c-1.88745-13.21.34668-27.8877,6.63989-43.625a34.63634,34.63634,0,0,1,40.20191-20.74317h0a34.59441,34.59441,0,0,1,22.06055,16.96387,34.2209,34.2209,0,0,1,2.3728,27.4248c-7.93384,23.2002-18.22583,44.90723-18.32886,45.124l-.21558.45312Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#5795fd"
              />
              <path
                d="M697.48021,471.88251A11.002,11.002,0,0,1,713.65,474.72233a10.46856,10.46856,0,0,1,.67932,1.3039l47.95411,9.69217,12.7683-30.00357a9.43208,9.43208,0,1,1,17.28928,7.54372l-18.71,41.83025-.052.08956a8.54469,8.54469,0,0,1-9.74785,3.00972L710.97846,489.2473a10.30273,10.30273,0,0,1-.88511.61918,11.00261,11.00261,0,0,1-15.74382-4.6565q-.20244-.42436-.36484-.85874A11.0367,11.0367,0,0,1,697.48021,471.88251Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#a0616a"
              />
              <path
                d="M884.33087,432.51247c-2.36572-4.19178-5.8125-8.03119-10.36914-9.58069-5.88476-2.001-12.25683.12964-18.30713,1.55218-4.66162,1.09595-9.53173,1.76679-14.23046.84192-4.69825-.92492-9.23047-3.65924-11.36817-7.94409-3.145-6.30359-.4956-13.82062-.687-20.86255a25.33438,25.33438,0,0,0-31.92334-23.81061c-5.79346-1.67193-11.03906-1.82659-14.62256,2.62714a17.0001,17.0001,0,0,0-17,17h16.25537a16.1496,16.1496,0,0,0,2.4541,11.93109c2.86963,4.21582,7.85938,7.2655,8.81983,12.274.93115,4.85351-2.36817,9.45868-5.8291,12.98669-3.46045,3.528-7.4751,7.02381-8.55567,11.84626a14.68871,14.68871,0,0,0,2.10352,10.56475,34.40329,34.40329,0,0,0,7.38623,8.13575,108.40184,108.40184,0,0,0,45.0376,23.04034c11.7041,2.81781,24.50586,3.54822,35.37109-1.6355a35.12563,35.12563,0,0,0,15.46484-48.96667Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#2f2e41"
              />
              <path
                d="M888.00065,760.96278h-190a1,1,0,0,1,0-2h190a1,1,0,0,1,0,2Z"
                transform="translate(-310.99935 -139.03722)"
                fill="#ccc"
              />
            </svg>
            <p>Search</p>
          </Button>
        </div>
      </div>

      <div className="home-container">
        {services.map((e) => (
          <Card style={{ width: '90%' }} key={e._id}>
            <Card.Img
              variant="top"
              src={e.imageLink}
              style={{ height: '210px' }}
            />
            <Card.Body style={{ padding: '15px' }}>
              <Card.Title className="fs-1">
                Service Title: {e.serviceTitle}
              </Card.Title>
              <Card.Text className="fs-2">
                Description: {e.serviceDescription}
              </Card.Text>
              <p className="fs-4">Price: {e.price}</p>
              <p className="fs-4">Estimated Time: {e.estimatedTime} Days</p>
              <p className="fs-4">
                Service Provider: {e.serviceProvider.userName}
              </p>
              <Button
                className="fs-4"
                variant="secondary"
                onClick={() => {
                  setService(e);
                  handelShowComments();
                }}
              >
                Comments
              </Button>
            </Card.Body>
            <Card.Body>
              <Button
                className="fs-2"
                style={{
                  width: '100%',
                  backgroundColor: '#5795fd',
                  borderColor: '#5795fd',
                }}
                onClick={() => {
                  setService(e);
                  handelShowConfirmOrder();
                }}
              >
                Order
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.Prev
            linkClassName="fs-3"
            onClick={() => {
              const newCounter = paginationCounter - 9;
              if (newCounter >= 0) {
                setPaginationCounter(newCounter);
                paginationHandler(newCounter);
              }
            }}
          />
          {[...Array(Math.ceil(originalServices.length / 9)).keys()].map(
            (page) => (
              <Pagination.Item
                linkClassName="fs-3"
                linkStyle={{
                  backgroundColor: '#5795fd',
                  borderColor: '#5795fd',
                }}
                key={page}
                active={page * 9 === paginationCounter}
                onClick={() => {
                  const newCounter = page * 9;
                  setPaginationCounter(newCounter);
                  paginationHandler(newCounter);
                }}
              >
                {page + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            linkClassName="fs-3"
            onClick={() => {
              const newCounter = paginationCounter + 9;
              if (newCounter < originalServices.length) {
                setPaginationCounter(newCounter);
                paginationHandler(newCounter);
              }
            }}
          />
        </Pagination>
      </div>
      <div>
        <img src={Bannar} alt="bannar" style={{ width: '100%' }} />
      </div>

      {/* Search OffCanvas*/}
      <Offcanvas show={showOffCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header style={{ marginTop: '100px' }} closeButton>
          <Offcanvas.Title>Search & Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Control
            type="text"
            placeholder="Enter Service Title"
            value={title}
            className="me-2"
            aria-label="Text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <Accordion style={{ width: '100%', margin: '0 auto' }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter</Accordion.Header>
              <Accordion.Body>
                <Nav variant="pills" defaultActiveKey="/home">
                  <Nav.Item>
                    <Nav.Link eventKey="/home" onClick={getServices}>
                      None
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#" onClick={filterServicesByPrice}>
                      Price less than 10
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="link-1"
                      onClick={filterServicesByEstimatedTime}
                    >
                      Estimated Time less than 3 days
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Comments Modal */}
      <Modal
        show={showComments}
        onHide={handelCloseComments}
        size="lg"
        style={{ marginTop: '100px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Comments
            service={service}
            services={getServices}
            close={handelCloseComments}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelCloseComments}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Orders Modal */}
      <Modal
        show={showOrders}
        onHide={handelCloseOrders}
        size="lg"
        style={{ marginTop: '100px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Orders />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelCloseOrders}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Confirm Order */}
      <Modal
        show={showConfirmOrder}
        onHide={handelCloseConfirmOrder}
        style={{ marginTop: '100px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Are You Sure you want to order this Service??
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            style={{ width: '100%' }}
            onClick={() => {
              addOrder(service._id);
            }}
          >
            Order
          </Button>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'space-between' }}>
          {success && <Alert variant="success">Order Added Successfully</Alert>}
          <Button variant="secondary" onClick={handelCloseConfirmOrder}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
