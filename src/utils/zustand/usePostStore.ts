import { create } from 'zustand'

interface PostStore {
    posts: any[];
    getAllPost: () => Promise<void>;
    addNewPost: ({ posterId, content, mood }: { posterId: string, content: string, mood: string }) => Promise<any>;
}

const usePostStore = create<PostStore>((set, get) => ({
    posts: [],
    getAllPost: async () => {
        try {
            let res = await fetch('/api/post')
            if (!res.ok) return { error: "Error occured when GET ALLPOST." }
            const data = await res.json()
            set({ posts: data })
            return data
        } catch (error) {
            console.log(error)
        }
    },
    addNewPost: async ({ posterId, content, mood }: { posterId: string, content: string, mood: string }) => {
        try {
            let res = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ posterId, content, mood })
            })
            const data = await res.json()
            if (!res.ok) {
                return { error: data.error }
            }

            return data
        } catch (error) {
            console.log(error)
        }
    }
}))

export default usePostStore