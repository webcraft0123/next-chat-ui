"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useConversations } from "@/context/ConversationContext";
import ImageUpload from "./ImageUpload";

interface MessageViewProps {
  conversationId: string;
  removeSelectedConversation: () => void;
}

const MessageView: React.FC<MessageViewProps> = ({
  conversationId,
  removeSelectedConversation,
}) => {
  const { addMessageToConversation, conversations } = useConversations();
  const [newMessage, setNewMessage] = useState("");

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === conversationId
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    addMessageToConversation(conversationId, {
      sender: "You",
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendImage = (image: string | null) => {
    if (!image) return;

    addMessageToConversation(conversationId, {
      sender: "You",
      text: "",
      image: image,
    });
  };

  return (
    <div className="h-full bg-gray-200">
      <div className="h-full flex flex-col">
        <div className="p-4 bg-white flex items-center">
          <Image
            className="cursor-pointer me-4 md:hidden"
            src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
            alt="Back to list"
            width={20}
            height={5}
            onClick={() => removeSelectedConversation()}
          />
          <Image
            className="border border-slate-500 rounded-full"
            src={selectedConversation?.url || ""}
            alt="Owner avatar"
            width={50}
            height={50}
          />
          <span className="ms-4">{selectedConversation?.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="md:w-4/5 mx-auto">
            {selectedConversation?.messages.length === 0 ? (
              <div>No messages yet.</div>
            ) : (
              <div>
                {selectedConversation?.messages.map((message, index) => (
                  <div key={index} className="p-2">
                    <div
                      className={`flex items-start ${
                        message.sender === "You"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.image ? (
                        <Image
                          src={message.image}
                          alt="Image Preview"
                          width={500}
                          height={300}
                          layout="intrinsic"
                          objectFit="contain"
                        />
                      ) : (
                        <>
                          {message.sender !== "You" && (
                            <Image
                              className="rounded-full"
                              src={selectedConversation.url || ""}
                              alt="Message avatar"
                              width={40}
                              height={40}
                            />
                          )}
                          <div className="ms-2 flex flex-col">
                            {message.sender !== "You" && (
                              <small>{message.sender}</small>
                            )}
                            <div
                              className={`py-2 px-4 text-white rounded-lg ${
                                message.sender === "You"
                                  ? "rounded-br-none bg-sky-500"
                                  : "rounded-tl-none bg-gray-500"
                              }`}
                            >
                              {message.text}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2 items-center py-4 w-full px-4 md:px-0 md:w-4/5 mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <ImageUpload setImagePreview={(image) => handleSendImage(image)} />
        </div>
      </div>
    </div>
  );
};

export default MessageView;
