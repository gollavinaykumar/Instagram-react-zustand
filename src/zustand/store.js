import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const usePostStore = create(persist((set,get)=>({
    
   posts: [{
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    name: 'vinay kumar golla',
    caption : "Good BreakFast"
  },
  {
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    name: 'vinay kumar golla',
    caption : "Yummy!"
  },
  {
    image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    name: 'vinay kumar golla',
    caption : "Loved it !"
  },],

  stories : [{
    name : "vinay",
    image : "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  }],
    addPost : (post)=>{
        set({posts: [...get().posts, post]});
    },
    addStory : (story)=>{
      set({stories : [...get().stories,story]});
    }
}),
{
  name : "PostDetails",
  storage: createJSONStorage(()=>localStorage)
}))