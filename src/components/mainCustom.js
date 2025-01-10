import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, Control, util } from "fabric";

const TShirtCanvas = ({ logoUrl }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [zoomValue, setZoomValue] = useState(1);
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  const deleteImg = new Image();
  deleteImg.src = deleteIcon;
  // Store the image object
  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 100,
        height: 100,
      });
      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);
  // Delete icon SVG data

  const addImage = () => {
    FabricImage.fromURL(
      "https://media-container-yeasitech.s3.amazonaws.com/test/customTshirtLogo/1685442081278-Copy(2).png"
    ).then((img) => {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      img.set({
        left: canvasWidth / 2 - (img.width * 0.5) / 2,
        top: canvasHeight / 2 - (img.height * 0.5) / 2,
        scaleX: 0.5, // Adjust scaling as needed
        scaleY: 0.5,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: true,
        hasBorders: false,
        lockRotation: true,
        selectable: false,
      });

      img.on("selected", () => {
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
      img.controls.deleteControl = deleteControl;
      canvas.add(img);
      canvas.setActiveObject(img);
      setZoomValue(0.5);
      setImageObj(img); // Store the image object
    });
  };

  // Custom delete control
  const deleteControl = new Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: "pointer",
    mouseUpHandler: (eventData, transform) => {
      const canvas = transform.target.canvas;
      canvas.remove(transform.target);
      canvas.requestRenderAll();
    },
    render: function (ctx, left, top, _styleOverride, fabricObject) {
      const size = deleteControl.cornerSize || 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
    cornerSize: 15,
  });
  const zoomIn = (value) => {
    if (imageObj) {
      const scaleX = imageObj.scaleX;
      const scaleY = imageObj.scaleY;

      //new scale
      const newScaleX = scaleX * 1.1;
      const newScaleY = scaleY * 1.1;

      //dimensions
      const newWidth = imageObj.width * newScaleX;
      const newHeight = imageObj.height * newScaleY;

      // dimensions
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      // zoom limit === canvas size
      if (newWidth <= canvasWidth && newHeight <= canvasHeight) {
        imageObj.set({
          scaleX: newScaleX,
          scaleY: newScaleY,
          left: imageObj.left - (imageObj.width * (newScaleX - scaleX)) / 2,
          top: imageObj.top - (imageObj.height * (newScaleY - scaleY)) / 2,
        });

        canvas.renderAll();
      }
    }
  };

  const zoomOut = () => {
    if (imageObj) {
      const scaleX = imageObj.scaleX;
      const scaleY = imageObj.scaleY;

      const newScaleX = scaleX * 0.9;
      const newScaleY = scaleY * 0.9;

      // Update image scaling
      imageObj.set({
        scaleX: newScaleX,
        scaleY: newScaleY,
        left: imageObj.left + (imageObj.width * (scaleX - newScaleX)) / 2,
        top: imageObj.top + (imageObj.height * (scaleY - newScaleY)) / 2,
      });

      canvas.renderAll(); // Re-render canvas
    }
  };

  const handleZoom = (value) => {
    if (imageObj) {
      const scale = parseFloat(value);

      // Calculate new position to maintain centering
      const deltaX = (imageObj.width * (scale - imageObj.scaleX)) / 2;
      const deltaY = (imageObj.height * (scale - imageObj.scaleY)) / 2;

      imageObj.set({
        scaleX: scale,
        scaleY: scale,
        left: imageObj.left - deltaX,
        top: imageObj.top - deltaY,
      });

      setZoomValue(scale); // Update zoom level
      canvas.renderAll();
    }
  };

  // Handle clicks outside the canvas
  const handleOutsideClick = (event) => {
    const canvasContainer = canvas.wrapperEl;
    if (!canvasContainer.contains(event.target)) {
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [canvas]);

  return (
    <>
      <div className="logoPosition">
        <canvas id="canvasId" ref={canvasRef} />
      </div>
      {/* {logoUrl && (
        <div className="imageAddbuttonSec">
          <button onClick={addImage} className="imageAddbutton">
            add
          </button>
        </div>
      )} */}
      <div className="imageAddbuttonSec">
        <button onClick={addImage} className="imageAddbutton">
          add
        </button>
        <div className="zoomButtonsSec mt-2 ">
          <button onClick={zoomIn} className="imageAddbutton">
            Zoom In
          </button>
          <button onClick={zoomOut} className="imageAddbutton">
            Zoom Out
          </button>
        </div>
        <div className="zoomButtonsSec mt-2">
          <label>
            Zoom:
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={zoomValue}
              onChange={(e) => handleZoom(e.target.value)}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default TShirtCanvas;
