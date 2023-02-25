import { lighten, alpha } from "@theme-ui/color";
import React, { useEffect } from "react";
import { useExternalScript } from "../hooks/use-external-script";


export default ({ colors }) => {
  
  const doodleSrc = "https://unpkg.com/css-doodle@0.34.3/css-doodle.min.js"; 
  const status = useExternalScript(doodleSrc);

  return (
    <>
    {status ==="ready" &&(
      <css-doodle>
        {`
          :doodle {
            @grid: 18/1200;
            width: 100%;
            height:calc(100vh - 64px);
            z-index: -2;
            position: absolute;
            left:0;
            top:0;
            grid-gap: 0.125em;
          }
          border: 2px solid;
          opacity:0.4;
          width:1em;
          height:1em;
          animation: fade-in ease-in 0.5s, color-change-3x @pick(2s,2.5s,3s) linear infinite alternate both @rand(1000ms); 

          @keyframes fade-in {
            0%{opacity:0;}
            100%{opacity:0.4;}
          }
          
          @keyframes color-change-3x {
            0%,10% {
              border-radius:@pick(0%,50%);
              border-color: @pick(${colors.primary},${colors.secondary},${colors.third},${colors.muted});
            }
            50% {
              border-radius:25%;
              border-color:${colors.background};
            }
             90%,100% {
              border-radius:@pick(50%,0%);
              border-color: @pick(${colors.primary},${colors.secondary},${colors.third},${colors.muted});
             }
           }
     `}
      </css-doodle>
      )}
    </>
  );
};
