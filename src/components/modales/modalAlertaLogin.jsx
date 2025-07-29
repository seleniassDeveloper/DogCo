import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';



export const ModalAlertaLogin = ({ setModalAlerta, modalalerta }) => {

    const handleClose = () => setModalAlerta(false);

    return (
        <>
            <Modal show={modalalerta} onHide={handleClose}>

                <Modal.Body>
                    <h2> 
                        Usuario o contraseña incorrecta!
                        </h2>
                    <div className='d-flex justify-content-end align-center '>
                        <Button className='btnCerrarBotonModal' onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Modal.Body>





            </Modal>
        </>
    )
}