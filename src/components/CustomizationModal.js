import React, { useState, useRef, useEffect, useMemo } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import {
  BackBig,
  BackImg,
  BgRemove,
  BigRedLogo,
  ChestImg,
  EmbroideryImg,
  GalleryImg,
  LogoBlack,
  LogoRed,
  PrintImg,
  RightBigChest,
  RightSleeveBig,
  SleeveLeft,
  SleeveRight,
  SmallTShirt,
  TextImg,
  TShirtImg,
  UploadImg,
} from "../images";
import Slider from "rc-slider";
import TShirtCanvas from "./TShirtCanvas";
import { useDropzone } from "react-dropzone";
import { singleImageUpload } from "../utils/singleImageUpload";
import ReactangleCanvas from "./Rectangle";

const CustomizationModal = ({ show, setShow }) => {
  const [step, setStep] = useState(7);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const nextStep = () => {
    setStep(step + 1);
  };
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { "image/*": [] }, maxFiles: 1 });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const [uploadLoader, setUploadLoader] = useState(false);
  const [uploadedUrl, setupLoadedUrl] = useState({});

  const handleUpload = async () => {
    const dirName = "customTshirtLogo/";
    try {
      setUploadLoader(true);
      const res = await singleImageUpload(acceptedFiles[0], dirName);
      setupLoadedUrl(res);
    } catch (e) {
      console.error(e);
    } finally {
      setShowUploadSection(false);
      setUploadLoader(false);
    }
  };
  return (
    <>
      <Modal
        show={true}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        centered
        className="customizationModal"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {step === 1 && (
              <div className="row">
                <div className="col-lg-7">
                  <div className="terms-conditions">
                    <div className="terms-conditions-content">
                      <h6>
                        Please read the <span>Terms & Conditions</span> of this
                        application:
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Et et fringilla
                        pellentesque imperdiet id viverra neque venenatis. In at
                        id sagittis velit porttitor. Quis mattis erat sodales
                        lorem. Iaculis eget eu platea turpis id egestas faucibus
                        morbi et. Tristique sollicitudin mattis sed a. Magna et
                        mauris scelerisque convallis aliquet.
                      </p>
                      <p>
                        Dictum dapibus volutpat felis at diam. Eu aliquam
                        fermentum porttitor sed. suspendisse ullamcorper nulla
                        vulputate ornare auctor leo in nulla. Eget eget eget
                        odio rhoncus enim fusce at. Est vel enim id id. Arcu
                        faucibus nulla volutpat ipsum porttitor. Massa donec
                        neque nisl eget consectetur nibh ac duis urna.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Et et fringilla
                        pellentesque imperdiet id viverra neque venenatis. In at
                        id sagittis velit porttitor. Quis mattis erat sodales
                        lorem. Iaculis eget eu platea turpis id egestas faucibus
                        morbi et. Tristique sollicitudin mattis sed a. Magna et
                        mauris scelerisque convallis aliquet.{" "}
                      </p>
                      <p>
                        Dictum dapibus volutpat felis at diam. Eu aliquam
                        fermentum porttitor sed. suspendisse ullamcorper nulla
                        vulputate ornare auctor leo in nulla. Eget eget eget
                        odio rhoncus enim fusce at.{" "}
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Et et fringilla
                        pellentesque imperdiet id viverra neque venenatis. In at
                        id sagittis velit porttitor. Quis mattis erat sodales
                        lorem. Iaculis eget eu platea turpis id egestas faucibus
                        morbi et. Tristique sollicitudin mattis sed a. Magna et
                        mauris scelerisque convallis aliquet.
                      </p>
                    </div>
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I agree to the terms and conditions.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="select-by-one-area">
                    <h4>Select Logo Type</h4>
                    <div className="select-logo-type">
                      <button>
                        <img src={PrintImg} alt="" />
                        <h6 className="mb-0">Print</h6>
                      </button>
                      <button>
                        <img src={EmbroideryImg} alt="" />
                        <h6 className="mb-0">Embroidery</h6>
                      </button>
                    </div>
                    <div className="cost-area">
                      <h5>Personalisation Cost</h5>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Per Logo Print </span>
                        <span className="price">£5.00</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Per Logo Embroidery </span>
                        <span className="price">£5.00</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>One-Time Setup Fee: </span>
                        <span className="price">£0.00</span>
                      </div>
                      <div className="border"></div>
                    </div>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setShow(false)}
                      >
                        Close
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-3">
                  <div className="logo-place">
                    <h3>Logo Placement</h3>
                  </div>
                </div>
                <div className="col-lg-7 align-self-center">
                  <div className="logo-placement-left text-center ml-2">
                    <img src={ChestImg} alt="" />
                    <div className="d-flex justify-content-between my-4">
                      <img src={SleeveLeft} alt="" />
                      <img src={SleeveRight} alt="" />
                    </div>
                    <img src={BackImg} alt="" />
                  </div>
                </div>
                <div className="col-lg-5 align-self-center">
                  <div className="select-by-one-area">
                    <div className="select-location d-flex justify-content-center align-items-center gap-2">
                      <img src={SmallTShirt} alt="" />
                      <p className="mb-0">Select Locations</p>
                    </div>
                    <button className="select-place mb-3">
                      <h5>Chest</h5>
                      <div className="d-flex justify-content-between">
                        <button className="select-btn">Left Chest</button>
                        <button className="select-btn">Right Chest</button>
                      </div>
                    </button>
                    <button className="select-place mb-3">
                      <h5>Sleeve</h5>
                      <div className="d-flex justify-content-between">
                        <button className="select-btn">Left Sleeve</button>
                        <button className="select-btn">Right Sleeve</button>
                      </div>
                    </button>
                    <button className="select-place">
                      <h5>Back</h5>
                      <div className="d-flex justify-content-center">
                        <button className="select-btn">Shoulder Blades</button>
                      </div>
                    </button>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-4">
                  <div className="logo-place">
                    <h3>Upload/Select Logo</h3>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="full-t-shirt">
                    <img src={TShirtImg} alt="" />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="select-by-one-area upload-area">
                    <button className="upload">
                      <img src={GalleryImg} alt="" />
                      <p className="mb-0">Gallery</p>
                    </button>
                    <button className="upload">
                      <img src={UploadImg} alt="" />
                      <p className="mb-0">Upload</p>
                    </button>
                    <button className="upload">
                      <img src={TextImg} alt="" />
                      <p className="mb-0">Add Text</p>
                    </button>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-4">
                  <div className="logo-place">
                    <h3>Upload/Select Logo</h3>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="full-t-shirt">
                    <img src={TShirtImg} alt="" />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="select-by-one-area upload-area">
                    <button className="upload">
                      <img src={GalleryImg} alt="" />
                      <p className="mb-0">Gallery</p>
                    </button>
                    <div className="recent-logo">
                      <p className="mb-1">Recent Logos</p>
                      <div className="fixed-height">
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                      </div>
                    </div>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-4">
                  <div className="logo-place">
                    <h3>Edit Logo</h3>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="full-t-shirt">
                    <img src={TShirtImg} alt="" />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="select-by-one-area upload-area">
                    <div className="crop-img">
                      <p>Crop your image</p>
                      <img src={BigRedLogo} alt="" />
                    </div>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-4">
                  <div className="logo-place">
                    <h3>Edit Logo Background</h3>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="full-t-shirt">
                    <img src={TShirtImg} alt="" />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="select-by-one-area upload-area">
                    <div className="bg-remove">
                      <p className="text-center">Background Removal</p>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <img src={BgRemove} alt="" />
                        <div className="bg-remove-content">
                          <p className="mb-0">Remove All Background</p>
                          <p className="mb-0 text">
                            Remove all parts of logo that match the top left
                            colour
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <img src={BgRemove} alt="" />
                        <div className="bg-remove-content">
                          <p className="mb-0">Original</p>
                          <p className="mb-0 text">
                            Covert as uploaded e.g transparent Png, EPS , Jpeg.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 7 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-4">
                  <div className="logo-place">
                    <h3>Adjust Logo Size</h3>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="right-chest-full">
                    <img src={RightBigChest} alt="" />
                    <TShirtCanvas logoUrl={uploadedUrl?.location} />
                    {/* <ReactangleCanvas /> */}
                  </div>
                  <div className="range-area">
                    <p>
                      Logo Width <span>(Select Logo Size)</span>
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="left-side d-flex flex-column">
                        <div className="number-count line d-flex justify-content-between">
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                        </div>
                        <div className="number-count d-flex justify-content-between">
                          <p className="mb-2">40</p>
                          <p className="mb-2">50</p>
                          <p className="mb-2">60</p>
                          <p className="mb-2">70</p>
                          <p className="mb-2">80</p>
                          <p className="mb-2">90</p>
                          <p className="mb-2">100</p>
                        </div>
                        <Slider max={60} step={10} defaultValue={30} />
                      </div>
                      <div className="right-side">
                        <p className="mb-0">Millimeters</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  {showUploadSection === false ? (
                    <div className="select-by-one-area upload-area">
                      <div className="select-location d-flex align-items-center gap-2">
                        <img src={SmallTShirt} alt="" />
                        <p className="mb-0">Select Location 1</p>
                      </div>
                      <button className="select-place mb-3">
                        <h5>Chest</h5>
                        <div className="d-flex justify-content-between">
                          <button className="select-btn">Left Chest</button>
                          <button className="select-btn">Right Chest</button>
                        </div>
                      </button>
                      <p className="mb-2">
                        Different Logo?
                        <span>(for this selected location)</span>
                      </p>
                      <div className="different-logo">
                        <button>
                          <img src={GalleryImg} alt="" />
                          <p className="mb-0">Gallery</p>
                        </button>
                        <button onClick={() => setShowUploadSection(true)}>
                          <img src={UploadImg} alt="" />
                          <p className="mb-0">Upload</p>
                        </button>
                        <button>
                          <img src={TextImg} alt="" />
                          <p className="mb-0">Add Text</p>
                        </button>
                      </div>
                      <div className="recent-logo">
                        <p className="mb-1">Recent Logos</p>
                        <div className="fixed-height">
                          <img src={uploadedUrl?.location} alt="" />
                          {/* <img src={LogoBlack} alt="" />
                          <img src={LogoRed} alt="" />
                          <img src={LogoBlack} alt="" />
                          <img src={LogoRed} alt="" />
                          <img src={LogoBlack} alt="" />
                          <img src={LogoRed} alt="" />
                          <img src={LogoBlack} alt="" />
                          <img src={LogoRed} alt="" />
                          <img src={LogoBlack} alt="" />
                          <img src={LogoRed} alt="" />
                          <img src={LogoBlack} alt="" /> */}
                        </div>
                      </div>
                      {/* <div className="btn-area">
                        <button
                          className="btn back"
                          onClick={() => setStep(step - 1)}
                        >
                          Back
                        </button>
                        <button className="btn next" onClick={nextStep}>
                          Next
                        </button>
                      </div> */}
                    </div>
                  ) : (
                    <div className="uploadSection">
                      <div>
                        <div className="container">
                          <div {...getRootProps({ style })}>
                            <input {...getInputProps()} />
                            {uploadLoader ? (
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            ) : (
                              <span>
                                {acceptedFiles[0]
                                  ? acceptedFiles[0].name
                                  : " Drag 'n' drop some files here, or click to select files"}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 ml-4">
                          <button
                            className="imageAddbutton"
                            onClick={handleUpload}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {step === 8 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-4">
                  <div className="logo-place">
                    <h3>Adjust Logo Size</h3>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="right-chest-full">
                    <img src={RightSleeveBig} alt="" />
                    {/* <img className="position-img" src={LogoRed} alt="" /> */}
                  </div>
                  <div className="range-area">
                    <p>
                      Logo Width <span>(Select Logo Size)</span>
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="left-side d-flex flex-column">
                        <div className="number-count line d-flex justify-content-between">
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                        </div>
                        <div className="number-count d-flex justify-content-between">
                          <p className="mb-2">50</p>
                          <p className="mb-2"></p>
                          <p className="mb-2">60</p>
                          <p className="mb-2"></p>
                          <p className="mb-2">70</p>
                        </div>
                        <Slider max={60} step={15} defaultValue={30} />
                      </div>
                      <div className="right-side">
                        <p className="mb-0">Millimeters</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="select-by-one-area upload-area">
                    <div className="select-location d-flex align-items-center gap-2">
                      <img src={SmallTShirt} alt="" />
                      <p className="mb-0">Select Location 2</p>
                    </div>
                    <button className="select-place mb-3">
                      <h5>Sleeve</h5>
                      <div className="d-flex justify-content-between">
                        <button className="select-btn">Left Sleeve</button>
                        <button className="select-btn">Right Sleeve</button>
                      </div>
                    </button>
                    <p className="mb-2">
                      Different Logo?
                      <span>(for this selected location)</span>
                    </p>
                    <div className="different-logo">
                      <button>
                        <img src={GalleryImg} alt="" />
                        <p className="mb-0">Gallery</p>
                      </button>
                      <button>
                        <img src={UploadImg} alt="" />
                        <p className="mb-0">Upload</p>
                      </button>
                      <button>
                        <img src={TextImg} alt="" />
                        <p className="mb-0">Add Text</p>
                      </button>
                    </div>
                    <div className="recent-logo">
                      <p className="mb-1">Recent Logos</p>
                      <div className="fixed-height">
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                      </div>
                    </div>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 9 && (
              <div className="row">
                <div className="col-sm-12 text-center mb-4">
                  <div className="logo-place">
                    <h3>Adjust Logo Size</h3>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="right-chest-full back-full pr-0">
                    <img src={BackBig} alt="" />
                    <img className="position-img" src={LogoRed} alt="" />
                  </div>
                  <div className="range-area back-view">
                    <p>
                      Logo Width <span>(Select Logo Size)</span>
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="left-side d-flex flex-column">
                        <div className="number-count line d-flex justify-content-between">
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                          <p className="mb-0"></p>
                        </div>
                        <div className="number-count d-flex justify-content-between">
                          <p className="mb-2">90</p>
                          <p className="mb-2">110</p>
                          <p className="mb-2">130</p>
                          <p className="mb-2">150</p>
                          <p className="mb-2">170</p>
                          <p className="mb-2">190</p>
                          <p className="mb-2">210</p>
                          <p className="mb-2">230</p>
                          <p className="mb-2">250</p>
                          <p className="mb-2">270</p>
                          <p className="mb-2">290</p>
                        </div>
                        <Slider max={60} step={6} defaultValue={30} />
                      </div>
                      <div className="right-side">
                        <p className="mb-0">Millimeters</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="select-by-one-area upload-area">
                    <div className="select-location d-flex align-items-center gap-2">
                      <img src={SmallTShirt} alt="" />
                      <p className="mb-0">Select Location 3</p>
                    </div>
                    <button className="select-place mb-3">
                      <h5>Back</h5>
                      <div className="d-flex justify-content-center">
                        <button className="select-btn">Shoulder Blades</button>
                      </div>
                    </button>
                    <p className="mb-2">
                      Different Logo?
                      <span>(for this selected location)</span>
                    </p>
                    <div className="different-logo">
                      <button>
                        <img src={GalleryImg} alt="" />
                        <p className="mb-0">Gallery</p>
                      </button>
                      <button>
                        <img src={UploadImg} alt="" />
                        <p className="mb-0">Upload</p>
                      </button>
                      <button>
                        <img src={TextImg} alt="" />
                        <p className="mb-0">Add Text</p>
                      </button>
                    </div>
                    <div className="recent-logo">
                      <p className="mb-1">Recent Logos</p>
                      <div className="fixed-height">
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                        <img src={LogoRed} alt="" />
                        <img src={LogoBlack} alt="" />
                      </div>
                    </div>
                    <div className="btn-area">
                      <button
                        className="btn back"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                      <button className="btn next" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 10 && (
              <div className="row">
                <div className="col-lg-8">
                  <div className="final-area">
                    <div className="final-img">
                      <img src={TShirtImg} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="final-right">
                    <div className="final-overview">
                      <div className="overview-img">
                        <img src={TShirtImg} alt="" />
                      </div>
                      <p>Chest</p>
                    </div>
                    <div className="final-overview">
                      <div className="overview-img">
                        <img src={RightSleeveBig} alt="" />
                      </div>
                      <p>Sleeve</p>
                    </div>
                    <div className="final-overview">
                      <div className="overview-img">
                        <img src={BackBig} alt="" />
                      </div>
                      <p>back</p>
                    </div>
                    <div className="final-overview">
                      <div className="overview-img">
                        <img src={TShirtImg} alt="" />
                      </div>
                      <p>Chest</p>
                    </div>
                    <div className="final-overview">
                      <div className="overview-img">
                        <img src={TShirtImg} alt="" />
                      </div>
                      <p>Chest</p>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-7 align-self-center">
                    <textarea
                      className="from-control"
                      name=""
                      id=""
                      placeholder="Add a note"
                    ></textarea>
                  </div>
                  <div className="col-lg-5 align-self-center">
                    <div className="select-by-one-area p-0">
                      <div className="btn-area justify-content-evenly mt-0">
                        <button
                          className="btn back"
                          onClick={() => setStep(step - 1)}
                        >
                          Back
                        </button>
                        <button
                          className="btn next"
                          onClick={() => setShow(false)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>&nbsp;</Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomizationModal;
