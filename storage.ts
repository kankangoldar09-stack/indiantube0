import { User } from "../App";

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  media: string;
  mediaType: "photo" | "video";
  caption: string;
  location: string;
  hashtags: string;
  likes: number;
  comments: number;
  time: string;
  createdAt: number;
}

const POSTS_KEY = "indianreels_posts";
const USER_KEY = "indianreels_current_user";

// Posts storage
export function getPosts(): Post[] {
  try {
    const stored = localStorage.getItem(POSTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function savePost(post: Post): void {
  const posts = getPosts();
  posts.unshift(post);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function deletePost(postId: string): void {
  const posts = getPosts();
  const filtered = posts.filter(p => p.id !== postId);
  localStorage.setItem(POSTS_KEY, JSON.stringify(filtered));
}

export function getUserPosts(userId: string): Post[] {
  return getPosts().filter(p => p.userId === userId);
}

// User storage
export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null): void {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function getAllUsers(): { 
  id: string;
  email: string; 
  password: string; 
  username: string; 
  name: string; 
  city: string; 
  dateOfBirth: string; 
  avatar: string; 
  bio: string; 
  website: string;
}[] {
  try {
    const stored = localStorage.getItem("indianreels_users");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function setAllUsers(users: { 
  id: string;
  email: string; 
  password: string; 
  username: string; 
  name: string; 
  city: string; 
  dateOfBirth: string; 
  avatar: string; 
  bio: string; 
  website: string;
}[]): void {
  localStorage.setItem("indianreels_users", JSON.stringify(users));
}

// Liked posts
export function getLikedPosts(): string[] {
  try {
    const stored = localStorage.getItem("indianreels_liked");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleLikedPost(postId: string): void {
  const liked = getLikedPosts();
  if (liked.includes(postId)) {
    const filtered = liked.filter(id => id !== postId);
    localStorage.setItem("indianreels_liked", JSON.stringify(filtered));
  } else {
    liked.push(postId);
    localStorage.setItem("indianreels_liked", JSON.stringify(liked));
  }
}

// Saved posts
export function getSavedPosts(): string[] {
  try {
    const stored = localStorage.getItem("indianreels_saved");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleSavedPost(postId: string): void {
  const saved = getSavedPosts();
  if (saved.includes(postId)) {
    const filtered = saved.filter(id => id !== postId);
    localStorage.setItem("indianreels_saved", JSON.stringify(filtered));
  } else {
    saved.push(postId);
    localStorage.setItem("indianreels_saved", JSON.stringify(saved));
  }
}