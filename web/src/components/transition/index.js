import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link';
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import BlockWindow from  './blockTransition'

export default function DefaultTransition(allProps) {
	const { children,entry,exit, ...props } = allProps

	return (
		<>
			{props.block && <BlockWindow entry={entry} exit={exit} {...props}>{children}</BlockWindow>}
            {(props.cover ||
				props.fade ||
				props.paintDrip ||
				props.swipe ||
				props.morph) && (
					<AniLink entry={entry} exit={exit}  {...props}>{children}</AniLink>
			)}
			{!props.cover &&
				!props.fade &&
				!props.paintDrip &&
				!props.swipe &&
                !props.morph && 
                !props.block &&
                (
					<TransitionLink entry={entry} exit={exit}  {...props}>{children}</TransitionLink>
				)}
		</>
	)
}