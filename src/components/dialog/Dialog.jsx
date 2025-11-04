import React, { useEffect } from 'react';
import { useDialog } from '../../context/DialogContect';
import Photo from './photo/Photo';
import Congratulations from './congratulations/Congratulations';

import Discount from './discount/Discount';
import styles from './Dialog.module.scss';

const Dialog = () => {
  const { isDialogOpen, dialogContent, dialogType, closeDialog } = useDialog();

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'type1':
        return <Photo dialogContent={dialogContent} />;
      case 'type2':
        return (
          <Discount dialogContent={dialogContent} handleDialog={closeDialog} />
        );
      case 'type3':
        return (
          <Congratulations
            dialogContent={dialogContent}
            handleDialog={closeDialog}
          />
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDialogOpen]);
  if (!isDialogOpen) return null;

  return (
    <>
      <div className={styles.dialogOverlay} onClick={closeDialog} />
      <div>
        <div>{renderDialogContent()}</div>
      </div>
    </>
  );
};

export default Dialog;
