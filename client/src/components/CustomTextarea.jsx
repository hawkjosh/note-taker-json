import React, { useState } from 'react'

const style = {
	width: '100%',
	padding: '1rem',
}

export default (props) => {
	const [placeholderText] = useState(props.placeholder)
	const [inputValue, setInputValue] = useState('')

	function handleChange(e) {
		setInputValue(e.target.value)
		props.onChange ? props.onChange(inputValue) : null
	}
	return (
		<>
			<textarea
				style={style}
				value={inputValue}
				onChange={handleChange}
				placeholder={placeholderText}
				{...props}
			/>
		</>
	)
}
