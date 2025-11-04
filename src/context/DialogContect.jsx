import React, { createContext, useState, useContext } from 'react';

// Создаем контекст
const DialogContext = createContext();

// Компонент для предоставления контекста
export const DialogProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogType, setDialogType] = useState(null);

  const openDialog = (type, content) => {
    setDialogType(type);
    setDialogContent(content);

    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogType(null);
    setIsDialogOpen(false);
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        dialogType,
        dialogContent,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

// Хук для использования контекста
export const useDialog = () => useContext(DialogContext);
