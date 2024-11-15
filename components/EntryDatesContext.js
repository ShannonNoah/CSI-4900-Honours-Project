import React, { createContext, useState, useContext } from "react";

const EntryDatesContext = createContext();

export const EntryDatesProvider = ({ children }) => {
  const [entryDates, setEntryDates] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  return (
    <EntryDatesContext.Provider
      value={{ entryDates, setEntryDates, journalEntries, setJournalEntries }}
    >
      {children}
    </EntryDatesContext.Provider>
  );
};

export const useEntryDates = () => {
  const context = useContext(EntryDatesContext);
  if (!context) {
    throw new Error("useEntryDates must be used within an EntryDatesProvider");
  }
  return context;
};