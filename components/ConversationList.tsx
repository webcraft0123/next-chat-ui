import React from "react";
import { Conversation } from "@/types";
import Image from "next/image";

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversation: Conversation | null;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelectConversation,
  selectedConversation,
}) => {
  return (
    <div className="p-2">
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`flex items-center cursor-pointer p-2 rounded hover:bg-sky-800 ${
              conversation.id === selectedConversation?.id && "bg-sky-800"
            }`}
          >
            <Image
              className="rounded-full mr-2"
              src={conversation.url || ""}
              alt="Avatar"
              width={50}
              height={50}
            />
            <span>{conversation.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
