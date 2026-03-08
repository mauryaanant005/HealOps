import { AIChatbot } from "@/components/AIChatbot";

const ChatbotPage = () => (
  <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] animate-fade-in-up">
    <div className="mb-4">
      <h2 className="text-xl font-bold">AI Diagnostics Assistant</h2>
      <p className="text-sm text-muted-foreground mt-1">Natural language system diagnostics and recovery</p>
    </div>
    <div className="h-[calc(100%-4rem)]">
      <AIChatbot />
    </div>
  </div>
);

export default ChatbotPage;
