import React, {Component}  from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import gsap from 'gsap';
import convert from  'color-convert';

export default class BlockWindow extends Component{

        constructor(props) {
            super(props)
    
            this.createRipple = this.createRipple.bind(this)
        }
    
        createRipple = ({ length }, event, hex, color, node) => {

            // const html = document.querySelector("html");

            // html.style= html.style.overflow = "hidden";

            const body = document.body;
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
    
            let rgb = hex ? convert.hex.rgb(hex).join(',') : '0,0,255'
            rgb = color ? convert.keyword.rgb(color) : rgb
    
            canvas.style.zIndex = 10000
            canvas.style.top = 0
            canvas.style.position = 'fixed'
    
            let vw = (canvas.width = window.innerWidth)
            let vh = (canvas.height = window.innerHeight)
    
            body.appendChild(canvas)
    
            // Event coords
            const x = event.clientX
            const y = event.clientY
    
            // // Delta - difference between event and farthest corner
            const dx = x < vw / 2 ? vw - x : x
            const dy = y < vh / 2 ? vh - y : y

            const fullHeight = window.innerHeight +dy; 
            const fullWidth = window.innerWidth+dx; 
            const ripple = {
                alpha: 0,
                radius: 0,
                width: fullWidth*0.05,
                height:fullHeight*0.1, 
                x: x,
                y: y,
            }
    
            const seconds = length
    
            gsap.timeline({
                onUpdate: drawRipple,
                onComplete: () => removeCanvas(seconds / 3),
            })
                .to(ripple, { alpha: 1, duration: seconds / 4 })
                .to(
                    ripple,
                    { 
                        width:fullWidth,
                        ease: "power1.easeIn",
                        duration: seconds - (seconds*0.5),
                    },
                    0
                )
                .to(
                    ripple,
                    { 
                        height: fullHeight,
                        ease: "power1.easeIn",
                        duration: seconds-(seconds*0.5),
                    }
                )
                .set(node, { visibility: 'hidden' },`+=${seconds * 0.1}`)
                .to(
                    canvas,
                    { 
                        y: '100%',
                        ease: "power1.easeIn",
                        duration: seconds - (seconds*0.75),
                    },
                    `+=${seconds * 0.4}`
                )
    
            function drawRipple() {
                ctx.clearRect(0, 0, vw, vh)
                ctx.beginPath()
                ctx.rect(ripple.x-(ripple.width*0.5), ripple.y-(ripple.height*0.5), ripple.width,ripple.height)
                const fillStyle = `rgba(${rgb},${ripple.alpha})`
                ctx.fillStyle = fillStyle
                ctx.fill()
            }
    
            window.addEventListener('resize', onResize)
    
            function removeCanvas(wait = 0) {
                setTimeout(() => {
                    body.removeChild(canvas)
                }, wait)
            }
    
            function onResize() {
                vw = canvas.width = window.innerWidth
                vh = canvas.height = window.innerHeight
            }
        }
    
        getDirection = from => {
            switch (from) {
                case 'left':
                    return { xPercent: -5 }
                case 'right':
                    return { xPercent: 5 }
                case 'top':
                    return { yPercent: -5 }
                case 'bottom':
                    return { yPercent: 5 }
                default:
                    return {}
            }
        }
    
        slideIn = ({ length }, node, from) => {
            
            // const html = document.querySelector("html");

            // html.style= html.style.overflow = "auto";
            gsap.from(node, length, {
                ...this.getDirection(from),
                ease: 'power1.easeOut',
            })
        }
    
        componentWillUnmount() {
            window.removeEventListener('resize', this.onResize)
        }
    
        onResize = () => {
            this.vw = this.canvas.width = window.innerWidth
            this.vh = this.canvas.height = window.innerHeight
        }
    
        render() {
            const {
                exit: removedExit,
                entry: removedEntry,
                paintDrip: removedProp,
                duration,
                direction = 'top',
                ...props
            } = this.props
            const aniLength = duration || 1
            const aniDelay = aniLength * 0.9;
    
            return (
                <>
                    <TransitionLink
                        exit={{
                            length: aniLength,
                            trigger: ({ exit, e, node }) =>
                                this.createRipple(
                                    exit,
                                    e,
                                    props.hex,
                                    props.color,
                                    node
                                ),
                        }}
                        entry={{
                            delay: aniDelay,
                            length: aniLength,
                            trigger: ({ entry, node }) =>
                                this.slideIn(entry, node, direction),
                        }}
                        {...props}>
                        {props.children}
                    </TransitionLink>
                </>
            )
        }
    }