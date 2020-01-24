import React from 'react';

import PropTypes from "prop-types";

import { Modal, Button } from 'bootstrap-4-react';
import './styles.css'

export const AlertModal = ({ id, title, children }) => (
    <Modal id={id} fade>
        <Modal.Dialog sm>
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                    <Modal.Close>
                        <span aria-hidden="true">&times;</span>
                    </Modal.Close>
                </Modal.Header>
                <Modal.Body className="Modal_COMP_Body">
                    {children}
                    <div className="Modal_COMP_ButtonBar"><Button primary="true" data-dismiss="modal">Ok</Button></div>                    
                </Modal.Body>
            </Modal.Content>
        </Modal.Dialog>
    </Modal>
)

AlertModal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,    
};