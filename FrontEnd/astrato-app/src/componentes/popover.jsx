// Popover.js
import React, { useState } from 'react';
import { Button, Dialog } from '@nextui-org/react';
import Chatbot from './Chatbot';

const Popover = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button onClick={openDialog} style={{ zIndex: 1000 }}>
        Open Chatbot
      </Button>
      <Dialog open={dialogOpen} onClose={closeDialog} style={{ zIndex: 999, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <Chatbot />
        </div>
      </Dialog>
    </>
  );
};

export default Popover;
