import React, { useEffect, useRef } from "react";
import { Canvas, Rect, Control, util } from "fabric";

const RectangleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize the Fabric.js canvas
    const canvas = new Canvas(canvasRef.current);

    // Delete icon SVG data
    const deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    const deleteImg = new Image();
    deleteImg.src = deleteIcon;

    // Add rectangle with custom delete control
    const addRectangle = () => {
      const rect = new Rect({
        left: 100,
        top: 50,
        fill: "yellow",
        width: 200,
        height: 100,
        objectCaching: false,
        stroke: "lightgreen",
        strokeWidth: 4,
      });

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
        cornerSize: 24,
      });

      rect.controls.deleteControl = deleteControl;

      canvas.add(rect);
      canvas.setActiveObject(rect);
    };

    // Add initial rectangle
    addRectangle();

    // Add rectangle on button click
    const addButton = document.getElementById("add");
    addButton.onclick = addRectangle;

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
      />
      <button id="add">Add Rectangle</button>
    </div>
  );
};

export default RectangleCanvas;

// import React, { useEffect, useRef, useState } from "react";
// import { Canvas, FabricImage, util } from "fabric";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// const TShirtCaanvas = ({ logoUrl }) => {
//   const canvasRef = useRef(null);
//   const [canvas, setCanvas] = useState(null);
//   const [imageObj, setImageObj] = useState(null);
//   const [zoomValue, setZoomValue] = useState(50); // Default zoom value (in millimeters)

//   useEffect(() => {
//     if (canvasRef.current) {
//       const initCanvas = new Canvas(canvasRef.current, {
//         width: 300,
//         height: 300,
//       });
//       initCanvas.renderAll();
//       setCanvas(initCanvas);

//       return () => {
//         initCanvas.dispose();
//       };
//     }
//   }, []);

//   const addImage = () => {
//     FabricImage.fromURL(
//       "https://media-container-yeasitech.s3.amazonaws.com/test/customTshirtLogo/1685442081278-Copy(2).png"
//     ).then((img) => {
//       const canvasWidth = canvas.getWidth();
//       const canvasHeight = canvas.getHeight();
//       const initialScale = zoomValue / 100; // Convert initial slider value to scale

//       img.set({
//         left: canvasWidth / 2 - (img.width * initialScale) / 2,
//         top: canvasHeight / 2 - (img.height * initialScale) / 2,
//         scaleX: initialScale,
//         scaleY: initialScale,
//         lockMovementX: true,
//         lockMovementY: true,
//         hasControls: true,
//         hasBorders: false,
//         lockRotation: true,
//         selectable: false,
//       });

//       canvas.add(img);
//       canvas.setActiveObject(img);
//       setImageObj(img);
//     });
//   };

//   const handleZoom = (value) => {
//     setZoomValue(value); // Update zoom value state
//     if (imageObj) {
//       const scale = value / 100; // Convert slider value to scale (40-100mm to 0.4-1.0 scale)

//       // Calculate new position to maintain centering
//       const deltaX = (imageObj.width * (scale - imageObj.scaleX)) / 2;
//       const deltaY = (imageObj.height * (scale - imageObj.scaleY)) / 2;

//       imageObj.set({
//         scaleX: scale,
//         scaleY: scale,
//         left: imageObj.left - deltaX,
//         top: imageObj.top - deltaY,
//       });

//       canvas.renderAll();
//     }
//   };

//   return (
//     <>
//       <div className="logoPosition">
//         <canvas id="canvasId" ref={canvasRef} />
//       </div>
//       <div className="imageAddbuttonSec">
//         <button onClick={addImage} className="imageAddbutton">
//           Add Logo
//         </button>
//         <div className="range-area">
//           <p>
//             Logo Width <span>(Select Logo Size)</span>
//           </p>
//           <div className="d-flex align-items-center">
//             <div className="left-side d-flex flex-column">
//               <div className="number-count line d-flex justify-content-between">
//                 {[...Array(7)].map((_, i) => (
//                   <p className="mb-0" key={i}></p>
//                 ))}
//               </div>
//               <div className="number-count d-flex justify-content-between">
//                 {[40, 50, 60, 70, 80, 90, 100].map((num) => (
//                   <p className="mb-2" key={num}>
//                     {num}
//                   </p>
//                 ))}
//               </div>
//               <Slider
//                 max={100}
//                 min={40}
//                 step={10}
//                 value={zoomValue}
//                 onChange={handleZoom}
//               />
//             </div>
//             <div className="right-side">
//               <p className="mb-0">Millimeters</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TShirtCaanvas;
