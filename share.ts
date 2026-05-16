export const shareApp = async (): Promise<boolean> => {
  const shareData = {
    title: 'IndianReels',
    text: 'Check out IndianReels - The best Indian social media app for sharing reels and photos! 🎬🇮🇳',
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return true;
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(
        `Check out IndianReels - The best Indian social media app! 🎬🇮🇳\n${window.location.href}`
      );
      return true;
    }
  } catch (err) {
    console.error('Share failed:', err);
    return false;
  }
};

export const sharePost = async (postUrl: string, caption: string): Promise<boolean> => {
  const shareData = {
    title: 'IndianReels Post',
    text: caption,
    url: postUrl
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return true;
    } else {
      await navigator.clipboard.writeText(`${caption}\n${postUrl}`);
      return true;
    }
  } catch (err) {
    console.error('Share failed:', err);
    return false;
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Copy failed:', err);
    return false;
  }
};