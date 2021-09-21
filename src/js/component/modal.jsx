import React, { useState } from "react";

function Modal() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<button variant="primary" onClick={handleShow}>
				Launch static backdrop modal
			</button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Modal body text goes here.</p>
				</Modal.Body>
				<Modal.Footer>
					<button variant="secondary" onClick={handleClose}>
						Close
					</button>
					<button variant="primary">Understood</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Modal;
