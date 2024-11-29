"use client";

import { useState } from "react";
import Image from "next/image";
import ConversationList from "@/components/ConversationList";
import MessageView from "@/components/MessageView";
import { useConversations } from "@/context/ConversationContext";
import { Conversation } from "@/types";

const ChatPage: React.FC = () => {
  const { conversations } = useConversations();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <div className="flex h-screen w-full">
      <div
        className={`${
          selectedConversation ? "hidden" : "block"
        } md:block w-full md:w-[350px] bg-gray-800 text-white overflow-y-auto fixed top-0 left-0 bottom-0 z-50`}
      >
        <div className="flex items-center p-4 bg-sky-800">
          <Image
            className="rounded-full"
            src="https://www.icon0.com/free/static2/preview2/stock-photo-men-in-futuristic-fashion-avatar-people-icon-character-cartoon-33003.jpg"
            alt="Owner avatar"
            width={50}
            height={50}
          />
          <span className="font-bold ml-2">Žans Litinskis</span>
        </div>
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={(conversation) => {
            setSelectedConversation(conversation);
          }}
        />
      </div>

      <div className="flex-1 md:ml-[350px]">
        {selectedConversation && (
          <MessageView
            conversationId={selectedConversation.id}
            removeSelectedConversation={() => setSelectedConversation(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
