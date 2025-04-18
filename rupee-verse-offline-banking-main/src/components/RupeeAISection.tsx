
import React from 'react';
import { MessageSquare, Mic, VolumeX, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RupeeAISection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Meet <span className="text-primary">Rupee AI</span>, Your Financial Assistant
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Talk to Rupee AI using voice commands for financial advice and help with transactions, even offline.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="card-gradient rounded-3xl p-6 max-w-md mx-auto lg:ml-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Rupee AI</h3>
                  <p className="text-xs text-muted-foreground">Offline Assistant</p>
                </div>
              </div>
              
              <div className="badge badge-purple flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                Active
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-4 mb-6">
              <p className="text-sm">Hello! I'm Rupee AI, your financial assistant. I can help you with:</p>
              <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                <li>Checking your account balance</li>
                <li>Sending money to contacts</li>
                <li>Financial advice and budgeting</li>
                <li>Loan information and applications</li>
              </ul>
              <p className="mt-2 text-sm">How can I assist you today?</p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-sm text-primary mb-1">You</p>
              <p className="text-sm">How much money do I have in my account?</p>
            </div>
            
            <div className="bg-card rounded-xl p-4 mb-6">
              <p className="text-sm text-primary mb-1">Rupee AI</p>
              <p className="text-sm">Your current account balance is ₹24,500.00. You have no pending transactions.</p>
            </div>
            
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1 border-white/10 bg-white/5 hover:bg-white/10">
                <Mic className="w-4 h-4 mr-2" /> Voice
              </Button>
              <div className="relative flex-1 flex items-center">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                />
                <Send className="absolute right-3 w-4 h-4 text-primary cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-poppins font-semibold text-2xl">What can Rupee AI do?</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex flex-shrink-0 items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Voice Commands</h4>
                  <p className="text-muted-foreground">Control your banking with simple voice commands in your local language.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald/20 text-emerald flex flex-shrink-0 items-center justify-center">
                  <VolumeX className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Works Offline</h4>
                  <p className="text-muted-foreground">Get help with transactions and information even without internet connectivity.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex flex-shrink-0 items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Financial Advice</h4>
                  <p className="text-muted-foreground">Receive personalized financial guidance based on your spending habits and uploaded documents.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <Link to="/rupee-ai">
                <Button className="purple-gradient">
                  Try Rupee AI Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RupeeAISection;
