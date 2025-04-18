
import React, { useState } from 'react';
import { Wifi, IndianRupee, ArrowRight, ArrowDownLeft, QrCode, Send, ScanBarcode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOfflineTransactions } from '@/contexts/OfflineTransactionContext';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
import QRCodeScanner from './QRCodeScanner';
import { 
  AlertDialog, 
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

const LoadingSpinner = ({ className = "" }) => (
  <svg 
    className={`animate-spin -ml-1 mr-2 h-4 w-4 ${className}`} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const OfflineUPISection = () => {
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [showScannerDialog, setShowScannerDialog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [qrData, setQrData] = useState('');
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const { generateQR, processPayment } = useOfflineTransactions();
  const { toast } = useToast();
  const isOnline = navigator.onLine;

  const handleSendMoney = async () => {
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setShowSendDialog(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const handleGenerateQR = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid amount greater than 0",
          variant: "destructive",
        });
        return;
      }
      
      const { qrData: newQrData, paymentInfo: newPaymentInfo } = generateQR(
        Number(amount),
        description || "Payment"
      );
      
      setQrData(newQrData);
      setPaymentInfo(newPaymentInfo);
      
      toast({
        title: "QR Generated",
        description: `QR code for ₹${amount} generated successfully`,
      });
    } catch (error) {
      console.error("Failed to generate QR:", error);
      toast({
        title: "Failed to generate QR",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleScanQR = async (data: string) => {
    try {
      const transaction = processPayment(data);
      setShowScannerDialog(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Failed to process payment:', error);
      toast({
        title: "Invalid QR Code",
        description: "The QR code could not be processed",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="offline-upi-section" className="py-16 md:py-24">
      {/* Gradient Orbs */}
      <div 
        className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" 
        aria-hidden="true"
      />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <Wifi className="h-4 w-4" /> Offline Mode
              </span>
            </div>
            
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
              Process UPI Payments <span className="text-primary">Without Internet</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              RupeeVerse's revolutionary offline UPI system allows you to make and receive payments even when you're not connected to the internet. Transactions are securely stored and processed when connectivity is restored.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button className="green-gradient" onClick={() => setShowSendDialog(true)}>
                Send Money <Send className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/10" onClick={() => setShowReceiveDialog(true)}>
                Receive Payment <QrCode className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/10" onClick={() => setShowScannerDialog(true)}>
                Scan to Pay <ScanBarcode className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative max-w-md">
            <div className="card-gradient rounded-2xl p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-medium text-xl">Offline UPI Flow</h3>
                <div className="badge badge-purple">New</div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Create Offline Transaction</h4>
                    <p className="text-sm text-muted-foreground">
                      Generate a secure QR code or payment link even without internet
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-emerald/20 text-emerald flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Secure Local Storage</h4>
                    <p className="text-sm text-muted-foreground">
                      Transaction is encrypted and stored locally on both devices
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Blockchain Validation</h4>
                    <p className="text-sm text-muted-foreground">
                      When back online, transaction is validated and synced with blockchain
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className="mt-6 p-4 border border-white/10 rounded-lg bg-white/5 flex items-center justify-between cursor-pointer"
                onClick={() => setShowSendDialog(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald/20 text-emerald flex items-center justify-center">
                    <IndianRupee className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Ready to try?</h4>
                    <p className="text-xs text-muted-foreground">Works even in remote areas</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 card-gradient rounded-xl p-4 flex items-center gap-3 rotate-6 shadow-lg">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald/20 text-emerald">
                <ArrowDownLeft className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">Received ₹500 <span className="text-xs text-emerald">Offline</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Send Money Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="card-gradient backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Send Money Offline</DialogTitle>
            <DialogDescription>
              Your transaction will be securely stored and processed when you're back online.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="Enter amount"
                disabled={processing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Name</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="Enter recipient name"
                disabled={processing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="What is this payment for?"
                disabled={processing}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="border-white/10" onClick={() => setShowSendDialog(false)} disabled={processing}>
              Cancel
            </Button>
            <Button className="green-gradient" onClick={handleSendMoney} disabled={processing}>
              {processing ? (
                <>
                  <LoadingSpinner />
                  Processing...
                </>
              ) : (
                "Send Money"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receive Money Dialog */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent className="card-gradient backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Receive Payment</DialogTitle>
            <DialogDescription>
              Generate a QR code to receive money even without internet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="receiveAmount">Amount (₹)</Label>
              <Input
                id="receiveAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="Enter amount"
                disabled={!!qrData}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="receiveDescription">Description (Optional)</Label>
              <Input
                id="receiveDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="What is this payment for?"
                disabled={!!qrData}
              />
            </div>
            
            {qrData && (
              <div className="p-4 bg-white rounded-lg flex flex-col items-center justify-center">
                <div className="text-center">
                  <QRCodeSVG 
                    value={qrData}
                    size={180}
                    level="M"
                    includeMargin={true}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                  />
                  <p className="text-black text-xs mt-2">Scan to pay ₹{amount}</p>
                  {paymentInfo && paymentInfo.reference && (
                    <p className="text-black text-xs">Ref: {paymentInfo.reference}</p>
                  )}
                  {paymentInfo && (
                    <p className="text-black text-xs mt-1">
                      Valid for {Math.round((paymentInfo.expiry - Date.now()) / 60000)} minutes
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-4">
            {!qrData ? (
              <>
                <Button variant="outline" className="border-white/10" onClick={() => setShowReceiveDialog(false)}>
                  Cancel
                </Button>
                <Button className="green-gradient" onClick={handleGenerateQR}>
                  Generate QR
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-white/10" onClick={() => {
                  setQrData('');
                  setPaymentInfo(null);
                }}>
                  Reset
                </Button>
                <Button className="green-gradient" onClick={() => setShowReceiveDialog(false)}>
                  Done
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* QR Scanner Dialog */}
      <Dialog open={showScannerDialog} onOpenChange={setShowScannerDialog}>
        <DialogContent className="card-gradient backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Scan to Pay</DialogTitle>
            <DialogDescription>
              Scan a QR code to make a payment.
            </DialogDescription>
          </DialogHeader>
          
          <QRCodeScanner 
            onScan={handleScanQR} 
            onCancel={() => setShowScannerDialog(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Transaction Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="card-gradient backdrop-blur-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Transaction Successful</AlertDialogTitle>
            <AlertDialogDescription>
              Your transaction has been {isOnline ? 'processed' : 'saved offline'}.
              {!isOnline && ' It will be synced when you are back online.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald/20 text-emerald flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogAction className="green-gradient w-full" onClick={() => setShowConfirmation(false)}>
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default OfflineUPISection;
