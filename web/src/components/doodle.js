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
          border-radius:50%;
          border: 2px solid;
          opacity:0.4;
          width:1rem;
          height:1rem;
          animation: color-change-3x 2s linear infinite alternate both;
          animation-delay: @rand(1000ms);

          @keyframes color-change-3x {
            0% {
              border-color: @pick(${colors.primary},${colors.primary},${colors.secondary},${colors.background},${colors.muted});
            }
            50% {
              border-color: @pick(${colors.background},${colors.primary},${colors.secondary},${colors.muted});
            }
            100% {
              border-color: @pick(${colors.primary},${colors.secondary},${colors.secondary},${colors.background},${colors.muted});
             }
           }
     `}
      </css-doodle>
      {/* Need to examine why this doesn't work on refresh... */}
      {/* <css-doodle>
        {`
            :doodle {
              @grid: 1x6 / 100%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              @size:1500px;
              opacity:1;
              z-index: -1;
            }

            @place-cell: center;
            @size: calc(10% + @i * 7.5%);

            border-radius: 100%;
            border-style: dashed;
            border-width: 2px;

            border-color:
              hsla(
                174, @r(40%,50%), @r(70%, 82%), @r(50%, 90%)
              )
              transparent
            ;

            background-color: ${alpha(colors.primary, 0.5)};
            will-change: transform;
            animation: myanimation @r(4s, 15s) linear alternate infinite;

            @keyframes myanimation {
              from { transform: rotate(@r(360deg)) }
              to { transform: rotate(@r(360deg)) }
            }
        `}
      </css-doodle> */}
    </>
  );
};
