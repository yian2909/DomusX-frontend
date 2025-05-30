import React, { useState } from "react";
import { View, Text, Input, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

interface Message {
  id: number;
  content: string;
  type: "user" | "ai";
}

const Ai = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "您好！我是您的智能家居助手，有什么可以帮您的吗？",
      type: "ai",
    },
    { id: 2, content: "打开客厅的灯", type: "user" },
    { id: 3, content: "已为您打开客厅的灯光", type: "ai" },
    { id: 4, content: "现在的温度是多少？", type: "user" },
    { id: 5, content: "当前室内温度为24°C，室外温度为18°C", type: "ai" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      type: "user",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: "我收到了您的消息，正在处理中...",
        type: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <View className="container">
      <ScrollView
        className="chat-container"
        scrollY
        scrollWithAnimation
        scrollIntoView={`message-${messages.length}`}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`message ${message.type === "user" ? "user-message" : "ai-message"}`}
            id={`message-${message.id}`}
          >
            {message.content}
          </View>
        ))}
      </ScrollView>

      <View className="input-area">
        <Input
          className="input-field"
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
          placeholder="输入您的问题..."
          confirmType="send"
          onConfirm={handleSend}
        />
        <View className="voice-btn">
          <Text className="icon">🎤</Text>
        </View>
        <View className="send-btn" onClick={handleSend}>
          <Text className="icon">➤</Text>
        </View>
      </View>
    </View>
  );
};

export default Ai;
