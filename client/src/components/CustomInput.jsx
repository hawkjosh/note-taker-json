import React, { useState } from 'react'

const style = {
	width: '100%',
	padding: '0.5rem 1rem',
}

export default (props) => {
	const [inputType] = useState(props.type)
	const [placeholderText] = useState(props.placeholder)
	const [inputValue, setInputValue] = useState('')

	function handleChange(e) {
		setInputValue(e.target.value)
		props.onChange ? props.onChange(inputValue) : null
	}
	return (
		<>
			<input
				style={style}
				type={inputType}
				value={inputValue}
				onChange={handleChange}
				placeholder={placeholderText}
				{...props}
			/>
		</>
	)
}
