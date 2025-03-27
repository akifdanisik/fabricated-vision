
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import ChatSidebar from '@/components/chat/ChatSidebar';

const Chat = () => {
  return (
    <Layout fullWidth hideNavbar>
      <div className="flex h-[calc(100vh-0px)] bg-white">
        <ChatSidebar />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-hidden bg-white">
            <ChatInterface />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
