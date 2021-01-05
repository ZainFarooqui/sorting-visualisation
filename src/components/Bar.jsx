import "./component.css";

const Bar = (props) => {
	return (
		<hr
			className="array-bar"
			key={props.i}
			style={{
				backgroundColor: "lightblue",
				height: `${props.value}px`,
				width: '10px',
				display: 'inline-block',
				margin: '0 1px'
			}}/>	)
}

export default Bar