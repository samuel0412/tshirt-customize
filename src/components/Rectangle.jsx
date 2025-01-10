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
