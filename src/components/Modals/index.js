import React from 'react';

import { Modal, Button } from 'bootstrap-4-react';

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
                <Modal.Body style={{ textAlign: 'center' }}>
                    {children}
                    <div style={{ textAlign: 'right' }}><Button primary="true" data-dismiss="modal">Ok</Button></div>                    
                </Modal.Body>
            </Modal.Content>
        </Modal.Dialog>
    </Modal>
)