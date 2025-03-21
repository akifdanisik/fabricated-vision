
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chat = () => {
  return (
    <Layout fullWidth>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4 text-neutral-600" />
            </Button>
            <div className="flex flex-col items-start">
              <h1 className="text-base font-medium text-neutral-800">AI Procurement Assistant</h1>
              <p className="text-xs text-neutral-500">Draft</p>
            </div>
          </div>
          
          <Button variant="outline" className="rounded-md text-sm font-medium">
            Create
          </Button>
        </div>
        
        <div className="flex flex-1 overflow-hidden border-t border-neutral-200">
          <div className="flex-1 border-r border-neutral-200">
            <div className="flex items-center border-b border-neutral-200">
              <Button 
                variant="ghost" 
                className="rounded-none border-b-2 border-neutral-800 px-6 py-3 font-medium"
              >
                Chat
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-neutral-500 font-medium"
              >
                Configure
              </Button>
            </div>
            <ChatInterface />
          </div>
          
          <div className="w-1/2 bg-white flex flex-col">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-base font-medium text-neutral-800">Preview</h2>
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center bg-neutral-50 p-8 rounded-lg border border-neutral-200 w-full max-w-md">
                <div className="flex justify-center mb-6">
                  <div className="rounded-md border border-neutral-300 bg-white p-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 16V8.00002C21 6.4087 20.3679 4.88259 19.2426 3.75738C18.1174 2.63216 16.5913 2 15 2H9C7.4087 2 5.88258 2.63216 4.75736 3.75738C3.63214 4.88259 3 6.4087 3 8.00002V16C3 17.5913 3.63214 19.1174 4.75736 20.2427C5.88258 21.3679 7.4087 22 9 22H15C16.5913 22 18.1174 21.3679 19.2426 20.2427C20.3679 19.1174 21 17.5913 21 16Z" stroke="#555555" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M3 10H21" stroke="#555555" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M7 15H7.01" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 15H12" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="text-neutral-700 font-medium text-sm">Your preview will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
