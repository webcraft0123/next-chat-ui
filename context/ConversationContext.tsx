"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Conversation, Message } from "../types";

interface ConversationsContextType {
  conversations: Conversation[];
  addMessageToConversation: (conversationId: string, message: Message) => void;
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    name: "John Doe",
    url: "https://www.icon0.com/free/static2/preview2/stock-photo-teen-boy-avatar-people-icon-character-cartoon-33255.jpg",
    messages: [
      { sender: "John Doe", text: "Hey, how are you?" },
      { sender: "You", text: "I'm good, thanks!" },
    ],
  },
  {
    id: "2",
    name: "Anastasiia",
    url: "https://www.icon0.com/free/static2/preview2/stock-photo-teen-girl-woman-avatar-people-icon-character-cartoon-33283.jpg",
    messages: [
      { sender: "Anastasiia", text: "Are you free this weekend?" },
      { sender: "You", text: "Yes, let's hang out!" },
    ],
  },
  {
    id: "3",
    name: "Jane Smith",
    url: "https://www.icon0.com/free/static2/preview2/stock-photo-indian-man-avatar-people-icon-character-cartoon-32890.jpg",
    messages: [
      { sender: "Jane Smith", text: "Hello, what are you doing now?" },
      { sender: "You", text: "Yes, I am reading a book." },
    ],
  },
];

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider"
    );
  }
  return context;
};

interface ConversationsProviderProps {
  children: ReactNode;
}

export const ConversationsProvider: React.FC<ConversationsProviderProps> = ({
  children,
}) => {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);

  const addMessageToConversation = (
    conversationId: string,
    message: Message
  ) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, messages: [...conversation.messages, message] }
          : conversation
      )
    );
  };

  return (
    <ConversationsContext.Provider
      value={{ conversations, addMessageToConversation }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
