// /* doodle.js */
// import React, { Component } from "react";
// import Loadable from "@loadable/component";
// const Doodler = Loadable(() => import("css-doodle"));

// const Doodles = ({ rule = "" }) => {
//   if (typeof window === "undefined" || !window) return null;
//   return <Doodler />;
//   //   return <Doodler>{rule}</Doodler>;
// };

// // export default Doodler;

// export default Doodles;
import { lighten, alpha } from "@theme-ui/color";
import React, { useEffect } from "react";

export default ({ colors }) => {
  useEffect(() => {
    import("css-doodle");
  }, []);

  return (
    <>
      <css-doodle>
        {`
          :doodle {
            @grid: 24/1200;
            width: 100%; height:calc(100vh - 81px);
            z-index: -2;
            position: absolute;
            left:0;
            top:0;
            grid-gap: 0.125em;
          }
          // border-radius:50%;
          border: 2px solid;
          opacity:0.4;
          width:1rem;
          height:1rem;
          animation: color-change-3x @pick(2s,2.5s,3s) linear infinite alternate both;

          @keyframes color-change-3x {
            0%,10% {
              border-radius:@pick(0%,50%);
              border-color: @pick(${colors.primary},${colors.secondary},${colors.muted});
            }
            50% {
              border-radius:25%;
              border-color:${colors.background};
            }
             90%,100% {
              border-radius:@pick(50%,0%);
              border-color: @pick(${colors.primary},${colors.secondary},${colors.muted});
             }
           }
     `}
      </css-doodle>
    </>
  );
};
