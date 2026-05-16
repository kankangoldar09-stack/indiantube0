import { useState } from "react";
import { X, Link, MessageCircle, Mail, Twitter, Facebook, Copy } from "lucide-react";

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url: string;
}

export default function ShareSheet({ isOpen, onClose, title, text, url }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        onClose();
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareViaFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, '_blank');
  };

  const shareViaEmail = () => {
    const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
    window.location.href = mailto;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl z-50 animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <h2 className="text-white font-bold text-lg">Share to</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Share Options */}
        <div className="p-4">
          {/* Native Share (Mobile) */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full bg-pink-500 text-white font-semibold py-3 rounded-xl mb-4 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Share via Apps
            </button>
          )}

          {/* Social Icons */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <button
              onClick={shareViaWhatsApp}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-xs">WhatsApp</span>
            </button>

            <button
              onClick={shareViaTwitter}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center">
                <Twitter className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-xs">Twitter</span>
            </button>

            <button
              onClick={shareViaFacebook}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                <Facebook className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-xs">Facebook</span>
            </button>

            <button
              onClick={shareViaEmail}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-xs">Email</span>
            </button>
          </div>

          {/* Copy Link */}
          <div className="bg-gray-800 rounded-xl p-3 flex items-center gap-3">
            <div className="flex-1 overflow-hidden">
              <p className="text-gray-400 text-xs mb-1">Link</p>
              <p className="text-white text-sm truncate">{url}</p>
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-700 text-white'
              }`}
            >
              {copied ? 'Copied!' : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Safe Area */}
        <div className="h-8" />
      </div>
    </>
  );
}