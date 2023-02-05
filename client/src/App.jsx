import { Fragment, useEffect, useState } from 'react'
import './App.css'

import PencilIcon from './components/page-icons/PencilIcon.jsx'
import SaveIcon from './components/page-icons/SaveIcon.jsx'
import PlusIcon from './components/page-icons/PlusIcon.jsx'
import TrashIcon from './components/page-icons/TrashIcon.jsx'

export default () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [data, setData] = useState([])

	useEffect(() => {
		const getNotes = async () => {
			const response = await fetch('/api/notes/get')
			const newData = await response.json()
			setData(newData)
		}
		getNotes()
	}, [])

	const saveNote = (newNote) =>
		fetch(`/api/notes/post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newNote),
		})
		.then(async () => {
			const response = await fetch('/api/notes/get')
			const updatedData = await response.json()
			setData(updatedData)
		})

	const deleteNote = (noteId) =>
		fetch(`/api/notes/delete/${noteId}`, {
			method: 'DELETE',
		})
		.then(async () => {
			const response = await fetch('/api/notes/get')
			const updatedData = await response.json()
			setData(updatedData)
		})

	const handleSaveNote = () => {
		const newNote = {
			title: title,
			text: text,
		}
		saveNote(newNote)
		setTitle('')
		setText('')
	}

	// const handleDeleteNote = (e) => {
	// 	e.stopPropagation()


	// }

	const addNote = () => {
		setTitle('')
		setText('')
	}

	return (
		<div>
			<div className='navbar'>
				<div className='navbar-title-container'>
					<PencilIcon
						iconSize='75px'
						onClick={() => console.log('nav title icon clicked')}
					/>
					<div className='navbar-title'>Note Taker</div>
				</div>

				<div className='navbar-icons'>
					<SaveIcon
						id='save-icon'
						className={
							!title.trim() || !text.trim()
								? 'save-note-hide'
								: 'save-note-show'
						}
						iconSize='50px'
						iconColor='white'
						onClick={handleSaveNote}
					/>
					<PlusIcon
						className='new-note'
						iconSize='50px'
						iconColor='white'
						onClick={addNote}
					/>
				</div>
			</div>

			<div className='notes-page-wrapper'>
				<div className='notes-list-container'>
					<div className='notes-list'>
						{data.map((item, index) => (
							<Fragment key={index}>
								<div className='notes-list-item'>
									<div
										className='notes-list-item-title'
										onClick={() =>
											console.log(`notes list item ${item.id} selected`)
										}>
										{item.title}
									</div>
									<TrashIcon
										className='delete-icon'
										iconSize='20px'
										iconColor='darkgray'
										onClick={deleteNote(item.id)}
									/>
								</div>
							</Fragment>
						))}
					</div>
				</div>

				<div className='new-note-container'>
					<input
						className='note-title'
						placeholder='Note Title'
						maxLength='28'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						className='note-text'
						placeholder='Note Text'
						maxLength='250'
						type='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}
