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
	const [selectedNote, setSelectedNote] = useState({})

	useEffect(() => {
		const getNotes = async () => {
			const response = await fetch('/api/notes/get')
			const newData = await response.json()
			setData(newData)
		}
		getNotes()
	}, [])

	const handleNoteClick = (note) => {
		setSelectedNote(note)
	}

	const addNote = () => {
		setSelectedNote({})
		setTitle('')
		setText('')
	}

	const saveNote = (newNote) =>
		fetch(`/api/notes/post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newNote),
		}).then(async () => {
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
		setSelectedNote({})
		setTitle('')
		setText('')
	}

	const deleteNote = (noteId) =>
		fetch(`/api/notes/delete/${noteId}`, {
			method: 'DELETE',
		}).then(async () => {
			const response = await fetch('/api/notes/get')
			const updatedData = await response.json()
			setData(updatedData)
		}, setSelectedNote({}))

	return (
		<div>
			<div className='navbar'>
				<div className='navbar-title-container'>
					<PencilIcon iconSize='clamp(2.813rem, 2.163rem + 2.427vw, 4.688rem)' />
					<div className='navbar-title'>Note Taker</div>
					<div className='navbar-subtitle'>Take notes with Express.js</div>
				</div>

				<div className='navbar-icons'>
					<SaveIcon
						className={
							!title.trim() || !text.trim()
								? 'save-note-hide'
								: 'save-note-show'
						}
						iconSize='clamp(1.563rem, 1.021rem + 2.023vw, 3.125rem)'
						iconColor='white'
						onClick={handleSaveNote}
					/>
					<PlusIcon
						className='new-note'
						iconSize='clamp(1.563rem, 1.021rem + 2.023vw, 3.125rem)'
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
										data-status={item === selectedNote ? 'active' : 'inactive'}
										onClick={() => {
											handleNoteClick(item)
										}}>
										{item.title}
									</div>
									<TrashIcon
										className='delete-icon'
										iconSize='clamp(0.938rem, 0.613rem + 1.214vw, 1.875rem)'
										iconColor='darkgray'
										onClick={() => {
											deleteNote(item.id)
										}}
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
						value={selectedNote.title ? selectedNote.title : title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						className='note-text'
						placeholder='Note Text'
						maxLength='250'
						type='text'
						value={selectedNote.title ? selectedNote.text : text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}
